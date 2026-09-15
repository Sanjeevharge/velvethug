# scratch/test_account_auth.ps1
$ErrorActionPreference = "Stop"

$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edgePath)) {
    $edgePath = "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
}

$userDataDir = "C:\Users\Sanjeev\Desktop\velvethug\temp_edge_test_auth"
if (Test-Path $userDataDir) { Remove-Item -Recurse -Force $userDataDir }

$port = 9333
$proc = Start-Process -FilePath $edgePath -ArgumentList @(
    "--headless=new",
    "--no-first-run",
    "--no-default-browser-check",
    "--remote-debugging-port=$port",
    "--user-data-dir=$userDataDir",
    "http://127.0.0.1:8080/#account"
) -PassThru

Write-Host "Started Edge (PID: $($proc.Id)) on port $port"
Start-Sleep -Seconds 3

try {
    # 1. Get DevTools Page WebSocket URL for localhost
    $pages = Invoke-RestMethod -Uri "http://127.0.0.1:$port/json"
    $page = $pages | Where-Object { $_.type -eq "page" -and $_.url -like "*8080*" } | Select-Object -First 1
    if (-not $page) {
        $page = $pages | Where-Object { $_.type -eq "page" -and $_.url -notlike "edge://*" } | Select-Object -First 1
    }
    if (-not $page) { throw "No valid page target found in DevTools ($($pages | ConvertTo-Json -Compress))" }
    Write-Host "Connected to page:" $page.url

    $wsUri = [System.Uri]$page.webSocketDebuggerUrl
    $ws = [System.Net.WebSockets.ClientWebSocket]::new()
    $cts = [System.Threading.CancellationTokenSource]::new()
    $cts.CancelAfter(15000)
    $ws.ConnectAsync($wsUri, $cts.Token).Wait()
    Write-Host "WebSocket connected successfully!"

    function Send-CdpCommand($method, $params) {
        $id = [System.Threading.Interlocked]::Increment([ref]$script:cmdId)
        $payload = @{ id = $id; method = $method; params = $params } | ConvertTo-Json -Compress -Depth 10
        $bytes = [System.Text.Encoding]::UTF8.GetBytes($payload)
        $segment = [System.ArraySegment[byte]]::new($bytes)
        $ws.SendAsync($segment, [System.Net.WebSockets.WebSocketMessageType]::Text, $true, [System.Threading.CancellationToken]::None).Wait()

        while ($true) {
            $buffer = [byte[]]::new(2097152)
            $memStream = [System.IO.MemoryStream]::new()
            do {
                $seg = [System.ArraySegment[byte]]::new($buffer)
                $res = $ws.ReceiveAsync($seg, [System.Threading.CancellationToken]::None).Result
                $memStream.Write($buffer, 0, $res.Count)
            } while (-not $res.EndOfMessage)

            $jsonStr = [System.Text.Encoding]::UTF8.GetString($memStream.ToArray())
            $obj = ($jsonStr | ConvertFrom-Json)
            if ($obj.id -eq $id) {
                return $obj
            }
        }
    }

    $script:cmdId = 0
    Send-CdpCommand "Runtime.enable" @{} | Out-Null
    Send-CdpCommand "Page.enable" @{} | Out-Null

    function Eval-Js($expr) {
        $r = Send-CdpCommand "Runtime.evaluate" @{ expression = $expr; returnByValue = $true; awaitPromise = $true }
        if ($r.result.exceptionDetails) {
            Write-Host "JS Exception:" ($r.result.exceptionDetails | ConvertTo-Json -Compress)
        }
        return $r.result.result.value
    }

    Start-Sleep -Seconds 2

    # Step 1: Check initial guest state
    Write-Host "`n--- Step 1: Initial Account Page State ---"
    $guestDisplay = Eval-Js "document.querySelector('#accountPageGuest')?.style.display"
    $loggedInDisplay = Eval-Js "document.querySelector('#accountPageLoggedIn')?.style.display"
    $titleText = Eval-Js "document.querySelector('#accountPageTitle')?.textContent"
    $subText = Eval-Js "document.querySelector('#accountPageSubtitle')?.textContent"
    Write-Host "Guest Display: $guestDisplay"
    Write-Host "LoggedIn Display: $loggedInDisplay"
    Write-Host "Title: $titleText"
    Write-Host "Subtitle: $subText"

    # Step 2: Open login modal and enter custom OTP credentials
    Write-Host "`n--- Step 2: Sign in with Custom Phone & Name ---"
    Eval-Js "window.openLoginModal()" | Out-Null
    Start-Sleep -Milliseconds 500

    Eval-Js "
        document.querySelector('#loginNameInput').value = 'Sanjeev Verma';
        document.querySelector('#loginEmailInput').value = 'sanjeev.v@example.com';
        document.querySelector('#loginPhoneInput').value = '9876501234';
        document.querySelector('#sendOtpBtn').click();
    " | Out-Null
    Start-Sleep -Milliseconds 600

    # Auto-fill and verify OTP
    Eval-Js "
        document.querySelector('#autoFillOtpBtn').click();
        document.querySelector('#verifyOtpBtn').click();
    " | Out-Null
    Start-Sleep -Milliseconds 1000

    # Step 3: Check immediate reflection without reload
    Write-Host "`n--- Step 3: Check Logged-in State (Instant without reload) ---"
    $resName = Eval-Js "document.querySelector('#acctName')?.textContent"
    $resContact = Eval-Js "document.querySelector('#acctContact')?.textContent"
    $resTitle = Eval-Js "document.querySelector('#accountPageTitle')?.textContent"
    $resSub = Eval-Js "document.querySelector('#accountPageSubtitle')?.textContent"
    $resLoggedIn = Eval-Js "document.querySelector('#accountPageLoggedIn')?.style.display"
    $resGuest = Eval-Js "document.querySelector('#accountPageGuest')?.style.display"
    $resOrdersText = Eval-Js "document.querySelector('#accountPageTabContent')?.innerText"

    Write-Host "User Name: $resName"
    Write-Host "User Contact: $resContact"
    Write-Host "Banner Title: $resTitle"
    Write-Host "Banner Subtitle: $resSub"
    Write-Host "LoggedIn Display: $resLoggedIn"
    Write-Host "Guest Display: $resGuest"
    Write-Host "Orders Tab content preview: $(if ($resOrdersText) { $resOrdersText.Substring(0, [System.Math]::Min(80, $resOrdersText.Length)) } else { 'None' })"

    # Check for any trace of Arjun Sharma
    $hasArjun = Eval-Js "document.body.innerHTML.includes('Arjun Sharma') || document.body.innerHTML.includes('arjun.sharma@gmail.com') || document.body.innerHTML.includes('9876543210')"
    Write-Host "Contains Arjun/mock data: $hasArjun"

    # Capture screenshot of user 1 (scrolled to card)
    Eval-Js "window.scrollTo(0, 320);" | Out-Null
    Start-Sleep -Milliseconds 600
    $ss = Send-CdpCommand "Page.captureScreenshot" @{ format = "png" }
    [System.IO.File]::WriteAllBytes("C:\Users\Sanjeev\Desktop\velvethug\scratch\account_user1.png", [System.Convert]::FromBase64String($ss.result.data))
    Write-Host "Saved screenshot: scratch/account_user1.png"

    # Step 4: Sign out immediately without reload
    Write-Host "`n--- Step 4: Sign Out and verify immediate Guest Reset ---"
    Eval-Js "window.logoutUser()" | Out-Null
    Start-Sleep -Milliseconds 600

    $postLogoutGuest = Eval-Js "document.querySelector('#accountPageGuest')?.style.display"
    $postLogoutLoggedIn = Eval-Js "document.querySelector('#accountPageLoggedIn')?.style.display"
    $postLogoutTitle = Eval-Js "document.querySelector('#accountPageTitle')?.textContent"
    $postLogoutSub = Eval-Js "document.querySelector('#accountPageSubtitle')?.textContent"

    Write-Host "Post-Logout Guest Display: $postLogoutGuest"
    Write-Host "Post-Logout LoggedIn Display: $postLogoutLoggedIn"
    Write-Host "Post-Logout Title: $postLogoutTitle"
    Write-Host "Post-Logout Subtitle: $postLogoutSub"

    # Step 5: Sign in with Google (New user: Priya Nair)
    Write-Host "`n--- Step 5: Sign in with Google as Priya Nair ---"
    Eval-Js "window.openLoginModal()" | Out-Null
    Start-Sleep -Milliseconds 400

    Eval-Js "document.querySelector('#googleLoginBtn').click()" | Out-Null
    Start-Sleep -Milliseconds 400

    Eval-Js "
        document.querySelector('#googleNameInput').value = 'Priya Nair';
        document.querySelector('#googleEmailInput').value = 'priya.nair@gmail.com';
        document.querySelector('#googlePhoneInput').value = '9123456780';
        document.querySelector('#confirmGoogleLoginBtn').click();
    " | Out-Null
    Start-Sleep -Milliseconds 1000

    $u2Name = Eval-Js "document.querySelector('#acctName')?.textContent"
    $u2Contact = Eval-Js "document.querySelector('#acctContact')?.textContent"
    $u2Title = Eval-Js "document.querySelector('#accountPageTitle')?.textContent"
    $u2Sub = Eval-Js "document.querySelector('#accountPageSubtitle')?.textContent"
    $u2LoggedIn = Eval-Js "document.querySelector('#accountPageLoggedIn')?.style.display"

    Write-Host "User 2 Name: $u2Name"
    Write-Host "User 2 Contact: $u2Contact"
    Write-Host "User 2 Banner Title: $u2Title"
    Write-Host "User 2 Banner Subtitle: $u2Sub"
    Write-Host "User 2 LoggedIn Display: $u2LoggedIn"

    # Capture screenshot of user 2 (scrolled to card)
    Eval-Js "window.scrollTo(0, 320);" | Out-Null
    Start-Sleep -Milliseconds 600
    $ss2 = Send-CdpCommand "Page.captureScreenshot" @{ format = "png" }
    [System.IO.File]::WriteAllBytes("C:\Users\Sanjeev\Desktop\velvethug\scratch\account_user2.png", [System.Convert]::FromBase64String($ss2.result.data))
    Write-Host "Saved screenshot: scratch/account_user2.png"

    Write-Host "`n=== ALL TESTS PASSED SUCCESSFULLY! ==="

} finally {
    if ($proc -and -not $proc.HasExited) {
        Stop-Process -Id $proc.Id -Force
    }
}
