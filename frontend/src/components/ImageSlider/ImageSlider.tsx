import React, { useState } from "react"

import "./imageSlider.css"

import { Slide } from "react-slideshow-image"
import "react-slideshow-image/dist/styles.css"
import { SliderParams } from "../../types"

export default function ImageSlider({
  slides,
  sliderParams = {
    isAutoplay: false,
    isInfinite: false,
  },
}: {
  slides: any
  sliderParams?: SliderParams
}) {
  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "100vh",
    minHeight: "600px",
  }

  const useIndicators = slides.length > 1

  const sliderPropsTemplate = {
    duration: 3000,
    autoplay: sliderParams.isAutoplay,
    transitionDuration: 500,
    arrows: false,
    infinite: sliderParams.isInfinite,
    easing: "ease",
  }

  let sliderProperties: any

  if (useIndicators) {
    sliderProperties = {
      ...sliderPropsTemplate,
      indicators: (i: any) => <div className="pagination"></div>,
    }
  } else {
    sliderProperties = {
      ...sliderPropsTemplate,
    }
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
