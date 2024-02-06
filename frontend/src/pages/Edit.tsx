import React from "react"
import DashLayout from "../components/DashLayout/DashLayout"

export default function Edit() {
  return (
    <DashLayout>
      <div className="dash-container">
        <div className="dash-body">
          <div className="dash-board">
            <div className="dash-board__container">
              <ul className="dash-board__list">
                <li className="dash-board__item">
                  <label htmlFor="number" className="dash-board__label">
                    Номер
                  </label>
                  <input
                    v-model="number"
                    id="number"
                    type="number"
                    className="dash-board__input"
                  />
                </li>
                <li className="dash-board__item">
                  <label htmlFor="capacity" className="dash-board__label">
                    Кількість місць
                  </label>
                  <input
                    v-model="capacity"
                    id="capacity"
                    type="number"
                    className="dash-board__input"
                  />
                </li>
                <li className="dash-board__item">
                  <label htmlFor="type" className="dash-board__label">
                    Тип
                  </label>
                  <select
                    v-model="selectedRoomType"
                    className="dash-select"
                    name="type"
                    id="type"
                  >
                    <option value="room">Лекційна</option>
                    <option value="pulpit">Лабораторія</option>
                    <option value="faculty">Комп'ютерна</option>
                  </select>
                </li>
                <li className="dash-board__item">
                  <label htmlFor="assistant" className="dash-board__label">
                    Асистент
                  </label>
                  <input
                    v-model="assistant"
                    id="assistant"
                    type="text"
                    className="dash-board__input"
                  />
                </li>
                <li className="dash-board__item">
                  <label htmlFor="description" className="dash-board__label">
                    Опис Приміщення
                  </label>
                  <textarea
                    v-model="description"
                    name="description"
                    className="dash-board__textarea"
                    id="description"
                    cols={30}
                    rows={10}
                    placeholder="Введіть опис"
                  ></textarea>
                </li>
                <li v-cloak id="images-item" className="dash-board__item">
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
              <button
                v-on:click="updateItem()"
                id="save"
                className="dash-button"
              >
                Зберегти
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashLayout>
  )
}
