import React, { useEffect, useState } from "react"
import Layout from "../components/Layout/Layout"

import "./roomPage.css"
import { Link, useParams } from "react-router-dom"
import RoomSlider from "../components/RoomSlider/RoomSlider"

const API_URL = process.env.REACT_APP_API_URL

const roomsAPI = API_URL + `/api/rooms`
const floorsAPI = API_URL + `/api/floors`

export default function RoomPage() {
  const params = useParams()

  const [room, setRoom] = useState({
    type: "room",
    number: 111,
    faculty: "ФКНФМ",
    floor: 1,
    pulpits: ["КІПІЕК"],
    description: "Hello, world",
    capacity: 100,
    assistant: "Іван Франко",
    photo_links: ["1680109934506.jpg"],
  })

  const [floor, setFloor]: any[] = useState(null)

  useEffect(() => {
    const fetchRoom = async () => {
      const response = await fetch(roomsAPI + "/" + params.number)
      const json = await response.json()

      if (response.ok) {
        setRoom(json)
        console.log("room: ", room)
      } else {
        console.error("Fetch error:", response.status)
      }
    }

    console.log(room)

    fetchRoom().catch((e) => {
      console.error(e)
    })
  }, [])

  useEffect(() => {
    const fetchFaculty = async () => {
      const response = await fetch(floorsAPI + "/" + room.floor)
      const json = await response.json()

      if (response.ok) {
        setFloor(json)
        console.log(json)
      } else {
        console.error(response.status)
      }
    }

    fetchFaculty()
  }, [room])

  //TODO: FETCH FROM SERVER
  const temperatureValue = 0
  const co2Value = 1111

  //TODO: fetch from server
  const floorHeaderStyles = {
    background: `linear-gradient(to right,rgba(0,0,0,0.4), rgba(255, 255, 255, 0.1)) ${
      floor ? floor.floorColor : "grey"
    }`,
  }

  const photoStyles = {
    width: "500px",
    height: "auto",
  }

  function toFloorPage() {}

  return (
    <Layout>
      <div className="floor-header" style={floorHeaderStyles}>
        <div className="floor-header__darker">
          <div className="roomHeadingContainer container"></div>
        </div>
      </div>
      <div className="roomBody">
        <div className="roomContainer container">
          <Link to={`/floor/${room.floor}`} className="roomToFaculty">
            На сторінку поверха
          </Link>
          <div className="roomUpper">
            <RoomSlider slides={room.photo_links} />

            <ul className="main-info">
              <li className="info__item">
                <h4 className="info__item-name">Номер</h4>
                <span className="info__item-value">{room.number}</span>
              </li>
              <li className="info__item">
                <h4 className="info__item-name">Поверх</h4>
                <span className="info__item-value">{room.floor}</span>
              </li>
              {room.faculty && (
                <li className="info__item">
                  <h4 className="info__item-name">Факультет</h4>
                  <span className="info__item-value">
                    {room.faculty?.toUpperCase()}
                  </span>
                </li>
              )}

              {room.pulpits && room.pulpits.length > 0 ? (
                <li className="info__item">
                  <h4 className="info__item-name">Кафедра</h4>
                  <span className="info__item-value">
                    {room.pulpits.map((pulpit) => {
                      return <p className="roomPulpit">{pulpit}</p>
                    })}
                  </span>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
          <div className="roomLower">
            {room.description !== "" ? (
              <div className="roomDescription">
                <div className="room__description-container">
                  <h3 className="room__description-heading">Опис</h3>
                  <span className="room__description">{room.description}</span>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="secondaryInfo__wraper">
              <ul className="secondaryInfo">
                <li className="info__item">
                  <h4 className="info__item-name">Кількість місць</h4>
                  <span className="info__item-value">{room.capacity}</span>
                </li>
                <li className="info__item">
                  <h4 className="info__item-name">Тип</h4>
                  <span className="info__item-value">{room.type}</span>
                </li>
                <li className="info__item">
                  <h4 className="info__item-name">Асистент</h4>
                  <span className="info__item-value">{room.assistant}</span>
                </li>
                <li className="info__item">
                  <h4 className="info__item-name">Температура</h4>
                  <span className="info__item-value">{temperatureValue}</span>
                </li>
                <li className="info__item">
                  <h4 className="info__item-name">Со2</h4>
                  <span className="info__item-value">{co2Value}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
