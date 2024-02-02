import React from "react"
import Layout from "../components/Layout/Layout"

export default function BuildingsPage() {
  return (
    <Layout>
      <div
        id="carousel-example-generic"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner" role="listbox">
          <div className="item active">
            <img
              className="img-responsive"
              src="img/4.jpg"
              alt="Slider Image"
            />
            <div className="container">
              <div className="carousel-centered">
                <div className="margin-b-40">
                  {/* style="margin-top: 25px;" */}
                  <h1 className="carousel-title">Будівлі</h1>
                  {/* style="color: white; padding-right: 10px; margin-right: auto; margin-left: auto;" */}
                  <p>
                    На даній сторінкі розміщений список з посиланнями на існуючі
                    будівлі університету
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* style="	background: rgb(48, 46, 51);" */}
      <div className="page-list__container">
        <div className="container">
          <ul className="page-list">
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
