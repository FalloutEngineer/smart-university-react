import React from "react"
import DashLayout from "../components/DashLayout/DashLayout"
import DashListPage from "../components/DashList/DashListPage"

export default function ManagePages() {
  return (
    <DashLayout>
      <div className="dash-list__container">
        <ul className="dash-list">
          <li className="dash-list__item">
            <p className="dash-list__heading">
              <span className="dash-list__property dash-list__property_name">
                Назва
              </span>
            </p>
          </li>
          <DashListPage
            pageData={{
              name: "Головна",
              link: "/editHome",
            }}
          />
          <DashListPage
            pageData={{
              name: "Факультети",
              link: "/editFaculties",
            }}
          />
          <DashListPage
            pageData={{
              name: "Будівлі",
              link: "/editBuildings",
            }}
          />
        </ul>
      </div>
    </DashLayout>
  )
}
