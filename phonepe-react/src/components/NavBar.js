import React from "react";
import { Link } from "react-router-dom";
import "../css/NavBar.css";
import logo from "../assets/phone-pe.png"

const NavBar = (props) => {
  const { user, setUser } = props;

  return (
    <>
      {/* Phone Nav */}
      <div
        uk-sticky={
          "animation: uk-animation-slide-top; sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky; cls-inactive: uk-navbar-transparent uk-light; top: 200"
        }
      >
        <nav className={"uk-navbar uk-navbar-container uk-margin phone-nav"}>
          <div className={"uk-navbar-left"}>
            {/* eslint-disable-next-line */}
            <a className={"uk-navbar-toggle"} href="#">
              <span uk-navbar-toggle-icon={""} />
              <div uk-dropdown={"mode: click"}>
                <ul className={"uk-nav uk-dropdown-nav"}>
                  <li>
                    <Link to={"/signup"}>SignUo</Link>
                  </li>
                </ul>
              </div>
            </a>
          </div>
          
        </nav>
      </div>
      {/* Phone Nav Ends */}
    </>
  );
};

export default NavBar;
