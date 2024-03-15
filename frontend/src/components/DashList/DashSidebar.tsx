import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { useAuthContext } from "../../hooks/useAuthContext"
import {
  canEditDamage,
  isEditor,
  isSuperAdmin,
} from "../../util/permissionsCheckers"

const API_URL = process.env.REACT_APP_API_URL

const aboutAPI = API_URL + "/api/aboutMe"

export default function DashSidebar({ page }: { page?: string }) {
  const { user } = useAuthContext()

  const [role, setRole]: any = useState(null)

  useEffect(() => {
    const fetchAbout = async () => {
      const response = await fetch(aboutAPI, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user}`,
        },
      })

      const data = await response.json()
      setRole(data.role)
    }

    fetchAbout()
  })

  //TODO: GET USER ROLE

  return (
    <div className="dash-sidebar">
      <ul className="dash-sidebar__list">
        {role && canEditDamage(role) && (
          <li className="dash-sidebar__item">
            <NavLink to="/damage" className={"dash-sidebar__link "}>
              Збитки
            </NavLink>
          </li>
        )}
        {role && isEditor(role) && (
          <>
            {" "}
            <li className="dash-sidebar__item">
              <NavLink to="/manage" className={"dash-sidebar__link "}>
                Створити об'єкт університета
              </NavLink>
            </li>
            <li className="dash-sidebar__item">
              <NavLink to="/manageCard" className={"dash-sidebar__link "}>
                Створити картку
              </NavLink>
            </li>
            <li className="dash-sidebar__item">
              <NavLink to="/cards" className={"dash-sidebar__link "}>
                Список карток
              </NavLink>
            </li>
            <li className="dash-sidebar__item">
              <NavLink to="/room-list" className={"dash-sidebar__link "}>
                Список приміщень
              </NavLink>
            </li>
            <li className="dash-sidebar__item">
              <NavLink to="/floor-list" className={"dash-sidebar__link "}>
                Список поверхів
              </NavLink>
            </li>
            <li className="dash-sidebar__item">
              <NavLink to="/faculty-list" className={"dash-sidebar__link "}>
                Список факультетів
              </NavLink>
            </li>
            <li className="dash-sidebar__item">
              <NavLink to="/pulpit-list" className={"dash-sidebar__link "}>
                Список кафедр
              </NavLink>
            </li>
            <li className="dash-sidebar__item">
              <NavLink to="/building-list" className={"dash-sidebar__link "}>
                Список будівель
              </NavLink>
            </li>
          </>
        )}

        {role && isEditor(role) && (
          <li className="dash-sidebar__item">
            <NavLink to="/managePages" className={"dash-sidebar__link "}>
              Список сторінок
            </NavLink>
          </li>
        )}
        {role && isSuperAdmin(role) && (
          <li className="dash-sidebar__item">
            <NavLink to="/users" className={"dash-sidebar__link "}>
              Користувачі
            </NavLink>
          </li>
        )}
        {role && isSuperAdmin(role) && (
          <li className="dash-sidebar__item">
            <NavLink to="/roles" className={"dash-sidebar__link "}>
              Ролі
            </NavLink>
          </li>
        )}
        <li className="dash-sidebar__item">
          <NavLink to="/help" className={"dash-sidebar__link "}>
            Допомога
          </NavLink>
        </li>
      </ul>
    </div>
  )
}
