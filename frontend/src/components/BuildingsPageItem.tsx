import React from "react"

export default function BuildingsPageItem({
  name,
  link,
}: {
  name: string
  link: string
}) {
  return (
    <li className="page-list__item">
      <a href={link} className="page-list__link">
        <span className="page-list__property page-list__property_name">
          {name}
        </span>
      </a>
    </li>
  )
}
