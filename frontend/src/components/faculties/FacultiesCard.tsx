import React from "react"

import "./facultiesCard.css"
import { FacultyCardParams } from "../../types"

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
      <div style={colorStyle} className="facultyCard__circle">
        <i className={"fas " + params.icon + " fa-w-16 facultyCard__icon"}></i>
      </div>

      <div className="facultyCard__body">
        <h4 className="facultyCard__heading">{params.name}</h4>
        {params.area && <p>Загальна площа - {params.area}</p>}
        {params.pulpits && <p>Кількість кафедр - {params.pulpits}</p>}
        {params.rooms && <p>Загальна кількість аудиторій - {params.rooms}</p>}
        {params.seats && (
          <p>Загальна кількість посадкових місць - {params.seats}</p>
        )}
        <br />
        {(params.bachelorFull ||
          params.bachelorPart ||
          params.masterFull ||
          params.masterPart ||
          params.phdFull ||
          params.phdPart) && (
          <p className="facultyCard__bold">
            Контингент здобувачів вищої освіти:
          </p>
        )}
        {(params.bachelorFull || params.bachelorPart) && (
          <p>
            Бакалавр (денна/заочна): {params.bachelorFull}/{params.bachelorPart}
          </p>
        )}
        {(params.masterFull || params.masterPart) && (
          <p>
            Магістр (денна/заочна): {params.masterFull}/{params.masterPart}
          </p>
        )}
        {(params.phdFull || params.phdPart) && (
          <p>
            PhD (денна/заочна): {params.phdFull}/{params.phdPart}
          </p>
        )}
      </div>
    </div>
  )
}
