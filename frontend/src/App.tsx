import React, { useEffect, useLayoutEffect, useState } from "react"
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
import UsersList from "./pages/UsersList"
import RolesList from "./pages/RolesList"
import EditRole from "./pages/EditRole"
import RolePage from "./pages/RolePage"
import UserPage from "./pages/UserPage"
import EditUser from "./pages/EditUser"
import CreateUser from "./pages/CreateUser"
import CreateRole from "./pages/CreateRole"
import {
  canEditAtLeastOneBuilding,
  canEditAtLeastOneFaculty,
  canEditAtLeastOneFloor,
  canEditAtLeastOneRoom,
  canEditDamage,
  isEditor,
  isSuperAdmin,
} from "./util/permissionsCheckers"
import Help from "./pages/help"
import { useCookies } from "react-cookie"
// import RestrictedRoutes from "./RestrictedRoutes"

const API_URL = process.env.REACT_APP_API_URL

const aboutAPI = API_URL + "/api/myRole"

function App() {
  const { user } = useAuthContext()

  const [cookies, setCookie] = useCookies(["role"])

  const myRole = cookies["role"] ? cookies["role"] : ""

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
          <Route path="/floor/:building/:number" element={<FloorPage />} />
          <Route path="/room/:number" element={<RoomPage />} />
          <Route
            path="/manage"
            element={
              user ? (
                isEditor(myRole) ? (
                  <Manage />
                ) : (
                  <Navigate to={`/help`} replace={true} />
                )
              ) : (
                <Navigate to={`/login?redirectTo=/manage`} replace={true} />
              )
            }
          />
          <Route
            path="/room-list"
            element={
              user ? (
                canEditAtLeastOneRoom(myRole) ? (
                  <ListPage listType={ItemTypeEnum.ROOM} />
                ) : (
                  <Navigate to={`/help`} replace={true} />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/floor-list"
            element={
              user ? (
                canEditAtLeastOneFloor(myRole) ? (
                  <ListPage listType={ItemTypeEnum.FLOOR} />
                ) : (
                  <Navigate to={`/help`} replace={true} />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/faculty-list"
            element={
              user ? (
                canEditAtLeastOneFaculty(myRole) ? (
                  <ListPage listType={ItemTypeEnum.FACULTY} />
                ) : (
                  <Navigate to={`/help`} replace={true} />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/pulpit-list"
            element={
              user ? (
                isEditor(myRole) ? (
                  <ListPage listType={ItemTypeEnum.PULPIT} />
                ) : (
                  <Navigate to={`/help`} replace={true} />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/building-list"
            element={
              user ? (
                canEditAtLeastOneBuilding(myRole) ? (
                  <ListPage listType={ItemTypeEnum.BUILDING} />
                ) : (
                  <Navigate to={`/help`} replace={true} />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/building-list/:name"
            element={
              user ? (
                canEditAtLeastOneBuilding(myRole) ? (
                  <DashPreview
                    PreviewComponent={DashPreviewBuilding}
                    endpoint={API_URL + "/api/buildings/"}
                    isFloor={false}
                  />
                ) : (
                  <Navigate to={`/help`} replace={true} />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/pulpit-list/:name"
            element={
              user ? (
                isEditor(myRole) ? (
                  <DashPreview
                    PreviewComponent={DashPreviewPulpit}
                    endpoint={API_URL + "/api/pulpits/"}
                    isFloor={false}
                  />
                ) : (
                  <Navigate to={`/help`} replace={true} />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/faculty-list/:name"
            element={
              user ? (
                canEditAtLeastOneFaculty(myRole) ? (
                  <DashPreview
                    PreviewComponent={DashPreviewFaculty}
                    endpoint={API_URL + "/api/faculties/"}
                    isFloor={false}
                  />
                ) : (
                  <Navigate to={`/help`} replace={true} />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/floor-list/:building/:name"
            element={
              user ? (
                canEditAtLeastOneFloor(myRole) ? (
                  <DashPreview
                    PreviewComponent={DashPreviewFloor}
                    endpoint={API_URL + "/api/floors/"}
                    isFloor={true}
                  />
                ) : (
                  <Navigate to={`/help`} replace={true} />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/room-list/:name"
            element={
              user ? (
                canEditAtLeastOneRoom(myRole) ? (
                  <DashPreview
                    PreviewComponent={DashPreviewRoom}
                    endpoint={API_URL + "/api/rooms/"}
                    isFloor={true}
                  />
                ) : (
                  <Navigate to={`/help`} replace={true} />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/room-list/:name/edit"
            element={
              user ? (
                canEditAtLeastOneRoom(myRole) ? (
                  <DashEditRoom endpoint={API_URL + "/api/rooms/"} />
                ) : (
                  <Navigate to={`/help`} replace={true} />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/building-list/:name/edit"
            element={
              user ? (
                canEditAtLeastOneBuilding(myRole) ? (
                  <DashEditBuilding />
                ) : (
                  <Navigate to={`/help`} replace={true} />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/floor-list/:building/:number/edit"
            element={
              user ? (
                canEditAtLeastOneFloor(myRole) ? (
                  <DashEditFloor />
                ) : (
                  <Navigate to={`/help`} replace={true} />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/managePages"
            element={
              user ? (
                isEditor(myRole) ? (
                  <ManagePages />
                ) : (
                  <Navigate to={`/help`} replace={true} />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/editHome"
            element={
              user ? (
                isEditor(myRole) ? (
                  <EditHome />
                ) : (
                  <Navigate to={`/help`} replace={true} />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/editFaculties"
            element={
              user ? (
                isEditor(myRole) ? (
                  <EditFaculties />
                ) : (
                  <Navigate to={`/help`} replace={true} />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/editBuildings"
            element={
              user ? (
                isEditor(myRole) ? (
                  <EditBuildings />
                ) : (
                  <Navigate to={`/help`} replace={true} />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/manageCard"
            element={
              user ? (
                isEditor(myRole) ? (
                  <ManageCard />
                ) : (
                  <Navigate to={`/help`} replace={true} />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/cards"
            element={
              user ? (
                isEditor(myRole) ? (
                  <Cards />
                ) : (
                  <Navigate to={`/help`} replace={true} />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/cards/:type/:name"
            element={
              user ? (
                isEditor(myRole) ? (
                  <CardPage />
                ) : (
                  <Navigate to={`/help`} replace={true} />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/cards/:type/:name/edit"
            element={
              user ? (
                isEditor(myRole) ? (
                  <EditCardPage />
                ) : (
                  <Navigate to={`/help`} replace={true} />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/damage"
            element={
              user ? (
                canEditDamage(myRole) ? (
                  <DamageList />
                ) : (
                  <Navigate to={`/help`} replace={true} />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/damage/:name"
            element={
              user ? (
                canEditDamage(myRole) ? (
                  <DamagePage />
                ) : (
                  <Navigate to={`/help`} replace={true} />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/damage/:name/edit"
            element={
              user ? (
                canEditDamage(myRole) ? (
                  <EditDamagePost />
                ) : (
                  <Navigate to={`/help`} replace={true} />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/createDamagePost"
            element={
              user ? (
                canEditDamage(myRole) ? (
                  <CreateDamagePost />
                ) : (
                  <Navigate to={`/help`} replace={true} />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/users"
            element={
              user ? (
                isSuperAdmin(myRole) ? (
                  <UsersList />
                ) : (
                  <Navigate to={`/help`} replace={true} />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/createUser"
            element={
              user ? (
                isSuperAdmin(myRole) ? (
                  <CreateUser />
                ) : (
                  <Navigate to={`/help`} replace={true} />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/users/:name"
            element={
              user ? (
                isSuperAdmin(myRole) ? (
                  <UserPage />
                ) : (
                  <Navigate to={`/help`} replace={true} />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/users/:name/edit"
            element={
              user ? (
                isSuperAdmin(myRole) ? (
                  <EditUser />
                ) : (
                  <Navigate to={`/help`} replace={true} />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/roles"
            element={
              user ? (
                isSuperAdmin(myRole) ? (
                  <RolesList />
                ) : (
                  <Navigate to={`/help`} replace={true} />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/createRole"
            element={
              user ? (
                isSuperAdmin(myRole) ? (
                  <CreateRole />
                ) : (
                  <Navigate to={`/help`} replace={true} />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/roles/:name"
            element={
              user ? (
                isSuperAdmin(myRole) ? (
                  <RolePage />
                ) : (
                  <Navigate to={`/help`} replace={true} />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/roles/:name/edit"
            element={
              user ? (
                isSuperAdmin(myRole) ? (
                  <EditRole />
                ) : (
                  <Navigate to={`/help`} replace={true} />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/help"
            element={user ? <Help /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
