# Troubleshooting Guide

## Python 3.14 Compatibility Issues

If you're using Python 3.14 and encountering build errors, here are solutions:

### Option 1: Install Visual Studio Build Tools (Recommended for Windows)

1. Download and install **Build Tools for Visual Studio 2022**:
   - https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022
   - During installation, select "C++ build tools" workload

2. Restart your terminal/command prompt

3. Run the installation again:
   ```bash
   pip install -r requirements.txt
   ```

### Option 2: Use Pre-built Wheels Only

Try installing with the `--only-binary` flag:
```bash
pip install --only-binary :all: -r requirements.txt
```

### Option 3: Use Python 3.11 or 3.12 (Easiest Solution)

Python 3.11 and 3.12 have better package support with pre-built wheels:

1. Install Python 3.11 or 3.12 from python.org
2. Create a new virtual environment:
   ```bash
   python3.11 -m venv venv
   # or
   python3.12 -m venv venv
   ```
3. Activate and install:
   ```bash
   venv\Scripts\activate  # Windows
   pip install -r requirements.txt
   ```

### Option 4: Install Packages Individually

If bulk installation fails, try installing one by one:
```bash
pip install Flask flask-cors
pip install numpy
pip install pandas
pip install scikit-learn
pip install scipy
```

## Common Errors

### "Could not find vswhere.exe"
- **Solution**: Install Visual Studio Build Tools (see Option 1 above)

### "metadata-generation-failed"
- **Solution**: Upgrade pip and setuptools first:
  ```bash
  python -m pip install --upgrade pip setuptools wheel
  ```

### "No module named 'pkg_resources'"
- **Solution**: Install setuptools:
  ```bash
  pip install --upgrade setuptools
  ```

## Still Having Issues?

1. Check your Python version: `python --version`
2. Ensure pip is up to date: `python -m pip install --upgrade pip`
3. Try using a virtual environment (recommended)
4. Consider using Python 3.11 or 3.12 for maximum compatibility


