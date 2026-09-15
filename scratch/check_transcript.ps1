$path = "C:\Users\Sanjeev\.gemini\antigravity-ide\brain\7085ced0-3fcd-4411-969a-a776f97f378f\.system_generated\logs\transcript.jsonl"
Write-Host "Transcript exists:" (Test-Path $path)
if (Test-Path $path) {
    $len = (Get-Item $path).Length
    Write-Host "Transcript length: $len bytes"
}
