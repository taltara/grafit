import React, { useState, useEffect, useRef } from "react";

import TiltButton from "./TiltButton/TiltButton";

const NavTabs = (props) => {
  let tabsRef = useRef(null);
  const { activeTab, onSetTab } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [isCondensed, setIsCondensed] = useState(false);

  useEffect(() => {
    updateCondensed();
    window.addEventListener("resize", () => {
      updateCondensed();
    });
    return window.removeEventListener("resize", () => {
      updateCondensed();
    });
  }, []);

  const updateCondensed = () => {
    if (window.innerWidth <= 800) {
      if (!isCondensed) {
        console.log("MOBILE!", isCondensed);
        setIsCondensed(true);
      }
    } else {
      console.log("DESKTOP..");
      // if (isCondensed) {
      setIsCondensed(false);
      setIsOpen(false);
      // }
    }
  };

  const onHoverCondensed = (hovering) => {
    if (isCondensed) {
      setIsOpen(hovering);
    }
  };
  const onClickCondensed = (event) => {
    event.stopPropagation();
    if (isCondensed && !isOpen) {
      setIsOpen(true);
    }
  };

  const tabs = [
    { label: "home", to: "" },
    { label: "graf", to: "graf" },
  ];

  let navTabsClass = isCondensed ? "tabs-condensed " : "";
  navTabsClass += isOpen ? "tabs-open" : "";

  return (
    <div
      className={`nav-tabs-container flex align-center space-center ${navTabsClass}`}
    >
      <ul
        className={`nav-tabs flex align-center space-between ${navTabsClass}`}
        ref={tabsRef}
        onMouseEnter={() => onHoverCondensed(true)}
        onMouseLeave={() => onHoverCondensed(false)}
        onClick={onClickCondensed}
      >
        {tabs.map((tab, index) => {
          let style = {};
         
          return (
            <TiltButton
              buttonType="link"
              label={tab.label}
              linkTo={tab.to}
              activeLink={activeTab}
              activeLinkClass="activeTab"
              isLinkToExact={true}
              tiltOptions={{ scale: isOpen ? 1.1 : 1.2 }}
              animation="activeTab"
              onClick={() => onSetTab(tab.label === "home" ? "" : tab.label)}
              buttonClass="tilt-button"
              buttonStyle={{}}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default NavTabs;
