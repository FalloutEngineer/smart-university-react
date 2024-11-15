import React, { useEffect, useState } from "react"
import DashLayout from "../components/DashLayout/DashLayout"
import { NavLink } from "react-router-dom"
import DashListHeader from "../components/DashList/DashListHeader"
import { useAuthContext } from "../hooks/useAuthContext"

const API_URL = process.env.REACT_APP_API_URL

const rolesAPI = API_URL + "/api/roles/"

export default function RolesList() {
  const { user } = useAuthContext()

  const listHeaderOptions = null
  const filter = null

  const [roles, setRoles]: any = useState([])

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch(rolesAPI, {
          method: "GET",
          headers: {
            authorization: `Bearer ${user}`,
          },
        })

        const data = await response.json()

        setRoles(data)
      } catch (e) {
        alert(e)
      }
    }

    fetchRoles()
  }, [])

  return (
    <DashLayout>
      <DashListHeader options={listHeaderOptions} filterCallback={filter} />
      <NavLink to={"../createRole"}>Створити роль</NavLink>
      <div className="dash-list__container">
        <ul className="dash-list">
          <li className="dash-list__item">
            <p className="dash-list__heading">
              <span className="dash-list__property dash-list__property_name">
                Назва
              </span>
              <span className="dash-list__property">Успадковує</span>
            </p>
          </li>
          {roles.map((role: any) => {
            return (
              <li className="dash-list__item">
                <NavLink to={"./" + role.name} className="dash-list__link">
                  <span className="dash-list__property">{role.name}</span>
                  {role.isSuperAdmin ? (
                    <span className="dash-list__property">
                      {role.isSuperAdmin ? "СуперАдмін" : ""}
                    </span>
                  ) : role.isAdmin ? (
                    <span className="dash-list__property">
                      {role.isAdmin ? "Адмін" : ""}
                    </span>
                  ) : (
                    <>
                      <span className="dash-list__property">
                        {role.isEditor ? "Редактор" : ""}
                      </span>
                      <span className="dash-list__property">
                        {role.isEditor ? "Збитки" : ""}
                      </span>
                    </>
                  )}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    </DashLayout>
  )
}
