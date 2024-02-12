import React from "react"
import { NavLink } from "react-router-dom"

//TODO: TYPE
export default function DashListPulpit({ itemData }: { itemData: any }) {
  return (
    <li className="dash-list__item">
      <NavLink to={"./" + itemData.name} className="dash-list__link">
        <span className="dash-list__property dash-list__property_name">
          {itemData.name}
        </span>
        <span className="dash-list__property dash-list__property_faculty">
          {itemData.faculty}
        </span>
        <span className="dash-list__property dash-list__property_pulpit"></span>
        <span className="dash-list__property dash-list__property_floor">
          {itemData.rooms.length}
        </span>
      </NavLink>
    </li>
  )
}
