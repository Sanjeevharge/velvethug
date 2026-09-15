$fullPath = "C:\Users\Sanjeev\.gemini\antigravity-ide\brain\7085ced0-3fcd-4411-969a-a776f97f378f\.system_generated\logs\transcript_full.jsonl"
$reader = [System.IO.File]::OpenText($fullPath)
$idx = 0
while (($l = $reader.ReadLine()) -ne $null) {
    if ($l.Contains("main.js")) {
        try {
            $obj = $l | ConvertFrom-Json
            if ($obj.tool_calls) {
                foreach ($tc in $obj.tool_calls) {
                    Write-Host "line $($idx) tool=$($tc.tool_name) target=$($tc.arguments.TargetFile)"
                }
            }
        } catch {}
    }
    $idx++
}
$reader.Close()
