import React, { useEffect, useState } from "react"
import DashLayout from "../components/DashLayout/DashLayout"
import { ItemTypeEnum } from "../enums"

import {
  Building,
  Faculty,
  Floor,
  ManageData,
  Pulpit,
  Room,
} from "../manageTypes"
import FacultyForm from "../components/ManageForms/FacultyForm"
import { useAuthContext } from "../hooks/useAuthContext"
import PulpitForm from "../components/ManageForms/PulpitForm"
import RoomForm from "../components/ManageForms/RoomForm"
import FloorForm from "../components/ManageForms/FloorForm"
import BuildingForm from "../components/ManageForms/BuildingForm"

const API_URL = process.env.REACT_APP_API_URL

const facultiesAPI = API_URL + "/api/faculties/"
const pulpitsAPI = API_URL + "/api/pulpits/"
const floorsAPI = API_URL + "/api/floors/"
const roomsAPI = API_URL + "/api/rooms/"
const buildingsAPI = API_URL + "/api/buildings/"

export default function Manage() {
  const { user } = useAuthContext()

  const [selectedType, changeSelectedType] = useState<ItemTypeEnum>(
    ItemTypeEnum.ROOM
  )

  const [currentFloors, changeCurrentFloors] = useState([])
  const [currentPulpits, changeCurrentPulpits] = useState([])

  const [faculties, setFaculties] = useState([])
  const [pulpits, setPulpits] = useState([])
  const [floors, setFloors] = useState([])
  const [buildings, setBuildings] = useState([])

  function handleTypeChange(type: ItemTypeEnum) {
    changeSelectedType(type)
  }

  function tryCreateFaculty(data: Faculty) {
    if (data.name !== "") {
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
    } else {
      //TODO: toast
      alert("Будь ласка заповніть всі поля")
    }
  }

  async function tryCreatePulpit(data: Pulpit) {
    fetch(pulpitsAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user}`,
      },
      body: JSON.stringify({
        ...data,
        rooms: [],
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

  async function tryCreateRoom(data: Room) {
    if (
      data.number &&
      data.faculty !== "" &&
      data.floor &&
      data.pulpit !== ""
    ) {
      const formData = new FormData()

      formData.append("number", String(data.number))
      formData.append("floor", data.floor)
      formData.append("faculty", data.faculty)
      formData.append("capacity", String(data.capacity))
      formData.append("type", data.roomType)

      for (let i = 0; i < data.images.length; i++) {
        formData.append("images", data.images[i])
      }

      formData.append("description", data.description)
      formData.append("assistant", data.assistant)
      formData.append("pulpits[]", JSON.stringify([data.pulpit]))
      formData.append("co2[]", JSON.stringify([]))
      formData.append("temperature[]", JSON.stringify([]))
      formData.append("co2_history[]", JSON.stringify([]))
      formData.append("temperature_history[]", JSON.stringify([]))

      await fetch(roomsAPI, {
        method: "POST",
        headers: {
          authorization: `Bearer ${user}`,
        },
        body: formData,
      }).then(async (res) => {
        const answer = await res.json()

        if (!res.ok) {
          //TODO: toast
          alert(answer.message)
        } else {
          alert("Об'єкт успішно створено")
        }
      })
    } else {
      alert("Будь ласка заповніть всі поля")
    }
  }

  async function tryCreateFloor(data: Floor) {
    if (data.number !== null && data.faculty !== "" && data.building !== "") {
      const formData = new FormData()

      formData.append("number", String(data.number))
      formData.append("svg", data.svg[0])
      formData.append("faculty", data.faculty)
      formData.append("building", data.building)
      formData.append("co2", JSON.stringify(data.co2))
      formData.append("temperature", JSON.stringify(data.temperature))
      formData.append("floorColor", data.floorColor)

      await fetch(floorsAPI, {
        method: "POST",
        headers: {
          authorization: `Bearer ${user}`,
        },
        body: formData,
      }).then(async (res) => {
        const answer = await res.json()

        if (!res.ok) {
          //TODO: toast
          alert(answer.message)
        } else {
          alert("Об'єкт успішно створено")
        }
      })
    } else {
      alert("Будь ласка заповніть всі поля")
    }
  }

  async function tryCreateBuilding(data: Building) {
    if (data.name !== "") {
      const formData = new FormData()

      formData.append("name", data.name)
      formData.append("svg", data.svg[0])
      formData.append("background", data.background[0])
      formData.append("floors[]", JSON.stringify([]))
      formData.append("address", data.address)
      formData.append("description", data.description)

      await fetch(buildingsAPI, {
        method: "POST",
        headers: {
          authorization: `Bearer ${user}`,
        },
        body: formData,
      }).then(async (res) => {
        const answer = await res.json()

        if (!res.ok) {
          //TODO: toast
          alert(answer.message)
        } else {
          alert("Об'єкт успішно створено")
        }
      })
    } else {
      alert("Будь ласка заповніть всі поля")
    }
  }

  function handleError(error: any) {
    //TODO: toast
    console.log(error)
  }

  useEffect(() => {
    //TODO: fetch all data

    fetch(facultiesAPI, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((data: any) => {
        setFaculties(data)
      })
    fetch(pulpitsAPI, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((data: any) => {
        setPulpits(data)
      })

    fetch(floorsAPI, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((data: any) => {
        setFloors(data)
      })
    fetch(floorsAPI, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((data: any) => {
        setFloors(data)
      })

    fetch(buildingsAPI, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((data: any) => {
        setBuildings(data)
      })
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
            onChange={(e) => handleTypeChange(e.target.value as ItemTypeEnum)}
          >
            <option value={ItemTypeEnum.ROOM}>Приміщення</option>
            <option value={ItemTypeEnum.PULPIT}>Кафедра</option>
            <option value={ItemTypeEnum.FACULTY}>Факультет</option>
            <option value={ItemTypeEnum.FLOOR}>Поверх</option>
            <option value={ItemTypeEnum.BUILDING}>Будівля</option>
          </select>
        </li>
      </div>

      {selectedType === ItemTypeEnum.FACULTY ? (
        <FacultyForm createFacultyCallback={tryCreateFaculty} />
      ) : null}
      {selectedType === ItemTypeEnum.PULPIT ? (
        <PulpitForm
          createPulpitCallback={tryCreatePulpit}
          faculties={faculties}
        />
      ) : null}
      {selectedType === ItemTypeEnum.ROOM ? (
        <RoomForm
          createRoomCallback={tryCreateRoom}
          faculties={faculties}
          floors={floors}
          pulpits={pulpits}
          buildings={buildings}
        />
      ) : null}
      {selectedType === ItemTypeEnum.FLOOR ? (
        <FloorForm
          createFloorCallback={tryCreateFloor}
          faculties={faculties}
          buildings={buildings}
        />
      ) : null}
      {selectedType === ItemTypeEnum.BUILDING ? (
        <BuildingForm createBuildingCallback={tryCreateBuilding} />
      ) : null}
    </DashLayout>
  )
}
