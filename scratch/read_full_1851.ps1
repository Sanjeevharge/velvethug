$fullPath = "C:\Users\Sanjeev\.gemini\antigravity-ide\brain\7085ced0-3fcd-4411-969a-a776f97f378f\.system_generated\logs\transcript_full.jsonl"
Write-Host "Full transcript exists:" (Test-Path $fullPath)
if (Test-Path $fullPath) {
    Write-Host "Size:" (Get-Item $fullPath).Length
    # Read line 1851 from full transcript
    $reader = [System.IO.File]::OpenText($fullPath)
    $lineIdx = 0
    $targetLine = $null
    while (($l = $reader.ReadLine()) -ne $null) {
        if ($lineIdx -eq 1851) {
            $targetLine = $l
            break
        }
        $lineIdx++
    }
    $reader.Close()
    
    if ($targetLine) {
        Write-Host "Found target line length:" $targetLine.Length
        $obj = $targetLine | ConvertFrom-Json
        $content = $obj.tool_calls[0].arguments.CodeContent
        if ($content) {
            Write-Host "Found CodeContent length:" $content.Length
            [System.IO.File]::WriteAllText("c:\Users\Sanjeev\Desktop\velvethug\scratch\main_full_1851.js", $content, [System.Text.Encoding]::UTF8)
            Write-Host "Wrote scratch\main_full_1851.js successfully!"
        } else {
            Write-Host "No CodeContent property. Keys: $(($obj.tool_calls[0].arguments | Get-Member -MemberType NoteProperty).Name -join ', ')"
        }
    } else {
        Write-Host "Line 1851 not reached (total lines: $lineIdx)"
    }
}
