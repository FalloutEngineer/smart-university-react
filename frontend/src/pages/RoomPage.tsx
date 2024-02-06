import React from "react"
import Layout from "../components/Layout/Layout"

export default function RoomPage() {
  return (
    <Layout>
      <div
        className="floor-header"
        style="background: linear-gradient(to right,rgba(0,0,0,0.4), rgba(255, 255, 255, 0.1)), <%if(floor.floorColor) { %><%-floor.floorColor%><% } else { %>#000<%}%>"
      >
        <div className="floor-header__darker">
          <div className="parallax-content container">
            <h2 style="color:whitesmoke; z-index: 1;">
              {/* <%= room.type %> <%= room.number %> */}
            </h2>

            {/* <% if(room.faculty){ %>
                        <h3 style="color:whitesmoke; z-index: 1;"><%= room.floor %> Поверх - <%= room.faculty.toUpperCase() %></h3>
                    <% } else { %>
                        <h3 style="color:whitesmoke; z-index: 1;"><%= room.floor %> Поверх</h3>
                    <% } %> */}
          </div>
        </div>
      </div>

      <div className="ui-60">
        <div className="container">
          <div className="row">
            {/* <%if(room.photo_links != '') { %>
                <div className="images-block">
                    <ul className="images-block__list">
                        <% for (var i = 0; i < room.photo_links.length;  i++ ) { %>
                            <li className="images-block__item">
                                <img src="/images/<%=room.photo_links[i] %>" alt="" style="width: 500px; height: auto;" className="images-block__image">
                            </li>
                        <% } %>
                    </ul>
                </div>
            <% } %> */}

            <ul className="main-info">
              <li className="info__item">
                <h4 className="info__item-name">Номер:</h4>
                <span style="color: black" className="info__item-value">
                  {/* <%= room.number %> */}
                </span>
              </li>
              <li className="info__item">
                <h4 className="info__item-name">Поверх:</h4>
                <span style="color: black" className="info__item-value">
                  {/* <%= room.floor %> */}
                </span>
              </li>
              <li className="info__item">
                <h4 className="info__item-name">Факультет:</h4>
                <span style="color: black" className="info__item-value">
                  {/* <%= room.faculty.toUpperCase() %> */}
                </span>
              </li>
              {/* <% if(room.pulpits != '') { %>
                    <li className="info__item">
                        <h4 className="info__item-name">
                            Кафедра:
                        </h4>
                        <span style="color: black" className="info__item-value">
                            <%- room.pulpits %>
                        </span>
                    </li>
                <% } %> */}
            </ul>
          </div>
          {/* <% if(room.description != '') { %>
            <div className="row">
                <div className="room__description-container">
                    <h3 className="room__description-heading">Опис:</h3>
                    <span style="color: black" className="room__description">
                        <%= room.description %>
                    </span>
                </div>
            </div>
        <% } %> */}
          <div className="row">
            <ul className="secondary-info">
              <li className="info__item">
                <h4 className="info__item-name">Кількість місць:</h4>
                <span style="color: black" className="info__item-value">
                  {/* <%=room.capacity%> */}
                </span>
              </li>
              <li className="info__item">
                <h4 className="info__item-name">Тип:</h4>
                <span style="color: black" className="info__item-value">
                  {/* <%=room.type%> */}
                </span>
              </li>
              <li className="info__item">
                <h4 className="info__item-name">Асистент:</h4>
                <span style="color: black" className="info__item-value">
                  {/* <%=room.assistant%> */}
                </span>
              </li>
              <li className="info__item">
                <h4 className="info__item-name">Температура:</h4>
                <span style="color: black" className="info__item-value">
                  0
                </span>
              </li>
              <li className="info__item">
                <h4 className="info__item-name">Со2:</h4>
                <span style="color: black" className="info__item-value">
                  1111
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  )
}
