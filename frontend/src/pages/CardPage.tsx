import React, { useEffect, useState } from "react"
import DashLayout from "../components/DashLayout/DashLayout"
import { useNavigate, useParams } from "react-router-dom"
import { NavLink } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

const API_URL = process.env.REACT_APP_API_URL

const facultyCardsAPI = API_URL + `/api/facultyCard`
const pulpitCardsAPI = API_URL + `/api/pulpitCard`

export default function CardPage() {
  const { user } = useAuthContext()
  const [cardData, setCardData]: any = useState(null)
  const navigate = useNavigate()

  const params = useParams()

  async function trySetCard(uri: string) {
    try {
      const response = await fetch(uri + "/" + params.name)
      const data = await response.json()

      setCardData(data)
      console.log(data)
    } catch (e) {
      //TODO: TOAST?
      console.error(e)
    }
  }

  useEffect(() => {
    if (params.type === "faculty") {
      trySetCard(facultyCardsAPI)
    }
    if (params.type === "pulpit") {
      trySetCard(pulpitCardsAPI)
    }
  }, [])

  async function tryDeleteCard(uri: string) {
    try {
      const response = await fetch(uri + "/" + params.name, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user}`,
        },
      })
      const data = await response.json()

      alert(data.message)
      navigate("/cards/")
    } catch (e) {
      alert(e)
    }
  }

  function onDeleteClick() {
    if (params.type === "faculty") {
      tryDeleteCard(facultyCardsAPI)
    }
    if (params.type === "pulpit") {
      tryDeleteCard(pulpitCardsAPI)
    }
  }

  return (
    <DashLayout>
      <button
        onClick={() => {
          onDeleteClick()
        }}
      >
        Видалити
      </button>

      <NavLink to={"./edit"}>Редагувати</NavLink>

      <ul className="dash-board__list">
        <li className="dash-board__item">
          <h3 className="dash-board__label">Назва:</h3>
          <div className="dash-board__value">{cardData?.name}</div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Іконка:</h3>
          {cardData?.icon}
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Кількість місць:</h3>
          <div className="dash-board__value">{cardData?.seats}</div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Площа:</h3>
          <div className="dash-board__value">{cardData?.area}</div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Кількість місць:</h3>
          <div className="dash-board__value">{cardData?.icon}</div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Колір:</h3>
          <div
            className="dash-board__value"
            style={{ backgroundColor: cardData?.color }}
          >
            {cardData?.color}
          </div>
        </li>
      </ul>
    </DashLayout>
  )
}
