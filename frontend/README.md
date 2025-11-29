# Frontend - Student Outcomes Prediction System

Modern React frontend for the Student Outcomes Prediction System.

## Features

- 📊 Dashboard with model performance metrics
- 🔮 Student outcome predictions
- 💡 Personalized learning recommendations
- 🎨 Modern dark theme UI
- 📱 Responsive design

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/        # Reusable components
│   ├── Layout/       # Main layout with sidebar
│   ├── MetricCard/   # Metric display cards
│   ├── ConfusionMatrix/  # Confusion matrix visualization
│   └── ...
├── pages/            # Page components
│   ├── Dashboard/    # Main dashboard
│   ├── Prediction/   # Prediction page
│   └── Recommendations/  # Recommendations page
└── services/         # API integration
    └── api.js        # API service layer
```

## Environment Variables

Create a `.env` file in the frontend directory:

```
VITE_API_URL=http://localhost:5000
```

## Tech Stack

- React 18
- Vite
- React Router
- Axios
- CSS3 (Custom properties for theming)

