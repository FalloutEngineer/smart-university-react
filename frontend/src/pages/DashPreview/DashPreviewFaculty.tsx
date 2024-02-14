import React, { useEffect, useState } from "react"
import { DashPreview, FacultyData } from "../../dashPreview"

export default function DashPreviewFaculty({ name, endpoint }: DashPreview) {
  const [faculty, setFaculty] = useState<FacultyData>(null)

  useEffect(() => {
    fetch(endpoint + name)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setFaculty(data)
      })
  }, [])

  return <div>{JSON.stringify(faculty)}</div>
}
