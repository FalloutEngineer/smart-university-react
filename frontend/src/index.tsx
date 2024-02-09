import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import Head from "./components/Head"
import AuthContextProvider from "./AuthContext/AuthContext"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
)
