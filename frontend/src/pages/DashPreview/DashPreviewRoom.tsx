import React, { useEffect, useState } from "react"
import { DashPreview, RoomData } from "../../dashPreview"
import { NavLink } from "react-router-dom"
import { useCookies } from "react-cookie"

export default function DashPreviewRoom({ name, endpoint }: DashPreview) {
  const [room, setRoom] = useState<RoomData>(null)

  useEffect(() => {
    fetch(endpoint + name)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setRoom(data)
      })
  }, [])

  return (
    <>
      <NavLink className="dash-board__edit" to={`./edit`}>
        Редагувати
      </NavLink>
      <ul className="dash-board__list">
        <li className="dash-board__item">
          <h3 className="dash-board__label">Номер</h3>
          <div className="dash-board__value">{room?.number}</div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Поверх</h3>
          <div className="dash-board__value">
            <NavLink to={`/floor-list/${room?.floor}`}>{room?.floor}</NavLink>
          </div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Кількість місць</h3>
          <div className="dash-board__value">{room?.capacity}</div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Факультет</h3>
          <div className="dash-board__value">
            <NavLink to={`/faculty-list/${room?.faculty}`}>
              {room?.faculty}
            </NavLink>
          </div>
        </li>
        {room && room.type && (
          <li className="dash-board__item">
            <h3 className="dash-board__label">Тип</h3>
            <div className="dash-board__value">{room?.type}</div>
          </li>
        )}
        {room && room.description && (
          <li className="dash-board__item">
            <h3 className="dash-board__label">Опис</h3>
            <div className="dash-board__value">{room?.description}</div>
          </li>
        )}
        {room && room.assistant && (
          <li className="dash-board__item">
            <h3 className="dash-board__label">Асистент</h3>
            <div className="dash-board__value">{room?.assistant}</div>
          </li>
        )}

        {room && room.sensorID && room.sensorID !== "" && (
          <li className="dash-board__item">
            <h3 className="dash-board__label">Ідентифікатор сенсора</h3>
            <div className="dash-board__value">{room?.sensorID}</div>
          </li>
        )}

        {room?.pulpits && room.pulpits.length > 0 && (
          <li className="dash-board__item">
            <h3 className="dash-board__label">Кафедра</h3>
            <div className="dash-board__value">
              {room?.pulpits.map((pulpit: string) => {
                return (
                  <p>
                    <NavLink to={`/pulpit-list/${pulpit}`}>{pulpit}</NavLink>
                  </p>
                )
              })}
            </div>
          </li>
        )}

        {room && room.photo_links.length > 0 && (
          <li className="dash-board__images">
            <h3 className="dash-board__label">Зображення</h3>
            <ul className="dash-board__images-list">
              {room.photo_links.map((link) => {
                return (
                  <li className="dash-board__image-item">
                    <img src={`/images/${link}`} alt="" />
                  </li>
                )
              })}
            </ul>
          </li>
        )}
      </ul>
    </>
  )
}
