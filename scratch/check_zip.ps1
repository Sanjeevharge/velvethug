Add-Type -AssemblyName System.IO.Compression.FileSystem
$z = [System.IO.Compression.ZipFile]::OpenRead("velvethug_deploy.zip")
Write-Host "Total entries in zip:" $z.Entries.Count
foreach ($e in $z.Entries) {
    if ($e.FullName -like "server*" -or $e.FullName -like "*.json" -or $e.FullName -like "*.bat" -or $e.FullName -like "*.md" -or $e.FullName -like "shopify*") {
        Write-Host " ->" $e.FullName "("$e.Length" bytes)"
    }
}
$z.Dispose()
