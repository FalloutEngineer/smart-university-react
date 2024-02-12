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
import ListPage from "./pages/ListPage"
import Edit from "./pages/Edit"
import DashboardView from "./pages/DashboardView"
import RoomPage from "./pages/RoomPage"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext"

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="faculties" element={<Faculties />} />
          <Route path="buildings" element={<BuildingsPage />} />
          <Route
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route path="/building/:name" element={<BuildingPage />} />
          <Route path="/floor/:number" element={<FloorPage />} />
          <Route path="/room/:number" element={<RoomPage />} />
          <Route
            path="/manage"
            element={user ? <Manage /> : <Navigate to="/login" />}
          />
          <Route
            path="/room-list"
            element={
              user ? <ListPage listType="room" /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </BrowserRouter>
      {/* <ErrorPage /> */}
      {/* <Faculties /> */}
      {/* <BuildingsPage /> */}
      {/* <LoginPage /> */}
      {/* <BuildingPage id={1} /> */}
      {/* <FloorPage id={1} /> */}
      {/* <Manage /> */}
      {/* <ListPage listType={"room"} /> */}
      {/* <Edit /> */}
      {/* <DashboardView /> */}
      {/* <RoomPage /> */}
    </div>
  )
}

export default App
