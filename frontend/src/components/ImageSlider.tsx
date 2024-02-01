import React, { useState } from "react"

import styles from "./imageSlider.module.css"
import "./imageSlider.css"

import { Slide } from "react-slideshow-image"
import "react-slideshow-image/dist/styles.css"

export default function ImageSlider({ slides }: { slides: any }) {
  const [currentIndex, changeIndex] = useState(0)

  const slide = {
    backgroundImage: `url(${slides[currentIndex].url})`,
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  // const spanStyle = {
  //   padding: "20px",
  //   background: "#efefef",
  //   color: "#000000",
  // }

  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "100vh",
  }

  const sliderProperties = {
    duration: 3000,
    autoplay: true,
    transitionDuration: 500,
    arrows: false,
    infinite: true,
    easing: "ease",
    indicators: (i: any) => <div className="pagination"></div>,
  }

  function setSlide(index: number): void {
    changeIndex(index)
  }

  document.querySelector(".indicators")?.classList.add("container")

  return (
    <div className="slide-container">
      <Slide {...sliderProperties}>
        {slides.map((slideImage: any, index: number) => {
          return (
            <div key={index}>
              <div
                style={{
                  ...divStyle,
                  backgroundImage: `url(${slideImage.url})`,
                }}
              ></div>
            </div>
          )
        })}
      </Slide>
    </div>
  )
}
