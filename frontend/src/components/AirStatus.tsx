import React from "react"

export default function AirStatus({
  temperature,
  humidity,
}: {
  temperature: number
  humidity: number
}) {
  return (
    <div className="temperature white-box">
      <div className="temperature__container">
        <h4 className="temperature__heading">Температура:</h4>
        <div className="temperature__value-wrapper">
          <span className="temperature__value temperature-value">
            {temperature}
          </span>
          <div className="temperature__symbol-wrapper">
            <span className="temperature__symbol-upper">o</span>
            <span className="temperature__symbol">C</span>
          </div>
        </div>
      </div>
      <div className="temperature__container">
        <h4 className="temperature__heading">Вологість:</h4>
        <div className="temperature__value-wrapper">
          <span className="temperature__value humidity-value">{humidity}</span>
          <div className="temperature__symbol-wrapper">
            <span className="temperature__symbol">%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
