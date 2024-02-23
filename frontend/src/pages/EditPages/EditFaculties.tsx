import React, { useEffect, useState } from "react"
import DashLayout from "../../components/DashLayout/DashLayout"

import styles from "./editPage.module.css"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"

const API_URL = process.env.REACT_APP_API_URL

const facultiesPageAPI = API_URL + `/api/facultiesPage`

export default function EditFaculties() {
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const [page, setPage]: any = useState(null)

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      heading: page?.heading,
      description: page?.description,
      images: page?.images,
    },
  })

  async function getFacultiesPage() {
    return fetch(facultiesPageAPI)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setPage(data)
        console.log(data)

        reset()
      })
  }

  useEffect(() => {
    getFacultiesPage()
  }, [])

  async function tryEditFaculties(data: any) {
    if (data.heading || data.images || data.description) {
      const formData = new FormData()

      formData.append("heading", String(data.heading))
      formData.append("description", data.description)
      for (let i = 0; i < data.images.length; i++) {
        formData.append("images", data.images[i])
      }

      await fetch(facultiesPageAPI, {
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
    tryEditFaculties(data)
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
              Опис
            </label>
            <textarea
              id="text"
              className={styles.textArea}
              defaultValue={page?.description}
              {...register("description")}
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
