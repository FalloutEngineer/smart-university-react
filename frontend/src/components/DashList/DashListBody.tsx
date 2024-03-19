import React from "react"
import DashListItem from "./DashListItem"
import DashListRoom from "./DashListRoom"
import { ItemTypeEnum } from "../../enums"
import DashListFloor from "./DashListFloor"
import DashListFaculty from "./DashListFaculty"
import DashListPulpit from "./DashListPulpit"
import DashListBuilding from "./DashListBuilding"
import { useCookies } from "react-cookie"
import {
  canEditAtLeastOneFloor,
  canEditAtLeastOneRoom,
  isEditor,
} from "../../util/permissionsCheckers"

export default function DashListBody({
  listData,
  listType,
}: {
  listData: any[]
  listType: ItemTypeEnum
}) {
  const [cookies, setCookie] = useCookies(["role"])

  const myRole = cookies["role"] ? cookies["role"] : ""

  return (
    <div className="dash-list__container">
      <ul className="dash-list">
        {listType === ItemTypeEnum.ROOM
          ? listData.map((listItem) => {
              return myRole.rooms.includes(listItem.number) ||
                isEditor(myRole) ? (
                <DashListRoom itemData={listItem} />
              ) : null
            })
          : ""}
        {listType === ItemTypeEnum.FLOOR
          ? listData.map((listItem) => {
              return myRole.floors.includes(listItem._id) ||
                isEditor(myRole) ? (
                <DashListFloor itemData={listItem} />
              ) : null
            })
          : ""}
        {listType === ItemTypeEnum.FACULTY
          ? listData.map((listItem) => {
              return myRole.faculties.includes(listItem._id) ||
                isEditor(myRole) ? (
                <DashListFaculty itemData={listItem} />
              ) : null
            })
          : ""}
        {listType === ItemTypeEnum.PULPIT
          ? listData.map((listItem) => {
              return isEditor(myRole) ? (
                <DashListPulpit itemData={listItem} />
              ) : null
            })
          : ""}
        {listType === ItemTypeEnum.BUILDING
          ? listData.map((listItem) => {
              return myRole.buildings.includes(listItem._id) ||
                isEditor(myRole) ? (
                <DashListBuilding itemData={listItem} />
              ) : null
            })
          : ""}
        {/* TODO: listData.map... */}
        {/* {listData.map(listItem => {
          if(listData.type){

          }
        })} */}
      </ul>
    </div>
  )
}
