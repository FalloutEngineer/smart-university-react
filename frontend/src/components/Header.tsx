import React, { useEffect, useState } from "react"

import "./header.css"

export default function Header({
  useDarkFont = false,
}: {
  useDarkFont?: boolean
}) {
  //TODO: get state from server
  let currentPage: string = "main"

  const [isScrolled, setIsScrolled] = useState(false)

  const [isOpened, setIsOpened] = useState(false)

  function toggleMobileMenu() {
    setIsOpened((prevState) => !prevState)
  }

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset
      setIsScrolled(position !== 0)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={
        "header navbar-fixed-top " +
        (useDarkFont ? "dark-font" : "") +
        " " +
        (isScrolled ? "scrolled" : "")
      }
    >
      <nav className="navbar" role="navigation">
        <div className="container">
          <div className="menu-container">
            <button
              type="button"
              className={"navbar-toggle " + (isOpened && "active")}
              onClick={() => {
                toggleMobileMenu()
              }}
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="toggle-icon"></span>
            </button>

            <div className="logo">
              <a className="logo-wrap" href="/">
                <img
                  className="logo-img logo-img-main"
                  src="/img/logo.png"
                  alt=" Logo"
                />
                <img
                  className="logo-img logo-img-active"
                  src="/img/logo-dark.png"
                  alt=" Logo"
                />
              </a>
            </div>
          </div>

          {/* <div className="collapse navbar-collapse nav-collapse"> */}
          <div className={"headerMenu " + (!isOpened ? "collapsed" : "")}>
            <div className="menu-container">
              <ul className="navbar-nav navbar-nav-right">
                <li className="nav-item">
                  <a
                    className={
                      "nav-item-child nav-item-hover " +
                      (currentPage === "main" ? "active" : "")
                    }
                    href="/"
                  >
                    Головна
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={
                      "nav-item-child nav-item-hover" +
                      (currentPage === "manage" ? "active" : "")
                    }
                    href="/manage"
                  >
                    Керування
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={
                      "nav-item-child nav-item-hover" +
                      (currentPage === "faculties" ? "active" : "")
                    }
                    href="/faculties-page"
                  >
                    Факультети
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={
                      "nav-item-child nav-item-hover" +
                      (currentPage === "buildings-page" ? "active" : "")
                    }
                    href="/buildings-page"
                  >
                    Будівлі
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
