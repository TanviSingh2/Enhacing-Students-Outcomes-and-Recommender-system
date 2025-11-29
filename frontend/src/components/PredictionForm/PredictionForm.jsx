import React, { useState } from 'react'
import './PredictionForm.css'

const PredictionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    attempt_count: 1,
    hint_count: 0,
    bottom_hint: 0,
    time_taken: 30,
    first_action: 0,
    ms_first_response: 5000,
    overlap_time: 0,
    'Average_confidence(CONCENTRATING)': 0.7,
    'Average_confidence(BORED)': 0.2,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form className="prediction-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="attempt_count">Attempt Count</label>
        <input
          type="number"
          id="attempt_count"
          name="attempt_count"
          value={formData.attempt_count}
          onChange={handleChange}
          min="1"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="hint_count">Hint Count</label>
        <input
          type="number"
          id="hint_count"
          name="hint_count"
          value={formData.hint_count}
          onChange={handleChange}
          min="0"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="bottom_hint">Bottom Hint (0 or 1)</label>
        <input
          type="number"
          id="bottom_hint"
          name="bottom_hint"
          value={formData.bottom_hint}
          onChange={handleChange}
          min="0"
          max="1"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="time_taken">Time Taken (seconds)</label>
        <input
          type="number"
          id="time_taken"
          name="time_taken"
          value={formData.time_taken}
          onChange={handleChange}
          min="0"
          step="0.1"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="first_action">First Action</label>
        <input
          type="number"
          id="first_action"
          name="first_action"
          value={formData.first_action}
          onChange={handleChange}
          min="0"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="ms_first_response">First Response Time (ms)</label>
        <input
          type="number"
          id="ms_first_response"
          name="ms_first_response"
          value={formData.ms_first_response}
          onChange={handleChange}
          min="0"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="overlap_time">Overlap Time</label>
        <input
          type="number"
          id="overlap_time"
          name="overlap_time"
          value={formData.overlap_time}
          onChange={handleChange}
          min="0"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="concentrating">Concentration Confidence (0-1)</label>
        <input
          type="number"
          id="concentrating"
          name="Average_confidence(CONCENTRATING)"
          value={formData['Average_confidence(CONCENTRATING)']}
          onChange={handleChange}
          min="0"
          max="1"
          step="0.01"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="bored">Boredom Confidence (0-1)</label>
        <input
          type="number"
          id="bored"
          name="Average_confidence(BORED)"
          value={formData['Average_confidence(BORED)']}
          onChange={handleChange}
          min="0"
          max="1"
          step="0.01"
          required
        />
      </div>

      <button type="submit" className="submit-button">
        Predict Outcome
      </button>
    </form>
  )
}

export default PredictionForm

