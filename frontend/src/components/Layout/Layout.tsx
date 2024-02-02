import React from "react"
import Head from "../Head"
import Header from "../Header"
import PageScripts from "../PageScripts"
import Footer from "../Footer"

import "./layout.css"

export default function Layout({
  children,
  useDarkHeaderFont = false,
}: {
  children: any
  useDarkHeaderFont?: boolean
}) {
  return (
    <div className="mainLayout">
      <Head />
      <Header useDarkFont={useDarkHeaderFont} />
      <main className="mainLayout__main">{children}</main>
      <Footer />
      <PageScripts />
    </div>
  )
}
