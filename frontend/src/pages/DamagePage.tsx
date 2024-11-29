import React, { useEffect, useState } from "react"
import DashLayout from "../components/DashLayout/DashLayout"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

const API_URL = process.env.REACT_APP_API_URL

const damagePostsAPI = API_URL + "/api/damagePost/"

export default function DamagePage() {
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const params = useParams()

  const [damage, setDamage]: any = useState(null)

  useEffect(() => {
    const fetchDamage = async () => {
      try {
        const response = await fetch(damagePostsAPI + params.name)
        const data = await response.json()

        console.error(data)
        setDamage(data)
      } catch (e) {
        //TODO: toast?
        console.error(e)
      }
    }

    fetchDamage()
  }, [])

  const deleteCallback = () =>
    function () {
      let isUserSure = window.confirm("Ви справді хочете видалити цей об'єкт?")

      if (isUserSure) {
        fetch(damagePostsAPI + params.name, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user}`,
          },
        })
          .then((res) => {
            return res.json()
          })
          .then((data) => {
            console.error(data)
            navigate(-1)
          })
          .catch((e) => {
            //TODO: toast?
            console.error(e)
          })
      }
    }

  return (
    <DashLayout>
      <button className="dash-board__delete-btn" onClick={deleteCallback()}>
        Видалити
      </button>

      <NavLink className="dash-board__edit" to={`./edit`}>
        Редагувати
      </NavLink>

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
