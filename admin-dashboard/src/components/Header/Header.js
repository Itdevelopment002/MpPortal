import React, { useState, useEffect } from "react";
import img from "../../assets/img/user.jpg";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import "./Header.css";
import api from "../api";

const Header = ({ onLogout, userDepartment }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // eslint-disable-next-line
  const [isScreenLarge, setIsScreenLarge] = useState(window.innerWidth > 990);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      const isLarge = window.innerWidth > 990;
      setIsScreenLarge(isLarge);
      if (isLarge) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        !event.target.closest(".dropdown-toggle") &&
        !event.target.closest(".dropdown-menu")
      ) {
        setIsNotificationDropdownOpen(false);
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <>
      <Link
        id="mobile_btn"
        className="mobile_btn float-left"
        to="#"
        onClick={(e) => {
          e.preventDefault();
          toggleSidebar();
        }}
      >
        <i className="fa fa-bars"></i>
      </Link>
      <div className="main-wrapper">
        <div className="header">
          <div className="header-left">
            <Link to="#." className="logo">
              MP
            </Link>
          </div>
          <Link
            id="mobile_btn"
            className="mobile_btn float-left"
            to="#"
            onClick={(e) => {
              e.preventDefault();
              toggleSidebar();
            }}
          >
            <i className="fa fa-bars"></i>
          </Link>
          <ul className="nav user-menu float-right">

            {/* User Profile with Online Status */}
            <li className="nav-item dropdown d-none d-sm-block">
              <Link
                to="#."
                className="dropdown-toggle nav-link user-link"
                onClick={(e) => {
                  e.preventDefault();
                  setIsUserDropdownOpen((prev) => !prev);
                  setIsNotificationDropdownOpen(false);
                }}
              >
                <span className="user-img">
                  <img
                    className="rounded-circle"
                    src={img}
                    width="24"
                    alt="Admin"
                  />
                  <span className="status online"></span>{" "}
                  {/* Online status dot */}
                </span>
                <span className="mx-1">Admin</span>{" "}
                <i className="fa fa-angle-down ml-1"></i>
              </Link>
              {isUserDropdownOpen && (
                <div className="dropdown-menu show dropdown-keep-visible">
                  <Link className="dropdown-item" to="#.">
                    My Profile
                  </Link>
                  <Link className="dropdown-item" to="#.">
                    Edit Profile
                  </Link>
                  <Link className="dropdown-item" to="#.">
                    Settings
                  </Link>
                  <Link className="dropdown-item" onClick={onLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </li>

            {/* Mobile user menu, only visible on small screens */}
            <div className="dropdown mobile-user-menu float-right d-block d-sm-none">
              <Link
                to="#."
                className="dropdown-toggle"
                onClick={(e) => {
                  e.preventDefault();
                  setIsUserDropdownOpen((prev) => !prev);
                }}
              >
                <i className="fa fa-ellipsis-v"></i>
              </Link>
              {isUserDropdownOpen && (
                <div className="dropdown-menu dropdown-menu-right show mx-2 dropdown-keep-visible">
                  <Link className="dropdown-item" to="#.">
                    My Profile
                  </Link>
                  <Link className="dropdown-item" to="#.">
                    Edit Profile
                  </Link>
                  <Link className="dropdown-item" to="#.">
                    Settings
                  </Link>
                  <Link className="dropdown-item" onClick={onLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          </ul>
        </div>
      </div>
      <Sidebar
        isOpen={isSidebarOpen}
        closeSidebar={closeSidebar}
        userDepartment={userDepartment}
      />
    </>
  );
};

export default Header;
