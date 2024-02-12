import React from "react"
import { NavLink } from "react-router-dom"

//TODO: Interface
export default function DashListFloor({ itemData }: { itemData: any }) {
  return (
    <li className="dash-list__item">
      <NavLink to={"./" + itemData.number} className="dash-list__link">
        <span className="dash-list__property dash-list__property_name">
          {itemData.number}
        </span>
        <span className="dash-list__property dash-list__property_faculty">
          {itemData.faculty}
        </span>
        <span className="dash-list__property dash-list__property_pulpit">
          {itemData.rooms}
        </span>
      </NavLink>
    </li>
  )
}
