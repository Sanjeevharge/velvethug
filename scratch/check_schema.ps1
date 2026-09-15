$fullPath = "C:\Users\Sanjeev\.gemini\antigravity-ide\brain\7085ced0-3fcd-4411-969a-a776f97f378f\.system_generated\logs\transcript_full.jsonl"
$reader = [System.IO.File]::OpenText($fullPath)
$l = (Get-Content $fullPath)[1851]
$obj = $l | ConvertFrom-Json
$tc = $obj.tool_calls[0]
Write-Host "Keys in tool_call:" ($tc | Get-Member -MemberType NoteProperty).Name
Write-Host "Name field:" $tc.name
Write-Host "Function field:" $tc.function.name
Write-Host "Arguments keys:" (($tc.args || $tc.arguments || $tc.function.arguments) | Get-Member -MemberType NoteProperty).Name
