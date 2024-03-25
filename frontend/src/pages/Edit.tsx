import React from "react"
import DashLayout from "../components/DashLayout/DashLayout"

export default function Edit() {
  return (
    <DashLayout>
      <ul className="dash-board__list">
        <li className="dash-board__item">
          <label htmlFor="number" className="dash-board__label">
            Номер
          </label>
          {/* v-model="number" */}
          <input id="number" type="number" className="dash-board__input" />
        </li>
        <li className="dash-board__item">
          <label htmlFor="capacity" className="dash-board__label">
            Кількість місць
          </label>
          {/* v-model="capacity" */}
          <input id="capacity" type="number" className="dash-board__input" />
        </li>
        <li className="dash-board__item">
          <label htmlFor="type" className="dash-board__label">
            Тип
          </label>
          {/* v-model="selectedRoomType" */}
          <select className="dash-select" name="type" id="type">
            <option value="room">Лекційна</option>
            <option value="pulpit">Лабораторія</option>
            <option value="faculty">Комп'ютерна</option>
          </select>
        </li>
        <li className="dash-board__item">
          <label htmlFor="assistant" className="dash-board__label">
            Асистент
          </label>
          {/* v-model="assistant" */}
          <input id="assistant" type="text" className="dash-board__input" />
        </li>
        <li className="dash-board__item">
          <label htmlFor="description" className="dash-board__label">
            Опис Приміщення
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
        {/* v-cloak  */}
        <li id="images-item" className="dash-board__item">
          <label htmlFor="" className="dash-board__label">
            Зображення
          </label>
          {/* enctype="multipart/form-data" multiple v-on:change="handleFileUpload" */}
          <input
            id="images"
            className="dash-board__input"
            type="file"
            accept="image/*"
          />
        </li>
      </ul>
      {/* v-on:click="updateItem()" */}
      <button id="save" className="dash-button">
        Зберегти
      </button>
    </DashLayout>
  )
}
