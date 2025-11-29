import React, { useState } from 'react'
import { api } from '../../services/api'
import PredictionForm from '../../components/PredictionForm/PredictionForm'
import PredictionResult from '../../components/PredictionResult/PredictionResult'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import './Prediction.css'

const Prediction = () => {
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handlePredict = async (formData) => {
    try {
      setLoading(true)
      setError(null)
      const result = await api.predict(formData)
      setPrediction(result)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to make prediction. Please check your input.')
      setPrediction(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="prediction-page">
      <div className="prediction-container">
        <div className="prediction-form-section">
          <h2 className="section-header">Student Performance Prediction</h2>
          <p className="section-description">
            Enter student data to predict whether they will answer correctly
          </p>
          <PredictionForm onSubmit={handlePredict} />
        </div>

        <div className="prediction-result-section">
          {loading && (
            <div className="result-loading">
              <LoadingSpinner />
              <p>Analyzing student data...</p>
            </div>
          )}

          {error && (
            <div className="result-error">
              <span className="error-icon">⚠️</span>
              <p>{error}</p>
            </div>
          )}

          {prediction && !loading && (
            <PredictionResult prediction={prediction} />
          )}

          {!prediction && !loading && !error && (
            <div className="result-placeholder">
              <span className="placeholder-icon">🔮</span>
              <p>Submit the form to see predictions</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Prediction

