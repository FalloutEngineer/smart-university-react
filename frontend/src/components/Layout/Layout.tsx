import React from "react"
import Head from "../Head"
import Header from "../Header"
import PageScripts from "../PageScripts"
import Footer from "../Footer"

export default function Layout({ children }: { children: any }) {
  return (
    <div>
      <Head />
      <Header />
      <main>{children}</main>
      <Footer />
      <PageScripts />
    </div>
  )
}
