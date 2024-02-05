import React from "react"

export default function DashListItem({ itemData }: { itemData: any }) {
  //TODO: generate item by data and type
  return (
    <li className="dash-list__item" v-for="item in items">
      {/* v-bind:href="'/room/'+ item.number" */}
      <a href="/" className="dash-list__link">
        <span className="dash-list__property dash-list__property_name">
          {/* {itemData.number} */}
          111
        </span>
        <span className="dash-list__property dash-list__property_faculty">
          {/* {itemData.faculty} */}
          ФКНФМ
        </span>
        <span className="dash-list__property dash-list__property_pulpit">
          {/* {itemData.pulpits[0]} */}
          КІПІЕК
        </span>
        <span className="dash-list__property dash-list__property_floor">
          {/* {itemData.floor} */}1
        </span>
      </a>
    </li>
  )
}
