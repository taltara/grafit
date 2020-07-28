import React, { useState, useEffect } from "react";

import { defData, info } from "../data";
import { switchTab } from "../store/actions/MenuActions";
import dataGrapher from "../services/dataGrapher";
import GrafInfo from "../cmps/grafit/GrafitInfo/GrafInfo";
import GrafDescription from "../cmps/grafit/GrafDescription";
import GrafSeriesLine from "../cmps/grafit/GrafitSeriesLine";
import GrafMovieInfo from "../cmps/grafit/GrafMovieInfo";
import { connect } from "react-redux";

const GrafitApp = (props) => {
  const {
    grafView,
    theme,
    data,
    activeTab,
    switchTab,
    setCurrSearchType,
  } = props;

  // const [grafSeriesData, setGrafSeriesData] = useState(defData);
  // const [grafMovieData, setGrafMovieData] = useState(null);
  // const [name, setName] = useState("The Office");
  // const [showInfo, setShowInfo] = useState(info);
  const [snackbar, setSnackbar] = useState(false);
  // const [isDataNew, SetIsDataNew] = useState(false);
  // const [average, setAverage] = useState(defData.average);
  // const [error, setIsError] = useState(false);
  // const [dataType, setDataType] = useState("series");

  const [showDescription, setShowDescription] = useState(false);
  // const [dynamicHeight, setDynamicHeight] = useState({
  //   height: window.innerHeight - 128,
  //   width: window.innerWidth - 10,
  // });

  const [grafitAppState, setState] = useState({
    grafSeriesData: defData,
    grafMovieData: null,
    name: "The Office",
    showInfo: info,
    snackbar: false,
    isDataNew: false,
    average: defData.average,
    error: false,
    dataType: "series",
    dynamicHeight: {
      height: window.innerHeight - 128,
      width: window.innerWidth - 10,
    },
  });

  useEffect(() => {
    let currentTab = window.location.pathname;
    let ActiveTab;
    ActiveTab = getActiveTabByPath(currentTab);
    switchTab(ActiveTab);
    window.addEventListener("resize", () => {
      updateDimensions();
    });
    return window.removeEventListener("resize", () => {
      updateDimensions();
    });
  }, []);

  useEffect(() => {
    // console.log(data);

    onDataChange(data);

    setState((prevState) => {
      return { ...prevState, isDataNew: true };
    });
    setTimeout(() => {
      setState((prevState) => {
        return { ...prevState, isDataNew: false };
      });
    }, 1000);
  }, [data]);

  const getActiveTabByPath = (currentTab) => {
    switch (currentTab) {
      case "/":
        return "home";
      case "/graf":
        return "graf";
      default:
        return "home";
    }
  };

  const updateDimensions = () => {
    // console.log("CHNAGED!");
    const dynamicHeight = {
      height: window.innerHeight - 16 * 8,
      width: window.innerWidth - 10,
    };
    setState({ ...grafitAppState, dynamicHeight: dynamicHeight });
  };

  const onDataChange = (newData) => {
    // data is a movie
    if (newData.Type === "movie") {
      if (newData.Response === "False") {
        setState((prevState) => {
          return { ...prevState, error: { error: true } };
        });
        handleSnackbar();
      } else {
        // setState((prevState) => {
        //   return { ...prevState, dataType: "movie" };
        // });
        setCurrSearchType("movie");
        dataGrapher.fitMovieData(newData).then((movieData) => {
          console.log(movieData);
          setState((prevState) => {
            return {
              ...prevState,
              grafMovieData: movieData,
              name: movieData.name,
              // error: false,
              // showInfo: null,
              // average: null,
              dataType: "movie"
            };
          });
          handleSnackbar();
        });
      }
    } // data is a series
    else {
      if (!newData.values) {
        if (!newData.starter) {
          setState((prevState) => {
            return { ...prevState, error: { error: true } };
          });
          handleSnackbar();
        }
      } else {
        // setState((prevState) => {
        //   return { ...prevState, dataType: "series" };
        // });
        setCurrSearchType("series");
        const seriesInfo = newData.seriesInfo;

        dataGrapher.fitShowtoGraf(newData.values).then((dataForGraf) => {
          // console.log(dataForGraf);
          setState((prevState) => {
            return {
              ...prevState,
              grafSeriesData: dataForGraf,
              name: dataForGraf.name,
              average: dataForGraf.average,
              // error: false,
              showInfo: seriesInfo,
              dataType: "series",
            };
          });

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

  return (
    <main
      className={`main-graf ${theme === "dark" ? "dark-bgc" : "light-bgc"}`}
    >
      <main className="graf-app grid">
        <GrafInfo
          error={grafitAppState.error}
          name={grafitAppState.name}
          theme={theme}
          snackbar={snackbar}
          //   toggleDark={handleDarkModeChange}
          episodeCount={grafitAppState.grafSeriesData.episodeCount}
          isDataNew={grafitAppState.isDataNew}
          grafView={grafView}
          toggleDescription={onViewDescription}
          showDescription={showDescription}
          dataType={grafitAppState.dataType}
        />
        <section className="graf" style={{ ...grafitAppState.dynamicHeight }}>
          {grafitAppState.dataType === "series" ? (
            <>
              <GrafSeriesLine
                data={grafitAppState.grafSeriesData.dataSet}
                average={grafitAppState.average}
                theme={theme}
                grafView={grafView}
              />
              <GrafDescription
                show={showDescription}
                theme={theme}
                showInfo={grafitAppState.showInfo}
                onToggleDescription={onViewDescription}
              />
            </>
          ) : (
            <GrafMovieInfo data={grafitAppState.grafMovieData} theme={theme} />
          )}
        </section>
      </main>
    </main>
  );
};

const mapStateToProps = (state) => {
  // console.log(state);
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
