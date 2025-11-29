import React from 'react'
import './ConfusionMatrix.css'

const ConfusionMatrix = ({ matrix }) => {
  if (!matrix || matrix.length === 0) {
    return <div>No data available</div>
  }

  const labels = ['Incorrect', 'Correct']
  const maxValue = Math.max(...matrix.flat())

  return (
    <div className="confusion-matrix">
      <div className="matrix-container">
        <div className="matrix-header">
          <div className="matrix-label-spacer"></div>
          <div className="matrix-column-labels">
            {labels.map((label, idx) => (
              <div key={idx} className="matrix-label">
                Predicted {label}
              </div>
            ))}
          </div>
        </div>
        <div className="matrix-body">
          {matrix.map((row, rowIdx) => (
            <div key={rowIdx} className="matrix-row">
              <div className="matrix-row-label">
                Actual {labels[rowIdx]}
              </div>
              <div className="matrix-cells">
                {row.map((cell, colIdx) => {
                  const intensity = maxValue > 0 ? cell / maxValue : 0
                  return (
                    <div
                      key={colIdx}
                      className="matrix-cell"
                      style={{
                        backgroundColor: `rgba(99, 102, 241, ${0.3 + intensity * 0.7})`,
                      }}
                    >
                      <span className="cell-value">{cell.toLocaleString()}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="matrix-legend">
        <span className="legend-label">Lower</span>
        <div className="legend-gradient"></div>
        <span className="legend-label">Higher</span>
      </div>
    </div>
  )
}

export default ConfusionMatrix

