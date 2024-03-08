import React, { useState } from "react"
import DashLayout from "../components/DashLayout/DashLayout"
import { NavLink } from "react-router-dom"
import DashListHeader from "../components/DashList/DashListHeader"

export default function UsersList() {
  const listHeaderOptions = null
  const filter = null

  const [users, setUsers]: any = useState([
    { name: "Taras", role: "Superadmin" },
    { name: "Hanna", role: "Dean", faculty: "ФКНФМ" },
    {
      name: "Hanna",
      role: "Assistant",
      faculty: "ФКНФМ",
      rooms: [501, 507, 510],
    },
  ])

  return (
    <DashLayout>
      <DashListHeader options={listHeaderOptions} filterCallback={filter} />
      <NavLink to={"../createUser"}>Створити користувача</NavLink>
      <div className="dash-list__container">
        <ul className="dash-list">
          {users.map((user: any) => {
            return (
              <li className="dash-list__item">
                <NavLink to={"./" + user.name} className="dash-list__link">
                  <span className="dash-list__property">{user.name}</span>
                  <span className="dash-list__property">{user.role}</span>
                  {user.faculty && (
                    <span className="dash-list__property">{user.faculty}</span>
                  )}
                  {user.rooms &&
                    user.rooms.map((room: string) => {
                      return room + " "
                    })}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    </DashLayout>
  )
}
