import React, { useEffect, useState } from "react"
import DashLayout from "../../components/DashLayout/DashLayout"

import styles from "./editHome.module.css"
import { useForm } from "react-hook-form"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useNavigate } from "react-router-dom"

const API_URL = process.env.REACT_APP_API_URL

const buildingsPageAPI = API_URL + `/api/homePage`

export default function EditHome() {
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const [page, setPage]: any = useState(null)

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      heading: page?.heading,
      buttonLink: page?.buttonLink,
      images: page?.images,
    },
  })

  async function getHomePage() {
    return fetch(buildingsPageAPI)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setPage(data)
        reset()
      })
  }

  useEffect(() => {
    getHomePage()
  }, [])

  async function tryEditHome(data: any) {
    if (data.heading || data.images || data.buttonLink) {
      const formData = new FormData()

      formData.append("heading", String(data.heading))
      formData.append("buttonLink", data.buttonLink)
      for (let i = 0; i < data.images.length; i++) {
        formData.append("images", data.images[i])
      }

      await fetch(buildingsPageAPI, {
        method: "PATCH",
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
          alert("Об'єкт успішно змінено")
          navigate("/room-list/")
        }
      })
    } else {
      alert("Будь ласка заповніть всі поля")
    }
  }

  const onSubmit = (data: any) => {
    tryEditHome(data)
  }

  return (
    <DashLayout>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <ul className={styles?.list}>
          <li className="dash-board__item">
            <label htmlFor="number" className="dash-board__label">
              Заголовок
            </label>
            <textarea
              id="text"
              className={styles.textArea}
              defaultValue={page?.heading}
              {...register("heading")}
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
              {...register("buttonLink")}
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
