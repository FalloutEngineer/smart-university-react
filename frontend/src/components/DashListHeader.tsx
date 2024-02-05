import React from "react"

export default function DashListHeader({
  options,
  filterCallback,
}: {
  options: any
  filterCallback: any
}) {
  //TODO: generate header by options
  return (
    <div className="dash-board__filter-container">
      <div className="dash-board__filter-text">Фільтри</div>
      <div className="dash-board__filter-item">
        <span className="dash-board__filter-heading">Поверх:</span>
        <select className="dash-select" name="floor" id="floor">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>
      </div>
      <div className="dash-board__filter-item">
        <span className="dash-board__filter-heading">Факультет:</span>
        <select className="dash-select" name="faculty" id="faculty">
          <option value="fcspm">ФКНФМ</option>
          <option value="fif">ФІФ</option>
          <option value="ffvs">ФФВС</option>
        </select>
      </div>
      <div className="dash-board__filter-item">
        <span className="dash-board__filter-heading">Кафедра:</span>
        <select className="dash-select" name="pulpit" id="pulpit">
          <option value="room">КІПІЕК</option>
          <option value="room">Математики</option>
        </select>
      </div>
    </div>
  )
}
