# Group-19: Enhancing Student Outcomes through Predictive Modeling and Recommender Systems

A comprehensive web application for predicting student performance and providing personalized learning recommendations using machine learning.

## Features

- 🎯 **Performance Prediction**: Predict whether a student will answer correctly based on various features
- 💡 **Personalized Recommendations**: Get problem recommendations based on student's weak skills
- 📊 **Model Analytics**: View real-time model performance metrics and confusion matrix
- 🎨 **Modern UI**: Beautiful, responsive interface with dark theme

## Project Structure

```
.
├── backend/              # Flask API server
│   ├── app.py           # Main Flask application
│   └── requirements.txt # Python dependencies
├── frontend/            # React frontend application
│   ├── src/
│   │   ├── components/  # Reusable React components
│   │   ├── pages/       # Page components
│   │   └── services/    # API service layer
│   └── package.json     # Node.js dependencies
└── group-19_with_outputs.ipynb  # Original Jupyter notebook
```

## Prerequisites

- Python 3.11 or 3.12 (recommended) or 3.14+ (with updated packages)
- Node.js 16+
- npm or yarn

## Installation & Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Important for Python 3.14+**: First upgrade pip, setuptools, and wheel:
```bash
python -m pip install --upgrade pip setuptools wheel
```

4. Install Python dependencies:
```bash
pip install -r requirements.txt
```

**⚠️ Troubleshooting for Python 3.14 on Windows:**

If you encounter build errors (like "Could not find vswhere.exe"), you have several options:

- **Option 1 (Easiest)**: Use Python 3.11 or 3.12 instead - they have better package support
- **Option 2**: Install Visual Studio Build Tools from [Microsoft](https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022)
- **Option 3**: Use the Windows installer script: `install_windows.bat` which handles errors gracefully
- **Option 4**: See `backend/TROUBLESHOOTING.md` for detailed solutions

**Recommended**: Use Python 3.11 or 3.12 for the best experience without build tools.

4. (Optional) If you have the dataset, place it in the `backend/data/` directory and set the `DATASET_PATH` environment variable. Otherwise, the app will use sample data for demo purposes.

5. Run the Flask server:
```bash
python app.py
```

The backend will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## API Endpoints

### Health Check
- `GET /api/health` - Check API status

### Metrics
- `GET /api/metrics` - Get model performance metrics (accuracy, F1 score, confusion matrix)

### Predictions
- `POST /api/predict` - Predict student outcome
  ```json
  {
    "attempt_count": 1,
    "hint_count": 0,
    "bottom_hint": 0,
    "time_taken": 30,
    "first_action": 0,
    "ms_first_response": 5000,
    "overlap_time": 0,
    "Average_confidence(CONCENTRATING)": 0.7,
    "Average_confidence(BORED)": 0.2
  }
  ```

### Recommendations
- `POST /api/recommend` - Get personalized recommendations
  ```json
  {
    "student_id": 52535,
    "top_n": 5
  }
  ```

- `GET /api/students` - Get list of available student IDs

## Usage

1. **Dashboard**: View model performance metrics and analytics
2. **Predictions**: Enter student data to predict if they will answer correctly
3. **Recommendations**: Select a student to get personalized problem recommendations

## Technology Stack

### Backend
- Flask - Web framework
- scikit-learn - Machine learning
- pandas - Data processing
- numpy - Numerical computing

### Frontend
- React - UI framework
- Vite - Build tool
- React Router - Routing
- Axios - HTTP client
- Recharts - Data visualization

## Color Scheme

The application uses a modern dark theme with:
- Primary: Indigo (#6366f1)
- Secondary: Purple (#8b5cf6)
- Accent: Pink (#ec4899)
- Success: Green (#10b981)
- Background: Dark slate (#0f172a, #1e293b)

## Dataset

The original dataset can be found at:
https://www.kaggle.com/datasets/nicolaswattiez/skillbuilder-data-2009-2010

## Development

### Backend Development
- The Flask app runs in debug mode by default
- API endpoints are CORS-enabled for frontend integration
- Models are trained on startup (or use sample data if dataset not available)

### Frontend Development
- Hot module replacement enabled
- Proxy configured for API calls
- Modular component structure for easy maintenance

## License

This project is part of Group-19 coursework.
