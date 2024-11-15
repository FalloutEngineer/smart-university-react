import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAuthContext } from "../../hooks/useAuthContext"
import DashLayout from "../../components/DashLayout/DashLayout"
import { Floor } from "../../manageTypes"
import { useForm } from "react-hook-form"

const API_URL = process.env.REACT_APP_API_URL

const floorsAPI = API_URL + `/api/floors`

export default function DashEditFloor() {
  let { number, building } = useParams()
  const { user } = useAuthContext()

  const [floor, setFloor]: any = useState(null)

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      floorColor: floor?.floorColor,
    },
  })

  async function getFloor() {
    return fetch(floorsAPI + "/" + building + "/" + number)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setFloor(data)
        reset()
      })
  }

  useEffect(() => {
    getFloor()
  }, [])

  async function tryEditFloor(data: Floor) {
    // const color = JSON.stringify(data.floorColor)

    await fetch(floorsAPI + "/" + building + "/" + number, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user}`,
      },
      body: JSON.stringify({
        floorColor: data.floorColor,
      }),
    }).then(async (res) => {
      const answer = await res.json()

      if (!res.ok) {
        //TODO: toast
        alert(answer.message)
      } else {
        alert("Поверх успішно змінено")
      }
    })
  }

  const onSubmit = (data: any) => {
    tryEditFloor(data)
  }

  return (
    <DashLayout>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <ul className="dash-board__list">
          <li id="color-item" className="dash-board__item">
            <label htmlFor="floorColor" className="dash-board__label">
              Колір
            </label>
            <input
              {...register("floorColor")}
              type="color"
              id="floorColor"
              defaultValue={floor?.floorColor}
            />
          </li>
        </ul>

        <button id="create" className="dash-button">
          Редагувати
        </button>
      </form>
    </DashLayout>
  )
}
