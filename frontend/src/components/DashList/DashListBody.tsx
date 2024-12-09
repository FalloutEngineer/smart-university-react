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
        {listType === ItemTypeEnum.ROOM ? (
          <li className="dash-list__item">
            <p className="dash-list__heading">
              <span className="dash-list__property dash-list__property_name">
                Номер
              </span>
              <span className="dash-list__property">Факультет</span>
              <span className="dash-list__property">Кафедра</span>
              <span className="dash-list__property">Поверх</span>
            </p>
          </li>
        ) : (
          ""
        )}
        {listType === ItemTypeEnum.FLOOR ? (
          <li className="dash-list__item">
            <p className="dash-list__heading">
              <span className="dash-list__property dash-list__property_name">
                Номер
              </span>
              <span className="dash-list__property">Корпус</span>
              <span className="dash-list__property">Факультет</span>
            </p>
          </li>
        ) : (
          ""
        )}
        {listType === ItemTypeEnum.FACULTY ? (
          <li className="dash-list__item">
            <p className="dash-list__heading">
              <span className="dash-list__property dash-list__property_name">
                Назва
              </span>
            </p>
          </li>
        ) : (
          ""
        )}
        {listType === ItemTypeEnum.BUILDING ? (
          <li className="dash-list__item">
            <p className="dash-list__heading">
              <span className="dash-list__property dash-list__property_name">
                Назва
              </span>
            </p>
          </li>
        ) : (
          ""
        )}
        {listType === ItemTypeEnum.PULPIT ? (
          <li className="dash-list__item">
            <p className="dash-list__heading">
              <span className="dash-list__property dash-list__property_name">
                Назва
              </span>
              <span className="dash-list__property">Факультет</span>
            </p>
          </li>
        ) : (
          ""
        )}
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
      </ul>
    </div>
  )
}
