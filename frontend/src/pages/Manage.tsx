import React from "react"
import Layout from "../components/Layout/Layout"
import DashLayout from "../components/DashLayout/DashLayout"

export default function Manage() {
  return (
    <DashLayout>
      <ul className="dash-board__list">
        {/* v-cloak */}
        <li className="dash-board__item">
          <label htmlFor="type" className="dash-board__label">
            Що створити?
          </label>
          {/* v-model="selectedType" @change="changeType($event)" */}
          <select className="dash-select" name="type" id="type">
            <option value="rooms">Приміщення</option>
            <option value="pulpits">Кафедра</option>
            <option value="faculties">Факультет</option>
            <option value="floors">Поверх</option>
            <option value="buildings">Будівля</option>
          </select>
        </li>
        {/* v-cloak :className="{hidden: buildingHidden}" */}
        <li id="building-item" className="dash-board__item">
          <label htmlFor="" className="dash-board__label">
            До якої будівлі належить?
          </label>
          {/* v-model="selectedBuilding" */}
          <select className="dash-select" name="building" id="buildings">
            {/* v-bind:value="building.name" v-for="building in buildings" */}
            <option>{/*{building.name}*/}</option>
          </select>
        </li>
        {/* v-cloak :className="{hidden: facultyHidden}" */}
        <li id="faculty-item" className="dash-board__item">
          <label htmlFor="faculty" className="dash-board__label">
            До якого факультету належить?
          </label>
          {/* v-model="selectedFaculty" @change="onValuesChange($event)" */}

          <select className="dash-select" name="faculty" id="faculties">
            {/* v-bind:value="faculty.name" v-for="faculty in faculties" */}
            <option>{/*{faculty.name}*/}</option>
          </select>
        </li>
        {/* v-cloak :className="{hidden: floorHidden}" */}
        <li id="floor-item" className="dash-board__item">
          <label htmlFor="floor" className="dash-board__label">
            До якого поверху належить?
          </label>
          {/* v-model="selectedFloor" @change="onValuesChange($event)" */}
          <select className="dash-select" name="floor" id="floors">
            {/* v-bind:value="floor.number" v-for="floor in currentFloors" */}
            <option>{/*{floor.number}*/}</option>
          </select>
        </li>
        {/* v-cloak :className="{hidden: pulpitHidden}" */}
        <li id="pulpit-item" className="dash-board__item">
          <label htmlFor="" className="dash-board__label">
            До якої кафедри належить?
          </label>
          {/* v-model="selectedPulpit" @change="onValuesChange($event)" */}
          <select className="dash-select" name="pulpit" id="pulpits">
            {/* v-bind:value="pulpit.name" v-for="pulpit in currentPulpits" */}
            <option>{/*{pulpit.name}*/}</option>
          </select>
        </li>
        {/* v-cloak :className="{hidden: nameHidden}" */}
        <li id="name-item" className="dash-board__item">
          <label htmlFor="" className="dash-board__label">
            Назва/Номер
          </label>
          {/* v-model="name" v-if="nameType === 'text'" */}
          <input id="name" className="dash-board__input" type="text" />
          {/*  v-model="number" v-if="nameType === 'number'" */}
          <input id="number" className="dash-board__input" type="number" />
        </li>
        {/* v-cloak :className="{hidden: capacityHidden}" */}
        <li id="capacity-item" className="dash-board__item">
          <label htmlFor="" className="dash-board__label">
            Кількість місць
          </label>
          {/* v-model="capacity" */}
          <input id="capacity" className="dash-board__input" type="number" />
        </li>
        {/* v-cloak id="roomType-item" :className="{hidden: typeHidden}" */}
        <li className="dash-board__item">
          <label htmlFor="" className="dash-board__label">
            Тип приміщення
          </label>
          {/* v-model="selectedRoomType" */}
          <select className="dash-select" name="roomType" id="roomTypes">
            {/* v-bind:value="roomType" v-for="roomType in roomTypes" */}
            <option>{/*{roomType}*/}</option>
          </select>
        </li>
        {/* v-cloak :className="{hidden: descriptionHidden}" */}
        <li id="description-item" className="dash-board__item">
          <label htmlFor="" className="dash-board__label">
            Опис
          </label>
          {/* v-model="description" */}
          <textarea
            name="description"
            className="dash-board__textarea"
            id="description"
            cols={30}
            rows={10}
            placeholder="Введіть опис"
          ></textarea>
        </li>
        {/* v-cloak :className="{hidden: assistantHidden}" */}
        <li id="assistant-item" className="dash-board__item">
          <label htmlFor="" className="dash-board__label">
            Асистент
          </label>
          {/* v-model="assistant" */}
          <input id="assistant" className="dash-board__input" type="text" />
        </li>
        {/* v-cloak :className="{hidden: imagesHidden}" */}
        <li id="images-item" className="dash-board__item">
          <label htmlFor="" className="dash-board__label">
            Зображення
          </label>
          {/* v-on:change="handleFileUpload" */}
          {/* TODO: REWORK ENCTYPE */}
          {/* encType="multipart/form-data" */}
          <input
            id="images"
            className="dash-board__input"
            multiple
            type="file"
            accept="image/*"
          />
        </li>
        {/* v-cloak :className="{hidden: svgHidden}" */}
        <li id="svg-item" className="dash-board__item">
          <label htmlFor="" className="dash-board__label">
            SVG
          </label>
          {/* TODO: REWORK ENCTYPE */}
          {/* encType="multipart/form-data" */}
          {/* enctype="multipart/form-data" v-on:change="handleSvgUpload" */}
          <input
            id="svg"
            className="dash-board__input"
            type="file"
            accept=".svg"
          />
        </li>
        {/* v-cloak :className="{hidden: co2Hidden}" */}
        <li id="co2-item" className="dash-board__item">
          <label htmlFor="co2" className="dash-board__label">
            Посилання на сенсор CO2
          </label>
          {/* v-model="co2" */}
          <input id="co2" className="dash-board__input" type="url" />
        </li>
        {/* v-cloak :className="{hidden: temperatureHidden}" */}
        <li id="svg-item" className="dash-board__item">
          <label htmlFor="" className="dash-board__label">
            Посилання на сенсор температури
          </label>
          {/* v-model="temperature" */}
          <input id="temperature" className="dash-board__input" type="url" />
        </li>
        {/* v-cloak :className="{hidden: colorHidden}" */}
        <li id="color-item" className="dash-board__item">
          <label htmlFor="floorColor" className="dash-board__label">
            Колір
          </label>
          {/* v-model="floorColor" */}
          <input
            type="color"
            id="floorColor"
            name="floorColor"
            value="#ffffff"
          />
        </li>

        {/* v-cloak :className="{hidden: addressHidden}" */}
        <li id="address-item" className="dash-board__item">
          <label htmlFor="address" className="dash-board__label">
            Адреса
          </label>
          {/* v-model="address" */}
          <input type="text" id="address" name="address" />
        </li>
      </ul>
      {/* v-on:click="createItem()" */}
      <button id="create" className="dash-button">
        Створити
      </button>

      {/* TODO: */}
      {/* <script src="js/auth.js"></script>
    <script src="js/manage.js"></script> */}
    </DashLayout>
  )
}
