import React, { useState, useEffect } from "react";

import { defData, info } from "../data";
import { switchTab } from "../store/actions/MenuActions";
import dataGrapher from "../services/dataGrapher";
import GrafInfo from "../cmps/grafit/GrafitInfo/GrafInfo";
import GrafDescription from "../cmps/grafit/GrafDescription";
import GrafSeriesLine from "../cmps/grafit/GrafitSeriesLine";
import GrafMovieInfo from "../cmps/grafit/GrafMovieInfo";
import { connect } from "react-redux";
import { setData } from "../store/actions/GrafActions";

const GrafitApp = (props) => {
  const {
    grafView,
    theme,
    data,
    activeTab,
    switchTab,
    setCurrSearchType,
  } = props;

  const [grafSeriesData, setGrafSeriesData] = useState({
    starter: true,
    dataSet: [],
    name: "",
    average: null,
    episodeCount: null,
  });
  const [grafMovieData, setGrafMovieData] = useState(null);
  const [name, setName] = useState("");
  const [showInfo, setShowInfo] = useState({});
  const [snackbar, setSnackbar] = useState(false);
  const [isDataNew, SetIsDataNew] = useState(false);
  const [average, setAverage] = useState(null);
  const [error, setIsError] = useState(false);
  const [dataType, setDataType] = useState("series");

  const [showDescription, setShowDescription] = useState(false);
  const [dynamicHeight, setDynamicHeight] = useState({
    height: 0,
    width: window.innerWidth - 10,
  });

  useEffect(() => {
    setTimeout(() => {
      setGrafSeriesData(defData);
      setShowInfo(info);
      setAverage(defData.average);
      setName(defData.name)
    }, 250);

    updateDimensions();

    window.addEventListener("resize", () => {
      updateDimensions();
    });
    return window.removeEventListener("resize", () => {
      updateDimensions();
    });
  }, []);

  useEffect(() => {
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
        setIsError(true);
        handleSnackbar();
      } else {
        dataGrapher.fitMovieData(newData).then((movieData) => {
          console.log(movieData);

          setName(movieData.name);
          setDataType("movie");
          setCurrSearchType("movie");
          setGrafMovieData(movieData);
          handleSnackbar();
        });
      }
    } // data is a series
    else {
      if (!newData.values) {
        if (!newData.starter) {
          setIsError(true);
          handleSnackbar();
        }
      } else {
        const seriesInfo = newData.seriesInfo;

        dataGrapher.fitShowtoGraf(newData.values).then((dataForGraf) => {
          // console.log(dataForGraf);
          setName(dataForGraf.name);
          setAverage(dataForGraf.average);
          setShowInfo(seriesInfo);
          setDataType("series");
          setGrafSeriesData(dataForGraf);
          setCurrSearchType("series");

          handleSnackbar();
        });
      }
    }
  };

  const handleSnackbar = () => {
    setSnackbar(true);

    setTimeout(() => {
      setSnackbar(false);
    }, 2000);
  };

  const onViewDescription = () => {
    setShowDescription((prevState) => {
      return !prevState;
    });
  };
  // console.log(grafSeriesData, showInfo);
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
