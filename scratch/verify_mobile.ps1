# scratch/verify_mobile.ps1
$ErrorActionPreference = "Stop"

$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edgePath)) { $edgePath = "C:\Program Files\Microsoft\Edge\Application\msedge.exe" }

$userDataDir = "C:\Users\Sanjeev\Desktop\velvethug\temp_edge_mobile"
if (Test-Path $userDataDir) { Remove-Item -Recurse -Force $userDataDir }

$artifactDir = "C:\Users\Sanjeev\.gemini\antigravity-ide\brain\ab80bb48-fa55-49c4-b694-4db80366c470"

$port = 9337
$proc = Start-Process -FilePath $edgePath -ArgumentList @(
    "--headless=new",
    "--window-size=390,844",
    "--no-first-run",
    "--no-default-browser-check",
    "--remote-debugging-port=$port",
    "--user-data-dir=$userDataDir",
    "http://127.0.0.1:8080/#home"
) -PassThru

Start-Sleep -Seconds 3

try {
    $pages = Invoke-RestMethod -Uri "http://127.0.0.1:$port/json"
    $page = $pages | Where-Object { $_.type -eq "page" -and $_.url -like "*8080*" } | Select-Object -First 1
    if (-not $page) { $page = $pages | Where-Object { $_.type -eq "page" -and $_.url -notlike "edge://*" } | Select-Object -First 1 }

    $ws = [System.Net.WebSockets.ClientWebSocket]::new()
    $cts = [System.Threading.CancellationTokenSource]::new(25000)
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

    # Close promo ad for clean mobile hero shot
    Start-Sleep -Milliseconds 600
    Send-Cdp "Runtime.evaluate" @{ expression = "if (window.closePromoAd) window.closePromoAd(); sessionStorage.setItem('vh_promo_ad_seen', 'true');"; returnByValue = $true } | Out-Null
    Send-Cdp "Runtime.evaluate" @{ expression = "window.goToHeroSlide(0);"; returnByValue = $true } | Out-Null
    Start-Sleep -Milliseconds 700

    $ssMobile1 = Send-Cdp "Page.captureScreenshot" @{ format = "png" }
    [System.IO.File]::WriteAllBytes("$artifactDir\mobile_hero_slide1.png", [System.Convert]::FromBase64String($ssMobile1.result.data))
    Write-Host "Saved mobile_hero_slide1.png"

    # Open promo ad in mobile
    Send-Cdp "Runtime.evaluate" @{ expression = "window.openPromoAd();"; returnByValue = $true } | Out-Null
    Start-Sleep -Milliseconds 700

    $ssMobilePromo = Send-Cdp "Page.captureScreenshot" @{ format = "png" }
    [System.IO.File]::WriteAllBytes("$artifactDir\mobile_promo_popup.png", [System.Convert]::FromBase64String($ssMobilePromo.result.data))
    Write-Host "Saved mobile_promo_popup.png"

} finally {
    if ($proc -and -not $proc.HasExited) { Stop-Process -Id $proc.Id -Force }
}
