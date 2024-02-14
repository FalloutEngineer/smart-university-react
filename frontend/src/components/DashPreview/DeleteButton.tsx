import React from "react"

export default function DeleteButton({ callback }: { callback: Function }) {
  return <button onClick={callback()}>Видалити</button>
}
