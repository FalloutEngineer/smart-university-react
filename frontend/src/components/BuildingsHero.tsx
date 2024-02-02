import React from "react"

import styles from "./hero.module.css"

export default function BuildingsHero() {
  return (
    <div className={styles.hero + " " + styles.heroFaculties}>
      <div className="container content-lg">
        <h1 className="carousel-title">Будівлі</h1>
        <p className={styles.heroText}>
          На даній сторінкі розміщений список з посиланнями на існуючі будівлі
          університету
        </p>
      </div>
    </div>
  )
}
