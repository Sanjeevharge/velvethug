$lines = Get-Content "c:\Users\Sanjeev\Desktop\velvethug\temp_edge_profile\Default\Cache\Cache_Data\f_000004"
for ($i = 2140; $i -le 2240; $i++) {
    Write-Host "$i : $($lines[$i-1])"
}
