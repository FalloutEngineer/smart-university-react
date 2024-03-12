import React from "react"
import DashLayout from "../components/DashLayout/DashLayout"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

const API_URL = process.env.REACT_APP_API_URL

const rolesAPI = API_URL + "/api/roles/"

export default function RolePage() {
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const params = useParams()

  async function tryDeleteRole() {
    try {
      const response = await fetch(rolesAPI + "/" + params.name, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user}`,
        },
      })
      const data = await response.json()

      alert(data.message)
      navigate("/roles/")
    } catch (e) {
      alert(e)
    }
  }

  function onDeleteClick() {
    tryDeleteRole()
  }

  return (
    <DashLayout>
      <button
        onClick={() => {
          onDeleteClick()
        }}
      >
        Видалити
      </button>
      <NavLink className="dash-board__edit" to={`./edit`}>
        Редагувати
      </NavLink>
      <ul className="dash-board__list">
        <li className="dash-board__item">
          <h3 className="dash-board__label">Назва:</h3>
          <div className="dash-board__value">Асистент 507</div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Суперадмін:</h3>
          <div className="dash-board__value">Ні</div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Адмін:</h3>
          <div className="dash-board__value">Ні</div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Редактор:</h3>
          <div className="dash-board__value">Ні</div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Можна редагувати збитки:</h3>
          <div className="dash-board__value">Ні</div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Будівлі:</h3>
          <div className="dash-board__value">-</div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Поверхи:</h3>
          <div className="dash-board__value">-</div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Факультети:</h3>
          <div className="dash-board__value">-</div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Приміщення:</h3>
          <div className="dash-board__value">507</div>
        </li>
      </ul>
    </DashLayout>
  )
}
