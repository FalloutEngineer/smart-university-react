import React, { useEffect, useState } from "react"
import DashLayout from "../components/DashLayout/DashLayout"

import styles from "./EditPages/editPage.module.css"
import { useAuthContext } from "../hooks/useAuthContext"
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"

const API_URL = process.env.REACT_APP_API_URL

const rolesAPI = API_URL + "/api/roles/"

export default function CreateRole() {
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const params = useParams()

  const [role, setRole]: any = useState(null)

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: role?.name,
      isSuperAdmin: role?.isSuperAdmin,
      isAdmin: role?.isAdmin,
      isEditor: role?.isEditor,
      canEditDamage: role?.canEditDamage,
      buildings: role?.buildings ? role?.buildings : [],
      floors: role?.floors ? role?.floors : [],
      faculties: role?.faculties ? role?.faculties : [],
      rooms: role?.rooms ? role?.rooms : [],
    },
  })

  async function tryFetchRoles() {
    const response = await fetch(rolesAPI + params?.name, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user}`,
      },
    })
    const data = await response.json()

    if (data.message) {
      console.log(data)
    } else {
      setRole(data)
    }
    reset()
  }

  useEffect(() => {
    tryFetchRoles()
  }, [])

  async function tryCreateRole(data: any) {
    fetch(rolesAPI + params?.name, {
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
        alert("Об'єкт успішно змінено")
        navigate("/roles/")
      }
    })
  }

  function onSubmit(data: any) {
    tryCreateRole(data)
  }

  return (
    <DashLayout>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <ul>
          <li className="dash-board__item">
            <label htmlFor="icon" className="dash-board__label">
              Назва
            </label>
            <input
              id="name"
              className={styles.textArea}
              {...register("name")}
              defaultValue={role?.name}
            />
          </li>
          <li className="dash-board__item">
            <label htmlFor="color" className="dash-board__label">
              Суперадмін?
            </label>
            <input
              id="isSuperAdmin"
              type="checkbox"
              className={styles.textArea}
              {...register("isSuperAdmin")}
              defaultValue={role?.isSuperAdmin}
            />
          </li>
          <li className="dash-board__item">
            <label htmlFor="capacity" className="dash-board__label">
              Адмін?
            </label>
            <input
              id="isAdmin"
              type="checkbox"
              className={styles.textArea}
              {...register("isAdmin")}
              defaultValue={role?.isAdmin}
            />
          </li>
          <li className="dash-board__item">
            <label htmlFor="area" className="dash-board__label">
              Редактор?
            </label>
            <input
              id="isEditor"
              type="checkbox"
              className={styles.textArea}
              {...register("isEditor")}
              defaultValue={role?.isEditor}
            />
          </li>
          <li className="dash-board__item">
            <label htmlFor="pulpits" className="dash-board__label">
              Може редагувати збитки?
            </label>
            <input
              id="canEditDamage"
              type="checkbox"
              className={styles.textArea}
              {...register("canEditDamage")}
              defaultValue={role?.canEditDamage}
            />
          </li>
          <li className="dash-board__item">
            <label htmlFor="rooms" className="dash-board__label">
              Будівля
            </label>
            <select
              id="buildings"
              defaultValue={role?.buildings[0]}
              {...register("buildings")}
            >
              <option selected value="no">
                Немає
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </li>

          <li className="dash-board__item">
            <label htmlFor="rooms" className="dash-board__label">
              Поверх
            </label>
            <select
              id="floors"
              defaultValue={role?.floors[0]}
              {...register("floors")}
            >
              <option selected value="no">
                Немає
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </li>
          <li className="dash-board__item">
            <label htmlFor="rooms" className="dash-board__label">
              Факультет
            </label>
            <select
              id="faculties"
              defaultValue={role?.faculties[0]}
              {...register("faculties")}
            >
              <option selected value="no">
                Немає
              </option>
              <option value="1">ФКНФМ</option>
              <option value="2">ФІЗВИХ</option>
            </select>
          </li>
          <li className="dash-board__item">
            <label htmlFor="rooms" className="dash-board__label">
              Приміщення
            </label>
            <select
              id="rooms"
              defaultValue={role?.rooms[0]}
              {...register("rooms")}
            >
              <option selected value="no">
                Немає
              </option>
              <option value="1">111</option>
              <option value="2">222</option>
              <option value="2">333</option>
            </select>
          </li>
        </ul>
        <button type="submit" id="save" className="dash-button">
          Зберегти
        </button>
      </form>
    </DashLayout>
  )
}
