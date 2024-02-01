import React, { useState } from "react"

import "./imageSlider.css"

import { Slide } from "react-slideshow-image"
import "react-slideshow-image/dist/styles.css"

export default function ImageSlider({ slides }: { slides: any }) {
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
