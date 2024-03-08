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
import DashboardView from "./pages/DashboardView"
import RoomPage from "./pages/RoomPage"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext"
import { ItemTypeEnum } from "./enums"
import DashPreview from "./pages/DashPreview/DashPreview"
import DashPreviewBuilding from "./pages/DashPreview/DashPreviewBuilding"
import DashPreviewPulpit from "./pages/DashPreview/DashPreviewPulpit"
import DashPreviewFaculty from "./pages/DashPreview/DashPreviewFaculty"
import DashPreviewFloor from "./pages/DashPreview/DashPreviewFloor"
import DashPreviewRoom from "./pages/DashPreview/DashPreviewRoom"
import DashEditRoom from "./pages/DashPreview/DashEditRoom"
import ManagePages from "./pages/ManagePages"
import EditHome from "./pages/EditPages/EditHome"
import EditFaculties from "./pages/EditPages/EditFaculties"
import EditBuildings from "./pages/EditPages/EditBuildings"
import ManageCard from "./pages/ManageCard"
import Cards from "./pages/Cards"
import CardPage from "./pages/CardPage"
import EditCardPage from "./pages/EditCard"
import DamageList from "./pages/DamageList"
import DamagePage from "./pages/DamagePage"
import CreateDamagePost from "./pages/CreateDamagePost"
import EditDamagePost from "./pages/EditDamagePost"
import ScrollToTop from "./components/ScrollToTop"
import DashEditBuilding from "./pages/DashPreview/DashEditBuilding"
import DashEditFloor from "./pages/DashPreview/DashEditFloor"

const API_URL = process.env.REACT_APP_API_URL

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
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
            element={
              user ? (
                <Manage />
              ) : (
                <Navigate to={`/login?redirectTo=/manage`} replace={true} />
              )
            }
          />
          <Route
            path="/room-list"
            element={
              user ? (
                <ListPage listType={ItemTypeEnum.ROOM} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/floor-list"
            element={
              user ? (
                <ListPage listType={ItemTypeEnum.FLOOR} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/faculty-list"
            element={
              user ? (
                <ListPage listType={ItemTypeEnum.FACULTY} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/pulpit-list"
            element={
              user ? (
                <ListPage listType={ItemTypeEnum.PULPIT} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/building-list"
            element={
              user ? (
                <ListPage listType={ItemTypeEnum.BUILDING} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/building-list/:name"
            element={
              user ? (
                <DashPreview
                  PreviewComponent={DashPreviewBuilding}
                  endpoint={API_URL + "/api/buildings/"}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/pulpit-list/:name"
            element={
              user ? (
                <DashPreview
                  PreviewComponent={DashPreviewPulpit}
                  endpoint={API_URL + "/api/pulpits/"}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/faculty-list/:name"
            element={
              user ? (
                <DashPreview
                  PreviewComponent={DashPreviewFaculty}
                  endpoint={API_URL + "/api/faculties/"}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/floor-list/:name"
            element={
              user ? (
                <DashPreview
                  PreviewComponent={DashPreviewFloor}
                  endpoint={API_URL + "/api/floors/"}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/room-list/:name"
            element={
              user ? (
                <DashPreview
                  PreviewComponent={DashPreviewRoom}
                  endpoint={API_URL + "/api/rooms/"}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/room-list/:name/edit"
            element={
              user ? (
                <DashEditRoom endpoint={API_URL + "/api/rooms/"} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/building-list/:name/edit"
            element={user ? <DashEditBuilding /> : <Navigate to="/login" />}
          />
          <Route
            path="/floor-list/:number/edit"
            element={user ? <DashEditFloor /> : <Navigate to="/login" />}
          />
          <Route
            path="/managePages"
            element={user ? <ManagePages /> : <Navigate to="/login" />}
          />
          <Route
            path="/editHome"
            element={user ? <EditHome /> : <Navigate to="/login" />}
          />
          <Route
            path="/editFaculties"
            element={user ? <EditFaculties /> : <Navigate to="/login" />}
          />
          <Route
            path="/editBuildings"
            element={user ? <EditBuildings /> : <Navigate to="/login" />}
          />
          <Route
            path="/manageCard"
            element={user ? <ManageCard /> : <Navigate to="/login" />}
          />
          <Route
            path="/cards"
            element={user ? <Cards /> : <Navigate to="/login" />}
          />
          <Route
            path="/cards/:type/:name"
            element={user ? <CardPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/cards/:type/:name/edit"
            element={user ? <EditCardPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/damage"
            element={user ? <DamageList /> : <Navigate to="/login" />}
          />
          <Route
            path="/damage/:name"
            element={user ? <DamagePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/damage/:name/edit"
            element={user ? <EditDamagePost /> : <Navigate to="/login" />}
          />
          <Route
            path="/createDamagePost"
            element={user ? <CreateDamagePost /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<ErrorPage />} />
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
