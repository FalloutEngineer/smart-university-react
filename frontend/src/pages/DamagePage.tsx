import React, { useEffect, useState } from "react"
import DashLayout from "../components/DashLayout/DashLayout"
import { NavLink, useParams } from "react-router-dom"

const API_URL = process.env.REACT_APP_API_URL

const damagePostsAPI = API_URL + "/api/damagePost/"

export default function DamagePage() {
  const params = useParams()

  const [damage, setDamage] = useState(null)

  useEffect(() => {
    const fetchDamage = async () => {
      try {
        const response = await fetch(damagePostsAPI + params.name)
        const data = await response.json()

        console.log(data)
      } catch (e) {
        //TODO: toast?
        console.error(e)
      }
    }

    fetchDamage()
  }, [])

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
