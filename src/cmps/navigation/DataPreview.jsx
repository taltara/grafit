import React, { useState, useEffect } from "react";

import Tilt from "react-tilt";

const DataPreview = (props) => {
  const { data, onDataSelect, setResult } = props;
  const [isHovering, setIsHovering] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  // const [firstEntrance, setFirstEntrance] = useState(false);
  const [entranceClass, setEntranceClass] = useState("start");
  const [exitClass, setExitClass] = useState("");

  useEffect(() => {
    console.log(entranceClass);
    const timeout =
      entranceClass === "start" || entranceClass === "preview-entrance"
        ? 100
        : 600;
    if (entranceClass !== "") {
      setEntranceClass("");
      setTimeout(() => {
        setEntranceClass("preview-entrance");
      }, timeout);
    }
  }, [previewData]);

  useEffect(() => {
    if (data) {
      setEntranceClass("");
      setTimeout(() => {
        let newData = data.data ? data.data : data;
        setPreviewData(newData);
        setEntranceClass("preview-entrance");
      }, 100);
    }
  }, [data]);

  const toggleHovering = (hovering) => {
    setIsHovering(hovering);
  };

  const onPreviewClick = () => {
    setExitClass("preview-exit");

    setTimeout(() => {
      setResult(null);
    }, 50);
    setTimeout(() => {
      onDataSelect();
    }, 100);
  };

  let genres = null;
  if (previewData && previewData.Genre) {
    genres = previewData.Genre.split(",");
    genres = genres.map((genre, index) => {
      return index ? genre.trim() : genre;
    });
  }

  
  const previewGenreClass = isHovering ? "preview-genre-hover" : "";
  let titleTypeClass = isHovering ? "preview-title-hovering" : "";
  if (previewData) {
    titleTypeClass =
      previewData.Type === "series"
        ? "preview-title-series "
        : "preview-title-movie ";
    if (previewData.Title.length > 23) {
      titleTypeClass += "preview-title-longer";
    } else {
      if (previewData.Title.length > 17) {
        titleTypeClass += "preview-title-long";
      }
    }
  }
  //   console.log(genres);
  let plotText = "";
  let plotEnding = "";
  if(previewData) {
    plotEnding = isHovering ? previewData.Plot.length > 123 ? "..." : "" : "...";
    plotText = previewData.Plot.slice(0, isHovering ? 123 : 27) + plotEnding;
  }
  // console.log(plotText);
  return (
    previewData && (
      <Tilt
        className={`Tilt data-preview-tilt`}
        options={{ scale: 1.02, axis: "X", perspective: 2000 }}
      >
        <div
          onClick={onPreviewClick}
          className={`data-preview Tilt-inner flex column align-center space-start ${entranceClass} ${exitClass}`}
          style={{ backgroundImage: `url(${previewData.Poster})` }}
          onMouseEnter={() => toggleHovering(true)}
          onMouseLeave={() => toggleHovering(false)}
        >
          <div className="preview-cover"></div>
          <p className={`data-preview-title ${titleTypeClass}`}>
            {previewData.Title}
          </p>
          <span className="data-preview-genres flex align-center space-center">
            {genres &&
              genres.length &&
              genres.map((genre, index) => {
                return (
                  <p
                    key={index}
                    className={`preview-genre flex align-center space-center ${previewGenreClass}`}
                  >
                    {genre}
                  </p>
                );
              })}
          </span>
          <p
            className={`preview-plot flex align-start space-start ${
              isHovering ? "plot-hover" : ""
            }`}
          >
            {plotText}
          </p>
        </div>
      </Tilt>
    )
  );
};

export default DataPreview;
