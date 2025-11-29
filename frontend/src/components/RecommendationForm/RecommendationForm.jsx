import React, { useState } from 'react'
import './RecommendationForm.css'

const RecommendationForm = ({ onSubmit, students }) => {
  const [studentId, setStudentId] = useState('')
  const [topN, setTopN] = useState(5)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (studentId) {
      onSubmit(parseInt(studentId), topN)
    }
  }

  return (
    <form className="recommendation-form" onSubmit={handleSubmit}>
      <h3 className="form-title">Get Recommendations</h3>
      
      <div className="form-group">
        <label htmlFor="student_id">Student ID</label>
        {students.length > 0 ? (
          <select
            id="student_id"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
            className="form-select"
          >
            <option value="">Select a student</option>
            {students.map((id) => (
              <option key={id} value={id}>
                Student {id}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="number"
            id="student_id"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Enter student ID"
            required
            className="form-input"
          />
        )}
      </div>

      <div className="form-group">
        <label htmlFor="top_n">Number of Recommendations</label>
        <input
          type="number"
          id="top_n"
          value={topN}
          onChange={(e) => setTopN(parseInt(e.target.value) || 5)}
          min="1"
          max="20"
          className="form-input"
        />
      </div>

      <button type="submit" className="submit-button">
        Get Recommendations
      </button>
    </form>
  )
}

export default RecommendationForm

