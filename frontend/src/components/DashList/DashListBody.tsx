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
          ? listData
              .sort((a, b) => a.number - b.number)
              .map((listItem) => {
                return myRole.rooms.includes(listItem.number) ||
                  isEditor(myRole) ? (
                  <DashListRoom itemData={listItem} />
                ) : null
              })
          : ""}

        {listType === ItemTypeEnum.FLOOR
          ? listData
              .sort((a: any, b: any) =>
                a.building[0].localeCompare(b.building[0])
              )
              .map((listItem) => {
                return myRole.floors.includes(listItem._id) ||
                  isEditor(myRole) ? (
                  <DashListFloor itemData={listItem} />
                ) : null
              })
          : ""}
        {listType === ItemTypeEnum.FACULTY
          ? listData
              .sort((a: any, b: any) => a.name.localeCompare(b.name))
              .map((listItem) => {
                return myRole.faculties.includes(listItem._id) ||
                  isEditor(myRole) ? (
                  <DashListFaculty itemData={listItem} />
                ) : null
              })
          : ""}
        {listType === ItemTypeEnum.PULPIT
          ? listData
              .sort((a: any, b: any) => a.faculty.localeCompare(b.faculty))
              .map((listItem) => {
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
