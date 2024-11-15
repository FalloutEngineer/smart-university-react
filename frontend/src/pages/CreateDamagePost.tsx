import React, { useEffect, useState } from "react"
import DashLayout from "../components/DashLayout/DashLayout"

import styles from "./EditPages/editPage.module.css"
import { useForm } from "react-hook-form"
import { useAuthContext } from "../hooks/useAuthContext"
import { useNavigate, useParams } from "react-router-dom"

const API_URL = process.env.REACT_APP_API_URL

const damagePostsAPI = API_URL + "/api/damagePost/"
const buildingsAPI = API_URL + "/api/buildings"

export default function CreateDamagePost() {
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const [buildings, setBuildings] = useState([])

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      images: [],
      status: "",
      location: "",
      building: "",
      description: "",
      sum: 0,
    },
  })

  async function getBuildings() {
    try {
      const response = await fetch(buildingsAPI)
      const data = await response.json()

      setBuildings(data)
    } catch (e) {
      //TODO: toast?
      console.error(e)
    }
  }

  useEffect(() => {
    getBuildings()
  }, [])

  async function tryCreatePost(data: any) {
    if (data.name) {
      const formData = new FormData()

      formData.append("name", String(data.name))

      for (let i = 0; i < data.images.length; i++) {
        formData.append("images", data.images[i])
      }

      formData.append("status", data.status)

      formData.append("building", data.building)
      formData.append("location", data.location)

      formData.append("description", data.description)

      formData.append("sum", data.sum)

      await fetch(damagePostsAPI, {
        method: "POST",
        headers: {
          authorization: `Bearer ${user}`,
        },
        body: formData,
      }).then(async (res) => {
        const answer = await res.json()

        if (!res.ok) {
          //TODO: toast
          alert(answer.message)
        } else {
          alert("Об'єкт успішно створено")
          navigate("/damage/")
        }
      })
    } else {
      alert("Будь ласка заповніть всі поля")
    }
  }

  const onSubmit = (data: any) => {
    tryCreatePost(data)
  }

  return (
    <DashLayout>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <ul className={styles?.list}>
          <li className="dash-board__item">
            <label htmlFor="name" className="dash-board__label">
              Назва
            </label>
            <input
              id="name"
              className={"dash-board__input " + styles.textArea}
              {...register("name")}
            />
          </li>

          <li className="dash-board__item">
            <label htmlFor="building" className="dash-board__label">
              Будівля
            </label>
            <select
              {...register("building")}
              className="dash-select"
              name="building"
              id="buildings"
            >
              <option hidden disabled selected value={""}>
                {" "}
                -- Оберіть варіант --{" "}
              </option>
              {buildings.map((building: any) => {
                return <option value={building.name}>{building.name}</option>
              })}
            </select>
          </li>
          <li className="dash-board__item">
            <label htmlFor="location" className="dash-board__label">
              Місцезнаходження
            </label>
            <textarea
              id="location"
              className={"dash-board__input " + styles.textArea}
              {...register("location")}
            />
          </li>
          <li className="dash-board__item">
            <label htmlFor="location" className="dash-board__label">
              Стан
            </label>
            <input
              type="text"
              id="status"
              className={"dash-board__input " + styles.textArea}
              {...register("status")}
            />
          </li>
          <li className="dash-board__item">
            <label htmlFor="description" className="dash-board__label">
              Опис
            </label>
            <textarea
              id="description"
              className={"dash-board__input " + styles.textArea}
              {...register("description")}
            />
          </li>
          <li className="dash-board__item">
            <label htmlFor="sum" className="dash-board__label">
              Сума
            </label>
            <input
              id="sum"
              type="number"
              className={"dash-board__input " + styles.textArea}
              min={0}
              {...register("sum")}
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
              {...register("images")}
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
