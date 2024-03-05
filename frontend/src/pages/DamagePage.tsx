import React, { useEffect, useState } from "react"
import DashLayout from "../components/DashLayout/DashLayout"
import { NavLink, useParams } from "react-router-dom"

const API_URL = process.env.REACT_APP_API_URL

const damagePostsAPI = API_URL + "/api/damagePost/"

export default function DamagePage() {
  const params = useParams()

  const [damage, setDamage]: any[] = useState(null)

  useEffect(() => {
    const fetchDamage = async () => {
      try {
        const response = await fetch(damagePostsAPI + params.name)
        const data = await response.json()

        console.log(data)
        setDamage(data)
      } catch (e) {
        //TODO: toast?
        console.error(e)
      }
    }

    fetchDamage()
  }, [])

  function tryDeletePost() {
    console.log("lorem ipsum")
  }

  return (
    <DashLayout>
      <NavLink className="dash-board__edit" to={`./edit`}>
        Редагувати
      </NavLink>
      <button onClick={tryDeletePost}>Видалити</button>
      <ul className="dash-board__list">
        <li className="dash-board__item">
          <h3 className="dash-board__label">ID:</h3>
          <div className="dash-board__value">{damage?._id}</div>
        </li>
        {damage && damage.photo_links.length > 0 && (
          <li className="dash-board__images">
            <h3 className="dash-board__label">Зображення:</h3>
            <ul className="dash-board__images-list">
              {damage.photo_links.map((link: any) => {
                return (
                  <li className="dash-board__image-item">
                    <img src={`/images/damage/${link}`} alt="" />
                  </li>
                )
              })}
            </ul>
          </li>
        )}
        <li className="dash-board__item">
          <h3 className="dash-board__label">Назва:</h3>
          <div className="dash-board__value">{damage?.name}</div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Місцезнаходження:</h3>
          <div className="dash-board__value">{damage?.location}</div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Опис:</h3>
          <div className="dash-board__value">{damage?.description}</div>
        </li>
        <li className="dash-board__item">
          <h3 className="dash-board__label">Передбачувана сума:</h3>
          <div className="dash-board__value">{damage?.sum} грн</div>
        </li>
      </ul>
    </DashLayout>
  )
}
