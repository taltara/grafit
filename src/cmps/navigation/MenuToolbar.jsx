import React, { useState, useEffect, useRef } from "react";

import GrafInfoShape from "../grafit/GrafitInfo/GrafInfoShape";
import utilServices from "../../services/utilService";
import FoldingTabs from "./FoldingTabs/FoldingTabs";
import MenusModal from "./MenusModal";
import LabeledContoller from "./LabeledContoller";
import SearchContainer from "./SearchContainer";
import { ReactComponent as SearchIcon } from "../../assets/img/search.svg";
import { ReactComponent as OptionsIcon } from "../../assets/img/options.svg";

import Tilt from "react-tilt";

const MenuToolbar = (props) => {
  let activeButton = useRef(null);

  const {
    onSetGrafView,
    grafView,
    theme,
    onToggleTheme,
    setData,
    switchTab,
    activeTab,
    currSearchType,
  } = props;

  const [currTab, setCurrTab] = useState(activeTab);
  const [isOptionsOpen, setOptionsOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mediaSearchType, setMediaSearchType] = useState("series");
  const [isMouseClicked, setMouseClicked] = useState({
    clicked: false,
    source: "options",
  });
  const inGraf = currTab === "graf";

  const onOpenOptions = (event) => {
    setOptionsOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const onOpenSearch = (event) => {
    setSearchOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const onCloseOptions = () => {
    setMouseClicked({ clicked: false });
    setTimeout(() => {
      setOptionsOpen(false);
    }, 300);
    setAnchorEl(null);
  };

  const onCloseSearch = () => {
    setMouseClicked({ clicked: false });
    setTimeout(() => {
      setSearchOpen(false);
    }, 300);
    setAnchorEl(null);
  };

  useEffect(() => {
    // let currentTab = window.location.pathname;

    utilServices.setButtonRippleListeners("general");

      onSetTab(activeTab);
  }, []);

  useEffect(() => {
    if (activeTab !== currTab) {
      setCurrTab(activeTab);
    }
  }, [activeTab]);

  const onSetTab = (ActiveTab) => {
    // console.log(ActiveTab);
    setCurrTab(ActiveTab);
    switchTab(ActiveTab);
  };

  const handleAlignment = (value) => {
    // console.log(value);
    onSetGrafView(value);
  };

  const toggleIconsActive = (clicked, source, paradict) => {
    // console.log(isActive);
    if (!paradict) {
      setMouseClicked({ clicked, source });
    }
  };

  const onDataSearch = (data) => {
    // console.log(data);
    if (data) {
      onCloseSearch();
    }
    setData(data);
  };

  const modalContent = () => {
    return isOptionsOpen ? (
      <div>
        <LabeledContoller
          label="Dark-Mode"
          name="theme"
          paradict={theme === "dark"}
          classes="darkmode-switch"
          onToggle={onToggleTheme}
        />
        {inGraf && currSearchType === "series" ? (
          <LabeledContoller label="Graf View" name="view">
            <GrafInfoShape
              grafView={grafView}
              handleAlignment={handleAlignment}
            />
          </LabeledContoller>
        ) : null}
      </div>
    ) : isSearchOpen ? (
      <SearchContainer
        onDataSearch={onDataSearch}
        isSearchOpen={isSearchOpen}
        theme={theme}
        onCloseSearch={onCloseSearch}
      />
    ) : (
      []
    );
  };

  const currModalContent = modalContent();
  const currModalType = isOptionsOpen
    ? "options"
    : isSearchOpen
    ? "search"
    : null;

  return (
    <>
      <header
        className={`menu-toolbar toolbar-${theme} flex align-center space-between`}
      >
        <div className="toolbar-nav flex align-center space-center">
          <Tilt className="Tilt" options={{ scale: 1.1, perspective: 1000 }}>
            <p className="nav-logo" anim="general">
              Grafit<span>.</span>
            </p>
          </Tilt>
          <FoldingTabs activeTab={currTab} onSetTab={onSetTab} theme={theme} />
        </div>

        <aside
          className={`toolbar-tools flex align-end ${
            inGraf ? "space-between" : "space-end"
          } `}
        >
          {inGraf && (
            <div
              className="toolbar-search flex align-end space-end"
              ref={activeButton}
              onMouseEnter={() =>
                toggleIconsActive(true, "search", isSearchOpen)
              }
              onMouseLeave={() =>
                toggleIconsActive(false, "search", isSearchOpen)
              }
              onClick={onOpenSearch}
              onClose={onCloseSearch}
            >
              <SearchIcon
                className={`search-icon flex space-end ${
                  isMouseClicked.clicked && isMouseClicked.source === "search"
                    ? "hovering"
                    : ""
                }`}
              />
            </div>
          )}
          <div
            className="toolbar-options flex align-end space-center"
            ref={activeButton}
            onMouseEnter={() =>
              toggleIconsActive(true, "options", isOptionsOpen)
            }
            onMouseLeave={() =>
              toggleIconsActive(false, "options", isOptionsOpen)
            }
          >
            <OptionsIcon
              className={`options-icon ${
                isMouseClicked.clicked && isMouseClicked.source === "options"
                  ? "hovering"
                  : ""
              }`}
              onClick={onOpenOptions}
              onClose={onCloseOptions}
            />
          </div>
        </aside>
      </header>

      <MenusModal
        anchorEl={anchorEl}
        onCloseOptions={
          isOptionsOpen ? onCloseOptions : isSearchOpen ? onCloseSearch : null
        }
        theme={theme}
        type={currModalType}
      >
        {currModalContent}
      </MenusModal>
    </>
  );
};

export default MenuToolbar;
