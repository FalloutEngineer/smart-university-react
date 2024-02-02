import React from "react"

import "./facultiesCard.css"
import { FacultyCardParams } from "../types"

export default function FacultiesCard({
  params,
}: {
  params: FacultyCardParams
}) {
  const colorStyle = {
    backgroundColor: params.color,
  }

  return (
    <div className="facultyCard">
      <div style={colorStyle} className="ui-price circle">
        <i className={"fas " + params.icon + " fa-w-16"}></i>
      </div>

      <div className="ui-plan">
        <h4>{params.name}</h4>
        {params.area && <p>Загальна площа - {params.area}</p>}
        {params.cathedras && <p>Кількість кафедр - {params.cathedras}</p>}
        {params.rooms && <p>Загальна кількість аудиторій - {params.rooms}</p>}
        {params.numberOfSeats && (
          <p>Загальна кількість посадкових місць - {params.numberOfSeats}</p>
        )}
        <br />
        {(params.bachelors || params.masters || params.phd) && (
          <p className="bold">Контингент здобувачів вищої освіти:</p>
        )}
        {params.bachelors && (
          <p>
            Бакалавр (денна/заочна): {params.bachelors?.fullTime}/
            {params.bachelors?.external}
          </p>
        )}
        {params.masters && (
          <p>
            Магістр (денна/заочна): {params.masters?.fullTime}/
            {params.masters?.external}
          </p>
        )}
        {params.phd && (
          <p>
            PhD (денна/заочна): {params.phd?.fullTime}/{params.phd?.external}
          </p>
        )}
      </div>
    </div>
  )
}
