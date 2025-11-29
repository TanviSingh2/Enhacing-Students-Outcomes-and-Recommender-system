import React from 'react'
import './RecommendationList.css'

const RecommendationList = ({ recommendations }) => {
  if (!recommendations || !recommendations.recommendations) {
    return <div>No recommendations available</div>
  }

  const recs = recommendations.recommendations

  return (
    <div className="recommendation-list">
      <div className="recommendation-header">
        <h3>Recommendations for Student {recommendations.student_id}</h3>
        <p className="recommendation-count">
          {recs.length} {recs.length === 1 ? 'recommendation' : 'recommendations'} found
        </p>
      </div>

      <div className="recommendations-grid">
        {recs.map((rec, index) => (
          <div key={index} className="recommendation-card">
            <div className="recommendation-rank">
              #{index + 1}
            </div>
            <div className="recommendation-content">
              <div className="recommendation-item">
                <span className="item-label">Problem ID:</span>
                <span className="item-value">{rec.problem_id}</span>
              </div>
              <div className="recommendation-item">
                <span className="item-label">Skill ID:</span>
                <span className="item-value">{rec.skill_id}</span>
              </div>
              <div className="recommendation-item">
                <span className="item-label">Similarity Score:</span>
                <span className="item-value score">
                  {(rec.similarity_score * 100).toFixed(2)}%
                </span>
              </div>
            </div>
            <div className="recommendation-progress">
              <div
                className="progress-bar"
                style={{ width: `${rec.similarity_score * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecommendationList

