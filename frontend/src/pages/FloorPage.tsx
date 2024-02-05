import React from "react"
import Layout from "../components/Layout/Layout"

/* TODO: INSERT PAGE COLOR HERE */
import "./floorPage.css"
import AirQuality from "../components/AirQuality"
import AirStatus from "../components/AirStatus"
import FloorMap from "../components/FloorMap"
import FloorHeader from "../components/FloorHeader"

export default function FloorPage({ id }: { id: number }) {
  const sensorsBlockStyles = {
    backgroundColor: "red",
  }

  return (
    <Layout>
      <FloorHeader
        color={"#235352"}
        floor={6}
        name="ФКНФМ"
        imageUrl="http://localhost:3000/img/logo.png"
      />

      <div className="plan">
        {/* TODO: pass color from fetched data */}
        <FloorMap
          url="http://localhost:3000/svg/mock-floorPlan.svg"
          styles={{ color: "aqua" }}
        />
      </div>

      {/* style="	background: <%-floor.floorColor%>;" */}
      <div className="ui-60" style={sensorsBlockStyles}>
        <div className="container">
          <div className="row">
            {/* TODO: Pass data from server (sensor), pass link instean values, so items would change separetely from parent */}
            <AirQuality co2={1100} aqi={10} />

            <AirStatus temperature={21.1} humidity={50} />
          </div>
        </div>
      </div>
    </Layout>
  )
}
