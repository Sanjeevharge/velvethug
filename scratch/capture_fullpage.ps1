# scratch/capture_fullpage.ps1
$ErrorActionPreference = "Stop"

$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edgePath)) { $edgePath = "C:\Program Files\Microsoft\Edge\Application\msedge.exe" }

$userDataDir = "C:\Users\Sanjeev\Desktop\velvethug\temp_edge_fullpage"
if (Test-Path $userDataDir) { Remove-Item -Recurse -Force $userDataDir }

$port = 9334
$proc = Start-Process -FilePath $edgePath -ArgumentList @(
    "--headless=new",
    "--no-first-run",
    "--no-default-browser-check",
    "--remote-debugging-port=$port",
    "--user-data-dir=$userDataDir",
    "http://127.0.0.1:8080/#account"
) -PassThru

Start-Sleep -Seconds 3

try {
    $pages = Invoke-RestMethod -Uri "http://127.0.0.1:$port/json"
    $page = $pages | Where-Object { $_.type -eq "page" -and $_.url -like "*8080*" } | Select-Object -First 1
    if (-not $page) { $page = $pages | Where-Object { $_.type -eq "page" -and $_.url -notlike "edge://*" } | Select-Object -First 1 }

    $ws = [System.Net.WebSockets.ClientWebSocket]::new()
    $cts = [System.Threading.CancellationTokenSource]::new(15000)
    $ws.ConnectAsync([System.Uri]$page.webSocketDebuggerUrl, $cts.Token).Wait()

    function Send-Cdp($method, $params) {
        $id = [System.Threading.Interlocked]::Increment([ref]$script:cmdId)
        $payload = @{ id = $id; method = $method; params = $params } | ConvertTo-Json -Compress -Depth 10
        $bytes = [System.Text.Encoding]::UTF8.GetBytes($payload)
        $ws.SendAsync([System.ArraySegment[byte]]::new($bytes), [System.Net.WebSockets.WebSocketMessageType]::Text, $true, [System.Threading.CancellationToken]::None).Wait()

        while ($true) {
            $buffer = [byte[]]::new(4194304)
            $mem = [System.IO.MemoryStream]::new()
            do {
                $seg = [System.ArraySegment[byte]]::new($buffer)
                $res = $ws.ReceiveAsync($seg, [System.Threading.CancellationToken]::None).Result
                $mem.Write($buffer, 0, $res.Count)
            } while (-not $res.EndOfMessage)

            $obj = [System.Text.Encoding]::UTF8.GetString($mem.ToArray()) | ConvertFrom-Json
            if ($obj.id -eq $id) { return $obj }
        }
    }

    $script:cmdId = 0
    Send-Cdp "Runtime.enable" @{} | Out-Null
    Send-Cdp "Page.enable" @{} | Out-Null

    # Set user in localStorage and render account page
    $setUserJs = @"
        const u = {
            name: 'Vikram Malhotra',
            email: 'vikram.m@domain.com',
            phone: '9845011223',
            avatar: 'V',
            foundingNumber: 348,
            isFounding: true,
            isAmbassador: false,
            referralCode: 'VELVET-2234',
            referralStats: { count: 0, earned: 0, pending: 0 },
            orders: [],
            addresses: []
        };
        localStorage.setItem('vh_user_data', JSON.stringify(u));
        window.state.user = u;
        window.renderAccountPage();
"@
    Send-Cdp "Runtime.evaluate" @{ expression = $setUserJs; returnByValue = $true } | Out-Null
    Start-Sleep -Seconds 1

    # Scroll down to show profile card and tabs
    Send-Cdp "Runtime.evaluate" @{ expression = "window.scrollTo(0, 360);"; returnByValue = $true } | Out-Null
    Start-Sleep -Milliseconds 600

    $ss = Send-Cdp "Page.captureScreenshot" @{ format = "png" }
    [System.IO.File]::WriteAllBytes("C:\Users\Sanjeev\.gemini\antigravity-ide\brain\2aae304b-e882-4b34-aeb4-f104f39540e7\account_card_verified.png", [System.Convert]::FromBase64String($ss.result.data))
    Write-Host "Screenshot saved successfully!"

} finally {
    if ($proc -and -not $proc.HasExited) { Stop-Process -Id $proc.Id -Force }
}
