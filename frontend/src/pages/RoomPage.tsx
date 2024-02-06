import React from "react"
import Layout from "../components/Layout/Layout"

import "./roomPage.css"

export default function RoomPage() {
  //TODO: fetch from server
  const room: {
    type: string
    number: number
    faculty?: string
    floor: number
    pulpits?: String[]
    description: string
    capacity: number
    assistant: string
    photo_links: String[]
  } = {
    type: "room",
    number: 111,
    faculty: "ФКНФМ",
    floor: 1,
    pulpits: ["КІПІЕК"],
    description: "Hello, world",
    capacity: 100,
    assistant: "Іван Франко",
    photo_links: ["1680109934506.jpg"],
  }

  //TODO: FETCH FROM SERVER
  const temperatureValue = 0
  const co2Value = 1111

  //TODO: fetch from server
  const floorColor = "#000"
  const floorHeaderStyles = {
    // <%if(floor.floorColor) { %><%-floor.floorColor%><% } else { %>#000<%}%
    background: `linear-gradient(to right,rgba(0,0,0,0.4), rgba(255, 255, 255, 0.1)) ${floorColor}`,
  }

  const photoStyles = {
    width: "500px",
    height: "auto",
  }

  return (
    <Layout>
      <div className="floor-header" style={floorHeaderStyles}>
        <div className="floor-header__darker">
          <div className="parallax-content container">
            <h2 className="roomHeading">{room.type + " " + room.number}</h2>

            {room.faculty ? (
              <h3 className="roomHeading">
                {room.floor} Поверх - {room.faculty.toUpperCase()}
              </h3>
            ) : (
              <h3 className="roomHeading">{room.floor} Поверх</h3>
            )}
          </div>
        </div>
      </div>

      <div className="ui-60">
        <div className="container">
          <div className="row">
            {room.photo_links.length > 0 ? (
              <div className="images-block">
                <ul className="images-block__list">
                  {room.photo_links.map((link) => {
                    return (
                      <li className="images-block__item">
                        <img
                          src={`/images/${link}`}
                          alt="Зображення приміщення"
                          style={photoStyles}
                          className="images-block__image"
                        />
                      </li>
                    )
                  })}
                </ul>
              </div>
            ) : (
              ""
            )}

            <ul className="main-info">
              <li className="info__item">
                <h4 className="info__item-name">Номер:</h4>
                <span className="info__item-value">{room.number}</span>
              </li>
              <li className="info__item">
                <h4 className="info__item-name">Поверх:</h4>
                <span className="info__item-value">{room.floor}</span>
              </li>
              {room.faculty && (
                <li className="info__item">
                  <h4 className="info__item-name">Факультет:</h4>
                  <span className="info__item-value">
                    {room.faculty?.toUpperCase()}
                  </span>
                </li>
              )}

              {room.pulpits && room.pulpits.length > 0 ? (
                <li className="info__item">
                  <h4 className="info__item-name">Кафедра:</h4>
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
          {room.description !== "" ? (
            <div className="row">
              <div className="room__description-container">
                <h3 className="room__description-heading">Опис:</h3>
                <span className="room__description">{room.description}</span>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="row">
            <ul className="secondary-info">
              <li className="info__item">
                <h4 className="info__item-name">Кількість місць:</h4>
                <span className="info__item-value">{room.capacity}</span>
              </li>
              <li className="info__item">
                <h4 className="info__item-name">Тип:</h4>
                <span className="info__item-value">{room.type}</span>
              </li>
              <li className="info__item">
                <h4 className="info__item-name">Асистент:</h4>
                <span className="info__item-value">{room.assistant}</span>
              </li>
              <li className="info__item">
                <h4 className="info__item-name">Температура:</h4>
                <span className="info__item-value">{temperatureValue}</span>
              </li>
              <li className="info__item">
                <h4 className="info__item-name">Со2:</h4>
                <span className="info__item-value">{co2Value}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  )
}
