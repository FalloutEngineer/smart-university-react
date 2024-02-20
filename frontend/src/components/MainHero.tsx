import React, { useEffect, useRef } from "react"

import styles from "./hero.module.css"
import { Link } from "react-router-dom"

export default function MainHero({
  heading,
  buttonLink,
}: {
  heading: string
  buttonLink: string
}) {
  return (
    <div className={styles.hero}>
      <div className="container content-lg">
        <div className="margin-b-40">
          <h1 className="carousel-title">{heading}</h1>
        </div>
        <Link to={buttonLink} className="button-outline">
          Дивитись
        </Link>
      </div>
    </div>
  )
}
