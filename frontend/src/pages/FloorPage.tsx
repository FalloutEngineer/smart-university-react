import React from "react"
import Layout from "../components/Layout/Layout"

/* TODO: INSERT PAGE COLOR HERE */
import "./floorPage.css"
import AirQuality from "../components/AirQuality"
import AirStatus from "../components/AirStatus"
import FloorMap from "../components/FloorMap"
import FloorHeader from "../components/FloorHeader"
import FacultiesCard from "../components/FacultiesCard"

export default function FloorPage({ id }: { id: number }) {
  const sensorsBlockStyles = {
    backgroundColor: "#235352",
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
          <div className="infoBox">
            <div className="infoboxContainer">
              {/* TODO: parse data from server */}
              <FacultiesCard
                params={{
                  icon: "fa-globe",
                  name: "Факультет біології, географії та екології",
                  color: "#53A306",
                  area: "1319.1 м²",
                  cathedras: "3",
                  rooms: "24",
                  numberOfSeats: "418",
                  bachelors: {
                    fullTime: 156,
                    external: 33,
                  },
                  masters: {
                    fullTime: 49,
                    external: 17,
                  },
                  phd: {
                    fullTime: 7,
                    external: 3,
                  },
                }}
              />
            </div>

            {/* TODO: Pass data from server (sensor), pass link instean values, so items would change separetely from parent */}

            <div className="qualityBoxes">
              <AirQuality co2={1100} aqi={10} />

              <AirStatus temperature={21.1} humidity={50} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
