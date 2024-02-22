import React from "react"
import { NavLink } from "react-router-dom"

export default function DashListPage({
  pageData,
}: {
  pageData: { name: string; link: string }
}) {
  return (
    <li className="dash-list__item" v-for="item in items">
      <NavLink to={pageData.link} className="dash-list__link">
        <span className="dash-list__property dash-list__property_name">
          {pageData.name}
        </span>
      </NavLink>
    </li>
  )
}
