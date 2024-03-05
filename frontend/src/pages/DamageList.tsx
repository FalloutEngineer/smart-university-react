import React, { useEffect, useState } from "react"
import DashLayout from "../components/DashLayout/DashLayout"
import DashListHeader from "../components/DashList/DashListHeader"
import { NavLink } from "react-router-dom"

import "./damageList.css"

const API_URL = process.env.REACT_APP_API_URL

const damageAPI = API_URL + "/api/damagePost/"

export default function DamageList() {
  const [listHeaderOptions, setListHeaderOptions] = useState(null)
  const [filter, setFilter] = useState(null)

  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch(damageAPI)
        const data = await response.json()

        setPosts(data)
      } catch (e) {
        //TODO: toast?
        console.error(e)
      }
    }

    getPosts()
  }, [])

  return (
    <DashLayout>
      {/* //TODO: Власний фільтр */}
      <DashListHeader options={listHeaderOptions} filterCallback={filter} />
      <div className="damage-header">
        <div className="totalDamage">Загально збитків: 7000 грн.</div>
        <div className="filteredDamage">
          Сума збитків в:
          <select>
            <option value="Головний корпус">Головний корпус</option>
            <option value="2 корпус">2 корпус</option>
            <option value="5 корпус">5 корпус</option>
          </select>
          <div className="filteredDamageCount">6000 грн.</div>
        </div>
      </div>
      <NavLink to={"../createDamagePost"}>Створити запис про збитки</NavLink>
      <div className="dash-list__container">
        <ul className="dash-list">
          {posts.map((post: any) => {
            return (
              <li className="dash-list__item">
                <NavLink to={"./" + post.name} className="dash-list__link">
                  <span className="dash-list__property dash-list__property_name">
                    {post.building}
                  </span>
                  <span className="dash-list__property">{post.name}</span>
                  <span className="dash-list__property">{post.sum} грн.</span>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    </DashLayout>
  )
}
