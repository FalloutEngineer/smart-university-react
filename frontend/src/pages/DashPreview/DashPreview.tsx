import React from "react"
import { DashPreviewComponent } from "../../types"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import DashLayout from "../../components/DashLayout/DashLayout"
import DeleteButton from "../../components/DashPreview/DeleteButton"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useCookies } from "react-cookie"
import { isEditor } from "../../util/permissionsCheckers"

export default function DashPreview({
  PreviewComponent,
  endpoint,
  isFloor,
}: {
  PreviewComponent: DashPreviewComponent
  endpoint: string
  isFloor: boolean
}) {
  let { name, building } = useParams()
  const { user } = useAuthContext()

  const navigate = useNavigate()

  const [cookies, setCookie] = useCookies(["role"])

  const myRole = cookies["role"] ? cookies["role"] : ""

  const deleteCallback = () =>
    function () {
      let isUserSure = window.confirm("Ви справді хочете видалити цей об'єкт?")

      if (isUserSure) {
        if (isFloor) {
          fetch(endpoint + building + "/" + name, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${user}`,
            },
          })
            .then((res) => {
              return res.json()
            })
            .then((data) => {
              navigate(-1)
            })
            .catch((e) => {
              //TODO: toast?
              console.error(e)
            })
        } else {
          fetch(endpoint + name, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${user}`,
            },
          })
            .then((res) => {
              return res.json()
            })
            .then((data) => {
              navigate(-1)
            })
            .catch((e) => {
              //TODO: toast?
              console.error(e)
            })
        }
      }
    }
  return (
    <DashLayout>
      {isEditor(myRole) && <DeleteButton callback={deleteCallback} />}
      <PreviewComponent endpoint={endpoint} name={name} />
    </DashLayout>
  )
}
