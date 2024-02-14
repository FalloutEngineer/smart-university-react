import React from "react"
import { NavLink } from "react-router-dom"

//TODO: TYPE
export default function DashListFaculty({ itemData }: { itemData: any }) {
  return (
    <li className="dash-list__item">
      <NavLink to={"./" + itemData.name} className="dash-list__link">
        <span className="dash-list__property dash-list__property_name">
          {itemData.name}
        </span>
        <span className="dash-list__property dash-list__property_faculty">
          {itemData.pulpits && itemData.pulpits.length}
        </span>
        <span className="dash-list__property dash-list__property_pulpit"></span>
        <span className="dash-list__property dash-list__property_floor">
          {itemData.floors && itemData.floors.length}
        </span>
      </NavLink>
    </li>
  )
}
