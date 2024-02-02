import React from "react"

import "./parallaxWindow.css"

export default function ParallaxWindow({
  children,
  imageUrl,
}: {
  children: any
  imageUrl: string
}) {
  const parallaxStyles = {
    backgroundImage: imageUrl,
    height: "fit-content",
    width: "100vw !important",
    minWidth: "100vw",
    display: "flex",
  }

  return (
    <div
      className="parallax-window"
      data-parallax="scroll"
      style={parallaxStyles}
    >
      {children}
    </div>
  )
}
