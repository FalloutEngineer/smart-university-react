import React from "react"
import { Link } from "react-router-dom"

export default function BuildingsPageItem({
  name,
  link,
}: {
  name: string
  link: string
}) {
  return (
    <li className="page-list__item">
      <Link to={"/building/" + link} className="page-list__link">
        <span className="page-list__property page-list__property_name">
          {name}
        </span>
      </Link>
    </li>
  )
}
