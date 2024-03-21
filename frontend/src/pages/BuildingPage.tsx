import React, { useEffect, useLayoutEffect, useState } from "react"
import Layout from "../components/Layout/Layout"
import ParallaxWindow from "../components/ParallaxWindow"

import "./buildingPage.css"
import BuildingItem from "../components/BuildingItem"
import { useParams } from "react-router-dom"
import BuildingSVG from "../components/BuildingSVG"

const API_URL = process.env.REACT_APP_API_URL

const buildingsAPI = API_URL + `/api/buildings`

const floorsAPI = API_URL + `/api/floors`

export default function BuildingPage() {
  const params = useParams()

  const [building, setBuilding]: any[] = useState([])

  const [floors, setFloors]: any[] = useState([])

  const [buildingSvgURL, setBuildingSvgURL] = useState("")

  const [buildingBGURL, setBuildingBGURL] = useState("")

  useLayoutEffect(() => {
    const fetchBuildings = async () => {
      const response = await fetch(buildingsAPI + "/" + params.name)
      const json = await response.json()

      if (response.ok) {
        setBuilding(json)
        setBuildingSvgURL(API_URL + "/svg/building/" + json.svg)
        if (json.background) {
          setBuildingBGURL(API_URL + "/images/building/" + json.background)
        }
      } else {
        //TODO: toast error?
        console.log(response.status, response.text)
      }
    }

    fetchBuildings().catch((e) => {
      console.log(e)
    })
  }, [])

  async function getBuildingPromise(id: any) {
    return fetch(floorsAPI + "/" + building.name + "/" + id)
  }

  useEffect(() => {
    const fetchFloors = async (IDs: any) => {
      if (IDs) {
        const idPromises = IDs.map((id: any) => {
          return getBuildingPromise(id)
        })

        const responses = await Promise.all(idPromises)

        const jsons = await Promise.all(
          responses.map((resp) => {
            return resp.json()
          })
        )

        setFloors([...jsons])
      }
    }

    fetchFloors(building.floors)
  }, [building])

  return (
    <Layout>
      {buildingBGURL === "" || buildingBGURL === null ? (
        <ParallaxWindow imageUrl={`url(/img/1.jpg)`}>
          <div className="parallax-content container buildingPage-content">
            {/* style="text-align: right;" */}
            <h1 className="carousel-title">{building && building.name}</h1>
            {building.address !== null ? <p>{building.address}</p> : ""}
          </div>
        </ParallaxWindow>
      ) : (
        <ParallaxWindow imageUrl={`url(${buildingBGURL})`}>
          <div className="parallax-content container buildingPage-content">
            {/* style="text-align: right;" */}
            <h1 className="carousel-title">{building && building.name}</h1>
            {building.address !== null ? <p>{building.address}</p> : ""}
          </div>
        </ParallaxWindow>
      )}
      <section className="section section_models" id="models_1">
        <div className="container">
          {building.svg !== null ? (
            <div className="model-container">
              {/* <object
                className="model-svg"
                data={buildingSvgURL}
                type="image/svg+xml"
              >
                Building Model
              </object> */}

              {buildingSvgURL !== "" ? (
                <BuildingSVG url={buildingSvgURL} />
              ) : null}

              <svg />
            </div>
          ) : (
            ""
          )}
          <ul className="page-list">
            {floors &&
              floors.map((floor: any) => {
                return (
                  <BuildingItem
                    number={floor.number}
                    building={building.name}
                    faculties={[floor.faculty]}
                  />
                )
              })}
          </ul>
        </div>
      </section>
      <div className="bg-color-sky-light" data-auto-height="true">
        {building.description ? (
          <div
            className="content-lg container descriptionContainer"
            style={{ paddingBottom: "0px" }}
          >
            <div className="row">
              <div className="col-12">
                <div className="service">
                  <div>
                    <p
                      style={{ color: "rgb(61, 61, 61)", textAlign: "center" }}
                    >
                      {building.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </Layout>
  )
}
