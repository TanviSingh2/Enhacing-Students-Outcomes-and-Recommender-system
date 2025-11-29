import React, { useState, useEffect } from 'react'
import { api } from '../../services/api'
import MetricCard from '../../components/MetricCard/MetricCard'
import ConfusionMatrix from '../../components/ConfusionMatrix/ConfusionMatrix'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import './Dashboard.css'

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchMetrics()
  }, [])

  const fetchMetrics = async () => {
    try {
      setLoading(true)
      const data = await api.getMetrics()
      setMetrics(data)
      setError(null)
    } catch (err) {
      setError('Failed to load metrics. Please ensure the backend is running.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          <p>{error}</p>
          <button onClick={fetchMetrics} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Model Performance Overview</h2>
        <p className="subtitle">Real-time metrics and analytics</p>
      </div>

      <div className="metrics-grid">
        <MetricCard
          title="Accuracy"
          value={`${(metrics.accuracy * 100).toFixed(2)}%`}
          icon="🎯"
          color="var(--success-color)"
          description="Overall prediction accuracy"
        />
        <MetricCard
          title="F1 Score"
          value={metrics.f1_score.toFixed(4)}
          icon="📈"
          color="var(--primary-color)"
          description="Weighted F1 score"
        />
        <MetricCard
          title="Sample Size"
          value={metrics.sample_size.toLocaleString()}
          icon="📊"
          color="var(--secondary-color)"
          description="Test samples analyzed"
        />
      </div>

      <div className="dashboard-section">
        <h3 className="section-title">Confusion Matrix</h3>
        <div className="confusion-matrix-container">
          <ConfusionMatrix matrix={metrics.confusion_matrix} />
        </div>
      </div>

      <div className="dashboard-info">
        <div className="info-card">
          <h4>About the Model</h4>
          <p>
            This system uses a Random Forest Classifier to predict student outcomes
            based on various features including attempt count, hint usage, time taken,
            and confidence levels.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

