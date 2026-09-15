$path = "C:\Users\Sanjeev\.gemini\antigravity-ide\brain\7085ced0-3fcd-4411-969a-a776f97f378f\.system_generated\logs\transcript.jsonl"
$lines = Get-Content $path
for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match "main.js" -and $lines[$i] -match "WRITE_TO_FILE") {
        Write-Host "write_to_file targeting main.js at line $i"
    }
}
