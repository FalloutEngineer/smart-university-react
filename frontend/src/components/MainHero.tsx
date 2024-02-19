import React, { useEffect, useRef } from "react"

import styles from "./hero.module.css"
import { Link } from "react-router-dom"

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
        <Link to="/buildings" className="button-outline">
          Дивитися
        </Link>
      </div>
    </div>
  )
}
