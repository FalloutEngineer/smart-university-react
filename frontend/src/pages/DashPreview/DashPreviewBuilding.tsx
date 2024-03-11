import React, { useEffect, useState } from "react"
import { BuildingData, DashPreview } from "../../dashPreview"
import { NavLink } from "react-router-dom"

const API_URL = process.env.REACT_APP_API_URL

export default function DashPreviewBuilding({ name, endpoint }: DashPreview) {
  const [building, setBuilding]: any = useState(null)

  useEffect(() => {
    fetch(endpoint + name)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setBuilding(data)
      })
  }, [])

  return (
    <>
      <NavLink to={"./edit"}>Редагувати</NavLink>
      <ul className="dash-board__list">
        <li className="dash-board__item">
          <h3 className="dash-board__label">Назва:</h3>
          <div className="dash-board__value">{building?.name}</div>
        </li>
        {building?.floors && building?.floors.length > 0 && (
          <li className="dash-board__item">
            <h3 className="dash-board__label">Поверхи:</h3>
            <div className="dash-board__value">
              {building.floors.map((floor: any) => {
                return (
                  <p>
                    <NavLink to={`/floor-list/${floor}`}>{floor}</NavLink>
                  </p>
                )
              })}
            </div>
          </li>
        )}
        {building?.address && (
          <li className="dash-board__item">
            <h3 className="dash-board__label">Адреса:</h3>
            <div className="dash-board__value">{building.address}</div>
          </li>
        )}
        {building?.description && (
          <li className="dash-board__item">
            <h3 className="dash-board__label">Опис:</h3>
            <div className="dash-board__value">{building.description}</div>
          </li>
        )}
        {building?.svg && building?.svg !== "undefined" && (
          <li className="dash-board__item">
            <h3 className="dash-board__label">SVG:</h3>
            <div className="dash-board__value">
              <object
                data={API_URL + "/svg/building/" + building?.svg}
                type="image/svg+xml"
                aria-label="Building svg"
              ></object>
            </div>
          </li>
        )}
        {building?.background && building?.background !== "undefined" && (
          <li className="dash-board__item">
            <h3 className="dash-board__label">Зображення:</h3>
            <div className="dash-board__value">
              <object
                data={API_URL + "/images/building/" + building?.background}
                type="image/svg+xml"
                aria-label="Building image"
              ></object>
            </div>
          </li>
        )}
      </ul>
    </>
  )
}
