import React from "react"
import Layout from "../components/Layout/Layout"
import ImageSlider from "../components/ImageSlider"
import BuildingsHero from "../components/BuildingsHero"

import "./buildingsPage.css"

export default function BuildingsPage() {
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
        <BuildingsHero />
      </div>

      <div className="page-list__container">
        <div className="container">
          {/* TODO: AUTO GENERATE LIST FROM API */}
          <ul className="page-list">
            <li className="page-list__item">
              <a href="" className="page-list__link">
                <span className="page-list__property page-list__property_name">
                  1 Корпус
                </span>
              </a>
            </li>
            <li className="page-list__item">
              <a href="" className="page-list__link">
                <span className="page-list__property page-list__property_name">
                  2 Корпус
                </span>
              </a>
            </li>
            {/* TODO: Generate pages from API */}
            {/* <% for (var i = 0; i < buildings.length; i++) { %>
                <li className="page-list__item">
                    <a href="/building-page/<%= buildings[i].name %>" className="page-list__link">
                        <span className="page-list__property page-list__property_name">
                            <%= buildings[i].name %>
                        </span>
                    </a>
                </li>
            <% } %> */}
          </ul>
        </div>
      </div>
    </Layout>
  )
}
