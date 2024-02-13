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
          {/* TODO: REWORK ENCTYPE */}
          {/* encType="multipart/form-data" */}
          {/* enctype="multipart/form-data" v-on:change="handleSvgUpload" */}
          <input
            id="svg"
            className="dash-board__input"
            type="file"
            accept=".svg"
            {...register("svg")}
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
      </ul>

      <button id="create" className="dash-button">
        Створити
      </button>
    </form>
  )
}
