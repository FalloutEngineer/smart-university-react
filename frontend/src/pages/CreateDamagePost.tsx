import React from "react"
import DashLayout from "../components/DashLayout/DashLayout"

import styles from "./EditPages/editPage.module.css"
import { useForm } from "react-hook-form"

export default function CreateDamagePost() {
  const { register, handleSubmit } = useForm()

  function onSubmit(data: any) {}

  return (
    <DashLayout>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <ul className={styles?.list}>
          <li className="dash-board__item">
            <label htmlFor="name" className="dash-board__label">
              Назва
            </label>
            <input id="name" className={styles.textArea} />
          </li>
          <li className="dash-board__item">
            <label htmlFor="location" className="dash-board__label">
              Місцезнаходження
            </label>
            <input id="location" type="text" className={styles.textArea} />
          </li>
          <li className="dash-board__item">
            <label htmlFor="description" className="dash-board__label">
              Опис
            </label>
            <input id="description" className={styles.textArea} />
          </li>
          <li className="dash-board__item">
            <label htmlFor="sum" className="dash-board__label">
              Сума
            </label>
            <input
              id="sum"
              type="number"
              className={styles.textArea}
              min={0}
              defaultValue={0}
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
