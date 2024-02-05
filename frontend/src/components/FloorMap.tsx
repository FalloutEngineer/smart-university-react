import React, { useEffect, useState } from "react"

import "../pages/floorPage.css"

export default function FloorMap({
  url,
  styles,
}: {
  url: string
  styles?: any
}) {
  const [svg, setSvg] = useState("")

  const stylesString = `
  .stv {
    fill: ${styles ? styles.color : "#808080"};
    opacity: 0.7;
    cursor: pointer;
  }
`

  useEffect(() => {
    async function getSVG(url: string) {
      let response = await fetch(url)
      let svg = await response.text()
      setSvg(svg)
    }

    if (!svg) {
      getSVG(url)
    }
  }, [])

  return (
    <div className="planWrapper">
      <style>{stylesString}</style>
      <div className="plan" dangerouslySetInnerHTML={{ __html: svg }}></div>
    </div>
  )
}

// document.body.insertAdjacentHTML("afterbegin", svg)
