import React from "react"
import { NavLink } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="content container">
        <div className="row">
          <div className="col-xs-12 text-center">
            <p className="margin-b-0">
              <a className="color-base fweight-700" href="/">
                Херсоньский Державний Університет
              </a>
              <br />© 2024
              <br />
              Voichenko V., Koziura A.,
              <a href="https://www.kspu.edu/About/Faculty/FPhysMathemInformatics/ChairInformatics/Staff/Vinnik.aspx">
                Vinnik M.
              </a>
              ,
              <a href="https://sites.google.com/site/maksympoltorackiy/home?authuser=0">
                Poltorackiy M.
              </a>
              ,
              <a href="https://www.kspu.edu/About/UniversityAdministration/ABC.aspx">
                Spivakovskiy O.
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="footer-manage">
        <NavLink to="/manage" className={"nav-item-child nav-item-hover"}>
          Керування
        </NavLink>
      </div>
    </footer>
  )
}
