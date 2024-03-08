import React from "react"
import { NavLink } from "react-router-dom"

export default function DashSidebar({ page }: { page?: string }) {
  //TODO: change class on current
  return (
    <div className="dash-sidebar">
      <ul className="dash-sidebar__list">
        <li className="dash-sidebar__item">
          <NavLink to="/damage" className={"dash-sidebar__link "}>
            Збитки
          </NavLink>
        </li>
        <li className="dash-sidebar__item">
          <NavLink to="/manage" className={"dash-sidebar__link "}>
            Створити об'єкт університета
          </NavLink>
        </li>
        <li className="dash-sidebar__item">
          <NavLink to="/manageCard" className={"dash-sidebar__link "}>
            Створити картку
          </NavLink>
        </li>
        <li className="dash-sidebar__item">
          <NavLink to="/cards" className={"dash-sidebar__link "}>
            Список карток
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
        <li className="dash-sidebar__item">
          <NavLink to="/help" className={"dash-sidebar__link "}>
            Допомога
          </NavLink>
        </li>
        <li className="dash-sidebar__item">
          <NavLink to="/users" className={"dash-sidebar__link "}>
            Користувачі
          </NavLink>
        </li>
      </ul>
    </div>
  )
}
