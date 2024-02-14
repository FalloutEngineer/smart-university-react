import React from "react"
import { DashPreviewComponent } from "../../types"
import { useNavigate, useParams } from "react-router-dom"
import DashLayout from "../../components/DashLayout/DashLayout"
import DeleteButton from "../../components/DashPreview/DeleteButton"
import { useAuthContext } from "../../hooks/useAuthContext"

export default function DashPreview({
  PreviewComponent,
  endpoint,
}: {
  PreviewComponent: DashPreviewComponent
  endpoint: string
}) {
  let { name } = useParams()
  const { user } = useAuthContext()

  const navigate = useNavigate()

  const deleteCallback = () =>
    function () {
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
          console.log(data)
          navigate(-1)
        })
        .catch((e) => {
          //TODO: toast?
          console.error(e)
        })
    }
  return (
    <DashLayout>
      <DeleteButton callback={deleteCallback} />
      <PreviewComponent endpoint={endpoint} name={name} />
    </DashLayout>
  )
}
