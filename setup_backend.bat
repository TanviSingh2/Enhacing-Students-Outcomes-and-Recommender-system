@echo off
REM Check if we're in the root directory or backend directory
if exist "backend\app.py" (
    echo Found backend in current directory, navigating to backend...
    cd backend
) else if exist "app.py" (
    echo Already in backend directory.
) else (
    echo ERROR: Cannot find backend directory!
    echo Please run this script from the project root directory.
    pause
    exit /b 1
)

echo ========================================
echo Backend Setup for Windows
echo ========================================
echo.

echo Step 1: Upgrading pip, setuptools, and wheel...
python -m pip install --upgrade pip setuptools wheel
if errorlevel 1 (
    echo ERROR: Failed to upgrade pip
    pause
    exit /b 1
)
echo.

echo Step 2: Installing packages (this may take a few minutes)...
echo Note: If you get build errors, you may need Visual Studio Build Tools
echo.

REM Try to install with --only-binary to force using pre-built wheels
pip install --only-binary :all: -r requirements.txt
if errorlevel 1 (
    echo.
    echo ========================================
    echo Installation failed. Trying alternative method...
    echo ========================================
    echo.
    echo Installing packages one by one (allowing source builds)...
    pip install Flask flask-cors
    pip install numpy
    pip install pandas
    pip install scikit-learn
    pip install scipy
)
echo.

echo ========================================
echo Setup complete!
echo ========================================
echo.
echo If you encountered build errors, you may need to:
echo 1. Install Visual Studio Build Tools from:
echo    https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022
echo 2. Or use Python 3.11 or 3.12 for better compatibility
echo.
pause


