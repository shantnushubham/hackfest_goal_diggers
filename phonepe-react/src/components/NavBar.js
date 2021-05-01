import React from "react";
import { Link } from "react-router-dom";
import "../css/NavBar.css";

const NavBar = (props) => {
  const { user, setUser } = props;

  const showAuthPart = () => {
    if (user === null || typeof user === "undefined") {
      return (
        <>
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
          <li>
            <Link to={"/signup"}>SignUp</Link>
          </li>
        </>
      );
    }
    return (
      <li>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          onClick={(e) => {
            localStorage.clear();
            setUser(null);
          }}
        >
          Logout
        </a>
      </li>
    );
  };

  return (
    <>
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
                    <Link to={"/"}>Home</Link>
                  </li>
                  <li>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <Link to={"/about-us"}>About Us</Link>
                  </li>
                  {showAuthPart()}
                </ul>
              </div>
            </a>
          </div>
          <div className={"uk-navbar-right"}>
            {user !== null && typeof user !== "undefined" && (
              <Link to={"my-profile"}>
                <div className={"profile-nav"}>Hi, {user.name}</div>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
