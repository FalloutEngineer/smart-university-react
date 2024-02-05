import React from "react"

import "./floorHeader.css"

export default function FloorHeader({
  color,
  imageUrl,
  name,
  floor,
}: {
  color?: string
  imageUrl?: string
  name?: string
  floor?: number
}) {
  const headerStyle = {
    background: `linear-gradient(to right,rgba(0,0,0,0.4), rgba(255, 255, 255, 0.1)), ${
      color ? color : "#000"
    }`,
  }

  const headingStyles = {
    color: "whitesmoke",
    zIndex: 1,
  }

  const imageStyles = {
    backgroundImage: `url('${imageUrl}')`,
  }

  return (
    <div className="floor-header" style={headerStyle}>
      <div className="floor-header__darker">
        <div className="parallax-content container floorContainer">
          <div className="leftText">
            {name && <h2 style={headingStyles}>{name}</h2>}
            {floor && <h3 style={headingStyles}>{floor} поверх</h3>}
          </div>
          <div style={imageStyles} className="floor-header__logo-wrapper"></div>
        </div>
      </div>
    </div>
  )
}
