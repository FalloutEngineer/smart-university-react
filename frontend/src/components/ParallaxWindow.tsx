import React, { useEffect, useState } from "react"

import "./parallaxWindow.css"

export default function ParallaxWindow({
  children,
  imageUrl,
}: {
  children: any
  imageUrl: string
}) {
  console.log("imageUrl ", imageUrl)

  const styles = {
    backgroundImage: imageUrl,
    height: "fit-content",
    width: "100vw !important",
    minWidth: "100vw",
    display: "flex",
  }

  return (
    <div className="parallax-window" data-parallax="scroll" style={styles}>
      {children}
    </div>
  )
}
