import React from "react"
import DashLayout from "../components/DashLayout/DashLayout"
import DashListPage from "../components/DashList/DashListPage"

export default function ManagePages() {
  return (
    <DashLayout>
      <div className="dash-list__container">
        <ul className="dash-list">
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
