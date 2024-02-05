import React from "react"

export default function AirQuality() {
  return (
    <div className="air-quality white-box">
      <div className="co2">
        <h4>Чадний газ</h4>
        <p id="co2"></p>
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
        <p id="tvoc"></p>
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
