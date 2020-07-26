import React, { useEffect, useState } from "react";

import { ReactComponent as ReturnIcon } from "../../assets/img/back.svg";

import Tilt from "react-tilt";

const GrafDescription = (props) => {
  const { theme, showInfo, show, onToggleDescription } = props;

  const [backArrowClass, setBackArrowClass] = useState("");

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setBackArrowClass("open-arrow");
        setTimeout(() => {
          setBackArrowClass("open-arrow arrow-opened");
        }, 300);
      }, 350);
    } else setBackArrowClass("");
  }, [show]);
  return (
    <aside
      className={`graf-description ${
        theme === "dark" ? "light-descripion" : "darker-descripion"
      }
                flex column align-start space-start ${
                  show ? "show-description" : ""
                }`}
    >
      <Tilt className="Tilt description-return-container" options={{ scale: 1.1, perspective: 500 }}>
        <ReturnIcon
          className={`description-return return-${theme} flex align-center space-center ${backArrowClass}`}
          onClick={onToggleDescription}
        />
      </Tilt>
      <span className="title-span flex align-baseline">
        <p className="show-header">{showInfo.Title}</p>
        <p className="series-years">[ {showInfo.Year} ]</p>
      </span>

      {showInfo.Poster ? (
        <img className="show-poster" src={showInfo.Poster} alt="" />
      ) : null}
      <span className="writer-span flex align-baseline">
        <p className="secondary">Writers:</p>
        <p className="writer-names">{showInfo.Writer}</p>
      </span>
      <span className="actors-span flex align-baseline">
        <p className="secondary">Actors:</p>
        <p className="actors-names">{showInfo.Actors}</p>
      </span>
      <span className="plot-span flex align-baseline">
        <p className="secondary">Plot:</p>
        <p className="plot">{showInfo.Plot}</p>
      </span>
      <span className="ratings-span flex align-baseline">
        {showInfo.Ratings
          ? showInfo.Ratings.map((rating, i) => {
              let seperator = i + 1 === showInfo.Ratings.length ? "" : " | ";
              return (
                <span
                  key={rating.Source}
                  className="rating-span flex align-baseline"
                >
                  <p className="rating-source secondary">{rating.Source}:</p>
                  <p className="rating-value">{rating.Value}</p>
                  <p className={seperator === "" ? "" : "seperator"}>
                    {seperator}
                  </p>
                </span>
              );
            })
          : null}
      </span>
    </aside>
  );
};

export default GrafDescription;
