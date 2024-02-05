import React from "react"
import DashLayout from "../components/DashLayout/DashLayout"
import DashListHeader from "../components/DashListHeader"
import DashListBody from "../components/DashListBody"

export default function ListPage({ listType }: { listType: string }) {
  const listHeaderOptions = getListHeaderOptions(listType)

  const listData: any[] = []

  function filter(name: string, value: any) {
    //TODO: filter changing
  }

  return (
    <DashLayout>
      {/* TODO: maybe zustand? */}
      <DashListHeader options={listHeaderOptions} filterCallback={filter} />
      <DashListBody listData={listData} />
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
