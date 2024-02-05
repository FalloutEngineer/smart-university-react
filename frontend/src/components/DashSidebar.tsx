import React from "react"

export default function DashSidebar({ page }: { page: string }) {
  //TODO: change class on current
  return (
    <div className="dash-sidebar">
      <ul className="dash-sidebar__list">
        <li className="dash-sidebar__item">
          <a
            href="/manage"
            className={
              "dash-sidebar__link " + (page === "manage" ? "active" : "")
            }
          >
            Створити
          </a>
        </li>
        <li className="dash-sidebar__item">
          <a
            href="/room-list"
            className={
              "dash-sidebar__link " + (page === "room-list" ? "active" : "")
            }
          >
            Список приміщень
          </a>
        </li>
        <li className="dash-sidebar__item">
          <a
            href="/floor-list"
            className={
              "dash-sidebar__link " + (page === "floor-list" ? "active" : "")
            }
          >
            Список поверхів
          </a>
        </li>
        <li className="dash-sidebar__item">
          <a
            href="/faculty-list"
            className={
              "dash-sidebar__link " + (page === "faculty-list" ? "active" : "")
            }
          >
            Список факультетів
          </a>
        </li>
        <li className="dash-sidebar__item">
          <a
            href="/pulpit-list"
            className={
              "dash-sidebar__link " + (page === "pulpit-list" ? "active" : "")
            }
          >
            Список кафедр
          </a>
        </li>
        <li className="dash-sidebar__item">
          <a
            href="/building-list"
            className={
              "dash-sidebar__link " + (page === "building-list" ? "active" : "")
            }
          >
            Список будівель
          </a>
        </li>
      </ul>
    </div>
  )
}
