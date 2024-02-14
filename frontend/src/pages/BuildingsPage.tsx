import React, { useEffect, useState } from "react"
import Layout from "../components/Layout/Layout"
import ImageSlider from "../components/ImageSlider/ImageSlider"
import BuildingsHero from "../components/BuildingsHero"

import "./buildingsPage.css"
import BuildingsPageItem from "../components/BuildingsPageItem"

const API_URL = process.env.REACT_APP_API_URL

const buildingsAPI = API_URL + `/api/buildings`

export default function BuildingsPage() {
  //TODO: Use buildings context

  const slides = [{ url: process.env.PUBLIC_URL + "/img/4.jpg", caption: "" }]

  const [buildings, setBuildings] = useState([])

  useEffect(() => {
    const fetchBuildings = async () => {
      const response = await fetch(buildingsAPI)
      const json = await response.json()

      if (response.ok) {
        console.log(json)

        setBuildings(json)
      } else {
        //TODO: toast error?
        console.log(response.status, response.text)
      }
    }

    fetchBuildings()
  }, [])

  const sliderWrapperStyles = {
    width: "100vw",
    margin: "0 auto",
  }
  return (
    <Layout>
      <div style={sliderWrapperStyles} className="slider-wrapper">
        <ImageSlider
          slides={slides}
          sliderParams={{ isInfinite: false, isAutoplay: false }}
        />
        <BuildingsHero />
      </div>

      <div className="page-list__container">
        <div className="container">
          <ul className="page-list">
            {buildings !== null &&
              buildings.map((building: any) => {
                return (
                  <BuildingsPageItem
                    name={building.name}
                    link={building.name}
                  />
                )
              })}
          </ul>
        </div>
      </div>
    </Layout>
  )
}
