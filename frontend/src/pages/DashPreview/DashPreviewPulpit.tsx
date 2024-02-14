import React, { useEffect, useState } from "react"
import { DashPreview, PulpitData } from "../../dashPreview"
import { NavLink } from "react-router-dom"

export default function DashPreviewPulpit({ name, endpoint }: DashPreview) {
  const [pulpit, setPulpit] = useState<PulpitData>(null)

  useEffect(() => {
    fetch(endpoint + name)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setPulpit(data)
      })
  }, [])

  return (
    <ul className="dash-board__list">
      <li className="dash-board__item">
        <h3 className="dash-board__label">Назва:</h3>
        <div className="dash-board__value">{pulpit?.name}</div>
      </li>
      <li className="dash-board__item">
        <h3 className="dash-board__label">Факультет:</h3>
        <div className="dash-board__value">
          <NavLink to={`/faculty-list/${pulpit?.faculty}`}>
            {pulpit?.faculty}
          </NavLink>
        </div>
      </li>
      <li
        v-cloak
        v-if="<%= item.rooms.length %> != 0"
        className="dash-board__item"
      >
        {pulpit && pulpit.rooms.length > 0 ? (
          <>
            <h3 className="dash-board__label">Приміщення:</h3>
            <div className="dash-board__value">
              {pulpit.rooms.map((room) => {
                return (
                  <p>
                    <NavLink
                      className="dash-board__sub-value"
                      to={`/room-list/${room}`}
                    >
                      {room}
                    </NavLink>
                  </p>
                )
              })}
            </div>
          </>
        ) : null}
      </li>
    </ul>
  )
}
