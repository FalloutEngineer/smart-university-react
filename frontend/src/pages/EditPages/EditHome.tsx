import React, { useEffect, useState } from "react"
import DashLayout from "../../components/DashLayout/DashLayout"

import styles from "./editHome.module.css"

const API_URL = process.env.REACT_APP_API_URL

const buildingsPageAPI = API_URL + `/api/homePage`

export default function EditHome() {
  const [page, setPage]: any = useState(null)

  async function getHomePage() {
    return fetch(buildingsPageAPI)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setPage(data)
        console.log(data)
      })
  }

  useEffect(() => {
    getHomePage()
  }, [])

  return (
    <DashLayout>
      <form className={styles.form} action="">
        <ul className={styles?.list}>
          <li className="dash-board__item">
            <label htmlFor="number" className="dash-board__label">
              Заголовок
            </label>
            <textarea
              id="text"
              className={styles.textArea}
              defaultValue={page?.heading}
            />
          </li>
          <li className="dash-board__item">
            <label htmlFor="number" className="dash-board__label">
              Посилання кнопки
            </label>
            <input
              id="text"
              className={styles.textArea}
              defaultValue={page?.buttonLink}
            />
          </li>
          <li id="images-item" className="dash-board__item">
            <label htmlFor="" className="dash-board__label">
              Зображення
            </label>
            <input
              id="images"
              className="dash-board__input"
              multiple
              type="file"
              accept="image/*"
            />
          </li>
        </ul>
        <button type="submit" id="save" className="dash-button">
          Зберегти
        </button>
      </form>
    </DashLayout>
  )
}
