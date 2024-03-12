import React from "react"
import DashLayout from "../components/DashLayout/DashLayout"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

const API_URL = process.env.REACT_APP_API_URL

const usersAPI = API_URL + "/api/users/"

export default function RolePage() {
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const params = useParams()

  async function tryDeleteUser() {
    try {
      const response = await fetch(usersAPI + params.name, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user}`,
        },
      })
      const data = await response.json()

      alert(data.message)
      navigate("/users/")
    } catch (e) {
      alert(e)
    }
  }

  function onDeleteClick() {
    tryDeleteUser()
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
          <h3 className="dash-board__label">Username:</h3>
          <div className="dash-board__value">Assistant507</div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Ім'я:</h3>
          <div className="dash-board__value">Немає</div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Роль:</h3>
          <div className="dash-board__value">Асистент 507</div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Приміщення:</h3>
          <div className="dash-board__value">507</div>
        </li>
      </ul>
    </DashLayout>
  )
}
