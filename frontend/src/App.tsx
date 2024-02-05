import React from "react"
import "./App.css"
import Home from "./pages/Home"
import ErrorPage from "./pages/ErrorPage"
import Faculties from "./pages/Faculties"
import BuildingsPage from "./pages/BuildingsPage"
import LoginPage from "./pages/LoginPage"
import BuildingPage from "./pages/BuildingPage"
import FloorPage from "./pages/FloorPage"
import Manage from "./pages/Manage"

function App() {
  return (
    <div className="App">
      {/* <Home /> */}
      {/* <ErrorPage /> */}
      {/* <Faculties /> */}
      {/* <BuildingsPage /> */}
      {/* <LoginPage /> */}
      {/* <BuildingPage id={1} /> */}
      {/* <FloorPage id={1} /> */}
      <Manage />
    </div>
  )
}

export default App
