import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import DashLayout from "../components/DashLayout/DashLayout"

import styles from "./EditPages/editPage.module.css"
import { useAuthContext } from "../hooks/useAuthContext"

const API_URL = process.env.REACT_APP_API_URL

const facultiesAPI = API_URL + "/api/faculties/"
const pulpitsAPI = API_URL + "/api/pulpits/"

const facultyCardsAPI = API_URL + "/api/facultyCard/"
const pulpitCardsAPI = API_URL + "/api/pulpitCard/"

export default function ManageCard() {
  const { user } = useAuthContext()

  const [cardState, setCardState] = useState("faculty")

  const [faculties, setFaculties] = useState([])

  const [pulpits, setPulpits] = useState([])

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      icon: "fa-globe",
      seats: 0,
      color: "#000",
      area: 0,
      pulpits: 0,
      rooms: 0,
      bachelorFull: 0,
      bachelorPart: 0,
      masterFull: 0,
      masterPart: 0,
      phdFull: 0,
      phdPart: 0,
    },
  })

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await fetch(facultiesAPI)
        const data = await response.json()

        setFaculties(
          data.map((faculty: any) => {
            return faculty.name
          })
        )
      } catch (e) {
        console.error(e)
      }
    }
    fetchFaculties()
  }, [])

  useEffect(() => {
    const fetchPulpits = async () => {
      try {
        const response = await fetch(pulpitsAPI)
        const data = await response.json()

        setPulpits(
          data.map((pulpit: any) => {
            return pulpit.name
          })
        )
      } catch (e) {
        console.error(e)
      }
    }
    fetchPulpits()
  }, [])

  async function tryCreateCard(data: any, uri: string) {
    fetch(uri, {
      method: "POST",
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
        alert("Об'єкт успішно створено")
      }
    })
  }

  function onSubmit(data: any) {
    if (cardState === "faculty") {
      tryCreateCard(data, facultyCardsAPI)
    }
    if (cardState === "pulpit") {
      tryCreateCard(data, pulpitCardsAPI)
    }
  }

  function onTypeChange(e: any) {
    const value = e.target.value

    setCardState(value)
  }

  return (
    <DashLayout>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <ul className={styles?.list}>
          <li className="dash-board__item">
            <label htmlFor="faculty" className="dash-board__label">
              Тип картки
            </label>
            <select
              id="type"
              defaultValue={"faculty"}
              onChange={onTypeChange}
              className="dash-board__input"
            >
              <option value="faculty">Факультет</option>
              <option value="pulpit">Кафедра</option>
            </select>
          </li>
          {cardState === "faculty" && (
            <li className="dash-board__item">
              <label htmlFor="faculty" className="dash-board__label">
                Назва
              </label>
              <select
                id="faculty"
                {...register("name")}
                className="dash-board__input"
              >
                <option value="" disabled selected hidden>
                  ---Оберіть факультет---
                </option>
                {faculties.map((faculty) => {
                  return <option value={faculty}>{faculty}</option>
                })}
              </select>
            </li>
          )}
          {cardState === "pulpit" && (
            <li className="dash-board__item">
              <label htmlFor="pulpit" className="dash-board__label">
                Назва
              </label>
              <select
                id="pulpit"
                {...register("name")}
                className="dash-board__input"
              >
                <option value="" disabled selected hidden>
                  ---Оберіть кафедру---
                </option>
                {pulpits.map((pulpit) => {
                  return <option value={pulpit}>{pulpit}</option>
                })}
              </select>
            </li>
          )}
          <li className="dash-board__item">
            {/* ДРОПДАУН АБО ПОСИЛАННЯ НА ФАЙЛ АБО ДОКИ */}
            <label htmlFor="icon" className="dash-board__label">
              Іконка (FontAwesome клас)
            </label>
            <input
              id="icon"
              className={"dash-board__input " + styles.textArea}
              defaultValue={"fa-globe"}
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
              {...register("color")}
            />
          </li>
          <li className="dash-board__item">
            <label htmlFor="seats" className="dash-board__label">
              Кількість місць
            </label>
            <input
              id="seats"
              type="number"
              className={"dash-board__input " + styles.textArea}
              defaultValue={0}
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
              className={"dash-board__input " + styles.textArea}
              defaultValue={0}
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
              className={"dash-board__input " + styles.textArea}
              defaultValue={0}
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
              className={"dash-board__input " + styles.textArea}
              defaultValue={0}
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
              className={"dash-board__input " + styles.textArea}
              defaultValue={0}
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
              className={"dash-board__input " + styles.textArea}
              defaultValue={0}
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
              className={"dash-board__input " + styles.textArea}
              defaultValue={0}
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
              className={"dash-board__input " + styles.textArea}
              defaultValue={0}
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
              className={"dash-board__input " + styles.textArea}
              defaultValue={0}
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
              className={"dash-board__input " + styles.textArea}
              defaultValue={0}
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
