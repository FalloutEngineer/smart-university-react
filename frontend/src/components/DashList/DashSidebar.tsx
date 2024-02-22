import React from "react"
import { NavLink } from "react-router-dom"

export default function DashSidebar({ page }: { page?: string }) {
  //TODO: change class on current
  return (
    <div className="dash-sidebar">
      <ul className="dash-sidebar__list">
        <li className="dash-sidebar__item">
          <NavLink to="/manage" className={"dash-sidebar__link "}>
            Створити
          </NavLink>
        </li>
        <li className="dash-sidebar__item">
          <NavLink to="/room-list" className={"dash-sidebar__link "}>
            Список приміщень
          </NavLink>
        </li>
        <li className="dash-sidebar__item">
          <NavLink to="/floor-list" className={"dash-sidebar__link "}>
            Список поверхів
          </NavLink>
        </li>
        <li className="dash-sidebar__item">
          <NavLink to="/faculty-list" className={"dash-sidebar__link "}>
            Список факультетів
          </NavLink>
        </li>
        <li className="dash-sidebar__item">
          <NavLink to="/pulpit-list" className={"dash-sidebar__link "}>
            Список кафедр
          </NavLink>
        </li>
        <li className="dash-sidebar__item">
          <NavLink to="/building-list" className={"dash-sidebar__link "}>
            Список будівель
          </NavLink>
        </li>
        <li className="dash-sidebar__item">
          <NavLink to="/managePages" className={"dash-sidebar__link "}>
            Список сторінок
          </NavLink>
        </li>
      </ul>
    </div>
  )
}
