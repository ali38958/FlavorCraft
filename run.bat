@echo off
setlocal enabledelayedexpansion

title FlavorCraft - Setup and Runner

echo ==========================================================
echo    FlavorCraft - Recipe Sharing Web Application
echo    Automated Setup and Runner (Test Project)
echo ==========================================================
echo.

:: 1. Check Node.js installation
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not found in system PATH.
    echo Please install Node.js (v18 or newer) from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js detected:
node -v

:: 2. Setup and install Backend dependencies
echo.
echo ==========================================================
echo [1/3] Setting up Backend Server...
echo ==========================================================
cd /d "%~dp0backend"

if not exist .env (
    if exist .env.example (
        echo Copying .env.example to .env...
        copy .env.example .env >nul
    )
)

if not exist node_modules (
    echo Installing backend dependencies...
    call npm install
) else (
    echo Backend dependencies already installed.
)

:: 3. Setup and install Frontend dependencies
echo.
echo ==========================================================
echo [2/3] Setting up Frontend Client...
echo ==========================================================
cd /d "%~dp0frontend"

if not exist node_modules (
    echo Installing frontend dependencies...
    call npm install
) else (
    echo Frontend dependencies already installed.
)

:: 4. Start both servers in separate terminal windows
echo.
echo ==========================================================
echo [3/3] Launching Servers and Opening Browser...
echo ==========================================================

:: Start backend in a new cmd window
cd /d "%~dp0backend"
echo Starting Backend (http://localhost:5000)...
start "FlavorCraft - Backend Server (:5000)" cmd /k "npm run dev"

:: Wait 2 seconds for backend to start up
timeout /t 2 /nobreak >nul

:: Start frontend in a new cmd window
cd /d "%~dp0frontend"
echo Starting Frontend (http://localhost:5173)...
start "FlavorCraft - Frontend Client (:5173)" cmd /k "npm run dev"

:: Wait 3 seconds for Vite server to listen
timeout /t 3 /nobreak >nul

:: Open frontend URL in default browser
echo Opening FlavorCraft in default browser...
start http://localhost:5173

echo.
echo ==========================================================
echo   FlavorCraft is now running!
echo   - Frontend:  http://localhost:5173
echo   - Backend:   http://localhost:5000
echo   - Demo Chef: chef@test.com / secret123
echo ==========================================================
echo   Keep the server terminal windows open while using the app.
echo   You can close this runner window now.
echo ==========================================================
echo.
pause
