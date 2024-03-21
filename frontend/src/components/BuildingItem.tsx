import React from "react"
import { Link } from "react-router-dom"

export default function BuildingItem({
  number,
  faculties,
  building,
}: {
  number: number
  faculties: String[]
  building: string
}) {
  return (
    <li className="page-list__item">
      <Link
        to={"/floor/" + building + "/" + number}
        className="page-list__link"
      >
        <span className="page-list__property page-list__property_name">
          {number} Поверх -{" "}
          {faculties.map((faculty, index) => {
            return index === faculties.length - 1
              ? `${faculty}`
              : `${faculty}, `
          })}
        </span>
      </Link>
    </li>
  )
}
