@echo off
title Velvet Hug Local Server (http://localhost:8080)
echo ===================================================
echo   Starting Velvet Hug Local E-Commerce Server...
echo   Opening http://localhost:8080 in your browser...
echo ===================================================
powershell -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause
