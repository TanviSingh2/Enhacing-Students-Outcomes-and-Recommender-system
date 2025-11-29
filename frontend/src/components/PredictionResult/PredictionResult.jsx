import React from 'react'
import './PredictionResult.css'

const PredictionResult = ({ prediction }) => {
  const isCorrect = prediction.prediction === 1
  const probability = prediction.probability

  return (
    <div className="prediction-result">
      <div className={`result-header ${isCorrect ? 'success' : 'warning'}`}>
        <span className="result-icon">
          {isCorrect ? '✅' : '❌'}
        </span>
        <h3 className="result-title">
          {prediction.message}
        </h3>
      </div>

      <div className="result-content">
        <div className="probability-section">
          <h4>Prediction Confidence</h4>
          <div className="probability-bars">
            <div className="probability-item">
              <div className="probability-label">
                <span>Correct</span>
                <span className="probability-value">
                  {(probability.correct * 100).toFixed(2)}%
                </span>
              </div>
              <div className="probability-bar-container">
                <div
                  className="probability-bar correct"
                  style={{ width: `${probability.correct * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="probability-item">
              <div className="probability-label">
                <span>Incorrect</span>
                <span className="probability-value">
                  {(probability.incorrect * 100).toFixed(2)}%
                </span>
              </div>
              <div className="probability-bar-container">
                <div
                  className="probability-bar incorrect"
                  style={{ width: `${probability.incorrect * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="result-details">
          <div className="detail-item">
            <span className="detail-label">Prediction:</span>
            <span className={`detail-value ${isCorrect ? 'success' : 'warning'}`}>
              {isCorrect ? 'Will Answer Correctly' : 'Will Answer Incorrectly'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PredictionResult

