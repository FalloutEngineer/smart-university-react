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
        {/* TODO: Room */}
        <li className="dash-board__item">
          <h3 className="dash-board__label">Номер:</h3>
          <div className="dash-board__value">{/* <%= item.number %> */}</div>
        </li>
        {/* TODO: Pulpit */}
        <li className="dash-board__item">
          <h3 className="dash-board__label">Назва:</h3>
          <div className="dash-board__value">{/* <%= item.name %> */}</div>
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
        {/* TODO: Pulpit floor */}
        {/* v-cloak v-if="<%= item.rooms.length %> != 0" */}
        <li className="dash-board__item">
          <h3 className="dash-board__label">Приміщення:</h3>
          <div className="dash-board__value">{/* <%= item.rooms %> */}</div>
        </li>
        {/* TODO: floor */}
        {/* <%if (item.building != '') { %>
                            <li v-cloak class="dash-board__item">
                                <h3 class="dash-board__label">
                                    Будівля:
                                </h3>
                                <div class="dash-board__value">
                                    <%= item.building %>
                                </div>
                            </li>
                        <% } %> */}
        {/* TODO: floor */}
        {/* <%if (item.floorColor) { %>
                            <li v-cloak class="dash-board__item">
                                <h3 class="dash-board__label">
                                    Колір:
                                </h3>
                                <div class="dash-board__value" style="height: 50px; width: 50px; background-color: <%- item.floorColor %>;">
                                    <%= item.floorColor %>
                                </div>
                            </li>
                        <% } %> */}

        {/* TODO: faculty */}
        {/* <%if (item.floors) { %>
                            <li v-cloak v-if="<%= item.floors.length %> != 0" class="dash-board__item">
                                <h3 class="dash-board__label">
                                    Поверхи:
                                </h3>
                                <div class="dash-board__value">
                                    <%= item.floors %>
                                </div>
                            </li>
                          <% } %> */}

        {/* TODO: faculty */}
        {/* <li v-cloak v-if="<%= item.pulpits.length %> != 0" class="dash-board__item">
                            <h3 class="dash-board__label">
                                Кафедри:
                            </h3>
                            <div class="dash-board__value">
                                <%= item.pulpits %>
                            </div>
                        </li> */}

        {/* TODO: building */}
        {/* <%if (item.floors) { %>
                            <li v-cloak v-if="<%= item.floors.length %> != 0" class="dash-board__item">
                                <h3 class="dash-board__label">
                                    Поверхи:
                                </h3>
                                <div class="dash-board__value">
                                    <%= item.floors %>
                                </div>
                            </li>
                          <% } %>
                          <%if (item.address) { %>
                            <li v-cloak class="dash-board__item">
                                <h3 class="dash-board__label">
                                    Адреса:
                                </h3>
                                <div class="dash-board__value">
                                    <%= item.address %>
                                </div>
                            </li>
                          <% } %>
                          <%if (item.svg) { %>
                            <li v-cloak class="dash-board__item">
                                <h3 class="dash-board__label">
                                    Зображення:
                                </h3>
                                <div class="dash-board__value">
                                    <object data="/svg/<%= item.svg %>" type="image/svg+xml"></object>
                                    <!-- <img href="/svg/<%= item.svg %>"></img> -->
                                </div>
                            </li>
                          <% } %> */}

        {/* TODO: ROOM Display photos */}
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
