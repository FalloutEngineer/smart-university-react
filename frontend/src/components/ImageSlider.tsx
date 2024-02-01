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
    duration: 5000,
    autoplay: false,
    transitionDuration: 500,
    arrows: false,
    infinite: true,
    easing: "ease",
    indicators: (i: any) => <div className="pagination"></div>,
  }

  const pagination = slides.map((slide: never, index: number) => {
    return (
      <button
        key={index}
        onClick={() => {
          setSlide(index)
        }}
        className={
          styles.bullet + " " + (index === currentIndex ? styles.active : "")
        }
      ></button>
    )
  })

  function setSlide(index: number): void {
    changeIndex(index)
  }

  document.querySelector(".indicators")?.classList.add("container")

  return (
    // <div className={styles.slider}>
    //   <div className={styles.slide} style={slide}></div>
    //   <div className="pagination">{pagination}</div>
    // </div>
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
              >
                {/* <span style={spanStyle}>{slideImage.caption}</span> */}
              </div>
            </div>
          )
        })}
      </Slide>
    </div>
  )
}
