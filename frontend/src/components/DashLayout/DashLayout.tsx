import React from "react"
import DashSidebar from "../DashSidebar"
import DashHeader from "../DashHeader"

import "./dashLayout.css"

export default function DashLayout({ children }: { children?: any }) {
  return (
    <div id="dash-body">
      <DashHeader />
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
