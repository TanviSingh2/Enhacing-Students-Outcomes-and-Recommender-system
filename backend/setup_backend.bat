@echo off
echo Setting up Backend Environment...
echo.

echo Upgrading pip, setuptools, and wheel...
python -m pip install --upgrade pip setuptools wheel
echo.

echo Installing backend dependencies...
pip install -r requirements.txt
echo.

echo Setup complete!
echo You can now run: python app.py
pause


