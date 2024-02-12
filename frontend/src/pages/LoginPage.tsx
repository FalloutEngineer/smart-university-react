import React, { useEffect, useState } from "react"
import { useLogin } from "../hooks/useLogin"
import Layout from "../components/Layout/Layout"

import "./login.css"
import { useNavigate } from "react-router-dom"
import { redirect } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { user } = useAuthContext()

  const navigate = useNavigate()

  const { login, error, isLoading } = useLogin()

  useEffect(() => {
    if (user) {
      redirect("/")
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const loggedIn = await login(username, password)

    if (loggedIn) {
      navigate(-1)
    }
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
            disabled={isLoading}
            id="authorize-button"
            type="submit"
            className="login__submit"
            value="Увійти"
          />

          {error && <div className="loginError">{error}</div>}
        </form>
      </div>
    </Layout>
  )
}
