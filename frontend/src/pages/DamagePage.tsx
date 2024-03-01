import React from "react"
import DashLayout from "../components/DashLayout/DashLayout"
import { NavLink } from "react-router-dom"

const API_URL = process.env.REACT_APP_API_URL

const damagePostsAPI = API_URL + "/api/damage"

export default function DamagePage() {
  function tryDeletePost() {
    console.log("lorem ipsum")
  }

  return (
    <DashLayout>
      <NavLink className="dash-board__edit" to={`./edit`}>
        Редагувати
      </NavLink>
      <button onClick={tryDeletePost}>Видалити</button>
      <ul className="dash-board__list">
        <li className="dash-board__item">
          <h3 className="dash-board__label">ID:</h3>
          <div className="dash-board__value">1234</div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Фото:</h3>
          <div className="dash-board__value">
            <img src={API_URL + "/images/damage/1.jpg"} alt="" />
          </div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Назва:</h3>
          <div className="dash-board__value">Розбите вікно</div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Місцезнаходження:</h3>
          <div className="dash-board__value">
            1 корпус, 5 поверх, 507 аудиторія
          </div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Опис:</h3>
          <div className="dash-board__value">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
            optio placeat vitae iure dolores, totam eveniet. Fugit possimus
            itaque animi quod facere, in, autem quasi, qui quia ut nostrum
            sapiente.
          </div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Передбачувана сума:</h3>
          <div className="dash-board__value">1000 грн</div>
        </li>
      </ul>
    </DashLayout>
  )
}
