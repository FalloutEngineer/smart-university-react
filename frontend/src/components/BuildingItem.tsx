import React from "react"

export default function BuildingItem({
  number,
  faculties,
}: {
  number: number
  faculties: String[]
}) {
  return (
    <li className="page-list__item">
      <a href="/floor-page/<%= floors[i].number %>" className="page-list__link">
        <span className="page-list__property page-list__property_name">
          {number} Поверх -{" "}
          {faculties.map((faculty, index) => {
            return index == faculties.length - 1 ? `${faculty}` : `${faculty}, `
          })}
        </span>
      </a>
    </li>
  )
}
