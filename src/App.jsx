import React, { useState, useEffect } from "react";

import "./style/global.scss";
import GrafitApp from "./pages/GrafitApp.jsx";
import MenuToolbar from "./cmps/navigation/MenuToolbar.jsx";
import Home from "./pages/Home.jsx";
import { connect } from "react-redux";
import { switchTab } from "./store/actions/MenuActions";
import {
  toggleTheme,
  changeGrafView,
  setData,
} from "./store/actions/GrafActions";

import { Switch, Route } from "react-router-dom";

const App = (props) => {
  const { theme, data, setData, switchTab, activeTab } = props;
  const [grafView, setGrafView] = useState("linear");
  const [currTheme, setCurrTheme] = useState("light");
  const [currSearchType, setCurrSearchType] = useState("series");

  const onToggleTheme = () => {
    let newTheme = theme === "dark" ? "light" : "dark";

    setCurrTheme(newTheme);
    props.toggleTheme(newTheme);
  };

  const onSetGrafView = (value) => {
    setGrafView(value);
    props.changeGrafView(value);
  };

  useEffect(() => {
    let currentTab = window.location.pathname;
    // console.log(currentTab);
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
    switchTab(ActiveTab);
  }, [switchTab]);

  return (
    <main className="app-content">
      <MenuToolbar
        onSetGrafView={onSetGrafView}
        grafView={grafView}
        theme={currTheme}
        onToggleTheme={onToggleTheme}
        setData={setData}
        switchTab={switchTab}
        activeTab={activeTab}
        currSearchType={currSearchType}
      />

      <Switch>
        <Route render={() => <GrafitApp data={data} setCurrSearchType={setCurrSearchType} />} path="/graf" />
        <Route render={() => <Home theme={theme} />} path="/" />
      </Switch>
    </main>
  );
};

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    activeTab: state.menu.activeTab,
    theme: state.graf.theme,
    grafView: state.graf.grafView,
    data: state.graf.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    switchTab: (activeTab) => dispatch(switchTab(activeTab)),
    toggleTheme: (theme) => dispatch(toggleTheme(theme)),
    changeGrafView: (grafView) => dispatch(changeGrafView(grafView)),
    setData: (data) => dispatch(setData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
