@echo off
REM Check if we're in the root directory or frontend directory
if exist "frontend\package.json" (
    echo Found frontend in current directory, navigating to frontend...
    cd frontend
) else if exist "package.json" (
    echo Already in frontend directory.
) else (
    echo ERROR: Cannot find frontend directory or package.json!
    echo Please run this script from the project root or frontend directory.
    pause
    exit /b 1
)

echo Starting Frontend Development Server...
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
)
npm run dev
pause

