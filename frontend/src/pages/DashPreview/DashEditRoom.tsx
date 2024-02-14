import React from "react"
import { DashPreview } from "../../dashPreview"
import { useParams } from "react-router-dom"
import { useAuthContext } from "../../hooks/useAuthContext"
import DashLayout from "../../components/DashLayout/DashLayout"

export default function DashEditRoom({ endpoint }: { endpoint: string }) {
  let { name } = useParams()
  const { user } = useAuthContext()

  return (
    <DashLayout>
      <ul className="dash-board__list">
        <li className="dash-board__item">
          <label htmlFor="number" className="dash-board__label">
            Номер
          </label>
          <input id="number" type="number" className="dash-board__input" />
        </li>
        <li className="dash-board__item">
          <label htmlFor="capacity" className="dash-board__label">
            Кількість місць
          </label>
          <input id="capacity" type="number" className="dash-board__input" />
        </li>
        <li className="dash-board__item">
          <label htmlFor="type" className="dash-board__label">
            Тип
          </label>
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
          <input id="assistant" type="text" className="dash-board__input" />
        </li>
        <li className="dash-board__item">
          <label htmlFor="description" className="dash-board__label">
            Опис Приміщення
          </label>
          <textarea
            name="description"
            className="dash-board__textarea"
            id="description"
            cols={30}
            rows={10}
            placeholder="Введіть опис"
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
          />
        </li>
      </ul>
      <button id="save" className="dash-button">
        Зберегти
      </button>
    </DashLayout>
  )
}
