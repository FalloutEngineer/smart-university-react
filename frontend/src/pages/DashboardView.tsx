import React from "react"
import DashLayout from "../components/DashLayout/DashLayout"

export default function DashboardView() {
  return (
    <DashLayout>
      {/* v-on:click="deleteItem('<%- item.number %>')" */}
      <button className="dash-board__delete-button">Видалити</button>
      {/* v-bind:href="<%= item.number %> + '/edit/'" */}
      <a href="#" className="dash-board__edit">
        Редагувати
      </a>
      <ul className="dash-board__list">
        <li className="dash-board__item">
          <h3 className="dash-board__label">Номер:</h3>
          <div className="dash-board__value">{/* <%= item.number %> */}</div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Поверх:</h3>
          <div className="dash-board__value">{/* <%= item.floor %> */}</div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Кількість місць:</h3>
          <div className="dash-board__value">{/* <%= item.capacity %> */}</div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Факультет:</h3>
          <div className="dash-board__value">{/* <%= item.faculty %> */}</div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Тип:</h3>
          <div className="dash-board__value">{/* <%= item.type %> */}</div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Опис:</h3>
          <div className="dash-board__value">
            {/* <%= item.description %> */}
          </div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Асистент</h3>
          <div className="dash-board__value">{/* <%= item.assistant %> */}</div>
        </li>
        {/* v-show="false" */}
        <li className="dash-board__item">
          <h3 className="dash-board__label">Кафедра:</h3>
          <div className="dash-board__value">
            {/* <%= item.pulpits %>
                                <%= item.pulpits[0] %> */}
          </div>
        </li>
        {/* <% if(item.photo_links.length > 0){ %>
                            <li className="dash-board__images">
                                <h3 className="dash-board__label">
                                    Зображення:
                                </h3>
                                <ul className="dash-board__images-list">
                                    <% for (var i = 0; i < item.photo_links.length; i++) { %>
                                        <li className="dash-board__image-item">
                                            <img src="/images/<%= item.photo_links[i] %>" alt="" srcset="">
                                        </li>
                                    <% } %>
                                    
                                </ul> 
                            </li>
                        <% }%> */}
      </ul>
    </DashLayout>
  )
}
