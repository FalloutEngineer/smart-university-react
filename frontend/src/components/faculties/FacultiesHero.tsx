import React from "react"

import styles from "../hero.module.css"

export default function FacultiesHero() {
  return (
    <div className={styles.hero + " " + styles.heroFaculties}>
      <div className="container content-lg">
        <h1 className={"carousel-title " + styles.heroTitle}>Факультети</h1>
        <p className={styles.heroText}>
          При ХДУ існує 9 факультетів. Якщо ви уважно вивчите спеціалізації та
          наукові напрямки різних факультетів, то знайдете багато спільного.
          <br />
          Це не дивно: розвиток наукових напрямків на багатьох факультетах
          проходить паралельно. Так що близькі вашим прагненням (інтересам)
          наукові
          <br />
          напрямки ви зможете знайти відразу на кількох факультетах.
          <br />
          Безумовно, кожен факультет відрізняє своя конкретна спеціалізація, але
          це вже тонкощі, які ви зможете збагнути, ставши студентами, і уточнити
          свій вибір.
        </p>
      </div>
    </div>
  )
}
