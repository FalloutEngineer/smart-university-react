import React from "react"
import { DashPreviewComponent } from "../../types"
import { useParams } from "react-router-dom"
import DashLayout from "../../components/DashLayout/DashLayout"
import DeleteButton from "../../components/DashPreview/DeleteButton"

export default function DashPreview({
  PreviewComponent,
}: DashPreviewComponent) {
  let { name } = useParams()
  const deleteCallback = () =>
    function () {
      console.log("delete", name)
    }
  return (
    <DashLayout>
      <DeleteButton callback={deleteCallback} />
      <PreviewComponent name={name} />
    </DashLayout>
  )
}
