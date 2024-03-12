import React, { useEffect, useState } from "react"
import DashLayout from "../components/DashLayout/DashLayout"

import styles from "./EditPages/editPage.module.css"
import { useAuthContext } from "../hooks/useAuthContext"
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"

const API_URL = process.env.REACT_APP_API_URL

const newUsersAPI = API_URL + "/api/newUsers/"

export default function CreateUser() {
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const params = useParams()

  const [newUser, setRole]: any = useState(null)

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: newUser?.name,
      login: newUser?.login,
      newUser: newUser?.newUser,
      password: newUser?.password,
      passwordRepeat: newUser?.password,
    },
  })

  async function tryFetchUsers() {
    const response = await fetch(newUsersAPI + params?.name, {
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
    tryFetchUsers()
  }, [])

  async function tryCreateUser(data: any) {
    fetch(newUsersAPI + params?.name, {
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
        navigate("/newUsers/")
      }
    })
  }

  function onSubmit(data: any) {
    tryCreateUser(data)
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
              defaultValue={newUser?.login}
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
              defaultValue={newUser?.name}
            />
          </li>
          <li className="dash-board__item">
            <label htmlFor="rooms" className="dash-board__label">
              Роль
            </label>
            <select
              id="newUser"
              defaultValue={newUser?.newUser}
              {...register("newUser")}
            >
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
              defaultValue={newUser?.password}
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
              defaultValue={newUser?.passwordRepeat}
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
