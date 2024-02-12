import React from "react"
import DashSidebar from "../DashSidebar"
import DashHeader from "../DashHeader"

import "./dashLayout.css"
import Header from "../Header"

export default function DashLayout({ children }: { children?: any }) {
  return (
    <div id="dash-body">
      <Header isDashboard={true} useDarkFont={true} />
      <div className="dash-container">
        <div className="dash-body">
          <DashSidebar page="room-list" />
          <div className="dash-board">
            <div className="dash-board__container">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
