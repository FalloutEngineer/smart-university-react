import React from "react"
import { NavLink } from "react-router-dom"

//TODO: interface
export default function DashListRoom({ itemData }: { itemData: any }) {
  //TODO: generate item by data and type

  return (
    <li className="dash-list__item">
      {/* v-bind:href="'/room/'+ item.number" */}
      <NavLink to={"./" + itemData.number} className="dash-list__link">
        <span className="dash-list__property dash-list__property_name">
          {itemData.number}
        </span>
        <span className="dash-list__property dash-list__property_faculty">
          {itemData.faculty}
        </span>
        <span className="dash-list__property dash-list__property_pulpit">
          {itemData.pulpits.map((pulpit: any, index: number) => {
            return index === itemData.pulpits.length - 1
              ? `${pulpit}`
              : `${pulpit}, `
          })}
        </span>
        <span className="dash-list__property dash-list__property_floor">
          {itemData.floor}
        </span>
      </NavLink>
    </li>
  )
}
