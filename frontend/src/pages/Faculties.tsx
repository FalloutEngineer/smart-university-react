import React from "react"
import Layout from "../components/Layout/Layout"
import ImageSlider from "../components/ImageSlider"
import FacultiesHero from "../components/FacultiesHero"
import FacultiesGrid from "../components/FacultiesGrid"
import FacultiesCard from "../components/FacultiesCard"

export default function Faculties() {
  const slides = [{ url: process.env.PUBLIC_URL + "/img/4.jpg", caption: "" }]

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
        <FacultiesHero />
      </div>

      {/* style="	background: rgb(48, 46, 51);" */}
      <FacultiesGrid>
        {/* TODO: Auto generate from array, todotodo: generate from array that returns from server*/}
        <FacultiesCard
          params={{
            icon: "fa-globe",
            name: "Факультет біології, географії та екології",
            color: "#53A306",
            area: "1319.1 м²",
            cathedras: "3",
            rooms: "24",
            numberOfSeats: "418",
            bachelors: {
              fullTime: 156,
              external: 33,
            },
            masters: {
              fullTime: 49,
              external: 17,
            },
            phd: {
              fullTime: 7,
              external: 3,
            },
          }}
        />
        <FacultiesCard
          params={{
            icon: "fa-globe",
            name: "Факультет біології, географії та екології",
            color: "#53A306",
            area: "1319.1 м²",
            cathedras: "3",
            rooms: "24",
            numberOfSeats: "418",
            bachelors: {
              fullTime: 156,
              external: 33,
            },
            masters: {
              fullTime: 49,
              external: 17,
            },
            phd: {
              fullTime: 7,
              external: 3,
            },
          }}
        />
        <FacultiesCard
          params={{
            icon: "fa-globe",
            name: "Факультет біології, географії та екології",
            color: "#53A306",
            area: "1319.1 м²",
            cathedras: "3",
            rooms: "24",
            numberOfSeats: "418",
            bachelors: {
              fullTime: 156,
              external: 33,
            },
            masters: {
              fullTime: 49,
              external: 17,
            },
            phd: {
              fullTime: 7,
              external: 3,
            },
          }}
        />
        <FacultiesCard
          params={{
            icon: "fa-globe",
            name: "Факультет біології, географії та екології",
            color: "#53A306",
            area: "1319.1 м²",
            cathedras: "3",
            rooms: "24",
            numberOfSeats: "418",
            bachelors: {
              fullTime: 156,
              external: 33,
            },
            masters: {
              fullTime: 49,
              external: 17,
            },
            phd: {
              fullTime: 7,
              external: 3,
            },
          }}
        />
        <FacultiesCard
          params={{
            icon: "fa-globe",
            name: "Факультет біології, географії та екології",
            color: "#53A306",
            area: "1319.1 м²",
            cathedras: "3",
            rooms: "24",
            numberOfSeats: "418",
            bachelors: {
              fullTime: 156,
              external: 33,
            },
            masters: {
              fullTime: 49,
              external: 17,
            },
            phd: {
              fullTime: 7,
              external: 3,
            },
          }}
        />
        <FacultiesCard
          params={{
            icon: "fa-globe",
            name: "Факультет біології, географії та екології",
            color: "#53A306",
            area: "1319.1 м²",
            cathedras: "3",
            rooms: "24",
            numberOfSeats: "418",
          }}
        />
      </FacultiesGrid>
    </Layout>
  )
  {
    /* <script src="/js/page.js"></script> */
  }
}
