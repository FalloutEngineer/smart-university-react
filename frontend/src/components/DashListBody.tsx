import React from "react"
import DashListItem from "./DashListItem"
import DashListRoom from "./DashListRoom"
import { ListTypeEnum } from "../enums"

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
