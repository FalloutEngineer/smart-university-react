import React from "react"
import { Link } from "react-router-dom"
import Layout from "../components/Layout/Layout"

import "./errorPage.css"

export default function ErrorPage() {
  return (
    <Layout useDarkHeaderFont={true}>
      <div className="errorPage">
        <div className="error__container">
          <h2>Сторінку не знайдено</h2>
          <p>
            Повернутись на <a href="/">Головну</a>
          </p>
        </div>
      </div>
    </Layout>
  )
  // <script src="/js/login.js"></script>
}
