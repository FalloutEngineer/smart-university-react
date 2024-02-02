import React from "react"
import Head from "../Head"
import Header from "../Header"
import PageScripts from "../PageScripts"
import Footer from "../Footer"

import "./layout.css"

export default function Layout({
  children,
  useDarkHeaderFont = false,
  headerless = false,
  footerless = false,
}: {
  children: any
  useDarkHeaderFont?: boolean
  headerless?: boolean
  footerless?: boolean
}) {
  return (
    <div className="mainLayout">
      <Head />
      {headerless ? null : <Header useDarkFont={useDarkHeaderFont} />}
      <main className="mainLayout__main">{children}</main>
      {footerless ? null : <Footer />}
      <PageScripts />
    </div>
  )
}
