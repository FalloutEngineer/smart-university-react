import React from "react"
import { useForm } from "react-hook-form"

export default function FloorForm({
  createFloorCallback,
  faculties,
  buildings,
}: {
  createFloorCallback: any
  faculties: any
  buildings: any
}) {
  const onSubmit = (data: any) => {
    createFloorCallback(data)
  }
  const { register, handleSubmit } = useForm()

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <ul className="dash-board__list">
        <li id="building-item" className="dash-board__item">
          <label htmlFor="" className="dash-board__label">
            До якої будівлі належить?
          </label>
          <select
            {...register("building")}
            className="dash-select"
            name="building"
            id="buildings"
          >
            <option hidden disabled selected value={""}>
              {" "}
              -- Оберіть варіант --{" "}
            </option>
            {buildings.map((building: any) => {
              return <option value={building.name}>{building.name}</option>
            })}
          </select>
        </li>
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

        <li id="co2-item" className="dash-board__item">
          <label htmlFor="co2" className="dash-board__label">
            Посилання на сенсор CO2
          </label>
          <input
            {...register("co2")}
            id="co2"
            className="dash-board__input"
            type="url"
          />
        </li>
        <li id="svg-item" className="dash-board__item">
          <label htmlFor="" className="dash-board__label">
            Посилання на сенсор температури
          </label>
          <input
            {...register("temperature")}
            id="temperature"
            className="dash-board__input"
            type="url"
          />
        </li>
        <li id="color-item" className="dash-board__item">
          <label htmlFor="floorColor" className="dash-board__label">
            Колір
          </label>
          <input type="color" id="floorColor" {...register("floorColor")} />
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
      </ul>

      <button id="create" className="dash-button">
        Створити
      </button>
    </form>
  )
}
