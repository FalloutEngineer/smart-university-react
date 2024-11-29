import React, { useEffect, useState } from "react"
import DashLayout from "../components/DashLayout/DashLayout"
import DashListBody from "../components/DashList/DashListBody"
import { ItemTypeEnum } from "../enums"
import { useCookies } from "react-cookie"

const API_URL = process.env.REACT_APP_API_URL

const roomsAPI = API_URL + `/api/rooms`
const floorsAPI = API_URL + `/api/floors`
const facultiesAPI = API_URL + `/api/faculties`
const pulpitsAPI = API_URL + `/api/pulpits`
const buildingsAPI = API_URL + `/api/buildings`

export default function ListPage({ listType }: { listType: ItemTypeEnum }) {
  const [items, setItems] = useState(null)

  const fetchRooms = async () => {
    const response = await fetch(roomsAPI)

    const json = await response.json()

    setItems(json)
  }

  const fetchFloors = async () => {
    const response = await fetch(floorsAPI)

    const json = await response.json()

    setItems(json)
  }

  const fetchFaculties = async () => {
    const response = await fetch(facultiesAPI)

    const json = await response.json()
    setItems(json)
  }

  const fetchPulpits = async () => {
    const response = await fetch(pulpitsAPI)

    const json = await response.json()

    setItems(json)
  }

  const fetchBuildings = async () => {
    const response = await fetch(buildingsAPI)

    const json = await response.json()

    setItems(json)
  }

  //fetch depending on type
  useEffect(() => {
    switch (listType) {
      case ItemTypeEnum.ROOM:
        fetchRooms()
        break
      case ItemTypeEnum.FLOOR:
        fetchFloors()
        break
      case ItemTypeEnum.FACULTY:
        fetchFaculties()
        break
      case ItemTypeEnum.PULPIT:
        fetchPulpits()
        break
      case ItemTypeEnum.BUILDING:
        fetchBuildings()
        break
      default:
        break
    }
  }, [listType])

  function filter(name: string, value: any) {
    //TODO: filter changing
  }

  return (
    <DashLayout>
      {items && <DashListBody listData={items} listType={listType} />}
    </DashLayout>
  )
}

// TODO: return object depending on type
function getListHeaderOptions(listType: string) {
  const opts = {
    floor: false,
    faculty: false,
    pulpit: false,
    showSearch: false,
  }

  opts.floor = true
  opts.faculty = true
  opts.pulpit = true
  opts.showSearch = true

  return opts
}

// TODO: return object depending on type
function getListOptions(listType: string) {}
