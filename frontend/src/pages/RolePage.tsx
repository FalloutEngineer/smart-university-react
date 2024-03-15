import React, { useEffect, useState } from "react"
import DashLayout from "../components/DashLayout/DashLayout"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

const API_URL = process.env.REACT_APP_API_URL

const rolesAPI = API_URL + "/api/roles/"

const usersAPI = API_URL + "/api/users/"

export default function RolePage() {
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const [role, setRole]: any = useState(null)

  const [pageUser, setPageUser]: any = useState(null)

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

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(usersAPI + "/" + params.name, {
        method: "GET",
        headers: {
          authorization: `Bearer ${user}`,
        },
      })

      const data = await response.json()

      setPageUser(data)
    }

    fetchUser()
  }, [])

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await fetch(rolesAPI + params.name, {
          method: "GET",
          headers: {
            authorization: `Bearer ${user}`,
          },
        })

        const data = await response.json()

        console.log(data)
        setRole(data)
      } catch (e) {
        alert(e)
      }
    }

    fetchRole()
  }, [])

  return (
    <DashLayout>
      {pageUser?.isEditable ? (
        <>
          {" "}
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
        </>
      ) : (
        ""
      )}

      <ul className="dash-board__list">
        <li className="dash-board__item">
          <h3 className="dash-board__label">Назва:</h3>
          <div className="dash-board__value">{role?.name}</div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Суперадмін:</h3>
          <div className="dash-board__value">
            {role?.isSuperAdmin ? "Так" : "Ні"}
          </div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Адмін:</h3>
          <div className="dash-board__value">
            {role?.isAdmin ? "Так" : "Ні"}
          </div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Редактор:</h3>
          <div className="dash-board__value">
            {role?.isEditor ? "Так" : "Ні"}
          </div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Можна редагувати збитки:</h3>
          <div className="dash-board__value">
            {role?.canEditDamage ? "Так" : "Ні"}
          </div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Будівлі:</h3>
          <div className="dash-board__value">
            {role?.buildings.length > 0 ? role?.buildings : "-"}
          </div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Поверхи:</h3>
          <div className="dash-board__value">
            {role?.floors.length > 0 ? role?.floors : "-"}
          </div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Факультети:</h3>
          <div className="dash-board__value">
            {role?.faculties.length > 0 ? role?.faculties : "-"}
          </div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Приміщення:</h3>
          <div className="dash-board__value">
            {role?.rooms.length > 0 ? role?.rooms : "-"}
          </div>
        </li>
      </ul>
    </DashLayout>
  )
}
