$path = "C:\Users\Sanjeev\.gemini\antigravity-ide\brain\7085ced0-3fcd-4411-969a-a776f97f378f\.system_generated\logs\transcript.jsonl"
$lines = Get-Content $path
Write-Host "Total transcript lines: $($lines.Count)"

for ($i = $lines.Count - 1; $i -ge 0; $i--) {
    if ($lines[$i] -match "update_main" -or $lines[$i] -match "openCertificateModal") {
        Write-Host "Found match at transcript line $i"
    }
}
