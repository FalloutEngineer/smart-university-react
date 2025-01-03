import React, { useEffect, useState } from "react"
import DashLayout from "../components/DashLayout/DashLayout"
import { NavLink } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

const API_URL = process.env.REACT_APP_API_URL

const usersAPI = API_URL + "/api/users/"
const rolesAPI = API_URL + "/api/roles/"

export default function UsersList() {
  const { user } = useAuthContext()

  const listHeaderOptions = null
  const filter = null

  const [users, setUsers]: any = useState([])

  const [roles, setRoles]: any = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(usersAPI, {
          method: "GET",
          headers: {
            authorization: `Bearer ${user}`,
          },
        })
        const data = await response.json()

        setUsers(data)
      } catch (e) {
        alert(e)
      }
    }

    fetchUsers()
  }, [])

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
  }, [JSON.stringify(users)])

  return (
    <DashLayout>
      <NavLink to={"../createUser"}>Створити користувача</NavLink>
      <div className="dash-list__container">
        <ul className="dash-list">
          <li className="dash-list__item">
            <p className="dash-list__heading">
              <span className="dash-list__property dash-list__property_name">
                Username
              </span>
              <span className="dash-list__property">Роль</span>
            </p>
          </li>
          {users.length > 0
            ? users.map((user: any) => {
                return (
                  <li className="dash-list__item">
                    <NavLink
                      to={"./" + user?.login}
                      className={"dash-list__link"}
                    >
                      <span className="dash-list__property">{user?.name}</span>
                      <span className="dash-list__property">
                        {roles.length > 0
                          ? roles.find(
                              (element: any) => element._id === user.role
                            )?.name
                          : ""}
                      </span>
                      {user.faculty && (
                        <span className="dash-list__property">
                          {user.faculty}
                        </span>
                      )}
                      {user.rooms &&
                        user.rooms.map((room: string) => {
                          return room + " "
                        })}
                    </NavLink>
                  </li>
                )
              })
            : ""}
        </ul>
      </div>
    </DashLayout>
  )
}
