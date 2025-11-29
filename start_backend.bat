@echo off
REM Check if we're in the root directory or backend directory
if exist "backend\app.py" (
    echo Found backend in current directory, navigating to backend...
    cd backend
) else if exist "app.py" (
    echo Already in backend directory.
) else (
    echo ERROR: Cannot find backend directory or app.py!
    echo Please run this script from the project root or backend directory.
    pause
    exit /b 1
)

echo Starting Backend Server...
python app.py
pause

