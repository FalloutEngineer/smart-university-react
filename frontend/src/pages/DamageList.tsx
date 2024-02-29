import React, { useState } from "react"
import DashLayout from "../components/DashLayout/DashLayout"
import DashListHeader from "../components/DashList/DashListHeader"
import { NavLink } from "react-router-dom"

import "./damageList.css"

export default function DamageList() {
  const [listHeaderOptions, setListHeaderOptions] = useState(null)
  const [filter, setFilter] = useState(null)

  return (
    <DashLayout>
      <DashListHeader options={listHeaderOptions} filterCallback={filter} />
      <div className="damage-header">
        <div className="totalDamage">Загально збитків: 7000 грн.</div>
        <div className="filteredDamage">
          Сума збитків в:
          <select>
            <option value="Головний корпус">Головний корпус</option>
            <option value="2 корпус">2 корпус</option>
            <option value="5 корпус">5 корпус</option>
          </select>
          <div className="filteredDamageCount">6000 грн.</div>
        </div>
      </div>
      <div className="dash-list__container">
        <ul className="dash-list">
          <li className="dash-list__item">
            <NavLink to={"./damage/1"} className="dash-list__link">
              <span className="dash-list__property dash-list__property_name">
                Головний корпус
              </span>
              <span className="dash-list__property">Вікно</span>
              <span className="dash-list__property">1000 грн.</span>
            </NavLink>
          </li>
          <li className="dash-list__item">
            <NavLink to={"./damage/1"} className="dash-list__link">
              <span className="dash-list__property dash-list__property_name">
                5 корпус
              </span>
              <span className="dash-list__property">Вікно</span>
              <span className="dash-list__property">1000 грн.</span>
            </NavLink>
          </li>
          <li className="dash-list__item">
            <NavLink to={"./damage/1"} className="dash-list__link">
              <span className="dash-list__property dash-list__property_name">
                Головний корпус
              </span>
              <span className="dash-list__property">Двері</span>
              <span className="dash-list__property">5000 грн.</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </DashLayout>
  )
}
