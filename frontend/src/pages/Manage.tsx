import React, { useEffect, useState } from "react"
import DashLayout from "../components/DashLayout/DashLayout"
import { ListTypeEnum } from "../enums"

import { Floor, ManageData } from "../manageTypes"
import FacultyForm from "../components/ManageForms/FacultyForm"
import { useAuthContext } from "../hooks/useAuthContext"

const API_URL = process.env.REACT_APP_API_URL

const facultiesAPI = API_URL + "/api/faculties/"

export default function Manage() {
  const { user } = useAuthContext()

  const [selectedType, changeSelectedType] = useState<ListTypeEnum>(
    ListTypeEnum.ROOM
  )

  const [currentFloors, changeCurrentFloors] = useState([])
  const [currentPulpits, changeCurrentPulpits] = useState([])

  const [faculties, setFaculties] = useState([])
  const [pulpits, setPulpits] = useState([])
  const [floors, setFloors] = useState([])
  const [buildings, setBuildings] = useState([])

  function handleTypeChange(type: ListTypeEnum) {
    changeSelectedType(type)
  }

  function handleSubmit() {}

  function handleFileUpload() {}

  function handleSVGUpload() {}

  function sendPOST(data: ManageData) {}

  async function tryCreateFaculty(data: Floor) {
    fetch(facultiesAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user}`,
      },
      body: JSON.stringify({
        ...data,
        floors: [],
        pulpits: [],
      }),
    }).then(async (res) => {
      const answer = await res.json()

      if (!res.ok) {
        //TODO: toast
        alert(answer.message)
      } else {
        alert("Об'єкт успішно створено")
      }
    })
  }

  function handleError(error: any) {
    //TODO: toast
    console.log(error)
  }

  useEffect(() => {
    //TODO: fetch all data
  }, [])

  return (
    <DashLayout>
      <div className="formType">
        <li className="dash-board__item">
          <label htmlFor="type" className="dash-board__label">
            Що створити?
          </label>
          <select
            className="dash-select"
            name="type"
            id="type"
            onChange={(e) => handleTypeChange(e.target.value as ListTypeEnum)}
          >
            <option value={ListTypeEnum.ROOM}>Приміщення</option>
            <option value={ListTypeEnum.PULPIT}>Кафедра</option>
            <option value={ListTypeEnum.FACULTY}>Факультет</option>
            <option value={ListTypeEnum.FLOOR}>Поверх</option>
            <option value={ListTypeEnum.BUILDING}>Будівля</option>
          </select>
        </li>
      </div>

      {selectedType === ListTypeEnum.FACULTY ? (
        <FacultyForm createFacultyCallback={tryCreateFaculty} />
      ) : null}
    </DashLayout>
  )
}
