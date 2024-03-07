import React, { useEffect, useLayoutEffect, useMemo, useState } from "react"
import Layout from "../components/Layout/Layout"

/* TODO: INSERT PAGE COLOR HERE */
import "./floorPage.css"
import AirQuality from "../components/AirQuality"
import AirStatus from "../components/AirStatus"
import FloorMap from "../components/FloorMap"
import FloorHeader from "../components/FloorHeader"
import Card from "../components/faculties/Card"
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
const facultiesAPI = API_URL + "/api/faculties"

const facultyCardApi = API_URL + `/api/facultyCard`
const pulpitCardApi = API_URL + `/api/pulpitCard`

export default function FloorPage() {
  const params = useParams()

  const [floor, setFloor]: any[] = useState(null)
  const [faculty, setFaculty]: any[] = useState(null)

  const [windowSize, setSize] = useState([0, 0])

  const [rooms, setRooms]: any[] = useState([])

  const [color, setColor] = useState("#000")

  const [svgURL, setsvgURL] = useState("")

  const [facultyCard, setFacultyCard]: any = useState(null)
  const [pulpitCards, setPulpitCards]: any[] = useState([])

  const sensorsBlockStyles = {
    backgroundColor: color,
  }

  const fillColor = {
    color: color,
  }

  useLayoutEffect(() => {
    const fetchFloors = async () => {
      const response = await fetch(floorsAPI + "/" + params.number)
      const json = await response.json()

      if (response.ok) {
        setFloor(json)
        if (json.svg !== "" || json.svg !== null || json.svg !== null) {
          setsvgURL(API_URL + "/svg/floor/" + json.svg)
        }
      } else {
        //TODO: toast error?
        console.log(response.status, response.text)
      }
    }

    fetchFloors()
  }, [JSON.stringify(floor)])

  useEffect(() => {
    if (floor && floor.floorColor) {
      setColor(floor.floorColor)
    }
  }, [JSON.stringify(floor)])

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
  }, [JSON.stringify(floor)])

  useEffect(() => {
    async function fetchFaculty() {
      const response = await fetch(facultiesAPI + "/" + floor.faculty)
      const data = await response.json()

      setFaculty(data)
    }

    if (floor && floor.faculty) {
      fetchFaculty()
    }
  }, [JSON.stringify(floor)])

  useEffect(() => {
    async function fetchFacultyCards() {
      const response = await fetch(facultyCardApi + "/" + floor.faculty)
      const data = await response.json()
      console.log(floor.faculty)

      setFacultyCard(data)
    }

    if (floor && floor.faculty) {
      fetchFacultyCards()
    }
  }, [JSON.stringify(floor)])

  useEffect(() => {
    async function fetchPulpitCard(name: string) {
      const response = await fetch(pulpitCardApi + "/" + name)
      const data = await response.json()

      setPulpitCards((prevData: any[]) => {
        return [...prevData, data]
      })
    }

    if (faculty && faculty.pulpits.length !== 0) {
      setPulpitCards([])
      faculty.pulpits.forEach((pulpit: string) => {
        fetchPulpitCard(pulpit)
      })
    }
  }, [JSON.stringify(faculty)])

  return (
    <Layout>
      <FloorHeader
        color={color}
        floor={floor !== null ? floor.number : "0"}
        name={floor !== null ? floor.faculty : "Faculty"}
        // TODO: ADD LOGO TO DATABASE
        imageUrl="/img/logo.png"
      />
      <div className="plan">
        {/* TODO: pass color from fetched data */}
        {svgURL !== "" ? (
          <FloorMap
            // TODO: ADD FLOOR PLAN FROM DATABASE
            url={svgURL}
            styles={fillColor}
          />
        ) : (
          ""
        )}
      </div>

      <div className="ui-60" style={sensorsBlockStyles}>
        <div className="container">
          <div className="infoBox">
            <div className="infoboxContainer">
              {facultyCard !== null && <Card params={facultyCard} />}
              {pulpitCards.map((card: any) => {
                return <Card params={card} />
              })}
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
