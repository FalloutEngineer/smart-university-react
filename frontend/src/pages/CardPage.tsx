import React, { useEffect, useState } from "react"
import DashLayout from "../components/DashLayout/DashLayout"
import { useParams } from "react-router-dom"

const API_URL = process.env.REACT_APP_API_URL

const facultyCardsAPI = API_URL + `/api/facultyCard`
const pulpitCardsAPI = API_URL + `/api/pulpitCard`

export default function CardPage() {
  const [cardData, setCardData] = useState(null)

  const params = useParams()

  async function trySetCard(uri: string) {
    try {
      const response = await fetch(uri + "/" + params.name)
      const data = await response.json()

      setCardData(data)
    } catch (e) {
      //TODO: TOAST?
      console.error(e)
    }
  }

  useEffect(() => {
    if (params.name === "faculty") {
      trySetCard(facultyCardsAPI)
    }
    if (params.name === "pulpit") {
      trySetCard(pulpitCardsAPI)
    }
  })

  async function tryDeleteCard(uri: string) {
    try {
      const response = await fetch(uri + "/" + params.name)
      const data = await response.json()

      alert(data)
    } catch (e) {
      alert(e)
    }
  }

  function onDeleteClick() {
    if (params.name === "faculty") {
      tryDeleteCard(facultyCardsAPI)
    }
    if (params.name === "pulpit") {
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
    </DashLayout>
  )
}
