import React, { useEffect, useState } from "react"
import { DashPreview, FloorData } from "../../dashPreview"

export default function DashPreviewFloor({ name, endpoint }: DashPreview) {
  const [floor, setFloor] = useState<FloorData>(null)

  useEffect(() => {
    fetch(endpoint + name)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setFloor(data)
      })
  }, [])

  return <div>{JSON.stringify(floor)}</div>
}
