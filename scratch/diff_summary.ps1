$cleanFns = Select-String -Path 'scratch/src/main.js' -Pattern '^(function\s+\w+|window\.\w+\s*=)' | ForEach-Object { $_.Line.Trim() }
$curFns = Select-String -Path 'src/main.js' -Pattern '^(function\s+\w+|window\.\w+\s*=)' | ForEach-Object { $_.Line.Trim() }

Write-Host "--- Functions in cur but not in clean: ---"
$curFns | Where-Object { $_ -notin $cleanFns } | ForEach-Object { Write-Host $_ }
