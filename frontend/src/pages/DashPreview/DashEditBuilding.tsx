import React, { useEffect, useState } from "react"
import { RoomData } from "../../dashPreview"
import { useNavigate, useParams } from "react-router-dom"
import { useAuthContext } from "../../hooks/useAuthContext"
import DashLayout from "../../components/DashLayout/DashLayout"
import { Building, Room } from "../../manageTypes"
import { useForm } from "react-hook-form"

const API_URL = process.env.REACT_APP_API_URL

const buildingsAPI = API_URL + `/api/buildings`

export default function DashEditBuilding() {
  let { name } = useParams()
  const { user } = useAuthContext()

  const [building, setBuilding]: any = useState(null)

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: building?.name,
      background: building?.background,
      svg: building?.svg,
      address: building?.address,
      description: building?.description,
    },
  })

  async function getBuilding() {
    return fetch(buildingsAPI + "/" + name)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setBuilding(data)
        reset()
      })
  }

  useEffect(() => {
    getBuilding()
  }, [])

  async function tryEditBuilding(data: Building) {
    const formData = new FormData()

    formData.append("svg", data.svg[0])
    formData.append("background", data.background[0])
    formData.append("address", data.address)
    formData.append("description", data.description)

    await fetch(buildingsAPI + "/" + name, {
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
        alert("Будівлю успішно змінено")
      }
    })
  }

  const onSubmit = (data: any) => {
    tryEditBuilding(data)
  }

  return (
    <DashLayout>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <ul className="dash-board__list">
          <li id="svg-item" className="dash-board__item">
            <label htmlFor="" className="dash-board__label">
              SVG
            </label>
            <input
              id="svg"
              className="dash-board__input"
              type="file"
              accept=".svg"
              defaultValue={building?.svg}
              {...register("svg")}
            />
          </li>
          <li id="svg-item" className="dash-board__item">
            <label htmlFor="" className="dash-board__label">
              Фон
            </label>
            <input
              id="background"
              className="dash-board__input"
              type="file"
              accept="image/*"
              defaultValue={building?.background}
              {...register("background")}
            />
          </li>
          <li id="name-item" className="dash-board__item">
            <label htmlFor="" className="dash-board__label">
              Адреса
            </label>
            <input
              {...register("address")}
              id="number"
              className="dash-board__input"
              defaultValue={building?.address}
              type="text"
            />
          </li>
          <li id="name-item" className="dash-board__item">
            <label htmlFor="" className="dash-board__label">
              Опис
            </label>
            <textarea
              {...register("description")}
              className="dash-board__textarea"
              id="description"
              cols={30}
              rows={10}
              defaultValue={building?.description}
              placeholder="Введіть опис"
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
