# Script to build a complete Full-Stack Web-Standard Zip archive with forward slashes (/) for Netlify/Linux/Cloud servers

Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$sourceDir = $PSScriptRoot
$zipPath = Join-Path $sourceDir "velvethug_deploy.zip"

if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

$zip = [System.IO.Compression.ZipFile]::Open($zipPath, [System.IO.Compression.ZipArchiveMode]::Create)

$includeDirs = @("src", "public", "server", "shopify-theme")
$includeFiles = @(
    "index.html", 
    "admin.html", 
    "backend-inspector.html", 
    "_redirects", 
    "netlify.toml", 
    "logo.jpeg",
    "package.json",
    "package-lock.json",
    "vite.config.js",
    "start-server.bat",
    "server.ps1",
    "README.md",
    "robots.txt",
    "sitemap.xml"
)

# Add root files
foreach ($file in $includeFiles) {
    $fullPath = Join-Path $sourceDir $file
    if (Test-Path $fullPath) {
        $entry = $zip.CreateEntry($file, [System.IO.Compression.CompressionLevel]::Optimal)
        $stream = $entry.Open()
        $bytes = [System.IO.File]::ReadAllBytes($fullPath)
        $stream.Write($bytes, 0, $bytes.Length)
        $stream.Close()
        Write-Host "Added file: $file"
    }
}

# Add subdirectories with forward slashes (/)
foreach ($dir in $includeDirs) {
    $dirFullPath = Join-Path $sourceDir $dir
    if (Test-Path $dirFullPath) {
        $files = Get-ChildItem -Path $dirFullPath -Recurse -File
        foreach ($f in $files) {
            $relPath = $f.FullName.Substring($sourceDir.Length).TrimStart("\", "/").Replace("\", "/")
            $entry = $zip.CreateEntry($relPath, [System.IO.Compression.CompressionLevel]::Optimal)
            $stream = $entry.Open()
            $bytes = [System.IO.File]::ReadAllBytes($f.FullName)
            $stream.Write($bytes, 0, $bytes.Length)
            $stream.Close()
        }
        Write-Host "Added folder: $dir (with forward slashes /)"
    }
}

$zip.Dispose()

Write-Host ""
Write-Host "✅ Created 100% Linux/Web-Standard full-stack velvethug_deploy.zip successfully!" -ForegroundColor Green
