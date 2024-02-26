import React from "react"
import DashLayout from "../components/DashLayout/DashLayout"

import styles from "./EditPages/editPage.module.css"

const API_URL = process.env.REACT_APP_API_URL

const facultyCardsAPI = API_URL + "/api/facultyCard/"

export default function ManageCard() {
  return (
    <DashLayout>
      {/* <form className={styles.form} onSubmit={handleSubmit(onSubmit)}> */}
      <ul className={styles?.list}>
        <li className="dash-board__item">
          <label htmlFor="number" className="dash-board__label">
            Назва
          </label>
          <textarea
            className={styles.textArea}
            //   defaultValue={page?.heading}
            //   {...register("heading")}
          />
        </li>
        <li className="dash-board__item">
          <label htmlFor="number" className="dash-board__label">
            Іконка
          </label>
          <input
            className={styles.textArea}
            //   defaultValue={page?.buttonLink}
            //   {...register("buttonLink")}
          />
        </li>
        <li className="dash-board__item">
          <label htmlFor="number" className="dash-board__label">
            Колір
          </label>
          <input
            type="color"
            className={styles.textArea}
            //   defaultValue={page?.buttonLink}
            //   {...register("buttonLink")}
          />
        </li>
        <li className="dash-board__item">
          <label htmlFor="number" className="dash-board__label">
            Кількість місць
          </label>
          <input
            type="number"
            className={styles.textArea}
            //   defaultValue={page?.buttonLink}
            //   {...register("buttonLink")}
          />
        </li>
        <li className="dash-board__item">
          <label htmlFor="number" className="dash-board__label">
            Площа
          </label>
          <input
            type="number"
            className={styles.textArea}
            //   defaultValue={page?.buttonLink}
            //   {...register("buttonLink")}
          />
        </li>
        <li className="dash-board__item">
          <label htmlFor="number" className="dash-board__label">
            Кількість кафедр
          </label>
          <input
            type="number"
            className={styles.textArea}
            //   defaultValue={page?.buttonLink}
            //   {...register("buttonLink")}
          />
        </li>
        <li className="dash-board__item">
          <label htmlFor="number" className="dash-board__label">
            Кількість приміщень
          </label>
          <input
            type="number"
            className={styles.textArea}
            //   defaultValue={page?.buttonLink}
            //   {...register("buttonLink")}
          />
        </li>
        <li className="dash-board__item">
          <label htmlFor="number" className="dash-board__label">
            Бакалаврів (денна форма)
          </label>
          <input
            type="number"
            className={styles.textArea}
            //   defaultValue={page?.buttonLink}
            //   {...register("buttonLink")}
          />
        </li>
        <li className="dash-board__item">
          <label htmlFor="number" className="dash-board__label">
            Бакалаврів (заочна форма)
          </label>
          <input
            type="number"
            className={styles.textArea}
            //   defaultValue={page?.buttonLink}
            //   {...register("buttonLink")}
          />
        </li>
        <li className="dash-board__item">
          <label htmlFor="number" className="dash-board__label">
            Магістрів (денна форма)
          </label>
          <input
            type="number"
            className={styles.textArea}
            //   defaultValue={page?.buttonLink}
            //   {...register("buttonLink")}
          />
        </li>
        <li className="dash-board__item">
          <label htmlFor="number" className="dash-board__label">
            Магістрів (заочна форма)
          </label>
          <input
            type="number"
            className={styles.textArea}
            //   defaultValue={page?.buttonLink}
            //   {...register("buttonLink")}
          />
        </li>
        <li className="dash-board__item">
          <label htmlFor="number" className="dash-board__label">
            PHD (денна форма)
          </label>
          <input
            type="number"
            className={styles.textArea}
            //   defaultValue={page?.buttonLink}
            //   {...register("buttonLink")}
          />
        </li>
        <li className="dash-board__item">
          <label htmlFor="number" className="dash-board__label">
            PHD (заочна форма)
          </label>
          <input
            type="number"
            className={styles.textArea}
            //   defaultValue={page?.buttonLink}
            //   {...register("buttonLink")}
          />
        </li>
      </ul>
      <button type="submit" id="save" className="dash-button">
        Зберегти
      </button>
      {/* </form> */}
    </DashLayout>
  )
}
