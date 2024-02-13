import React, { useEffect, useState } from "react"
import { useForm, useWatch } from "react-hook-form"

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
  }

  console.log(pulpits)

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
          />
        </li>
        <li id="capacity-item" className="dash-board__item">
          <label htmlFor="" className="dash-board__label">
            Кількість місць
          </label>
          <input
            {...register("capacity")}
            min={0}
            id="capacity"
            className="dash-board__input"
            type="number"
          />
        </li>
        <li className="dash-board__item">
          <label htmlFor="" className="dash-board__label">
            Тип приміщення
          </label>
          {/* v-model="selectedRoomType" */}
          <select className="dash-select" name="roomType" id="roomTypes">
            {/* v-bind:value="roomType" v-for="roomType in roomTypes" */}
            <option>{/*{roomType}*/}</option>
          </select>
        </li>
        <li id="description-item" className="dash-board__item">
          <label htmlFor="" className="dash-board__label">
            Опис
          </label>
          {/* v-model="description" */}
          <textarea
            name="description"
            className="dash-board__textarea"
            id="description"
            cols={30}
            rows={10}
            placeholder="Введіть опис"
          ></textarea>
        </li>
        <li id="assistant-item" className="dash-board__item">
          <label htmlFor="" className="dash-board__label">
            Асистент
          </label>
          {/* v-model="assistant" */}
          <input id="assistant" className="dash-board__input" type="text" />
        </li>
      </ul>

      <button id="create" className="dash-button">
        Створити
      </button>
    </form>
  )
}
