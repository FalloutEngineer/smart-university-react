import React, { useEffect, useLayoutEffect, useState } from "react"
import DashLayout from "../components/DashLayout/DashLayout"
import DashListHeader from "../components/DashListHeader"
import DashListBody from "../components/DashListBody"
import { ListTypeEnum } from "../enums"

const API_URL = process.env.REACT_APP_API_URL

const roomsAPI = API_URL + `/api/rooms`
const floorsAPI = API_URL + `/api/floors`
const facultiesAPI = API_URL + `/api/faculties`

export default function ListPage({ listType }: { listType: ListTypeEnum }) {
  const listHeaderOptions = getListHeaderOptions(listType)

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

    console.log(json)

    setItems(json)
  }

  //fetch depending on type
  useLayoutEffect(() => {
    switch (listType) {
      case ListTypeEnum.ROOM:
        fetchRooms()
        break
      case ListTypeEnum.FLOOR:
        fetchFloors()
        break
      case ListTypeEnum.FACULTY:
        fetchFaculties()
        break
      default:
        break
    }
  }, [listType])

  console.log(items)

  function filter(name: string, value: any) {
    //TODO: filter changing
  }

  return (
    <DashLayout>
      {/* TODO: maybe zustand? */}
      <DashListHeader options={listHeaderOptions} filterCallback={filter} />
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
