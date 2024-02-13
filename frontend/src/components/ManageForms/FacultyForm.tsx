import React from "react"
import { useForm } from "react-hook-form"

export default function FacultyForm({
  createFacultyCallback,
}: {
  createFacultyCallback: any
}) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
    },
  })

  const onSubmit = (data: any) => {
    createFacultyCallback(data)
  }

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <ul className="dash-board__list">
        <li id="name-item" className="dash-board__item">
          <label htmlFor="" className="dash-board__label">
            Назва
          </label>
          <input
            {...register("name")}
            id="text"
            className="dash-board__input"
            type="text"
            defaultValue={""}
          />
        </li>
      </ul>

      <button id="create" className="dash-button">
        Створити
      </button>
    </form>
  )
}
