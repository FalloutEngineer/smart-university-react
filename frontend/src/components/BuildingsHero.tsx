import React from "react"

import styles from "./hero.module.css"

export default function BuildingsHero({
  heading,
  description,
}: {
  heading: string
  description: string
}) {
  return (
    <div className={styles.hero + " " + styles.heroFaculties}>
      <div className="container content-lg">
        <h1 className="carousel-title">{heading}</h1>
        <p className={styles.heroText}>{description}</p>
      </div>
    </div>
  )
}
