# Script to package shopify-theme into a clean, valid Shopify Theme zip archive
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$sourceDir = Join-Path $PSScriptRoot "shopify-theme"
$zipPath = Join-Path $PSScriptRoot "velvethug-shopify-theme.zip"

if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

Write-Host "Creating valid Shopify Theme archive: velvethug-shopify-theme.zip..."
$zip = [System.IO.Compression.ZipFile]::Open($zipPath, [System.IO.Compression.ZipArchiveMode]::Create)

$files = Get-ChildItem -Path $sourceDir -Recurse -File

foreach ($f in $files) {
    $relPath = $f.FullName.Substring($sourceDir.Length).TrimStart("\", "/").Replace("\", "/")
    $entry = $zip.CreateEntry($relPath, [System.IO.Compression.CompressionLevel]::Optimal)
    $stream = $entry.Open()
    $bytes = [System.IO.File]::ReadAllBytes($f.FullName)
    $stream.Write($bytes, 0, $bytes.Length)
    $stream.Close()
    Write-Host "  -> Added: $relPath ($($bytes.Length) bytes)"
}

$zip.Dispose()
Write-Host "`nSUCCESS: Created $zipPath ($((Get-Item $zipPath).Length) bytes)"
