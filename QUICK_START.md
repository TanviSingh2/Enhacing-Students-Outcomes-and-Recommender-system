# Quick Start Guide

## Current Directory Issue

If you're getting a "Cannot find path" error, you're probably already in the backend directory or need to navigate correctly.

## Step-by-Step Setup

### 1. Check Your Current Location

Open PowerShell or Command Prompt and check where you are:

```powershell
pwd
# or
cd
```

You should see: `C:\Project Sem-7\Group-19-main`

### 2. Navigate to Project Root (if needed)

If you're not in the project root, navigate there:

```powershell
cd "C:\Project Sem-7\Group-19-main"
```

### 3. Setup Backend

**Option A: Use the root-level setup script (Recommended)**
```powershell
.\setup_backend.bat
```

**Option B: Manual setup**
```powershell
# Navigate to backend
cd backend

# Upgrade pip
python -m pip install --upgrade pip setuptools wheel

# Install packages
pip install -r requirements.txt
```

**Option C: If you're already in backend directory**
```powershell
# Just run these commands (no cd needed)
python -m pip install --upgrade pip setuptools wheel
pip install -r requirements.txt
```

### 4. Run Backend

**If you're in project root:**
```powershell
cd backend
python app.py
```

**If you're already in backend:**
```powershell
python app.py
```

### 5. Setup Frontend (in a NEW terminal)

```powershell
# Navigate to project root
cd "C:\Project Sem-7\Group-19-main"

# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

## Troubleshooting

### "Cannot find path 'backend\backend'"
- You're already in the backend directory
- Solution: Run commands directly without `cd backend`

### "Cannot find path 'backend'"
- You're in the wrong directory
- Solution: Navigate to project root first: `cd "C:\Project Sem-7\Group-19-main"`

### Build Errors with Python 3.14
- See `backend/TROUBLESHOOTING.md` for solutions
- Recommended: Use Python 3.11 or 3.12

## Directory Structure

```
Group-19-main/
├── backend/          ← Backend code here
│   ├── app.py
│   └── requirements.txt
├── frontend/         ← Frontend code here
│   └── package.json
└── setup_backend.bat ← Run this from root
```


