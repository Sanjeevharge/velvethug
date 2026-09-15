$path = "C:\Users\Sanjeev\.gemini\antigravity-ide\brain\7085ced0-3fcd-4411-969a-a776f97f378f\.system_generated\logs\transcript.jsonl"
$raw = (Get-Content $path)[1851]
Write-Host "Length of line 1851:" $raw.Length
$obj = $raw | ConvertFrom-Json
Write-Host "Tool name:" $obj.tool_calls[0].tool_name
Write-Host "Action:" $obj.tool_calls[0].action
Write-Host "TargetFile:" $obj.tool_calls[0].arguments.TargetFile
Write-Host "Has CodeContent:" ($null -ne $obj.tool_calls[0].arguments.CodeContent)
