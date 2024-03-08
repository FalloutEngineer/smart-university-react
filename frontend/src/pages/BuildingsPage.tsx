import React, { useEffect, useState } from "react"
import Layout from "../components/Layout/Layout"
import ImageSlider from "../components/ImageSlider/ImageSlider"
import BuildingsHero from "../components/BuildingsHero"

import "./buildingsPage.css"
import BuildingsPageItem from "../components/BuildingsPageItem"

const API_URL = process.env.REACT_APP_API_URL

const buildingsAPI = API_URL + `/api/buildings`

const buildingsPageAPI = API_URL + `/api/buildingsPage`

export default function BuildingsPage() {
  //TODO: Use buildings context

  const [buildingPage, setBuildingPage] = useState({
    heading: `БУДІВЛІ`,
    description: `На даній сторінкі розміщений список з посиланнями на існуючі будівлі університету.`,
    images: ["/img/4.jpg"],
  })

  const [slides, setSlides] = useState([{ url: "/img/1.jpg", caption: "" }])

  useEffect(() => {
    const fetchBuildingsPage = async () => {
      const response = await fetch(buildingsPageAPI)

      try {
        const json = await response.json()

        if (response.ok) {
          console.log("buildings: ", json)

          setBuildingPage(json)

          const readyImages =
            json.images.length > 0
              ? json.images.map((image: string) => {
                  return { url: image, caption: "" }
                })
              : [{ url: "/img/1.jpg", caption: "" }]

          setSlides(readyImages)

          console.log(slides)
        } else {
          console.error(response.status, response.text)
        }
      } catch (e) {
        console.error(e)
      }
    }

    fetchBuildingsPage()
  }, [])

  const [buildings, setBuildings] = useState([])

  useEffect(() => {
    const fetchBuildings = async () => {
      const response = await fetch(buildingsAPI)
      const json = await response.json()

      if (response.ok) {
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
        <BuildingsHero
          heading={buildingPage.heading}
          description={buildingPage.description}
        />
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
