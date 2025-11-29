# Backend - Student Outcomes Prediction System

Flask REST API for student outcome predictions and recommendations.

## Features

- 🎯 Student outcome prediction using Random Forest
- 💡 Personalized problem recommendations
- 📊 Model performance metrics
- 🔄 CORS-enabled for frontend integration

## Getting Started

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Run the Server

```bash
python app.py
```

The API will be available at `http://localhost:5000`

### Environment Variables

- `DATASET_PATH`: Path to the dataset CSV file (optional, uses sample data if not provided)

## API Endpoints

### Health Check
- `GET /api/health` - API status

### Metrics
- `GET /api/metrics` - Model performance metrics

### Predictions
- `POST /api/predict` - Predict student outcome

### Recommendations
- `POST /api/recommend` - Get personalized recommendations
- `GET /api/students` - List available students

## Model Details

- **Algorithm**: Random Forest Classifier
- **Features**: attempt_count, hint_count, time_taken, confidence levels, etc.
- **Recommendation System**: TF-IDF based similarity matching

## Tech Stack

- Flask
- scikit-learn
- pandas
- numpy

