import React from "react"

import "./faculties.css"

export default function FacultiesGrid({ children }: { children: any }) {
  return (
    <div className="facultiesGrid">
      <div className="facultiesContainer container">{children}</div>
    </div>
  )
}
