import React, { useEffect, useState } from "react"
import { BuildingData } from "../../dashPreview"

export default function DashPreviewBuilding({
  name,
  endpoint,
}: {
  name: string
  endpoint: string
}) {
  const [building, setBuilding] = useState<BuildingData>(null)

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
    <ul className="dash-board__list">
      <li className="dash-board__item">
        <h3 className="dash-board__label">Назва:</h3>
        <div className="dash-board__value">{building?.name}</div>
      </li>
      {building?.floors && building?.floors.length > 0 && (
        <li className="dash-board__item">
          <h3 className="dash-board__label">Поверхи:</h3>
          <div className="dash-board__value">{building.floors}</div>
        </li>
      )}
      {building?.address && (
        <li className="dash-board__item">
          <h3 className="dash-board__label">Адреса:</h3>
          <div className="dash-board__value">{building.address}</div>
        </li>
      )}
      {building?.svg && (
        <li className="dash-board__item">
          <h3 className="dash-board__label">Зображення:</h3>
          <div className="dash-board__value">
            <object
              data={`/svg/${building?.svg}`}
              type="image/svg+xml"
              aria-label="Building svg"
            ></object>
          </div>
        </li>
      )}
    </ul>
  )
}
