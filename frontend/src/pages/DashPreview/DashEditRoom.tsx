import React, { useEffect, useState } from "react"
import { RoomData } from "../../dashPreview"
import { useNavigate, useParams } from "react-router-dom"
import { useAuthContext } from "../../hooks/useAuthContext"
import DashLayout from "../../components/DashLayout/DashLayout"
import { Room } from "../../manageTypes"
import { useForm } from "react-hook-form"
import { useCookies } from "react-cookie"

const roomTypes = [
  "Аудиторія",
  "Лабораторія",
  "Комп'ютерна аудиторія",
  "Кафедра",
  "Приміщення",
]

export default function DashEditRoom({ endpoint }: { endpoint: string }) {
  let { name } = useParams()
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const [room, setRoom] = useState<RoomData>(null)

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      number: room?.number,
      capacity: room?.capacity,
      roomType: room?.type,
      description: room?.description,
      assistant: room?.assistant,
      images: room?.photo_links,
    },
  })

  async function getRoom() {
    return fetch(endpoint + name)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setRoom(data)
        reset()
      })
  }

  useEffect(() => {
    getRoom()
  }, [])

  async function tryEditRoom(data: Room) {
    if (data.number && room && room.floor && room.pulpits) {
      const formData = new FormData()

      formData.append("number", String(data.number))

      formData.append("capacity", String(data.capacity))
      formData.append("type", data.roomType)

      formData.append("floor", String(room.floor))
      formData.append("faculty", room.faculty)

      for (let i = 0; i < data.images.length; i++) {
        formData.append("images", data.images[i])
      }

      formData.append("description", data.description)
      formData.append("assistant", data.assistant)

      formData.append("pulpits[]", JSON.stringify(room.pulpits))
      formData.append("co2[]", JSON.stringify([]))
      formData.append("temperature[]", JSON.stringify([]))
      formData.append("co2_history[]", JSON.stringify([]))
      formData.append("temperature_history[]", JSON.stringify([]))

      await fetch(endpoint + name, {
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
    tryEditRoom(data)
  }

  return (
    <DashLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul className="dash-board__list">
          <li className="dash-board__item">
            <label htmlFor="number" className="dash-board__label">
              Номер
            </label>
            <input
              {...register("number")}
              id="number"
              className="dash-board__input"
              type="number"
              min={0}
              defaultValue={room?.number}
            />
          </li>
          <li className="dash-board__item">
            <label htmlFor="capacity" className="dash-board__label">
              Кількість місць
            </label>
            <input
              {...register("capacity")}
              id="capacity"
              className="dash-board__input"
              type="number"
              min={0}
              defaultValue={room?.capacity}
            />
          </li>
          <li className="dash-board__item">
            <label htmlFor="type" className="dash-board__label">
              Тип
            </label>
            <select
              {...register("roomType")}
              className="dash-select"
              name="roomType"
              id="roomTypes"
              defaultValue={room?.type}
            >
              {roomTypes.map((roomType: string, index: number) => {
                return <option value={roomType}>{roomType}</option>
              })}
            </select>
          </li>
          <li className="dash-board__item">
            <label htmlFor="assistant" className="dash-board__label">
              Асистент
            </label>
            <input
              {...register("assistant")}
              id="assistant"
              type="text"
              className="dash-board__input"
              defaultValue={room?.assistant}
            />
          </li>
          <li className="dash-board__item">
            <label htmlFor="description" className="dash-board__label">
              Опис Приміщення
            </label>
            <textarea
              className="dash-board__textarea"
              id="description"
              cols={30}
              rows={10}
              placeholder="Введіть опис"
              {...register("description")}
              defaultValue={room?.description}
            ></textarea>
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
