import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import DashLayout from "../components/DashLayout/DashLayout"

import styles from "./EditPages/editPage.module.css"
import { useAuthContext } from "../hooks/useAuthContext"
import { useParams } from "react-router-dom"

const API_URL = process.env.REACT_APP_API_URL

const facultyCardsAPI = API_URL + "/api/facultyCard/"
const pulpitCardAPI = API_URL + "/api/facultyCard/"

export default function EditCardPage() {
  const { user } = useAuthContext()

  const params = useParams()

  const cardState = params.type

  const [card, setCard]: any = useState([])

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: card?.name,
      icon: card?.icon,
      seats: card?.seats,
      color: card?.color,
      area: card?.area,
      pulpits: card?.pulpits,
      rooms: card?.rooms,
      bachelorFull: card?.bachelorFull,
      bachelorPart: card?.bachelorPart,
      masterFull: card?.masterFull,
      masterPart: card?.masterPart,
      phdFull: card?.phdFull,
      phdPart: card?.phdPart,
    },
  })

  async function tryFetchCard(uri: string) {
    const response = await fetch(uri + params.name)
    const data = await response.json()

    setCard(data)
  }

  useEffect(() => {
    if (params.type === "faculty") {
      tryFetchCard(facultyCardsAPI)
    }
    if (params.type === "pulpit") {
      tryFetchCard(pulpitCardAPI)
    }
  }, [])

  async function tryEditCard(data: any, uri: string) {
    fetch(uri, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user}`,
      },
      body: JSON.stringify({
        ...data,
      }),
    }).then(async (res) => {
      const answer = await res.json()

      if (!res.ok) {
        //TODO: toast
        alert(answer.message)
      } else {
        alert("Об'єкт успішно змінено")
      }
    })
  }

  function onSubmit(data: any) {
    if (params.type === "faculty") {
      tryEditCard(data, facultyCardsAPI)
    }
    if (params.type === "pulpit") {
      tryEditCard(data, pulpitCardAPI)
    }
  }

  return (
    <DashLayout>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <ul>
          <li className="dash-board__item">
            {/* ДРОПДАУН АБО ПОСИЛАННЯ НА ФАЙЛ АБО ДОКИ */}
            <label htmlFor="icon" className="dash-board__label">
              Іконка (FontAwesome клас)
            </label>
            <input
              id="icon"
              className={styles.textArea}
              defaultValue={card.icon}
              {...register("icon")}
            />
          </li>
          <li className="dash-board__item">
            <label htmlFor="color" className="dash-board__label">
              Колір
            </label>
            <input
              id="color"
              type="color"
              className={styles.textArea}
              defaultValue={card.color}
              {...register("color")}
            />
          </li>
          <li className="dash-board__item">
            <label htmlFor="capacity" className="dash-board__label">
              Кількість місць
            </label>
            <input
              id="seats"
              type="number"
              className={styles.textArea}
              defaultValue={card.seats}
              min={0}
              {...register("seats")}
            />
          </li>
          <li className="dash-board__item">
            <label htmlFor="area" className="dash-board__label">
              Площа
            </label>
            <input
              id="area"
              type="number"
              className={styles.textArea}
              defaultValue={card.area}
              min={0}
              {...register("area")}
            />
          </li>
          <li className="dash-board__item">
            <label htmlFor="pulpits" className="dash-board__label">
              Кількість кафедр
            </label>
            <input
              id="pulpits"
              type="number"
              className={styles.textArea}
              defaultValue={card.pulpits}
              min={0}
              {...register("pulpits")}
            />
          </li>
          <li className="dash-board__item">
            <label htmlFor="rooms" className="dash-board__label">
              Кількість приміщень
            </label>
            <input
              id="rooms"
              type="number"
              className={styles.textArea}
              defaultValue={card.rooms}
              min={0}
              {...register("rooms")}
            />
          </li>
          <li className="dash-board__item">
            <label htmlFor="bachelorFull" className="dash-board__label">
              Бакалаврів (денна форма)
            </label>
            <input
              id="bachelorFull"
              type="number"
              className={styles.textArea}
              defaultValue={card.bachelorFull}
              min={0}
              {...register("bachelorFull")}
            />
          </li>
          <li className="dash-board__item">
            <label htmlFor="bachelorPart" className="dash-board__label">
              Бакалаврів (заочна форма)
            </label>
            <input
              id="bachelorPart"
              type="number"
              className={styles.textArea}
              defaultValue={card.bachelorPart}
              min={0}
              {...register("bachelorPart")}
            />
          </li>
          <li className="dash-board__item">
            <label htmlFor="masterFull" className="dash-board__label">
              Магістрів (денна форма)
            </label>
            <input
              id="masterFull"
              type="number"
              className={styles.textArea}
              defaultValue={card.masterFull}
              min={0}
              {...register("masterFull")}
            />
          </li>
          <li className="dash-board__item">
            <label htmlFor="masterPart" className="dash-board__label">
              Магістрів (заочна форма)
            </label>
            <input
              id="masterPart"
              type="number"
              className={styles.textArea}
              defaultValue={card.masterPart}
              min={0}
              {...register("masterPart")}
            />
          </li>
          <li className="dash-board__item">
            <label htmlFor="phdFull" className="dash-board__label">
              PHD (денна форма)
            </label>
            <input
              id="phdFull"
              type="number"
              className={styles.textArea}
              defaultValue={card.phdFull}
              min={0}
              {...register("phdFull")}
            />
          </li>
          <li className="dash-board__item">
            <label htmlFor="phdPart" className="dash-board__label">
              PHD (заочна форма)
            </label>
            <input
              id="phdPart"
              type="number"
              className={styles.textArea}
              defaultValue={card.phdPart}
              min={0}
              {...register("phdPart")}
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
