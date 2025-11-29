import React from 'react'
import './MetricCard.css'

const MetricCard = ({ title, value, icon, color, description }) => {
  return (
    <div className="metric-card">
      <div className="metric-header">
        <span className="metric-icon" style={{ color }}>
          {icon}
        </span>
        <h3 className="metric-title">{title}</h3>
      </div>
      <div className="metric-value" style={{ color }}>
        {value}
      </div>
      {description && (
        <p className="metric-description">{description}</p>
      )}
    </div>
  )
}

export default MetricCard

