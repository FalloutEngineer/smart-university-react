import React from "react"
import Layout from "../components/Layout/Layout"

/* TODO: INSERT PAGE COLOR HERE */
import "./floorPage.css"

export default function FloorPage() {
  return (
    <Layout>
      {/* style="background: linear-gradient(to right,rgba(0,0,0,0.4), rgba(255, 255, 255, 0.1)), <%- floor.floorColor %>;" */}
      <div className="floor-header">
        <div className="floor-header__darker">
          <div className="parallax-content container">
            {/* <% if(floor.faculty && floor.faculty != ' ') { %>
                    <h2 style="color:whitesmoke; z-index: 1;"><%=floor.faculty%></h2>
                    <% } %>
                    <h3 style="color:whitesmoke; z-index: 1;"><%=floor.number%> поверх</h3> */}
          </div>
        </div>
      </div>

      <div className="plan">
        {/* style="enable-background:new 0 0 2002.2 590.2;" */}
        {/* xmlns:xlink="http://www.w3.org/1999/xlink" */}
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 2002.2 730.2"
          xmlSpace="preserve"
        >
          <g id="Слой_1">
            <g>
              <polyline
                className="st0"
                points="1563.9,406.6 1552.4,379.8 1540,379.8 1540,555.3 1610.4,555.3 1610.4,379.8 1598.4,379.8 
                1586.9,406.6 		"
              ></polyline>
              <line
                className="st0"
                x1="1554.6"
                y1="421.9"
                x2="1595.8"
                y2="421.9"
              ></line>
              <line
                className="st0"
                x1="1554.6"
                y1="434.5"
                x2="1595.8"
                y2="434.5"
              ></line>
              <line
                className="st0"
                x1="1554.6"
                y1="447.1"
                x2="1595.8"
                y2="447.1"
              ></line>
              <line
                className="st0"
                x1="1554.6"
                y1="459.7"
                x2="1595.8"
                y2="459.7"
              ></line>
              <line
                className="st0"
                x1="1554.6"
                y1="472.3"
                x2="1595.8"
                y2="472.3"
              ></line>
              <line
                className="st0"
                x1="1554.6"
                y1="484.9"
                x2="1595.8"
                y2="484.9"
              ></line>
              <line
                className="st0"
                x1="1554.6"
                y1="497.5"
                x2="1595.8"
                y2="497.5"
              ></line>
              <line
                className="st0"
                x1="1554.6"
                y1="510.1"
                x2="1595.8"
                y2="510.1"
              ></line>
              <line
                className="st0"
                x1="1554.6"
                y1="522.7"
                x2="1595.8"
                y2="522.7"
              ></line>
              <line
                className="st0"
                x1="1554.6"
                y1="535.3"
                x2="1595.8"
                y2="535.3"
              ></line>
            </g>
            <g>
              <polyline
                className="st0"
                points="510.5,173.5 522,200.3 534.4,200.3 534.4,80.5 464,80.5 464,200.3 476,200.3 487.5,173.5 		"
              ></polyline>
              <line
                className="st0"
                x1="477.7"
                y1="92.2"
                x2="518.9"
                y2="92.2"
              ></line>
              <line
                className="st0"
                x1="477.7"
                y1="102.8"
                x2="518.9"
                y2="102.8"
              ></line>
              <line
                className="st0"
                x1="477.7"
                y1="113.3"
                x2="518.9"
                y2="113.3"
              ></line>
              <line
                className="st0"
                x1="477.7"
                y1="123.9"
                x2="518.9"
                y2="123.9"
              ></line>
              <line
                className="st0"
                x1="477.7"
                y1="134.4"
                x2="518.9"
                y2="134.4"
              ></line>
              <line
                className="st0"
                x1="477.7"
                y1="145"
                x2="518.9"
                y2="145"
              ></line>
              <line
                className="st0"
                x1="477.7"
                y1="155.5"
                x2="518.9"
                y2="155.5"
              ></line>
            </g>
            <polyline
              className="st0"
              points="1898.2,228.7 1908.8,200.3 1957.8,200.3 1957.8,379.8 1888.3,379.8 1878.1,352.6 	"
            ></polyline>
            <polyline
              className="st0"
              points="1698.5,379.5 1667.4,379.5 1656.3,353.7 	"
            ></polyline>
            <polyline
              className="st0"
              points="1638.3,379.5 1434.8,379.5 1423.3,353 	"
            ></polyline>
            <polyline
              className="st0"
              points="1279.1,379.6 1207.4,379.6 1196.5,352.9 	"
            ></polyline>
            <polyline
              className="st0"
              points="1410.5,379.6 1297.9,379.6 1287,352.9 	"
            ></polyline>
            <polyline
              className="st0"
              points="1188.3,379.6 1119.4,379.6 1108.5,352.9 	"
            ></polyline>
            <polyline
              className="st0"
              points="1100.7,379.6 1039.3,379.6 1028.5,352.7 	"
            ></polyline>
            <polyline
              className="st0"
              points="1019.9,379.7 933.6,379.7 922.9,352.8 	"
            ></polyline>
            <polyline
              className="st0"
              points="902.7,379.7 749,379.7 738.3,352.8 	"
            ></polyline>
            <polyline
              className="st0"
              points="725.9,379.7 686.1,379.7 675.4,352.8 	"
            ></polyline>
            <polyline
              className="st0"
              points="653.8,379.7 639.3,379.7 640.9,555.3 366.3,555.3 366.3,379.8 	"
            ></polyline>
            <polyline
              className="st0"
              points="366.3,379.8 293.9,379.8 282.9,353 	"
            ></polyline>
            <polyline
              className="st0"
              points="132.5,379.8 77.9,379.8 66.9,353 	"
            ></polyline>
            <polyline
              className="st0"
              points="266.4,379.8 157.2,379.8 146.3,353 	"
            ></polyline>
            <polyline
              className="st0"
              points="72.4,200.3 38.1,200.3 38.1,379.8 54.9,379.8 	"
            ></polyline>
            <polyline
              className="st0"
              points="321.9,200.3 96.6,200.3 85.5,227.1 	"
            ></polyline>
            <polyline
              className="st0"
              points="476,200.3 351.7,200.3 340.5,227.1 	"
            ></polyline>
            <line
              className="st0"
              x1="712.5"
              y1="200.3"
              x2="522"
              y2="200.3"
            ></line>
            <polyline
              className="st0"
              points="914.7,200.3 884.1,200.3 872.3,227.1 	"
            ></polyline>
            <polyline
              className="st0"
              points="1081.9,200.3 955,200.3 939.5,226.4 	"
            ></polyline>
            <polyline
              className="st0"
              points="1432,200.3 1325.6,200.3 1314.1,227.1 	"
            ></polyline>
            <polyline
              className="st0"
              points="1537.8,200.3 1462.9,200.3 1451.3,227.1 	"
            ></polyline>
            <polyline
              className="st0"
              points="1724.3,200.3 1559.2,200.3 1548.3,227.1 	"
            ></polyline>
            <polyline
              className="st0"
              points="1879.3,200.3 1762.9,200.3 1751.6,227.1 	"
            ></polyline>
            <path className="st0" d="M366.3,379.8"></path>
            <rect
              x="360.5"
              y="402.9"
              className="st1"
              width="10.9"
              height="64"
            ></rect>
            <rect
              x="360.5"
              y="473.2"
              className="st1"
              width="10.9"
              height="64"
            ></rect>
            <rect
              x="38.1"
              y="25.1"
              className="st0"
              width="1919.6"
              height="530.2"
            ></rect>
            <path className="st2" d="M1777.9,200.3"></path>
            <path className="st2" d="M1847.1,200.3"></path>
            <g>
              <rect
                x="1533.9"
                y="25.1"
                className="st6"
                width="106"
                height="175.2"
                id="d14"
              ></rect>
              <text
                transform="matrix(1 0 0 1 1541.8639 190.2587)"
                className="st4 "
              >
                114
              </text>
            </g>
            <g>
              <rect
                x="1392.5"
                y="25.1"
                className="st6 stv"
                width="141.4"
                height="175.2"
                id="d12"
              ></rect>
              <text
                transform="matrix(1 0 0 1 1431.9509 190.2583)"
                className="st4"
              >
                112
              </text>
            </g>
            <g>
              <rect
                x="1131.5"
                y="25.1"
                className="st6 stv"
                width="261.7"
                height="175.2"
                id="d10"
              ></rect>
              <text
                transform="matrix(1 0 0 1 1298.3203 190.2587)"
                className="st4"
              >
                110
              </text>
            </g>
            <rect
              x="1075.4"
              y="25.1"
              className="st6"
              width="56"
              height="175.2"
            ></rect>
            <g>
              <rect
                x="898.1"
                y="25.1"
                className="st6 stv"
                width="177.3"
                height="175.2"
                id="d6"
              ></rect>
              <text
                transform="matrix(1 0 0 1 919.6819 190.2587)"
                className="st4"
              >
                106
              </text>
              <text
                transform="matrix(1 0 0 1 1010.7032 190.2587)"
                className="st4 "
              >
                108
              </text>
            </g>
            <g>
              <rect
                x="756.2"
                y="25.1"
                className="st6 stv"
                width="142"
                height="175.2"
                id="d4"
              ></rect>
              <text
                transform="matrix(1 0 0 1 854.8511 190.2587)"
                className="st4 "
              >
                104{" "}
              </text>
            </g>
            <g>
              <rect
                x="634.1"
                y="25.1"
                className="st6"
                width="122"
                height="175.2"
                id="d2"
              ></rect>
              <text
                transform="matrix(1 0 0 1 712.4681 190.2587)"
                className="st4 "
              >
                102
              </text>
            </g>
            <g>
              <rect
                x="639.3"
                y="379.7"
                className="st6"
                width="60.3"
                height="175.6"
                id="dwc"
              ></rect>
              <text
                transform="matrix(1 0 0 1 659.586 398.7562)"
                className="st4 "
              >
                WC
              </text>
            </g>
            <g>
              <rect
                x="699.5"
                y="379.7"
                className="st6"
                width="84.2"
                height="175.6"
                id="d3"
              ></rect>
              <text
                transform="matrix(1.0715 0 0 1 727.8199 399.4054)"
                className="st4 "
              >
                103
              </text>
            </g>
            <g>
              <rect
                x="984"
                y="379.7"
                className="st6 stv"
                width="93"
                height="175.6"
                id="d9"
              ></rect>
              <text
                transform="matrix(1 0 0 1 1018.7291 398.8384)"
                className="st4 "
              >
                109
              </text>
            </g>
            <g>
              <rect
                x="1147.8"
                y="379.7"
                className="st6 stv"
                width="97.4"
                height="175.6"
                id="d11"
              ></rect>
              <text
                transform="matrix(1 0 0 1 1188.2854 398.7562)"
                className="st4 "
              >
                111
              </text>
            </g>
            <g>
              <rect
                x="1245.3"
                y="379.5"
                className="st6 stv"
                width="89.2"
                height="175.8"
                id="d13"
              ></rect>
              <text
                transform="matrix(1 0 0 1 1279.0718 399.107)"
                className="st4 "
              >
                113
              </text>
            </g>
            <g>
              <rect
                x="1610.4"
                y="379.8"
                className="st6"
                width="70.5"
                height="175.5"
                id="dwc"
              ></rect>
              <text
                transform="matrix(1 0 0 1 1638.3417 398.7562)"
                className="st4 "
              >
                WC
              </text>
            </g>
            <g>
              <rect
                x="1680.8"
                y="379.8"
                className="st6"
                width="78.8"
                height="175.5"
                id="dsh"
              ></rect>
              <text
                transform="matrix(1 0 0 1 1687.4836 398.812)"
                className="st4 "
              >
                Щитова
              </text>
            </g>
            <g>
              <rect
                x="1334.7"
                y="379.8"
                className="st6 stv"
                width="205.3"
                height="175.5"
                id="d15"
              ></rect>
              <text
                transform="matrix(1 0 0 1 1409.483 398.7562)"
                className="st4 "
              >
                115
              </text>
            </g>
            <g>
              <rect
                x="1839.5"
                y="379.5"
                className="st6"
                width="118.3"
                height="175.8"
                id="d21"
              ></rect>
              <text
                transform="matrix(1 0 0 1 1869.4052 398.812)"
                className="st4 "
              >
                121
              </text>
            </g>
            <g>
              <rect
                x="38.1"
                y="379.6"
                className="st6"
                width="64.4"
                height="175.7"
                id="dwc"
              ></rect>
              <text
                transform="matrix(1 0 0 1 58.2995 397.108)"
                className="st4 "
              >
                WC
              </text>
            </g>
            <g>
              <rect
                x="102.6"
                y="379.6"
                className="st6"
                width="113.8"
                height="175.7"
                id="d1"
              ></rect>
              <text
                transform="matrix(1 0 0 1 134.5071 399.4054)"
                className="st4 "
              >
                101
              </text>
            </g>
            <g>
              <rect
                x="216.4"
                y="379.6"
                className="st6"
                width="149.5"
                height="175.7"
                id="d1"
              ></rect>
              <text
                transform="matrix(1 0 0 1 266.4478 399.4054)"
                className="st4 "
              >
                101
              </text>
            </g>
            <g>
              <rect
                x="289.9"
                y="25.1"
                className="st6"
                width="76.4"
                height="175.2"
                id="dwc"
              ></rect>
              <text
                transform="matrix(1 0 0 1 323.1908 190.16)"
                className="st4 "
              >
                WC
              </text>
            </g>
            <g>
              <rect
                x="38.1"
                y="25.1"
                className="st6"
                width="251.8"
                height="175.2"
                id="d0"
              ></rect>
              <text
                transform="matrix(1 0 0 1 73.6842 189.9037)"
                className="st4 "
              >
                100
              </text>
            </g>
            <g>
              <rect
                x="1639.9"
                y="25.1"
                className="st6"
                width="195.7"
                height="175.2"
                id="d20"
              ></rect>
              <text
                transform="matrix(1 0 0 1 1732.1356 190.2585)"
                className="st4 "
              >
                120
              </text>
            </g>
            <g>
              <rect
                x="1835.6"
                y="25.1"
                className="st6"
                width="122.1"
                height="175.2"
                id="d22"
              ></rect>
              <text
                transform="matrix(1 0 0 1 1887.9764 190.2587)"
                className="st4 "
              >
                122
              </text>
            </g>
            <polyline
              className="st0"
              points="1759.6,379.1 1725.7,379.2 1714.6,353.3 	"
            ></polyline>
            <polyline
              className="st0"
              points="854.9,200.3 737.7,200.3 723.2,227.1 	"
            ></polyline>
            <g>
              <rect
                x="1077.1"
                y="379.8"
                className="st6 stv"
                width="70.7"
                height="175.5"
                id="d9a"
              ></rect>
              <text
                transform="matrix(1 0 0 1 1100.6956 398.7562)"
                className="st4 "
              >
                109A
              </text>
            </g>
            <line
              className="st0"
              x1="1839.5"
              y1="379.5"
              x2="1867.8"
              y2="379.5"
            ></line>
            <line
              className="st0"
              x1="1123.8"
              y1="200.3"
              x2="1297.9"
              y2="200.3"
            ></line>
            <polyline
              className="st7"
              points="117.6,379.6 117.6,296.1 132.5,281.5 	"
            ></polyline>
            <line
              className="st7"
              x1="117.6"
              y1="200.3"
              x2="117.6"
              y2="273"
            ></line>
            <rect
              x="783.7"
              y="379.7"
              className="st6"
              width="70.7"
              height="175.6"
            ></rect>
            <g>
              <rect
                x="854.2"
                y="379.7"
                className="st6"
                width="129.7"
                height="175.6"
                id="d5"
              ></rect>
              <text
                transform="matrix(1.0715 0 0 1 906.5123 399.4054)"
                className="st4 "
              >
                105
              </text>
            </g>
          </g>
          <g id="Слой_2">
            <text transform="matrix(1 0 0 1 142.887 41.8483)" className="st3">
              78.7
            </text>
            <text transform="matrix(1 0 0 1 142.887 540.9622)" className="st3">
              23.7
            </text>
            <text transform="matrix(1 0 0 1 279.4615 540.9622)" className="st3">
              30.5
            </text>
            <text transform="matrix(1 0 0 1 58.244 540.9622)" className="st3">
              7.4
            </text>
            <text transform="matrix(1 0 0 1 658.4971 540.9622)" className="st3">
              7.4
            </text>
            <text
              transform="matrix(1 0 0 1 1710.3273 540.9622)"
              className="st3"
            >
              15.7
            </text>
            <text
              transform="matrix(1 0 0 1 1638.2843 540.9622)"
              className="st3"
            >
              7.7
            </text>
            <text
              transform="matrix(1 0 0 1 1427.6135 540.9622)"
              className="st3"
            >
              65.4
            </text>
            <text transform="matrix(1 0 0 1 1279.472 540.9622)" className="st3">
              32.0
            </text>
            <text
              transform="matrix(1 0 0 1 1178.7833 540.9622)"
              className="st3"
            >
              32.9
            </text>
            <text
              transform="matrix(1 0 0 1 1098.0149 540.9622)"
              className="st3"
            >
              16.2
            </text>
            <text
              transform="matrix(1 0 0 1 1020.0375 540.9622)"
              className="st3"
            >
              32.7
            </text>
            <text transform="matrix(1 0 0 1 908.6206 540.9622)" className="st3">
              45.4
            </text>
            <text transform="matrix(1 0 0 1 803.8759 540.9622)" className="st3">
              14.7
            </text>
            <text transform="matrix(1 0 0 1 732.2997 540.9622)" className="st3">
              15.3
            </text>
            <text transform="matrix(1 0 0 1 1883.168 540.9622)" className="st3">
              34.7
            </text>
            <text transform="matrix(1 0 0 1 317.5041 41.8483)" className="st3">
              11.4
            </text>
            <text transform="matrix(1 0 0 1 681.3115 41.8483)" className="st3">
              30.4
            </text>
            <text transform="matrix(1 0 0 1 812.0574 41.8483)" className="st3">
              48.3
            </text>
            <text transform="matrix(1 0 0 1 976.2963 41.8483)" className="st3">
              51.5
            </text>
            <text transform="matrix(1 0 0 1 1248.0343 41.8483)" className="st3">
              80.5
            </text>
            <text transform="matrix(1 0 0 1 1456.7552 41.8483)" className="st3">
              48.0
            </text>
            <text transform="matrix(1 0 0 1 1576.4424 41.8483)" className="st3">
              32.3
            </text>
            <text transform="matrix(1 0 0 1 1726.0997 41.8483)" className="st3">
              49.2
            </text>
            <text transform="matrix(1 0 0 1 1886.2317 41.8483)" className="st3">
              34.5
            </text>
            <line
              className="st0"
              x1="1680.8"
              y1="379.8"
              x2="1680.8"
              y2="200.3"
            ></line>
          </g>
          <g id="Слой_6">
            <polyline
              className="st0"
              points="52.9,602.9 56.6,611.4 60.5,611.4 60.5,573.3 38.1,573.3 38.1,611.4 41.9,611.4 45.6,602.9 		"
            ></polyline>
            <rect
              x="38.1"
              y="621.1"
              className="st1"
              width="11"
              height="44.9"
            ></rect>
            {/* style="font-size: 15px; font-weight:500;" */}
            <text transform="matrix(1 0 0 1 68.8309 595.8264)" className="st5">
              Сходи
            </text>
            {/* style="font-size: 15px; font-weight:500;" */}
            <text transform="matrix(1 0 0 1 68.8309 647.1559)" className="st5">
              Ліфт
            </text>
            <rect
              x="38.1"
              y="676.7"
              className="stv"
              width="19.7"
              height="46"
            ></rect>
            {/* style="font-size: 15px; font-weight:500;" */}
            <text transform="matrix(1 0 0 1 68.8309 705.2941)" className="st5">
              Відділ
            </text>
          </g>
        </svg>
      </div>

      {/* style="	background: <%-floor.floorColor%>;" */}
      <div className="ui-60">
        <div className="container">
          <div className="row">
            <div className="air-quality white-box">
              <div className="co2">
                <h4>Чадний газ</h4>
                <p id="co2"></p>
              </div>

              <div className="co2__values">
                <div className="co2__quality-item">
                  {/* style="width: 17px; height: 15px; padding-top: 17px; margin-right: 5px;" */}
                  <div className="ui-price bg-greenco circle"></div>
                  {/* style="font-weight: 100; margin-top: 2px;" */}
                  <h6> &lt; 1000 ppm</h6>
                </div>

                <div className="co2__quality-item">
                  {/* style="width: 17px; height: 15px; padding-top: 17px; margin-right: 5px;" */}
                  <div className="ui-price bg-yellowco circle"></div>
                  {/* style="font-weight: 100; margin-top: 2px;" */}
                  <h6> 1000 - 5000 ppm</h6>
                </div>

                <div className="co2__quality-item">
                  {/* style="width: 17px; height: 15px; padding-top: 17px; margin-right: 5px;" */}
                  <div className="ui-price bg-redco circle"></div>
                  {/* style="font-weight: 100; margin-top: 2px;" */}
                  <h6> &gt; 5000 ppm</h6>
                </div>
              </div>
              <div className="co2__quality">
                <h4>Якість повітря (AQI)</h4>
                <p id="tvoc"></p>
              </div>
              <div className="co2__quality-values">
                <div className="co2__quality-value">
                  {/* style="width: 17px; height: 15px; padding-top: 17px; margin-right: 5px;" */}
                  <div className="ui-price bg-greenco circle"></div>
                  {/* style="font-weight: 100; margin-top: 2px;" */}
                  <h6> 0 - 220 </h6>
                </div>

                <div className="co2__quality-value">
                  {/* style="width: 17px; height: 15px; padding-top: 17px; margin-right: 5px;" */}
                  <div className="ui-price bg-yellowco circle"></div>
                  {/* style="font-weight: 100; margin-top: 2px;" */}
                  <h6> 220 - 2200</h6>
                </div>

                <div className="co2__quality-value">
                  {/* style="width: 17px; height: 15px; padding-top: 17px; margin-right: 5px;" */}
                  <div className="ui-price bg-redco circle"></div>
                  {/* style="font-weight: 100; margin-top: 2px;" */}
                  <h6> 2200 - 5500 </h6>
                </div>
              </div>
            </div>

            <div className="temperature white-box">
              <div className="temperature__container">
                <h4 className="temperature__heading">Температура:</h4>
                <div className="temperature__value-wrapper">
                  <span className="temperature__value temperature-value">
                    0.0
                  </span>
                  <div className="temperature__symbol-wrapper">
                    <span className="temperature__symbol-upper">o</span>
                    <span className="temperature__symbol">C</span>
                  </div>
                </div>
              </div>
              <div className="temperature__container">
                <h4 className="temperature__heading">Вологість:</h4>
                <div className="temperature__value-wrapper">
                  <span className="temperature__value humidity-value">0.0</span>
                  <div className="temperature__symbol-wrapper">
                    <span className="temperature__symbol">%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
