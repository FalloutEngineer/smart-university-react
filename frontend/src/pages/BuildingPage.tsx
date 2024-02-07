import React, { useEffect, useState } from "react"
import Layout from "../components/Layout/Layout"
import ParallaxWindow from "../components/ParallaxWindow"

import "./buildingPage.css"
import BuildingItem from "../components/BuildingItem"
import { useParams } from "react-router-dom"

const API_URL = process.env.REACT_APP_API_URL

const buildingsAPI = API_URL + `/api/buildings`

const floorsAPI = API_URL + `/api/floors`

// { id }: { id: number }
export default function BuildingPage() {
  const params = useParams()

  const [building, setBuilding]: any[] = useState([])

  const [floors, setFloors]: any[] = useState([])

  useEffect(() => {
    const fetchBuildings = async () => {
      const response = await fetch(buildingsAPI + "/" + params.name)
      const json = await response.json()

      if (response.ok) {
        console.log(json)

        setBuilding(json)
      } else {
        //TODO: toast error?
        console.log(response.status, response.text)
      }
    }

    const fetchFloors = async (IDs: any) => {
      setFloors([])

      IDs.forEach(async (id: any) => {
        const response = await fetch(floorsAPI + "/" + id)
        const json = await response.json()

        if (response.ok) {
          console.log(json)

          setFloors((prevState: any) => {
            return [...prevState, json]
          })
        } else {
          //TODO: toast error?
          console.log(response.status, response.text)
        }
      })
    }

    fetchBuildings()
    fetchFloors(building.floors)
  }, [])

  return (
    <Layout>
      <ParallaxWindow imageUrl="url('/img/1.jpg')">
        <div className="parallax-content container buildingPage-content">
          {/* style="text-align: right;" */}
          <h1 className="carousel-title">{building && building.name}</h1>
          {building.address !== null ? <p>{building.address}</p> : ""}
        </div>
      </ParallaxWindow>
      <section className="section section_models" id="models_1">
        <div className="container">
          {/* TODO: get image from server */}
          {building.svg !== null ? (
            <div className="model-container">
              <object
                className="model-svg"
                data={"/svg/" + building.svg}
                type="image/svg+xml"
              >
                Building Model
              </object>
            </div>
          ) : (
            ""
          )}
          <ul className="page-list">
            {/* TODO: list image from server, FROM FLOORS VARIABLE */}
            {floors &&
              floors.map((floor: any) => {
                return (
                  <BuildingItem
                    number={floor.number}
                    faculties={[floor.faculty]}
                  />
                )
              })}
          </ul>
        </div>
      </section>
    </Layout>
  )
}
