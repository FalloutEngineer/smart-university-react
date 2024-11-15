import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import DashLayout from "../components/DashLayout/DashLayout"

import styles from "./EditPages/editPage.module.css"
import { useAuthContext } from "../hooks/useAuthContext"
import { useNavigate, useParams } from "react-router-dom"

const API_URL = process.env.REACT_APP_API_URL

const facultyCardsAPI = API_URL + "/api/facultyCard/"
const pulpitCardAPI = API_URL + "/api/pulpitCard/"

export default function EditCardPage() {
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const params = useParams()

  const [card, setCard]: any = useState(null)

  const { register, handleSubmit, reset } = useForm({
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
    reset()
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
    fetch(uri + params.name, {
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
        navigate("/cards/")
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
              className={"dash-board__input " + styles.textArea}
              {...register("icon")}
              defaultValue={card?.icon}
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
              {...register("color")}
              defaultValue={card?.color}
            />
          </li>
          <li className="dash-board__item">
            <label htmlFor="capacity" className="dash-board__label">
              Кількість місць
            </label>
            <input
              id="seats"
              type="number"
              className={"dash-board__input " + styles.textArea}
              min={0}
              {...register("seats")}
              defaultValue={card?.seats}
            />
          </li>
          <li className="dash-board__item">
            <label htmlFor="area" className="dash-board__label">
              Площа
            </label>
            <input
              id="area"
              type="number"
              className={"dash-board__input " + styles.textArea}
              min={0}
              {...register("area")}
              defaultValue={card?.area}
            />
          </li>
          <li className="dash-board__item">
            <label htmlFor="pulpits" className="dash-board__label">
              Кількість кафедр
            </label>
            <input
              id="pulpits"
              type="number"
              className={"dash-board__input " + styles.textArea}
              min={0}
              {...register("pulpits")}
              defaultValue={card?.pulpits}
            />
          </li>
          <li className="dash-board__item">
            <label htmlFor="rooms" className="dash-board__label">
              Кількість приміщень
            </label>
            <input
              id="rooms"
              type="number"
              className={"dash-board__input " + styles.textArea}
              min={0}
              {...register("rooms")}
              defaultValue={card?.rooms}
            />
          </li>
          <li className="dash-board__item">
            <label htmlFor="bachelorFull" className="dash-board__label">
              Бакалаврів (денна форма)
            </label>
            <input
              id="bachelorFull"
              type="number"
              className={"dash-board__input " + styles.textArea}
              min={0}
              {...register("bachelorFull")}
              defaultValue={card?.bachelorFull}
            />
          </li>
          <li className="dash-board__item">
            <label htmlFor="bachelorPart" className="dash-board__label">
              Бакалаврів (заочна форма)
            </label>
            <input
              id="bachelorPart"
              type="number"
              className={"dash-board__input " + styles.textArea}
              min={0}
              {...register("bachelorPart")}
              defaultValue={card?.bachelorPart}
            />
          </li>
          <li className="dash-board__item">
            <label htmlFor="masterFull" className="dash-board__label">
              Магістрів (денна форма)
            </label>
            <input
              id="masterFull"
              type="number"
              className={"dash-board__input " + styles.textArea}
              min={0}
              {...register("masterFull")}
              defaultValue={card?.masterFull}
            />
          </li>
          <li className="dash-board__item">
            <label htmlFor="masterPart" className="dash-board__label">
              Магістрів (заочна форма)
            </label>
            <input
              id="masterPart"
              type="number"
              className={"dash-board__input " + styles.textArea}
              min={0}
              {...register("masterPart")}
              defaultValue={card?.masterPart}
            />
          </li>
          <li className="dash-board__item">
            <label htmlFor="phdFull" className="dash-board__label">
              PHD (денна форма)
            </label>
            <input
              id="phdFull"
              type="number"
              className={"dash-board__input " + styles.textArea}
              min={0}
              {...register("phdFull")}
              defaultValue={card?.phdFull}
            />
          </li>
          <li className="dash-board__item">
            <label htmlFor="phdPart" className="dash-board__label">
              PHD (заочна форма)
            </label>
            <input
              id="phdPart"
              type="number"
              className={"dash-board__input " + styles.textArea}
              min={0}
              {...register("phdPart")}
              defaultValue={card?.phdPart}
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
