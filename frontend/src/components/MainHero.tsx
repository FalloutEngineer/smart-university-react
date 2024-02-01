import React from "react"

import styles from "./hero.module.css"

export default function MainHero() {
  return (
    <div className={styles.hero}>
      <div className="container content-lg">
        <div className="margin-b-40">
          <h1 className="carousel-title">
            Аналітична система матеріально-технічної бази Херсонського
            Державного Університету
          </h1>
        </div>
        <a
          href="1building.html"
          className="btn-theme btn-theme-sm btn-white-brd text-uppercase"
        >
          Дивитися
        </a>
      </div>
    </div>
  )
}
