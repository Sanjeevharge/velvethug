$fullPath = "C:\Users\Sanjeev\.gemini\antigravity-ide\brain\7085ced0-3fcd-4411-969a-a776f97f378f\.system_generated\logs\transcript_full.jsonl"
$reader = [System.IO.File]::OpenText($fullPath)
$idx = 0
while (($l = $reader.ReadLine()) -ne $null) {
    if ($l.Contains("main.js") -and $l.Contains("write_to_file")) {
        try {
            $obj = $l | ConvertFrom-Json
            foreach ($tc in $obj.tool_calls) {
                if ($tc.tool_name -eq "default_api:write_to_file" -and $tc.arguments.TargetFile -like "*main.js*") {
                    Write-Host "Found write_to_file at line $idx, CodeContent len: $($tc.arguments.CodeContent.Length)"
                    $outPath = "c:\Users\Sanjeev\Desktop\velvethug\scratch\main_from_transcript_$idx.js"
                    [System.IO.File]::WriteAllText($outPath, $tc.arguments.CodeContent, [System.Text.Encoding]::UTF8)
                    Write-Host "Wrote to $outPath"
                }
            }
        } catch {}
    }
    $idx++
}
$reader.Close()
