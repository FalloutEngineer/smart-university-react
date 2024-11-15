import React, { useEffect, useState } from "react"
import DashLayout from "../components/DashLayout/DashLayout"
import DashListHeader from "../components/DashList/DashListHeader"
import { NavLink } from "react-router-dom"

import "./damageList.css"

const API_URL = process.env.REACT_APP_API_URL

const damageAPI = API_URL + "/api/damagePost/"
const buildingsAPI = API_URL + "/api/buildings"

export default function DamageList() {
  const [listHeaderOptions, setListHeaderOptions] = useState(null)
  const [filter, setFilter] = useState(null)

  const [posts, setPosts] = useState([])

  const [buildings, setBuildings] = useState([])

  const [selectedBuilding, setSelectedBuilding] = useState("")

  const totalDamage = posts.reduce((accumulator: number, post: any) => {
    return accumulator + post.sum
  }, 0)

  const totalDamageByBuilding = posts.reduce(
    (accumulator: number, post: any) => {
      if (post.building === selectedBuilding) {
        return accumulator + post.sum
      }
      return accumulator
    },
    0
  )

  async function getBuildings() {
    try {
      const response = await fetch(buildingsAPI)
      const data = await response.json()

      setBuildings(data)
    } catch (e) {
      //TODO: toast?
      console.error(e)
    }
  }

  useEffect(() => {
    getBuildings()
  }, [])

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
        <div className="totalDamage">Загально збитків: {totalDamage} грн.</div>
        <div className="filteredDamage">
          Сума збитків в:
          <select
            className="dash-select"
            name="building"
            id="buildings"
            onChange={(e) => {
              setSelectedBuilding(e.target.value)
            }}
          >
            <option hidden disabled selected value={""}>
              {" "}
              -- Оберіть будівлю --{" "}
            </option>
            {buildings.map((building: any) => {
              return <option value={building.name}>{building.name}</option>
            })}
          </select>
          <div className="filteredDamageCount">
            {totalDamageByBuilding} грн.
          </div>
        </div>
      </div>
      <NavLink to={"../createDamagePost"}>Створити запис про збитки</NavLink>
      <div className="dash-list__container">
        <ul className="dash-list">
          <li className="dash-list__item">
            <p className="dash-list__heading">
              <span className="dash-list__property dash-list__property_name">
                Корпус
              </span>
              <span className="dash-list__property">Назва</span>
              <span className="dash-list__property">Сума</span>
            </p>
          </li>
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
