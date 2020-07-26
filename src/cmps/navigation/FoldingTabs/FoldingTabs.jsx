import React, { useState, useEffect, useRef, useCallback } from "react";

import "./_FoldingTabs.scss";
import FoldedTabs from "./FoldedTabs";
import TiltButton from "../TiltButton/TiltButton";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const FoldingTabs = (props) => {
  let tabsRef = useRef(null);
  const { activeTab, onSetTab, theme } = props;

  const [isCondensed, setIsCondensed] = useState(false);
  const [toCloseCondensed, setToCloseCondensed] = useState("unset");
  const [areTabsOpen, setAreTabsOpen] = useState(false);

  const updateCondensed = useCallback(() => {
    if (window.innerWidth <= 800) {
      if (!isCondensed) {
        setIsCondensed(true);
      }
    } else {
      // if (isCondensed) {
      setIsCondensed(false);
      // }
    }
  }, [isCondensed]);

  useEffect(() => {
    updateCondensed();
    window.addEventListener("resize", () => {
      updateCondensed();
    });
    return window.removeEventListener("resize", () => {
      updateCondensed();
    });
  }, [updateCondensed]);

  // const onHoverCondensed = (hovering) => {
  //   setIsOpen(hovering);
  // };
  // const onClickCondensed = (event) => {
  //   event.stopPropagation();
  //   if (!isOpen) {
  //     setIsOpen(true);
  //   }
  // };

  const handleOutsideClick = () => {
    if (toCloseCondensed === "unset") {
      setToCloseCondensed(true);
      setTimeout(() => {
        setToCloseCondensed("unset");
      }, 300);
    }
  };

  const tabs = [
    { label: "home", to: "" },
    { label: "graf", to: "graf" },
    { label: "about", to: "about" },
  ];

  const tabsListClass = isCondensed ? "start tabs-condensed" : "between";
  
  const tabsListWidth = isCondensed ? 100 : tabs.length * 67;
  const tabsListHeight = areTabsOpen ? tabs.length * 36 : 36;
  // console.log(activeTab);
  return (
    <ClickAwayListener onClickAway={handleOutsideClick}>
      <ul
        className={`tabs-list flex align-center space-${tabsListClass}`}
        ref={tabsRef}
        style={{ width: tabsListWidth, height: tabsListHeight }}
      >
        {isCondensed ? (
          <FoldedTabs
            tabs={tabs}
            activeTab={activeTab}
            onSetTab={onSetTab}
            theme={theme}
            toCloseCondensed={toCloseCondensed}
            setAreTabsOpen={setAreTabsOpen}
          />
        ) : (
          tabs.map((tab, index) => {
            let style = {};

            return (
              <TiltButton
                key={index}
                buttonType="link"
                label={tab.label}
                linkTo={tab.to}
                activeLink={activeTab}
                activeLinkClass="activeTab"
                isLinkToExact={true}
                isTilt={true}
                tiltOptions={{ scale: 1.2 }}
                animation="activeTab"
                onClick={() => onSetTab(tab.label === "home" ? "" : tab.label)}
                buttonClass="tilt-button"
                buttonStyle={style}
                theme={theme}
              />
            );
          })
        )}
      </ul>
    </ClickAwayListener>
  );
};

export default FoldingTabs;
