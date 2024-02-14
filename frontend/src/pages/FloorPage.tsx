import React, { useEffect, useState } from "react"
import Layout from "../components/Layout/Layout"

/* TODO: INSERT PAGE COLOR HERE */
import "./floorPage.css"
import AirQuality from "../components/AirQuality"
import AirStatus from "../components/AirStatus"
import FloorMap from "../components/FloorMap"
import FloorHeader from "../components/FloorHeader"
import FacultiesCard from "../components/faculties/FacultiesCard"
import { useParams } from "react-router-dom"

const API_URL = process.env.REACT_APP_API_URL

const floorsAPI = API_URL + `/api/floors`

export default function FloorPage() {
  const params = useParams()

  const [floor, setFloor]: any[] = useState(null)

  const sensorsBlockStyles = {
    backgroundColor: "#235352",
  }

  useEffect(() => {
    const fetchBuildings = async () => {
      const response = await fetch(floorsAPI + "/" + params.number)
      const json = await response.json()

      if (response.ok) {
        console.log(json)

        setFloor(json)
      } else {
        //TODO: toast error?
        console.log(response.status, response.text)
      }
    }

    fetchBuildings()
  }, [])

  return (
    <Layout>
      <FloorHeader
        color={floor !== null ? floor.color : "#235352"}
        floor={floor !== null ? floor.number : "0"}
        name={floor !== null ? floor.faculty : "Faculty"}
        // TODO: ADD LOGO TO DATABASE
        imageUrl="http://localhost:3000/img/logo.png"
      />

      <div className="plan">
        {/* TODO: pass color from fetched data */}
        <FloorMap
          // TODO: ADD FLOOR PLAN FROM DATABASE
          url="http://localhost:3000/svg/mock-floorPlan.svg"
          styles={floor !== null ? floor.color : { color: "#000" }}
        />
      </div>

      {/* style="	background: <%-floor.floorColor%>;" */}
      <div className="ui-60" style={sensorsBlockStyles}>
        <div className="container">
          <div className="infoBox">
            <div className="infoboxContainer">
              {/* TODO: ADD FIELD TO SERVER AND parse data from server */}
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
