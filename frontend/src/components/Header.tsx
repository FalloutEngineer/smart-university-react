import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"

import "./header.css"
import { useAuthContext } from "../hooks/useAuthContext"

export default function Header({
  useDarkFont = false,
  isDashboard = false,
}: {
  useDarkFont?: boolean
  isDashboard?: boolean
}) {
  const { logout } = useLogout()

  const [isScrolled, setIsScrolled] = useState(window.pageYOffset !== 0)

  const [isOpened, setIsOpened] = useState(false)
  const { user } = useAuthContext()

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

  const handleLogoutClick = () => {
    logout()
  }

  return (
    <header
      className={
        "header navbar-fixed-top " +
        (useDarkFont ? "dark-font" : "") +
        " " +
        (isScrolled ? "scrolled" : "") +
        " " +
        (isDashboard ? "dash-header" : "")
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

          <div className={"headerMenu " + (!isOpened ? "collapsed" : "")}>
            <div className="menu-container">
              <ul className="navbar-nav navbar-nav-right">
                <li className="nav-item">
                  <NavLink to="/" className={"nav-item-child nav-item-hover"}>
                    Головна
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/faculties"
                    className={"nav-item-child nav-item-hover"}
                  >
                    Факультети
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/buildings"
                    className={"nav-item-child nav-item-hover"}
                  >
                    Будівлі
                  </NavLink>
                </li>
                {user && (
                  <li className="nav-item">
                    <button
                      className="logout-button"
                      onClick={handleLogoutClick}
                    >
                      Вийти
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
