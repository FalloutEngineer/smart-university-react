import React from "react"

export default function AirQuality({ co2, aqi }: { co2: number; aqi: number }) {
  const co2Color = getCO2Color(co2)

  const aqiColor = getAQIColor(aqi)

  const co2Style = {
    backgroundColor: co2Color,
    height: "25px",
    color: "black",
    fontWeight: "black",
  }

  const aqiStyle = {
    backgroundColor: aqiColor,
    height: "25px",
    color: "black",
    fontWeight: "black",
  }

  return (
    <div className="air-quality white-box">
      <div className="co2">
        <h4>Чадний газ</h4>
        <p id="co2" style={co2Style}>
          {co2}
        </p>
      </div>

      <div className="co2__values">
        <div className="co2__quality-item">
          {/* style="width: 17px; height: 15px; padding-top: 17px; margin-right: 5px;" */}
          <div className="ui-price bg-greenco circle"></div>
          {/* style="font-weight: 100; margin-top: 2px;" */}
          <h6> &lt; 1000 ppm</h6>
        </div>

        <div className="co2__quality-item">
          {/* style="width: 17px; height: 15px; padding-top: 17px; margin-right: 5px;" */}
          <div className="ui-price bg-yellowco circle"></div>
          {/* style="font-weight: 100; margin-top: 2px;" */}
          <h6> 1000 - 5000 ppm</h6>
        </div>

        <div className="co2__quality-item">
          {/* style="width: 17px; height: 15px; padding-top: 17px; margin-right: 5px;" */}
          <div className="ui-price bg-redco circle"></div>
          {/* style="font-weight: 100; margin-top: 2px;" */}
          <h6> &gt; 5000 ppm</h6>
        </div>
      </div>
      <div className="co2__quality">
        <h4>Якість повітря (AQI)</h4>
        <p id="tvoc" style={aqiStyle}>
          {aqi}
        </p>
      </div>
      <div className="co2__quality-values">
        <div className="co2__quality-value">
          {/* style="width: 17px; height: 15px; padding-top: 17px; margin-right: 5px;" */}
          <div className="ui-price bg-greenco circle"></div>
          {/* style="font-weight: 100; margin-top: 2px;" */}
          <h6> 0 - 220 </h6>
        </div>

        <div className="co2__quality-value">
          {/* style="width: 17px; height: 15px; padding-top: 17px; margin-right: 5px;" */}
          <div className="ui-price bg-yellowco circle"></div>
          {/* style="font-weight: 100; margin-top: 2px;" */}
          <h6> 220 - 2200</h6>
        </div>

        <div className="co2__quality-value">
          {/* style="width: 17px; height: 15px; padding-top: 17px; margin-right: 5px;" */}
          <div className="ui-price bg-redco circle"></div>
          {/* style="font-weight: 100; margin-top: 2px;" */}
          <h6> 2200 - 5500 </h6>
        </div>
      </div>
    </div>
  )
}

function getCO2Color(co2: number): string {
  if (co2 < 1000) {
    return "#09bb20"
  }
  if (co2 < 5000) {
    return "#e4e005"
  }
  return "#d40f09"
}

function getAQIColor(aqi: number): string {
  if (aqi < 220) {
    return "#09bb20"
  }
  if (aqi < 2200) {
    return "#e4e005"
  }
  return "#d40f09"
}
