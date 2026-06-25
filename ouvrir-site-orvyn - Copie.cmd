@echo off
cd /d "%~dp0"
echo Lancement du site ORVYN...
echo.
start "ORVYN - serveur local" cmd /k "npm.cmd run dev -- --host 127.0.0.1 --port 5173"
timeout /t 8 /nobreak >nul
start http://127.0.0.1:5173/
echo.
echo Si le navigateur ne s'ouvre pas, va sur :
echo http://127.0.0.1:5173/
echo.
pause
