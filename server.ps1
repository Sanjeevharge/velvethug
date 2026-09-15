# Velvet Hug - High Performance Local Web Server
# Serves Velvet Hug E-Commerce Storefront and Super Admin Portal

$port = 8080
$root = $PSScriptRoot

# Check if port 8080 is already in use by a stale process
$existingConn = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
if ($existingConn) {
    Write-Host "Port $port is currently occupied by PID $($existingConn[0].OwningProcess). Releasing port..."
    try {
        Stop-Process -Id $existingConn[0].OwningProcess -Force -ErrorAction SilentlyContinue
        Start-Sleep -Milliseconds 800
    } catch {}
}

try {
    $listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Any, $port)
    $listener.Start()
} catch {
    Write-Host "Error starting listener on port $port : $_"
    exit 1
}

Write-Host "============================================================"
Write-Host "  Velvet Hug Local E-Commerce Server is LIVE!              "
Write-Host "============================================================"
Write-Host "  * Storefront:    http://localhost:$port"
Write-Host "  * Admin Portal:  http://localhost:$port/admin.html"
Write-Host "============================================================"
Write-Host "  Press Ctrl+C at any time to stop the server.`n"

# Launch default browser automatically
try {
    Start-Process "http://localhost:$port"
} catch {
    Write-Host "Please open http://localhost:$port in your browser."
}

while ($true) {
    try {
        $client = $listener.AcceptTcpClient()
        $client.ReceiveTimeout = 4000
        $client.SendTimeout = 5000
        $stream = $client.GetStream()
        $buffer = New-Object byte[] 8192
        $bytesRead = $stream.Read($buffer, 0, $buffer.Length)
        
        if ($bytesRead -gt 0) {
            $reqStr = [System.Text.Encoding]::ASCII.GetString($buffer, 0, $bytesRead)
            $lines = $reqStr -split "`r?`n"
            if ($lines.Count -gt 0) {
                $reqLine = $lines[0]
                $parts = $reqLine -split " "
                if ($parts.Count -ge 2) {
                    $rawUrl = $parts[1].Split("?")[0].Split("#")[0]
                    $rawUrl = [System.Uri]::UnescapeDataString($rawUrl)
                    if ($rawUrl -eq "/" -or [string]::IsNullOrWhiteSpace($rawUrl)) {
                        $rawUrl = "/index.html"
                    }
                    $relPath = $rawUrl.TrimStart("/").Replace("/", [System.IO.Path]::DirectorySeparatorChar)
                    $filePath = [System.IO.Path]::Combine($root, $relPath)

                    if ([System.IO.File]::Exists($filePath)) {
                        $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
                        $mime = switch ($ext) {
                            ".html" { "text/html; charset=utf-8" }
                            ".htm"  { "text/html; charset=utf-8" }
                            ".js"   { "application/javascript; charset=utf-8" }
                            ".mjs"  { "application/javascript; charset=utf-8" }
                            ".css"  { "text/css; charset=utf-8" }
                            ".json" { "application/json; charset=utf-8" }
                            ".jpg"  { "image/jpeg" }
                            ".jpeg" { "image/jpeg" }
                            ".png"  { "image/png" }
                            ".gif"  { "image/gif" }
                            ".svg"  { "image/svg+xml" }
                            ".webp" { "image/webp" }
                            ".ico"  { "image/x-icon" }
                            ".woff" { "font/woff" }
                            ".woff2"{ "font/woff2" }
                            ".ttf"  { "font/ttf" }
                            ".webmanifest" { "application/manifest+json" }
                            default { "application/octet-stream" }
                        }
                        $contentBytes = [System.IO.File]::ReadAllBytes($filePath)
                        $header = "HTTP/1.1 200 OK`r`nContent-Type: $mime`r`nContent-Length: $($contentBytes.Length)`r`nAccess-Control-Allow-Origin: *`r`nConnection: close`r`n`r`n"
                        $hdrBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
                        $stream.Write($hdrBytes, 0, $hdrBytes.Length)
                        $stream.Write($contentBytes, 0, $contentBytes.Length)
                    } else {
                        $nf = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $rawUrl")
                        $header = "HTTP/1.1 404 Not Found`r`nContent-Type: text/plain`r`nContent-Length: $($nf.Length)`r`nConnection: close`r`n`r`n"
                        $hdrBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
                        $stream.Write($hdrBytes, 0, $hdrBytes.Length)
                        $stream.Write($nf, 0, $nf.Length)
                    }
                }
            }
        }
        $stream.Flush()
        $client.Close()
    } catch {
        # Continue loop on connection reset/abort
    }
}
