$clean = Get-Content 'scratch/src/main.js'
$cur = Get-Content 'src/main.js'
Write-Host "Clean lines: $($clean.Count), Cur lines: $($cur.Count)"

# Print where they first differ
$firstDiff = -1
for ($i = 0; $i -lt [Math]::Min($clean.Count, $cur.Count); $i++) {
    if ($clean[$i] -ne $cur[$i]) {
        $firstDiff = $i
        break
    }
}
Write-Host "First diff at line $($firstDiff + 1):"
Write-Host "Clean: $($clean[$firstDiff])"
Write-Host "Cur:   $($cur[$firstDiff])"
