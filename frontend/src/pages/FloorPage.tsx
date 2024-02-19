import React, { useEffect, useMemo, useState } from "react"
import Layout from "../components/Layout/Layout"

/* TODO: INSERT PAGE COLOR HERE */
import "./floorPage.css"
import AirQuality from "../components/AirQuality"
import AirStatus from "../components/AirStatus"
import FloorMap from "../components/FloorMap"
import FloorHeader from "../components/FloorHeader"
import FacultiesCard from "../components/faculties/FacultiesCard"
import { useParams } from "react-router-dom"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Link } from "react-router-dom"

const API_URL = process.env.REACT_APP_API_URL

const floorsAPI = API_URL + `/api/floors`
const roomsAPI = API_URL + `/api/rooms`

export default function FloorPage() {
  const params = useParams()

  const [floor, setFloor]: any[] = useState(null)

  const [windowSize, setSize] = useState([0, 0])

  const [rooms, setRooms]: any[] = useState([])

  const [color, setColor] = useState("#000")

  const sensorsBlockStyles = {
    backgroundColor: color,
  }

  useEffect(() => {
    const fetchFloors = async () => {
      const response = await fetch(floorsAPI + "/" + params.number)
      const json = await response.json()

      if (response.ok) {
        setFloor(json)
        if (floor && floor.floorColor && floor.floorColor !== "") {
          setColor(floor.floorColor)
        }
      } else {
        //TODO: toast error?
        console.log(response.status, response.text)
      }
    }

    fetchFloors()
  }, [])

  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight])
    }

    window.addEventListener("resize", updateSize)
    updateSize()
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  useEffect(() => {
    const fetchRooms = async () => {
      const promiseArray: any = []

      floor.rooms.forEach((room: string) => {
        const response = fetch(roomsAPI + "/" + room)
        promiseArray.push(response)
      })

      const responses = await Promise.all(promiseArray)

      const values = await Promise.all(
        responses.map((response) => response.json())
      )

      console.log(values)

      const readyRooms = values.map((room) => {
        return {
          chartName: `${room.type} ${room.number}`,
          number: room.number,
          type: room.type,
          Місць: room.capacity,
        }
      })
      setRooms(readyRooms)
    }

    if (floor && floor.rooms) {
      fetchRooms()
    }
  }, [floor])

  return (
    <Layout>
      <FloorHeader
        color={color}
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
          styles={color}
        />
      </div>

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
      <div className="facultyRooms container">
        <h2 className="facultyRooms__heading">Список всіх приміщень поверха</h2>
        <ul className="facultyRooms__list">
          {rooms.map((room: any) => {
            return (
              <li className="facultyRooms__item">
                <Link
                  className="facultyRooms__itemLink"
                  to={`../room/${room.number}`}
                >
                  {room.type} {room.number}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      {rooms.length > 0 && (
        <div className="facultyChart ui-60">
          <BarChart
            width={windowSize[0] - (windowSize[0] / 100) * 15}
            height={windowSize[0] / 4}
            data={rooms}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="chartName" />
            <YAxis />
            <Tooltip />

            <Bar
              dataKey="Місць"
              fill={color}
              activeBar={<Rectangle fill="white" stroke={color} />}
            />
          </BarChart>
        </div>
      )}
    </Layout>
  )
}
