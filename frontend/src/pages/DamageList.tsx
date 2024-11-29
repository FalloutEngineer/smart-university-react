import React, { useEffect, useRef, useState } from "react"
import DashLayout from "../components/DashLayout/DashLayout"
import { NavLink } from "react-router-dom"

import "./damageList.css"

const API_URL = process.env.REACT_APP_API_URL

const damageAPI = API_URL + "/api/damagePost/"
const buildingsAPI = API_URL + "/api/buildings"

export default function DamageList() {
  const [listHeaderOptions, setListHeaderOptions] = useState(null)

  const [posts, setPosts] = useState([])

  const [filteredPosts, setFilteredPosts] = useState<any[]>([])

  const [buildings, setBuildings] = useState([])

  const [selectedBuilding, setSelectedBuilding] = useState("")

  const lastDateFilterRef = useRef("asc")
  const lastPriceFilterRef = useRef("asc")

  const filters = document.querySelectorAll(".dash-filter__select")

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
        setFilteredPosts([...data])
      } catch (e) {
        //TODO: toast?
        console.error(e)
      }
    }

    getPosts()
  }, [])

  function filterByDate(e: any) {
    let result
    if (e.target.value === "asc") {
      result = [...posts]
      lastDateFilterRef.current = "asc"
    } else {
      result = [...posts].reverse()
      lastDateFilterRef.current = "desc"
    }
    setFilteredPosts(result)
  }

  function filterBySum(e: any) {
    let result
    result = [...posts].sort((current: any, next: any) => {
      return next.sum - current.sum
    })
    lastPriceFilterRef.current = "desc"
    if (e.target.value === "asc") {
      result = result.reverse()
      lastPriceFilterRef.current = "asc"
    }
    setFilteredPosts(result)
  }

  function onFilterClick(e: any, func: Function) {
    const isActive = e.target.className.split(" ").includes("active")

    if (!isActive) {
      filters.forEach((filter) => {
        filter.classList.remove("active")
        e.target.classList.add("active")
        func(e)
      })
    }
  }

  return (
    <DashLayout>
      {/* //TODO: Власний фільтр */}
      {/* <DashListHeader options={listHeaderOptions} filterCallback={filter} /> */}
      <div className="dash-filter">
        <div className="dash-filter__item">
          <span className="dash-filter__label">Дата додавання:</span>
          <select
            className="dash-filter__select active"
            id="byDate"
            onChange={filterByDate}
            onClick={(e) => {
              onFilterClick(e, filterByDate)
            }}
          >
            <option value="asc">Спочатку старі</option>
            <option value="desc">Спочатку нові</option>
          </select>
        </div>
        <div className="dash-filter__item">
          <span className="dash-filter__label">Сума:</span>
          <select
            className="dash-filter__select"
            onChange={filterBySum}
            onClick={(e) => {
              onFilterClick(e, filterBySum)
            }}
          >
            <option value="asc">За зростанням</option>
            <option value="desc">За спаданням</option>
          </select>
        </div>
      </div>
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
          {filteredPosts.map((post: any) => {
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
