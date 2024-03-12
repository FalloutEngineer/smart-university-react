import React, { useEffect, useState } from "react"
import DashLayout from "../components/DashLayout/DashLayout"

import styles from "./EditPages/editPage.module.css"
import { useAuthContext } from "../hooks/useAuthContext"
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"

const API_URL = process.env.REACT_APP_API_URL

const rolesAPI = API_URL + "/api/roles/"

export default function EditRole() {
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const params = useParams()

  const [role, setRole]: any = useState(null)

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: role?.name,
      login: role?.login,
      role: role?.role,
      password: role?.password,
      passwordRepeat: role?.password,
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

  async function tryEditRole(data: any) {
    fetch(rolesAPI + params?.name, {
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
        navigate("/roles/")
      }
    })
  }

  function onSubmit(data: any) {
    tryEditRole(data)
  }

  return (
    <DashLayout>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <ul>
          <li className="dash-board__item">
            <label htmlFor="icon" className="dash-board__label">
              Логін
            </label>
            <input
              id="login"
              className={styles.textArea}
              {...register("login")}
              defaultValue={role?.login}
            />
          </li>
          <li className="dash-board__item">
            <label htmlFor="icon" className="dash-board__label">
              Ім'я
            </label>
            <input
              id="name"
              className={styles.textArea}
              {...register("name")}
              defaultValue={role?.name}
            />
          </li>
          <li className="dash-board__item">
            <label htmlFor="rooms" className="dash-board__label">
              Роль
            </label>
            <select id="role" defaultValue={role?.role} {...register("role")}>
              <option selected value="no">
                Немає
              </option>
              <option value="1">Суперадмін</option>
              <option value="2">Ректор</option>
              <option value="3">Редактор</option>
              <option value="4">Асистент 507</option>
            </select>
          </li>
          <li className="dash-board__item">
            <label htmlFor="icon" className="dash-board__label">
              Пароль
            </label>
            <input
              id="password"
              type="password"
              className={styles.textArea}
              {...register("password")}
              defaultValue={role?.password}
            />
          </li>
          <li className="dash-board__item">
            <label htmlFor="icon" className="dash-board__label">
              Повторити пароль
            </label>
            <input
              id="passwordRepeat"
              type="password"
              className={styles.textArea}
              {...register("passwordRepeat")}
              defaultValue={role?.passwordRepeat}
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
