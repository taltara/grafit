import React, { useState, useEffect } from "react";

import Tilt from "react-tilt";

import "./_FoldedTabs.scss";
import TiltButton from "../TiltButton/TiltButton";
import { ReactComponent as ArrowIcon } from "../../../assets/img/arrow.svg";

const FoldedTabs = (props) => {
  const { tabs, activeTab, onSetTab, theme, toCloseCondensed, setAreTabsOpen } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [activeTabClass, setSctiveTabClass] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [tiltMax, setTiltMax] = useState(15);
  const isActiveButton = (label) => {
    if (label === "home") {
      if (activeTab === "" || activeTab === "home") return true;
    } else {
      if (activeTab === label) return true;
    }

    return false;
  };

  useEffect(() => {
    if (toCloseCondensed && isOpen) toggleOpen();
  }, [toCloseCondensed]);

  const toggleHovering = (hovering) => {
    setIsHovering(hovering);
    // setIsOpen(hovering);
  };

  const toggleOpen = (event) => {
    if (event) event.stopPropagation();
    setIsOpen((prevState) => {
      setTiltMax(prevState ? 25 : 0);
      setAreTabsOpen(!prevState)
      return !prevState;
    });
    setSctiveTabClass("transition-tab");
    setTimeout(() => {
      setSctiveTabClass("transition-tab visible-tab");
    }, 200);

    
    
  };

  let foldedTabsClass = isOpen ? "unfolded-tabs" : "";
  let buttonStyle = isOpen ? { width: "100%" } : {};
  const isDisabled = isOpen ? false : true;
  const isTiltSet = isOpen ? true : false;
  const scaleSet = isOpen ? 1.1 : 1;
  const tabsArrowClass = isOpen ? "open-arrow" : "";
  const tiltOptions = isOpen ? { max: 0, scale: 1 } : {};
  const foldedTabsHeight = isOpen ? tabs.length * 36 : 36;
  

  return (
    <>
      {/* {TabsContentContainer( */}

      <Tilt
        className={`Tilt folded-tabs-container`}
        options={{
          scale: 1.1,
          axis: "X",
          perspective: 2000,
          max: tiltMax,
        }}
      >
        <div
          className="folded-tabs-wrapper flex align-center space-center"
          onMouseEnter={() => toggleHovering(true)}
          onMouseLeave={() => toggleHovering(false)}
          onClick={toggleOpen}
        >
          <nav
            className={`folded-tabs flex column align-center space-start ${foldedTabsClass}`}
            style={{ height: foldedTabsHeight }}
          >
            {tabs.map((tab, index) => {
              const isActive = isActiveButton(tab.label);
              const tabRowClass =
                isActive && isOpen
                  ? activeTabClass
                  : isActive
                  ? "first-tab"
                  : isOpen
                  ? ""
                  : "other-tab";
              return (
                <div
                  key={index}
                  className={`condensed-tab-row flex align-center space-center ${tabRowClass}`}
                >
                  <TiltButton
                    buttonType="link"
                    label={tab.label}
                    linkTo={tab.to}
                    activeLink={activeTab}
                    activeLinkClass="activeTab"
                    isLinkToExact={true}
                    isTilt={isTiltSet}
                    tiltOptions={{ scale: scaleSet, ...tiltOptions }}
                    animation="activeTab"
                    onClick={() => {
                      onSetTab(tab.label === "home" ? "" : tab.label);
                    }}
                    buttonClass="tilt-button"
                    buttonStyle={buttonStyle}
                    theme={theme}
                    disabled={isDisabled}
                  />
                </div>
              );
            })}
          </nav>
          <ArrowIcon className={`tabs-arrow ${tabsArrowClass}`} />
        </div>
      </Tilt>
      {/* )} */}
    </>
  );
};

export default FoldedTabs;
