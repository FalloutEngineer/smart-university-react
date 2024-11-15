import React from "react"

export default function DeleteButton({ callback }: { callback: Function }) {
  return (
    <button className="dash-board__delete-btn" onClick={callback()}>
      Видалити
    </button>
  )
}
