import React from "react"
import { useForm } from "react-hook-form"

export default function PulpitForm({
  createPulpitCallback,
  faculties,
}: {
  createPulpitCallback: any
  faculties: any
}) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      faculty: "",
      name: "",
    },
  })

  const onSubmit = (data: any) => {
    createPulpitCallback(data)
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
            {faculties.map((faculty: any) => {
              return <option value={faculty.name}>{faculty.name}</option>
            })}
          </select>
        </li>
        <li id="name-item" className="dash-board__item">
          <label htmlFor="" className="dash-board__label">
            Назва
          </label>
          <input
            {...register("name")}
            id="number"
            className="dash-board__input"
            type="text"
            defaultValue={0}
          />
        </li>
      </ul>

      <button id="create" className="dash-button">
        Створити
      </button>
    </form>
  )
}
