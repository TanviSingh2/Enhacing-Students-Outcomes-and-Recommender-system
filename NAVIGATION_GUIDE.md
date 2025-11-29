# Navigation Guide

## Your Project Structure

```
C:\Project Sem-7\
└── Group-19-main\          ← Your project is HERE
    ├── backend\
    ├── frontend\
    └── README.md
```

## Correct Navigation Commands

### To Navigate to Project Root:
```powershell
cd "C:\Project Sem-7\Group-19-main"
```

### To Navigate to Frontend:
```powershell
# First go to project root
cd "C:\Project Sem-7\Group-19-main"

# Then go to frontend
cd frontend
```

### To Navigate to Backend:
```powershell
# First go to project root
cd "C:\Project Sem-7\Group-19-main"

# Then go to backend
cd backend
```

## Quick Commands (Copy & Paste)

### Setup Backend:
```powershell
cd "C:\Project Sem-7\Group-19-main\backend"
python -m pip install --upgrade pip setuptools wheel
pip install -r requirements.txt
```

### Setup Frontend:
```powershell
cd "C:\Project Sem-7\Group-19-main\frontend"
npm install
```

### Run Backend:
```powershell
cd "C:\Project Sem-7\Group-19-main\backend"
python app.py
```

### Run Frontend:
```powershell
cd "C:\Project Sem-7\Group-19-main\frontend"
npm run dev
```

## Or Use the Batch Files (Easier!)

From the project root (`C:\Project Sem-7\Group-19-main`):

```powershell
# Setup backend
.\setup_backend.bat

# Start backend
.\start_backend.bat

# Start frontend (in a new terminal)
.\start_frontend.bat
```


