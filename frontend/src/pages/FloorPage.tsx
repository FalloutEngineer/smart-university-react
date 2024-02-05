import React from "react"
import Layout from "../components/Layout/Layout"

/* TODO: INSERT PAGE COLOR HERE */
import "./floorPage.css"
import AirQuality from "../components/AirQuality"
import AirStatus from "../components/AirStatus"
import FloorMap from "../components/FloorMap"

export default function FloorPage({ id }: { id: number }) {
  return (
    <Layout>
      {/* style="background: linear-gradient(to right,rgba(0,0,0,0.4), rgba(255, 255, 255, 0.1)), <%- floor.floorColor %>;" */}
      <div className="floor-header">
        <div className="floor-header__darker">
          <div className="parallax-content container">
            {/* <% if(floor.faculty && floor.faculty != ' ') { %>
                    <h2 style="color:whitesmoke; z-index: 1;"><%=floor.faculty%></h2>
                    <% } %>
                    <h3 style="color:whitesmoke; z-index: 1;"><%=floor.number%> поверх</h3> */}
          </div>
        </div>
      </div>

      <div className="plan">
        {/* style="enable-background:new 0 0 2002.2 590.2;" */}
        {/* xmlns:xlink="http://www.w3.org/1999/xlink" */}
        <FloorMap url="http://localhost:3000/svg/mock-floorPlan.svg" />
      </div>

      {/* style="	background: <%-floor.floorColor%>;" */}
      <div className="ui-60">
        <div className="container">
          <div className="row">
            {/* TODO: Pass data from server (sensor) */}
            <AirQuality co2={1100} aqi={10} />

            <AirStatus temperature={21.1} humidity={50} />
          </div>
        </div>
      </div>
    </Layout>
  )
}
