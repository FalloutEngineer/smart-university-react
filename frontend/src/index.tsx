import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import Head from "./components/Head"
import AuthContextProvider from "./AuthContext/AuthContext"
import { CookiesProvider } from "react-cookie"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </CookiesProvider>
  </React.StrictMode>
)
