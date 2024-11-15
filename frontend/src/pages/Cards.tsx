import React, { useEffect, useState } from "react"
import DashLayout from "../components/DashLayout/DashLayout"
import DashListHeader from "../components/DashList/DashListHeader"
import { NavLink } from "react-router-dom"

const API_URL = process.env.REACT_APP_API_URL

const facultyCardAPI = API_URL + `/api/facultyCard`
const pulpitCardAPI = API_URL + `/api/pulpitCard`

export default function Cards() {
  const [listHeaderOptions, setListHeaderOptions] = useState(null)
  const [filter, setFilter] = useState(null)

  const [facultyCards, setFacultyCards] = useState([])
  const [pulpitCards, setPulpitCards] = useState([])

  useEffect(() => {
    async function fetchFaculties() {
      const response = await fetch(facultyCardAPI)
      const data = await response.json()

      setFacultyCards(data)
    }

    fetchFaculties()
  }, [])

  useEffect(() => {
    async function fetchPulpits() {
      const response = await fetch(pulpitCardAPI)
      const data = await response.json()

      setPulpitCards(data)
    }

    fetchPulpits()
  }, [])

  return (
    <DashLayout>
      <DashListHeader options={listHeaderOptions} filterCallback={filter} />
      <div className="dash-list__container">
        <ul className="dash-list">
          {facultyCards.map((card: any) => {
            return (
              <li className="dash-list__item">
                <NavLink
                  to={"./faculty/" + card.name}
                  className="dash-list__link"
                >
                  <span className="dash-list__property dash-list__property_name">
                    {card.name}
                  </span>
                </NavLink>
              </li>
            )
          })}
          {pulpitCards.map((card: any) => {
            return (
              <li className="dash-list__item">
                <NavLink
                  to={"./pulpit/" + card.name}
                  className="dash-list__link"
                >
                  <span className="dash-list__property dash-list__property_name">
                    {card.name}
                  </span>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    </DashLayout>
  )
}
