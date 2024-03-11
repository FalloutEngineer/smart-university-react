import React, { useState } from "react"
import DashLayout from "../components/DashLayout/DashLayout"
import { NavLink } from "react-router-dom"
import DashListHeader from "../components/DashList/DashListHeader"

export default function RolesList() {
  const listHeaderOptions = null
  const filter = null

  const [roles, setRoles]: any = useState([
    { name: "Головний адміністратор", isSuperAdmin: true },
    { name: "Ректор", isSuperAdmin: true },
    { name: "Проректор", isSuperAdmin: false, isAdmin: true },
    {
      name: "Редактор",
      isSuperAdmin: false,
      isAdmin: false,
      isEditor: true,
      canEditDamage: true,
    },
    {
      name: "Асистент ФКНФМ",
      isSuperAdmin: false,
      isAdmin: false,
      isEditor: false,
      canEditDamage: false,
      rooms: [111, 112, 113],
    },
  ])

  return (
    <DashLayout>
      <DashListHeader options={listHeaderOptions} filterCallback={filter} />
      <NavLink to={"../createUser"}>Створити роль</NavLink>
      <div className="dash-list__container">
        <ul className="dash-list">
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
