import React from "react"
import { useForm } from "react-hook-form"

export default function BuildingForm({
  createBuildingCallback,
}: {
  createBuildingCallback: any
}) {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    createBuildingCallback(data)
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
            id="number"
            className="dash-board__input"
            type="text"
          />
        </li>
        <li id="svg-item" className="dash-board__item">
          <label htmlFor="" className="dash-board__label">
            SVG
          </label>
          <input
            id="svg"
            className="dash-board__input"
            type="file"
            accept=".svg"
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
            placeholder="Введіть опис"
          />
        </li>
      </ul>

      <button id="create" className="dash-button">
        Створити
      </button>
    </form>
  )
}
