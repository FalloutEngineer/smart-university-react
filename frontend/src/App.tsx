import React, { useContext, useEffect, useState } from "react"
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

const API_URL = process.env.REACT_APP_API_URL

const aboutAPI = API_URL + "/api/aboutMe"

function App() {
  const { user } = useAuthContext()

  const [aboutMe, setAboutMe]: any = useState(null)

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await fetch(aboutAPI, {
          method: "GET",
          headers: {
            authorization: `Bearer ${user}`,
          },
        })

        const data = await response.json()

        setAboutMe(data)
      } catch (e) {
        alert(e)
      }
    }
    if (user) {
      fetchAbout()
    }
  }, [])

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
                isEditor(aboutMe?.role) ? (
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
                canEditAtLeastOneRoom(aboutMe?.role) ? (
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
                canEditAtLeastOneFloor(aboutMe?.role) ? (
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
                canEditAtLeastOneFaculty(aboutMe?.role) ? (
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
                isEditor(aboutMe?.role) ? (
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
                canEditAtLeastOneBuilding(aboutMe?.role) ? (
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
                canEditAtLeastOneBuilding(aboutMe?.role) ? (
                  <DashPreview
                    PreviewComponent={DashPreviewBuilding}
                    endpoint={API_URL + "/api/buildings/"}
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
                isEditor(aboutMe?.role) ? (
                  <DashPreview
                    PreviewComponent={DashPreviewPulpit}
                    endpoint={API_URL + "/api/pulpits/"}
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
                canEditAtLeastOneFaculty(aboutMe?.role) ? (
                  <DashPreview
                    PreviewComponent={DashPreviewFaculty}
                    endpoint={API_URL + "/api/faculties/"}
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
            path="/floor-list/:name"
            element={
              user ? (
                canEditAtLeastOneFloor(aboutMe?.role) ? (
                  <DashPreview
                    PreviewComponent={DashPreviewFloor}
                    endpoint={API_URL + "/api/floors/"}
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
                canEditAtLeastOneRoom(aboutMe?.role) ? (
                  <DashPreview
                    PreviewComponent={DashPreviewRoom}
                    endpoint={API_URL + "/api/rooms/"}
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
                canEditAtLeastOneRoom(aboutMe?.role) ? (
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
                canEditAtLeastOneBuilding(aboutMe?.role) ? (
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
            path="/floor-list/:number/edit"
            element={
              user ? (
                canEditAtLeastOneFloor(aboutMe?.role) ? (
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
                isEditor(aboutMe?.role) ? (
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
                isEditor(aboutMe?.role) ? (
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
                isEditor(aboutMe?.role) ? (
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
                isEditor(aboutMe?.role) ? (
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
                isEditor(aboutMe?.role) ? (
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
                isEditor(aboutMe?.role) ? (
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
                isEditor(aboutMe?.role) ? (
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
                isEditor(aboutMe?.role) ? (
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
                canEditDamage(aboutMe?.role) ? (
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
                canEditDamage(aboutMe?.role) ? (
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
                canEditDamage(aboutMe?.role) ? (
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
                canEditDamage(aboutMe?.role) ? (
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
                isSuperAdmin(aboutMe?.role) ? (
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
                isSuperAdmin(aboutMe?.role) ? (
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
                isSuperAdmin(aboutMe?.role) ? (
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
                isSuperAdmin(aboutMe?.role) ? (
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
                isSuperAdmin(aboutMe?.role) ? (
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
                isSuperAdmin(aboutMe?.role) ? (
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
                isSuperAdmin(aboutMe?.role) ? (
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
                isSuperAdmin(aboutMe?.role) ? (
                  <EditRole />
                ) : (
                  <Navigate to={`/help`} replace={true} />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
