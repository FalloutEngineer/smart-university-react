import React, { useEffect, useState } from "react"
import Layout from "../components/Layout/Layout"
import ImageSlider from "../components/ImageSlider/ImageSlider"
import MainHero from "../components/MainHero"
import Corpus from "../components/Corpus"

import "./home.css"

const API_URL = process.env.REACT_APP_API_URL

const buildingsAPI = API_URL + `/api/buildings`

//TODO: CAROUSEL COMPONENT

export default function Home() {
  const [buildings, setBuildings]: any[] = useState([])

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

  const slides = [
    { url: process.env.PUBLIC_URL + "/img/1.jpg", caption: "" },
    { url: process.env.PUBLIC_URL + "/img/2.jpg", caption: "" },
    { url: process.env.PUBLIC_URL + "/img/3.jpg", caption: "" },
    { url: process.env.PUBLIC_URL + "/img/4.jpg", caption: "" },
  ]

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
          sliderParams={{ isAutoplay: true, isInfinite: true }}
        />
        <MainHero />
      </div>

      <div className="bg-color-sky-light" data-auto-height="true">
        <div className="content-lg container">
          <div className="row row-space-1 margin-b-2 corpuses">
            {buildings.map((building: any) => {
              return (
                <Corpus
                  heading={building.name}
                  link={`/building/${building.name}`}
                />
              )
            })}
            {/* <Corpus
              heading={"Головний корпус"}
              icon={"/img/icon.png"}
              link={"/"}
            />
            <Corpus heading={"2 корпус"} link={"/"} />
            <Corpus heading={"5 корпус"} link={"/"} />
            <Corpus heading={"6 корпус"} link={"/"} /> */}
          </div>
        </div>
      </div>
    </Layout>
  )
}
