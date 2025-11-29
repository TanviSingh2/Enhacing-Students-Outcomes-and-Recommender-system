import React, { useState, useEffect } from 'react'
import { api } from '../../services/api'
import RecommendationForm from '../../components/RecommendationForm/RecommendationForm'
import RecommendationList from '../../components/RecommendationList/RecommendationList'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import './Recommendations.css'

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [students, setStudents] = useState([])

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      const data = await api.getStudents()
      setStudents(data.students || [])
    } catch (err) {
      console.error('Failed to fetch students:', err)
    }
  }

  const handleGetRecommendations = async (studentId, topN) => {
    try {
      setLoading(true)
      setError(null)
      const result = await api.getRecommendations(studentId, topN)
      setRecommendations(result)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to get recommendations.')
      setRecommendations(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="recommendations-page">
      <div className="recommendations-container">
        <div className="recommendations-header">
          <h2>Personalized Learning Recommendations</h2>
          <p className="subtitle">
            Get problem recommendations based on student's weak skills
          </p>
        </div>

        <div className="recommendations-content">
          <div className="recommendations-form-section">
            <RecommendationForm
              onSubmit={handleGetRecommendations}
              students={students}
            />
          </div>

          <div className="recommendations-results-section">
            {loading && (
              <div className="results-loading">
                <LoadingSpinner />
                <p>Finding best recommendations...</p>
              </div>
            )}

            {error && (
              <div className="results-error">
                <span className="error-icon">⚠️</span>
                <p>{error}</p>
              </div>
            )}

            {recommendations && !loading && (
              <RecommendationList recommendations={recommendations} />
            )}

            {!recommendations && !loading && !error && (
              <div className="results-placeholder">
                <span className="placeholder-icon">💡</span>
                <p>Select a student to get personalized recommendations</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recommendations

