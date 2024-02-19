import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

const roomTypes = [
  "Аудиторія",
  "Лабораторія",
  "Комп'ютерна аудиторія",
  "Кафедра",
  "Приміщення",
]

export default function RoomForm({
  createRoomCallback,
  faculties,
  floors,
  pulpits,
}: {
  createRoomCallback: any
  faculties: any
  floors: any
  pulpits: any
}) {
  const { register, handleSubmit, watch } = useForm()

  const watchFaculty = watch("faculty")

  const [currentPulpits, changeCurrentPulpits] = useState([])
  const [currentFloors, changeCurrentFloors] = useState([])

  useEffect(() => {
    const filteredPulpits = pulpits.filter(
      (pulpit: any) => pulpit.faculty === watchFaculty
    )

    const filteredFloors = floors.filter(
      (floor: any) => floor.faculty === watchFaculty
    )

    changeCurrentPulpits(filteredPulpits)
    changeCurrentFloors(filteredFloors)
  }, [watchFaculty])

  const onSubmit = (data: any) => {
    createRoomCallback(data)
    console.log(data)
  }

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <ul className="dash-board__list">
        <li id="faculty-item" className="dash-board__item">
          <label htmlFor="faculty" className="dash-board__label">
            До якого факультету належить?
          </label>
          <select
            {...register("faculty")}
            className="dash-select"
            name="faculty"
            id="faculties"
          >
            <option hidden disabled selected value={""}>
              {" "}
              -- Оберіть варіант --{" "}
            </option>
            {faculties.map((faculty: any) => {
              return <option value={faculty.name}>{faculty.name}</option>
            })}
          </select>
        </li>
        <li id="floor-item" className="dash-board__item">
          <label htmlFor="floor" className="dash-board__label">
            До якого поверху належить?
          </label>
          <select
            {...register("floor")}
            className="dash-select"
            name="floor"
            id="floors"
          >
            <option hidden disabled selected value={""}>
              {" "}
              -- Оберіть варіант --{" "}
            </option>
            {currentFloors.map((floor: any) => {
              return <option value={floor.number}>{floor.number}</option>
            })}
          </select>
        </li>
        <li id="pulpit-item" className="dash-board__item">
          <label htmlFor="" className="dash-board__label">
            До якої кафедри належить?
          </label>
          <select
            {...register("pulpit")}
            className="dash-select"
            name="pulpit"
            id="pulpits"
          >
            <option hidden disabled selected value={""}>
              {" "}
              -- Оберіть варіант --{" "}
            </option>
            {currentPulpits.map((pulpit: any) => {
              return <option value={pulpit.name}>{pulpit.name}</option>
            })}
          </select>
        </li>
        <li id="name-item" className="dash-board__item">
          <label htmlFor="" className="dash-board__label">
            Номер
          </label>
          <input
            {...register("number")}
            id="number"
            className="dash-board__input"
            type="number"
            min={0}
            defaultValue={0}
          />
        </li>
        <li id="capacity-item" className="dash-board__item">
          <label htmlFor="" className="dash-board__label">
            Кількість місць
          </label>
          <input
            {...register("capacity")}
            id="capacity"
            className="dash-board__input"
            type="number"
            min={0}
            defaultValue={0}
          />
        </li>
        <li className="dash-board__item">
          <label htmlFor="" className="dash-board__label">
            Тип приміщення
          </label>
          <select
            {...register("roomType")}
            className="dash-select"
            name="roomType"
            id="roomTypes"
          >
            <option hidden disabled selected value={""}>
              {" "}
              -- Оберіть варіант --{" "}
            </option>
            {roomTypes.map((roomType: string) => {
              return <option value={roomType}>{roomType}</option>
            })}
          </select>
        </li>
        <li id="description-item" className="dash-board__item">
          <label htmlFor="" className="dash-board__label">
            Опис
          </label>
          <textarea
            className="dash-board__textarea"
            id="description"
            cols={30}
            rows={10}
            placeholder="Введіть опис"
            {...register("description")}
            defaultValue={""}
          ></textarea>
        </li>
        <li id="assistant-item" className="dash-board__item">
          <label htmlFor="" className="dash-board__label">
            Асистент
          </label>
          <input
            {...register("assistant")}
            id="assistant"
            className="dash-board__input"
            type="text"
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

      <button id="create" className="dash-button">
        Створити
      </button>
    </form>
  )
}
