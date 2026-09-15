# scratch/verify_carousel_and_promo.ps1
$ErrorActionPreference = "Stop"

$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edgePath)) { $edgePath = "C:\Program Files\Microsoft\Edge\Application\msedge.exe" }

$userDataDir = "C:\Users\Sanjeev\Desktop\velvethug\temp_edge_test2"
if (Test-Path $userDataDir) { Remove-Item -Recurse -Force $userDataDir }

$artifactDir = "C:\Users\Sanjeev\.gemini\antigravity-ide\brain\ab80bb48-fa55-49c4-b694-4db80366c470"
if (-not (Test-Path $artifactDir)) { New-Item -ItemType Directory -Path $artifactDir -Force | Out-Null }

$port = 9336
$proc = Start-Process -FilePath $edgePath -ArgumentList @(
    "--headless=new",
    "--window-size=1440,920",
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

    # Close promo ad if auto-opened so we can capture carousel slides cleanly
    Start-Sleep -Milliseconds 600
    Send-Cdp "Runtime.evaluate" @{ expression = "if (window.closePromoAd) window.closePromoAd(); sessionStorage.setItem('vh_promo_ad_seen', 'true');"; returnByValue = $true } | Out-Null

    # Ensure on slide 0
    Send-Cdp "Runtime.evaluate" @{ expression = "window.goToHeroSlide(0);"; returnByValue = $true } | Out-Null
    Start-Sleep -Milliseconds 700

    # 1. Slide 1 (Engineering)
    $ss1 = Send-Cdp "Page.captureScreenshot" @{ format = "png" }
    [System.IO.File]::WriteAllBytes("$artifactDir\hero_slide1_clean.png", [System.Convert]::FromBase64String($ss1.result.data))
    Write-Host "Saved hero_slide1_clean.png"

    # 2. Slide 2 (Festive Discount)
    Send-Cdp "Runtime.evaluate" @{ expression = "document.querySelector('#heroNextBtn').click();"; returnByValue = $true } | Out-Null
    Start-Sleep -Milliseconds 800
    $ss2 = Send-Cdp "Page.captureScreenshot" @{ format = "png" }
    [System.IO.File]::WriteAllBytes("$artifactDir\hero_slide2_festive_clean.png", [System.Convert]::FromBase64String($ss2.result.data))
    Write-Host "Saved hero_slide2_festive_clean.png"

    # 3. Slide 3 (Sleep Ecosystem)
    Send-Cdp "Runtime.evaluate" @{ expression = "document.querySelector('#heroNextBtn').click();"; returnByValue = $true } | Out-Null
    Start-Sleep -Milliseconds 800
    $ss3 = Send-Cdp "Page.captureScreenshot" @{ format = "png" }
    [System.IO.File]::WriteAllBytes("$artifactDir\hero_slide3_ecosystem_clean.png", [System.Convert]::FromBase64String($ss3.result.data))
    Write-Host "Saved hero_slide3_ecosystem_clean.png"

    # 4. Slide 4 (Flagship Elara Cloud)
    Send-Cdp "Runtime.evaluate" @{ expression = "document.querySelector('#heroNextBtn').click();"; returnByValue = $true } | Out-Null
    Start-Sleep -Milliseconds 800
    $ss4 = Send-Cdp "Page.captureScreenshot" @{ format = "png" }
    [System.IO.File]::WriteAllBytes("$artifactDir\hero_slide4_elara_clean.png", [System.Convert]::FromBase64String($ss4.result.data))
    Write-Host "Saved hero_slide4_elara_clean.png"

    # 5. Slide 5 (Founding Partners)
    Send-Cdp "Runtime.evaluate" @{ expression = "document.querySelector('#heroNextBtn').click();"; returnByValue = $true } | Out-Null
    Start-Sleep -Milliseconds 800
    $ss5 = Send-Cdp "Page.captureScreenshot" @{ format = "png" }
    [System.IO.File]::WriteAllBytes("$artifactDir\hero_slide5_founding_clean.png", [System.Convert]::FromBase64String($ss5.result.data))
    Write-Host "Saved hero_slide5_founding_clean.png"

    # 6. Promo Popup Modal
    Send-Cdp "Runtime.evaluate" @{ expression = "window.openPromoAd();"; returnByValue = $true } | Out-Null
    Start-Sleep -Milliseconds 700
    $ssPromo = Send-Cdp "Page.captureScreenshot" @{ format = "png" }
    [System.IO.File]::WriteAllBytes("$artifactDir\promo_popup_ad_clean.png", [System.Convert]::FromBase64String($ssPromo.result.data))
    Write-Host "Saved promo_popup_ad_clean.png"

    # 7. Close Promo Modal
    Send-Cdp "Runtime.evaluate" @{ expression = "document.querySelector('#promoAdCloseBtn').click();"; returnByValue = $true } | Out-Null
    Start-Sleep -Milliseconds 500

    Write-Host "ALL CLEAN SCREENSHOTS CAPTURED SUCCESSFULLY!"
} finally {
    if ($proc -and -not $proc.HasExited) { Stop-Process -Id $proc.Id -Force }
}
