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
      </NavLink>
    </li>
  )
}
