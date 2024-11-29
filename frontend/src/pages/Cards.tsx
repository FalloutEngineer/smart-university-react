import React, { useEffect, useRef, useState } from "react"
import DashLayout from "../components/DashLayout/DashLayout"
import { NavLink } from "react-router-dom"

const API_URL = process.env.REACT_APP_API_URL

const facultyCardAPI = API_URL + `/api/facultyCard`
const pulpitCardAPI = API_URL + `/api/pulpitCard`

export default function Cards() {
  const [facultyCards, setFacultyCards] = useState([])
  const [pulpitCards, setPulpitCards] = useState([])

  const [cards, setCards] = useState([])

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

  useEffect(() => {
    async function composeCards() {
      const newFaculties = [...facultyCards]
      const newPulpits = [...pulpitCards]

      newFaculties.map((item: any) => (item.type = "faculty"))
      newPulpits.map((item: any) => (item.type = "pulpit"))

      const newArr = [...newFaculties, ...newPulpits]
      newArr.sort((a: any, b: any) => a.name.localeCompare(b.name))
      setCards(newArr)
    }

    composeCards()
  }, [facultyCards, pulpitCards])

  return (
    <DashLayout>
      <div className="dash-list__container">
        <ul className="dash-list">
          {cards.map((card: any) => {
            return (
              <li className="dash-list__item">
                <NavLink
                  to={
                    (card.type === "faculty" ? "./faculty/" : "./pulpit/") +
                    card.name
                  }
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
