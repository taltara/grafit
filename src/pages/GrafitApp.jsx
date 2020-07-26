import React, { useState, useEffect } from "react";

import { defData } from "../data";
import { switchTab } from "../store/actions/MenuActions";
import dataGrapher from "../services/dataGrapher";
import GrafInfo from "../cmps/grafit/GrafitInfo/GrafInfo";
import GrafDescription from "../cmps/grafit/GrafDescription";
import GrafSeriesLine from "../cmps/grafit/GrafitSeriesLine";
import GrafMovieInfo from "../cmps/grafit/GrafMovieInfo";
import { connect } from "react-redux";

const GrafitApp = (props) => {
  const { grafView, theme, data, activeTab, switchTab } = props;

  const [grafSeriesData, setGrafSeriesData] = useState(defData);
  const [grafMovieData, setGrafMovieData] = useState(null);
  const [name, setName] = useState("The Office");
  const [showInfo, setShowInfo] = useState({});
  const [snackbar, setSnackbar] = useState(false);
  const [isDataNew, SetIsDataNew] = useState(false);
  const [average, setAverage] = useState(null);
  const [error, setIsError] = useState(false);
  const [dataType, setDataType] = useState("series");

  const [showDescription, setShowDescription] = useState(false);
  const [dynamicHeight, setDynamicHeight] = useState({
    height: window.innerHeight - 128,
    width: window.innerWidth - 10,
  });

  useEffect(() => {
    // console.log(activeTab);
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
    switchTab(ActiveTab);
    window.addEventListener("resize", () => {
      updateDimensions();
    });
    return window.removeEventListener("resize", () => {
      updateDimensions();
    });
  }, []);

  useEffect(() => {
    console.log(data);
    onDataChange(data);
    SetIsDataNew(true);
    setTimeout(() => {
      SetIsDataNew(false);
    }, 1000);
  }, [data]);

  const updateDimensions = () => {
    // console.log("CHNAGED!");
    const dynamicHeight = {
      height: window.innerHeight - 16 * 8,
      width: window.innerWidth - 10,
    };
    setDynamicHeight(dynamicHeight);
  };

  const onDataChange = (newData) => {
    // data is a movie
    if (newData.Type === "movie") {
      if (newData.Response === "False") {
        setIsError({ error: true });
        handleSnackbar();
      } else {
        setDataType("movie");

        dataGrapher.fitMovieData(newData).then((movieData) => {
          setGrafMovieData(movieData);
          setName(movieData.name);
          setIsError(false);
          handleSnackbar();
        });
      }
    } // data is a series
    else {
      if (!newData.values) {
        if (!newData.starter) {
          setIsError({ error: true });
          handleSnackbar();
        }
      } else {
        setDataType("series");
        const seriesInfo = newData.seriesInfo;

        dataGrapher.fitShowtoGraf(newData.values).then((dataForGraf) => {
          console.log(dataForGraf);
          setGrafSeriesData(dataForGraf);
          setName(dataForGraf.name);
          setAverage(dataForGraf.average);
          setIsError(false);
          setShowInfo(seriesInfo);
          handleSnackbar();
        });
      }
    }
  };

  const handleSnackbar = () => {
    setSnackbar((prevState) => {
      return !prevState;
    });

    setTimeout(() => {
      setSnackbar((prevState) => {
        return !prevState;
      });
    }, 3000);
  };

  const onViewDescription = () => {
    setShowDescription((prevState) => {
      return !prevState;
    });
  };
  console.log(data);
  return (
    <main
      className={`main-graf ${theme === "dark" ? "dark-bgc" : "light-bgc"}`}
    >
      <main className="graf-app grid">
        <GrafInfo
          error={error}
          name={name}
          theme={theme}
          snackbar={snackbar}
          //   toggleDark={handleDarkModeChange}
          episodeCount={grafSeriesData.episodeCount}
          isDataNew={isDataNew}
          grafView={grafView}
          toggleDescription={onViewDescription}
          showDescription={showDescription}
          dataType={dataType}
        />
        <section className="graf" style={{ ...dynamicHeight }}>
          {dataType === "series" ? (
            <>
              <GrafSeriesLine
                data={grafSeriesData.dataSet}
                average={average}
                theme={theme}
                grafView={grafView}
              />
              <GrafDescription
                show={showDescription}
                theme={theme}
                showInfo={showInfo}
                onToggleDescription={onViewDescription}
              />
            </>
          ) : (
            <GrafMovieInfo data={grafMovieData} theme={theme} />
          )}
        </section>
      </main>
    </main>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    activeTab: state.menu.activeTab,
    theme: state.graf.theme,
    grafView: state.graf.grafView,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    switchTab: (activeTab) => dispatch(switchTab(activeTab)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GrafitApp);
