import React from "react"

import { Slide } from "react-slideshow-image"
import "react-slideshow-image/dist/styles.css"

import styles from "./roomSlider.module.css"

export default function RoomSlider({ slides }: { slides: string[] }) {
  const useIndicators = slides.length > 1

  const sliderPropsTemplate = {
    duration: 3000,
    autoplay: false,
    transitionDuration: 500,
    arrows: false,
    infinite: false,
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
    <div className={styles.slideContainer}>
      <Slide {...sliderProperties}>
        {slides.map((slideImage: any, index: number) => {
          return (
            <div key={index}>
              {/* <div
                style={{
                  ...divStyle,
                  backgroundImage: `url("/images/${slideImage}")`,
                }}
              ></div> */}
              <img
                alt="Приміщення"
                className={styles.imgStyle}
                src={`/images/${slideImage}`}
              />
            </div>
          )
        })}
      </Slide>
    </div>
  )
}
