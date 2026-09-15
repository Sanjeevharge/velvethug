$path = "C:\Users\Sanjeev\.gemini\antigravity-ide\brain\7085ced0-3fcd-4411-969a-a776f97f378f\.system_generated\logs\transcript.jsonl"
$line = (Get-Content $path)[1982]
$obj = $line | ConvertFrom-Json
Write-Host "Type: $($obj.type) Source: $($obj.source)"
if ($obj.tool_calls) {
    foreach ($tc in $obj.tool_calls) {
        Write-Host "Tool: $($tc.tool_name) Action: $($tc.action)"
        if ($tc.arguments.CommandLine) {
            Write-Host "CommandLine: $($tc.arguments.CommandLine.Substring(0, [Math]::Min(300, $tc.arguments.CommandLine.Length)))"
        }
        if ($tc.arguments.TargetFile) {
            Write-Host "TargetFile: $($tc.arguments.TargetFile)"
        }
    }
}
