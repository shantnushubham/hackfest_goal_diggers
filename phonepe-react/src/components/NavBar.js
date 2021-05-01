import React from "react";
import { Link } from "react-router-dom";
import "../css/NavBar.css";
import logo from "../assets/phone-pe.png";

const NavBar = (props) => {
  let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

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
                  {loggedInUser === null ? (
                    <>
                      <li>
                        <Link to={"/signup"}>SignUp</Link>
                      </li>
                      <li>
                        <Link to={"/login"}>Login</Link>
                      </li>
                    </>
                  ) : null}
                  <li>
                    <a>About Us</a>
                  </li>
                </ul>
              </div>
            </a>
          </div>
          <div className={"uk-navbar-right"}>
            {loggedInUser !== null && (
              <Link to={"my-profile"}>
                <div className={"profile-nav"}>My Profile</div>
              </Link>
            )}
          </div>
        </nav>
      </div>
      {/* Phone Nav Ends */}
    </>
  );
};

export default NavBar;
