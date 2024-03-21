import React, { useEffect, useState } from "react"
import { DashPreview, FloorData } from "../../dashPreview"
import { NavLink, useParams } from "react-router-dom"

export default function DashPreviewFloor({ name, endpoint }: DashPreview) {
  const [floor, setFloor] = useState<FloorData>(null)

  const { building } = useParams()

  useEffect(() => {
    fetch(endpoint + building + "/" + name)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setFloor(data)
      })
  }, [])

  const colorStyle = {
    height: "50px",
    width: "50px",
    backgroundColor: floor?.floorColor,
  }

  return (
    <>
      <NavLink to={"./edit"}>Редагувати</NavLink>
      <ul className="dash-board__list">
        <li className="dash-board__item">
          <h3 className="dash-board__label">Номер:</h3>
          <div className="dash-board__value">{floor?.number}</div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Факультет:</h3>
          <div className="dash-board__value">
            <NavLink to={`/faculty-list/${floor?.faculty}`}>
              {floor?.faculty}
            </NavLink>
          </div>
        </li>
        {floor && floor.rooms.length > 0 && (
          <li className="dash-board__item">
            <h3 className="dash-board__label">Приміщення:</h3>
            <div className="dash-board__value">
              {floor.rooms.map((room) => {
                return (
                  <p>
                    <NavLink to={`/room-list/${room}`}>{room}</NavLink>
                  </p>
                )
              })}
            </div>
          </li>
        )}

        {floor && floor.building != "" && (
          <li v-cloak className="dash-board__item">
            <h3 className="dash-board__label">Будівля:</h3>
            <div className="dash-board__value">{floor.building}</div>
          </li>
        )}
        {floor && floor.floorColor && (
          <li v-cloak className="dash-board__item">
            <h3 className="dash-board__label">Колір:</h3>
            <div className="dash-board__value" style={colorStyle}>
              {floor.floorColor}
            </div>
          </li>
        )}
      </ul>
    </>
  )
}
