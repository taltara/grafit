import React, { useState, useEffect } from "react";
import logo from "../assets/img/logo.svg";
import { NavLink } from "react-router-dom";

const SideMenu = (props) => {

    let openTimer = null;

  const [showMenu, setShowMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    let currentTab = window.location.pathname;
    console.log(currentTab);
    let ActiveTab;

    switch (currentTab) {
      case "/":
        ActiveTab = "home";
        break;
      case "/graf":
        ActiveTab = "graf";
        break;
      default:
        ActiveTab = "home";
        break;
    }
    props.onSetTab(ActiveTab);
    setActiveTab(ActiveTab);

  }, [])


  const onLabelChange = (ActiveTab) => {
    if (!showMenu) return;
    if (props.ActiveTab === ActiveTab) return;

    props.onSetTab(ActiveTab);
    setActiveTab(ActiveTab);
  };

  const onHoverIn = () => {
    openTimer = setTimeout(() => {
        setShowMenu((prevState) => !prevState);
        openTimer = null;
    }, 100);
  };

  const onHoverOut = () => {
    if (openTimer) clearTimeout(openTimer);
    else if (!openTimer && showMenu) {
      onHoverIn();
    }
    openTimer = null;
  };
      
    const { ActiveTab } = props;
    console.log(ActiveTab);
    return (
      <aside
        className={`side-menu ${showMenu ? "show-menu" : ""}`}
        onMouseEnter={onHoverIn}
        onMouseLeave={onHoverOut}
      >
        <ul className="labels-list flex column">
          <NavLink exact to="/">
            <span
              onClick={() => onLabelChange("home")}
              className={`label-span flex align-center space-start ${
                ActiveTab === "home" ? "active-navbar" : ""
              }`}
            >
              <li>Home</li>
            </span>
          </NavLink>
          <span className="other-labels flex column align-center space-center">
            {}
          </span>
          <NavLink exact to="/graf">
            <span
              onClick={() => onLabelChange("graf")}
              className={`label-span flex align-center space-between ${
                ActiveTab === "graf" ? "active-navbar" : ""
              }`}
            >
              <li>Graf</li>
              <img className="menu-logo" src={logo} alt="Logo" />
            </span>
          </NavLink>
        </ul>
      </aside>
    );
  
}


export default SideMenu;