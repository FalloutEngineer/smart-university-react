import React, { useEffect, useState } from "react"
import DashLayout from "../components/DashLayout/DashLayout"

import styles from "./EditPages/editPage.module.css"
import { useAuthContext } from "../hooks/useAuthContext"
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"

const API_URL = process.env.REACT_APP_API_URL

const rolesAPI = API_URL + "/api/roles/"

const facultiesAPI = API_URL + "/api/faculties/"
const floorsAPI = API_URL + "/api/floors/"
const roomsAPI = API_URL + "/api/rooms/"
const buildingsAPI = API_URL + "/api/buildings/"

export default function CreateRole() {
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const params = useParams()

  const [role, setRole]: any = useState(null)

  const [buildings, setBuildings]: any[] = useState([])
  const [floors, setFloors]: any[] = useState([])
  const [faculties, setFaculties]: any[] = useState([])
  const [rooms, setRooms]: any[] = useState([])

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

  async function tryFetchBuildings() {
    const response = await fetch(buildingsAPI, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user}`,
      },
    })
    const data = await response.json()

    if (data.message) {
      console.log(data)
    } else {
      setBuildings(data)
    }
    reset()
  }

  async function tryFetchFloors() {
    const response = await fetch(floorsAPI, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user}`,
      },
    })
    const data = await response.json()

    if (data.message) {
      console.log(data)
    } else {
      setFloors(data)
    }
    reset()
  }

  async function tryFetchFaculties() {
    const response = await fetch(facultiesAPI, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user}`,
      },
    })
    const data = await response.json()

    if (data.message) {
      console.log(data)
    } else {
      setFaculties(data)
    }
    reset()
  }

  async function tryFetchRooms() {
    const response = await fetch(roomsAPI, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user}`,
      },
    })
    const data = await response.json()

    if (data.message) {
      console.log(data)
    } else {
      setRooms(data)
    }
    reset()
  }

  useEffect(() => {
    tryFetchBuildings()
    tryFetchFloors()
    tryFetchFaculties()
    tryFetchRooms()
  }, [])

  async function tryCreateRole(data: any) {
    fetch(rolesAPI, {
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
              checked={role?.isSuperAdmin}
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
              checked={role?.isAdmin}
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
              checked={role?.isEditor}
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
              checked={role?.canEditDamage}
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
              <option selected value="">
                Немає
              </option>
              {buildings.length > 0
                ? buildings.map((building: any) => {
                    return <option value={building._id}>{building.name}</option>
                  })
                : ""}
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
              <option selected value="">
                Немає
              </option>
              {floors.length > 0
                ? floors.map((floor: any) => {
                    return <option value={floor._id}>{floor.number}</option>
                  })
                : ""}
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
              <option selected value="">
                Немає
              </option>
              {faculties.length > 0
                ? faculties.map((faculty: any) => {
                    return <option value={faculty._id}>{faculty.name}</option>
                  })
                : ""}
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
              <option selected value="">
                Немає
              </option>
              {rooms.length > 0
                ? rooms.map((room: any) => {
                    return <option value={room._id}>{room.number}</option>
                  })
                : ""}
            </select>
          </li>
        </ul>
        <button type="submit" id="save" className="dash-button">
          Створити
        </button>
      </form>
    </DashLayout>
  )
}
