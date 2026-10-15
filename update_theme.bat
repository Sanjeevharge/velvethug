@echo off
echo ===================================================
echo   Velvet Hug - Updating Shopify Theme Package
echo ===================================================
echo.
echo [1/3] Building Vite production bundle...
call npm run build
if %errorlevel% neq 0 (
    echo Error during build!
    pause
    exit /b %errorlevel%
)

echo.
echo [2/3] Syncing text, images, and Liquid templates...
call node scratch\generate_theme.cjs
if %errorlevel% neq 0 (
    echo Error during theme generation!
    pause
    exit /b %errorlevel%
)

echo.
echo [3/3] Creating updated velvethug-shopify-theme.zip...
powershell -NoProfile -ExecutionPolicy Bypass -File .\make_shopify_theme_zip.ps1
if %errorlevel% neq 0 (
    echo Error during zip packaging!
    pause
    exit /b %errorlevel%
)

echo.
echo ===================================================
echo SUCCESS! velvethug-shopify-theme.zip is updated.
echo You can now upload this zip to your Shopify Admin.
echo ===================================================
pause
