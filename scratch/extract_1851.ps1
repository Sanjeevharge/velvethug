$path = "C:\Users\Sanjeev\.gemini\antigravity-ide\brain\7085ced0-3fcd-4411-969a-a776f97f378f\.system_generated\logs\transcript_full.jsonl"
if (-not (Test-Path $path)) {
    $path = "C:\Users\Sanjeev\.gemini\antigravity-ide\brain\7085ced0-3fcd-4411-969a-a776f97f378f\.system_generated\logs\transcript.jsonl"
}
$raw = (Get-Content $path)[1851]
$obj = $raw | ConvertFrom-Json
foreach ($tc in $obj.tool_calls) {
    if ($tc.arguments.TargetFile -like "*main.js*") {
        Write-Host "Found CodeContent length:" $tc.arguments.CodeContent.Length
        [System.IO.File]::WriteAllText("c:\Users\Sanjeev\Desktop\velvethug\scratch\main_1851.js", $tc.arguments.CodeContent, [System.Text.Encoding]::UTF8)
        Write-Host "Saved to scratch\main_1851.js successfully!"
    }
}
