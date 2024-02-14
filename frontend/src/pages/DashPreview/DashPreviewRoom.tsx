import React, { useEffect, useState } from "react"
import { DashPreview, RoomData } from "../../dashPreview"

export default function DashPreviewRoom({ name, endpoint }: DashPreview) {
  const [room, setRoom] = useState<RoomData>(null)

  useEffect(() => {
    fetch(endpoint + name)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setRoom(data)
      })
  }, [])

  return <div>{JSON.stringify(room)}</div>
}
