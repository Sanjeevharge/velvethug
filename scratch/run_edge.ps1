# scratch/run_edge.ps1
$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edgePath)) {
    $edgePath = "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
}
Write-Host "Edge path:" $edgePath "Exists:" (Test-Path $edgePath)

$logFile = "C:\Users\Sanjeev\Desktop\velvethug\temp_browser.log"
if (Test-Path $logFile) { Remove-Item $logFile }

# Run Edge headless and capture console logs
$proc = Start-Process -FilePath $edgePath -ArgumentList @(
    "--headless=new",
    "--enable-logging=stderr",
    "--v=1",
    "--user-data-dir=C:\Users\Sanjeev\Desktop\velvethug\temp_edge_profile",
    "http://127.0.0.1:8080/index.html"
) -RedirectStandardError $logFile -PassThru

Start-Sleep -Seconds 4
if (-not $proc.HasExited) {
    Stop-Process -Id $proc.Id -Force
}

if (Test-Path $logFile) {
    Get-Content $logFile | Select-String -Pattern "Uncaught|Error|SyntaxError|ReferenceError|TypeError|Failed to load" | Select-Object -First 30
} else {
    Write-Host "No log file found."
}
