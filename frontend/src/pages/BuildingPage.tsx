import React from "react"

export default function BuildingPage() {
  return (
    <div>
      <div
        className="parallax-window"
        data-parallax="scroll"
        data-image-src="/img/1.jpg"
      >
        <div className="parallax-content container">
          {/* style="text-align: right;" */}
          <h1 className="carousel-title">{/*<%- building.name %>*/}</h1>
          {/* <% if(building.address){ %>
                    <p style="text-align: right; color: white;"><%- building.address %> </p>
                 <% } %> */}
        </div>
      </div>

      <section className="section section_models" id="models_1">
        <div className="container">
          {/* <%if (building.svg) { %>
                    <div className="model-container">
                        <object className="model-svg" data="/svg/<%= building.svg %>" type="image/svg+xml">
                            
                        </object>
                    </div>
                <% } %> */}
          <ul className="page-list">
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
    </div>
  )
}
