import React, { useEffect, useState } from "react"
import { DashPreview, FacultyData } from "../../dashPreview"
import { NavLink } from "react-router-dom"

export default function DashPreviewFaculty({ name, endpoint }: DashPreview) {
  const [faculty, setFaculty] = useState<FacultyData>(null)

  useEffect(() => {
    fetch(endpoint + name)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setFaculty(data)
      })
  }, [])

  return (
    <ul className="dash-board__list">
      <li className="dash-board__item">
        <h3 className="dash-board__label">Назва:</h3>
        <div className="dash-board__value">{faculty?.name}</div>
      </li>
      {faculty && faculty.floors && faculty.floors.length > 0 && (
        <li className="dash-board__item">
          <h3 className="dash-board__label">Поверхи:</h3>
          <div className="dash-board__value">
            {faculty.floors.map((floor) => {
              return (
                <p>
                  <NavLink to={`/floor-list/${floor}`}>{floor}</NavLink>
                </p>
              )
            })}
          </div>
        </li>
      )}

      {faculty && faculty.pulpits.length > 0 && (
        <li className="dash-board__item">
          <h3 className="dash-board__label">Кафедри:</h3>
          <div className="dash-board__value">
            {faculty.pulpits.map((pulpit) => {
              return (
                <p>
                  <NavLink to={`/pulpit-list/${pulpit}`}>{pulpit}</NavLink>
                </p>
              )
            })}
          </div>
        </li>
      )}
    </ul>
  )
}
