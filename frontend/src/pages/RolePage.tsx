import React from "react"
import DashLayout from "../components/DashLayout/DashLayout"
import { NavLink } from "react-router-dom"

export default function RolePage() {
  // name: { type: String, unique: true, required: true },
  // isSuperAdmin: { type: Boolean, unique: false, required: true },
  // isAdmin: { type: Boolean, unique: true, required: true },
  // isEditor: { type: Boolean, unique: false, required: true },
  // canEditDamage: { type: Boolean, unique: false, required: true },
  // buildings: [{ type: ObjectId, ref: "Building" }],
  // floors: [[{ type: ObjectId, ref: "Floor" }]],
  // faculties: [{ type: ObjectId, ref: "Faculty" }],
  // rooms: [{ type: ObjectId, ref: "Room" }],

  return (
    <DashLayout>
      <NavLink className="dash-board__edit" to={`./edit`}>
        Редагувати
      </NavLink>
      <ul className="dash-board__list">
        <li className="dash-board__item">
          <h3 className="dash-board__label">Назва:</h3>
          <div className="dash-board__value">Асистент 507</div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Суперадмін:</h3>
          <div className="dash-board__value">Ні</div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Адмін:</h3>
          <div className="dash-board__value">Ні</div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Редактор:</h3>
          <div className="dash-board__value">Ні</div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Можна редагувати збитки:</h3>
          <div className="dash-board__value">Ні</div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Будівлі:</h3>
          <div className="dash-board__value">-</div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Поверхи:</h3>
          <div className="dash-board__value">-</div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Факультети:</h3>
          <div className="dash-board__value">-</div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Приміщення:</h3>
          <div className="dash-board__value">507</div>
        </li>
      </ul>
    </DashLayout>
  )
}
