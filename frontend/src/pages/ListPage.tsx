import React, { useEffect, useState } from "react"
import DashLayout from "../components/DashLayout/DashLayout"
import DashListHeader from "../components/DashListHeader"
import DashListBody from "../components/DashListBody"
import { ListTypeEnum } from "../enums"

const API_URL = process.env.REACT_APP_API_URL

const roomsAPI = API_URL + `/api/rooms`

export default function ListPage({ listType }: { listType: string }) {
  const listHeaderOptions = getListHeaderOptions(listType)

  const [items, setItems] = useState(null)

  //fetch depending on type
  useEffect(() => {
    const fetchRooms = async () => {
      const response = await fetch(roomsAPI)

      const json = await response.json()

      setItems(json)
    }
    fetchRooms()
  }, [])

  console.log(items)

  function filter(name: string, value: any) {
    //TODO: filter changing
  }

  return (
    <DashLayout>
      {/* TODO: maybe zustand? */}
      <DashListHeader options={listHeaderOptions} filterCallback={filter} />
      {items && <DashListBody listData={items} listType={ListTypeEnum.ROOM} />}
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
