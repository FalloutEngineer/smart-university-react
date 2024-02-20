import React from "react"

import styles from "../hero.module.css"

export default function FacultiesHero({
  heading,
  text,
}: {
  heading: string
  text: string
}) {
  return (
    <div className={styles.hero + " " + styles.heroFaculties}>
      <div className="container content-lg">
        <h1 className={"carousel-title " + styles.heroTitle}>{heading}</h1>
        <p className={styles.heroText}>{text}</p>
      </div>
    </div>
  )
}
