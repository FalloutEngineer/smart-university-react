import React, { useState } from "react"
import Layout from "../components/Layout/Layout"

import "./login.css"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log(username, password)
  }

  return (
    <Layout headerless={true} footerless={true}>
      <div className="login__container">
        <form id="login-body" className="login__body" onSubmit={handleSubmit}>
          <h2 className="login__heading">Увійти</h2>
          <div className="login__item">
            <label htmlFor="login">Логін</label>
            <input
              id="login"
              type="text"
              className="login__input login__login"
              placeholder="Логін"
              onChange={(e) => {
                setUsername(e.target.value)
              }}
            />
          </div>
          <div className="login__item">
            <label htmlFor="password">Пароль</label>
            <input
              id="password"
              type="password"
              className="login__input login__password"
              placeholder="Пароль"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </div>
          <input
            id="authorize-button"
            type="submit"
            className="login__submit"
            value="Увійти"
          />
        </form>
      </div>
    </Layout>
  )
}
