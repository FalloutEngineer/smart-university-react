import React, { useEffect, useState } from "react"
import Layout from "../components/Layout/Layout"
import ImageSlider from "../components/ImageSlider/ImageSlider"
import MainHero from "../components/MainHero"
import Corpus from "../components/Corpus"

import "./home.css"

const API_URL = process.env.REACT_APP_API_URL

const buildingsAPI = API_URL + `/api/buildings`
const homePageAPI = API_URL + `/api/homePage`

export default function Home() {
  const [home, setHome] = useState({
    heading: `Аналітична система матеріально-технічної бази Херсонського
Державного Університету`,
    buttonLink: "/buildings",
    images: ["/img/1.jpg", "/img/2.jpg", "/img/3.jpg", "/img/4.jpg"],
  })
  const [buildings, setBuildings]: any[] = useState([])

  const corpusesStyle = {
    gridTemplateColumns: `repeat(${
      buildings.length > 4 ? 4 : buildings.length
    }, 1fr)`,
  }

  useEffect(() => {
    const fetchHomePage = async () => {
      const response = await fetch(homePageAPI)
      const json = await response.json()

      if (response.ok) {
        console.log("home: ", json)

        setHome(json)
      } else {
        console.error(response.status, response.text)
      }
    }

    fetchHomePage()
  }, [])

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

  // const slides = [
  //   { url: process.env.PUBLIC_URL + "/img/1.jpg", caption: "" },
  //   { url: process.env.PUBLIC_URL + "/img/2.jpg", caption: "" },
  //   { url: process.env.PUBLIC_URL + "/img/3.jpg", caption: "" },
  //   { url: process.env.PUBLIC_URL + "/img/4.jpg", caption: "" },
  // ]

  const slides =
    home.images.length > 0
      ? home.images.map((image) => {
          return { url: process.env.PUBLIC_URL + image, caption: "" }
        })
      : [{ url: process.env.PUBLIC_URL + "/img/1.jpg", caption: "" }]

  console.log(slides)

  const sliderWrapperStyles = {
    width: "100vw",
    minHeight: "600px",
    height: "100vh",
    margin: "0 auto",
  }

  return (
    <Layout>
      <div className="headerPlaceholder"></div>
      <div style={sliderWrapperStyles} className="slider-wrapper">
        <ImageSlider
          slides={slides}
          sliderParams={{
            isAutoplay: slides.length > 1,
            isInfinite: slides.length > 1,
          }}
        />
        <MainHero heading={home.heading} buttonLink={home.buttonLink} />
      </div>

      <div className="bg-color-sky-light" data-auto-height="true">
        <div className="content-lg container">
          <div
            className="row row-space-1 margin-b-2 corpuses"
            style={corpusesStyle}
          >
            {buildings.map((building: any) => {
              return (
                <Corpus
                  heading={building.name}
                  link={`/building/${building.name}`}
                />
              )
            })}
          </div>
        </div>
      </div>
    </Layout>
  )
}
