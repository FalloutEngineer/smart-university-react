import React from "react"
import Layout from "../components/Layout/Layout"
import ParallaxWindow from "../components/ParallaxWindow"

import "./buildingPage.css"
import BuildingItem from "../components/BuildingItem"

export default function BuildingPage() {
  return (
    <Layout>
      <ParallaxWindow imageUrl="url('/img/1.jpg')">
        <div className="parallax-content container buildingPage-content">
          {/* style="text-align: right;" */}
          <h1 className="carousel-title">3 БУДІВЛЯ</h1>
          <p>Вул. Шевченка</p>
          {/* <% if(building.address){ %>
              <p style="text-align: right; color: white;"><%- building.address %> </p>
           <% } %> */}
        </div>
      </ParallaxWindow>
      <section className="section section_models" id="models_1">
        <div className="container">
          {/* TODO: get image from server */}
          <div className="model-container">
            <object
              className="model-svg"
              data="/svg/1680280414263.svg"
              type="image/svg+xml"
            ></object>
          </div>
          {/* <%if (building.svg) { %>
                    <div className="model-container">
                        <object className="model-svg" data="/svg/<%= building.svg %>" type="image/svg+xml">
                            
                        </object>
                    </div>
                <% } %> */}
          <ul className="page-list">
            {/* TODO: list image from server */}
            <BuildingItem number={1} faculties={["ФКНФМ"]} />
            <BuildingItem number={2} faculties={["ФКНФМ", "ФІЗВИХ"]} />
            <BuildingItem
              number={2}
              faculties={[
                "ФКНФМ",
                "ФІЗВИХ",
                "ФІЗВИХ",
                "ФІЗВИХ",
                "ФІЗВИХ",
                "ФІЗВИХ",
                "ФІЗВИХ",
                "ФІЗВИХ",
                "ФІЗВИХ",
              ]}
            />
            {/* <% for (var i = 0; i < floors.length; i++) { %>
                        <li className="page-list__item">
                            <a href="/floor-page/<%= floors[i].number %>" className="page-list__link">
                                <span className="page-list__property page-list__property_name">
                                    <%= floors[i].number %> Поверх <% if(floors[i].faculty){ %>- <%= floors[i].faculty %> <% } %>
                                </span>
                            </a>
                        </li>
                    <% } %> */}
          </ul>
        </div>
      </section>
    </Layout>
  )
}
