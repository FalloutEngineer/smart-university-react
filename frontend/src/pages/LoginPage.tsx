import React from "react"
import Layout from "../components/Layout/Layout"

import "./login.css"

export default function LoginPage() {
  return (
    <Layout headerless={true} footerless={true}>
      <div className="login__container">
        {/* @submit.prevent="auth" */}
        <form id="login-body" className="login__body">
          <h2 className="login__heading">Увійти</h2>
          <div className="login__item">
            <label htmlFor="login">Логін</label>
            {/* v-model="login" */}
            <input
              id="login"
              type="text"
              className="login__input login__login"
              placeholder="Логін"
            />
          </div>
          <div className="login__item">
            <label htmlFor="password">Пароль</label>
            {/* v-model="password" */}
            <input
              id="password"
              type="password"
              className="login__input login__password"
              placeholder="Пароль"
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
