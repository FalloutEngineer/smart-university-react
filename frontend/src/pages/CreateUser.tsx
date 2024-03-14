import React, { useEffect, useState } from "react"
import DashLayout from "../components/DashLayout/DashLayout"

import styles from "./EditPages/editPage.module.css"
import { useAuthContext } from "../hooks/useAuthContext"
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"

const API_URL = process.env.REACT_APP_API_URL

const usersAPI = API_URL + "/api/users/"
const rolesAPI = API_URL + "/api/roles/"

export default function CreateUser() {
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const [newUser, setUser]: any = useState(null)

  const [roles, setRoles]: any[] = useState([])

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: newUser?.name,
      login: newUser?.login,
      role: newUser?.role,
      password: newUser?.password,
      passwordRepeat: newUser?.password,
    },
  })

  async function tryFetchRoles() {
    const response = await fetch(rolesAPI, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user}`,
      },
    })

    const data = await response.json()

    console.log(data)
    setRoles(data)
  }

  useEffect(() => {
    tryFetchRoles()
  }, [])

  async function tryCreateUser(data: any) {
    fetch(usersAPI, {
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
        navigate("/users/")
      }
    })
  }

  function onSubmit(data: any) {
    if (data.password === data.passwordRepeat) {
      tryCreateUser(data)
    } else {
      alert("Паролі не збігаються!")
    }
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
              id="role"
              defaultValue={newUser?.role}
              {...register("role")}
            >
              {roles.length > 0 &&
                roles?.map((role: any) => {
                  return (
                    <option
                      selected={newUser?.role === role?._id}
                      value={role?._id}
                    >
                      {role?.name}
                    </option>
                  )
                })}
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
