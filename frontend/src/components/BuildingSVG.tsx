import React, { useEffect, useState } from "react"

export default function BuildingSVG({ url }: { url: string; styles?: any }) {
  const [svg, setSvg] = useState("")

  useEffect(() => {
    async function getSVG(url: string) {
      let response = await fetch(url)
      let svg = await response.text()
      setSvg(svg)
    }

    getSVG(url)
  }, [])

  return (
    <div className="buildingWrapper">
      <div className="building" dangerouslySetInnerHTML={{ __html: svg }}></div>
    </div>
  )
}
