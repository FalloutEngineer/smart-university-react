import React from "react"
import DashListItem from "./DashListItem"
import DashListRoom from "./DashListRoom"
import { ListTypeEnum } from "../../enums"
import DashListFloor from "./DashListFloor"
import DashListFaculty from "./DashListFaculty"
import DashListPulpit from "./DashListPulpit"
import DashListBuilding from "./DashListBuilding"

export default function DashListBody({
  listData,
  listType,
}: {
  listData: any[]
  listType: ListTypeEnum
}) {
  //TODO: Generate list by data
  return (
    <div className="dash-list__container">
      <ul className="dash-list">
        {listType === ListTypeEnum.ROOM
          ? listData.map((listItem) => {
              return <DashListRoom itemData={listItem} />
            })
          : ""}
        {listType === ListTypeEnum.FLOOR
          ? listData.map((listItem) => {
              return <DashListFloor itemData={listItem} />
            })
          : ""}
        {listType === ListTypeEnum.FACULTY
          ? listData.map((listItem) => {
              return <DashListFaculty itemData={listItem} />
            })
          : ""}
        {listType === ListTypeEnum.PULPIT
          ? listData.map((listItem) => {
              return <DashListPulpit itemData={listItem} />
            })
          : ""}
        {listType === ListTypeEnum.BUILDING
          ? listData.map((listItem) => {
              return <DashListBuilding itemData={listItem} />
            })
          : ""}
        {/* TODO: listData.map... */}
        {/* {listData.map(listItem => {
          if(listData.type){

          }
        })} */}
        {/* <DashListItem itemData={undefined} />
        <DashListItem itemData={undefined} />
        <DashListItem itemData={undefined} />
        <DashListItem itemData={undefined} />
        <DashListItem itemData={undefined} />
        <DashListItem itemData={undefined} />
        <DashListItem itemData={undefined} />
        <DashListItem itemData={undefined} />
        <DashListItem itemData={undefined} />
        <DashListItem itemData={undefined} />
        <DashListItem itemData={undefined} />
        <DashListItem itemData={undefined} />
        <DashListItem itemData={undefined} />
        <DashListItem itemData={undefined} />
        <DashListItem itemData={undefined} />
        <DashListItem itemData={undefined} />
        <DashListItem itemData={undefined} />
        <DashListItem itemData={undefined} />
        <DashListItem itemData={undefined} />
        <DashListItem itemData={undefined} /> */}
      </ul>
    </div>
  )
}
