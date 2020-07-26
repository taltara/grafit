import React, { useState } from "react";

import { topData } from "../../topData";
import TypeSwitcher from "../navigation/TypeSwitcher/TypeSwitcher";
import { ReactComponent as MoneyIcon } from "../../assets/img/money.svg";
import { ReactComponent as RatingIcon } from "../../assets/img/rating.svg";
import utilService from "../../services/utilService";

import { ResponsiveLine } from "@nivo/line";

const MovieCompareLine = (props) => {
  const { dataCompare, theme, name } = props;
  const [compareVertical, setCompareVertical] = useState("boxOffice");
  const [searchedIndex, setSearchedIndex] = useState("");

  const getDataByVertical = () => {
    const field = compareVertical[0].toUpperCase() + compareVertical.slice(1);
    let dataVertical = topData.dataSet.map((data) => {
      const dataSnip =
        compareVertical === "boxOffice"
          ? +data[field].slice(1).replace(/,/gi, "")
          : +data[field];

      return { x: dataSnip, y: 0, name: data["Title"], color: data.color };
    });
    const currDataSnip =
      compareVertical === "boxOffice"
        ? dataCompare[compareVertical] !== "N/A"
          ? +dataCompare[compareVertical].slice(1).replace(/,/gi, "")
          : null
        : +dataCompare[compareVertical];

    dataVertical.push({ x: currDataSnip, y: 0, name: name, color: "#efea5a" });

    const isReversed = false;
    dataVertical.sort(utilService.dynamicSort(`${isReversed ? "-" : ""}x`));
    const searchedForIndex = dataVertical.findIndex((vertical) => {
      return vertical.name === name;
    });
    if(searchedIndex === "") setSearchedIndex(searchedForIndex);
    return [{ id: "Top Movies", data: dataVertical, searchedIndex }];
  };

  const handleVerticalChange = () => {
    const newVewrtical =
      compareVertical === "boxOffice" ? "rated" : "boxOffice";
    setCompareVertical(newVewrtical);
  };

  const shortenValue = (value, prefix, decimal = 2, veryShort = false) => {
    let shortenedValue = prefix;
    if (value > 1000000000) {
      shortenedValue += (value / 1000000000).toFixed(decimal);
      shortenedValue += veryShort ? "B" : " billion";
    } else if (value > 1000000) {
      shortenedValue += (value / 1000000).toFixed(decimal);
      shortenedValue += veryShort ? "M" : " million";
    } else {
      shortenedValue += (value / 1000).toFixed(decimal);
      shortenedValue += " K";
    }
    return shortenedValue;
  };

  const topColors = [
    "#54478C",
    "#2C699A",
    "#0DB39E",
    "#16DB93",
    "#83E377",
    "#efea5a",
    "#F1C453",
    "#F29E4C",
    "#dc2f02",
    "#6a040f",
  ];

  const currData = getDataByVertical();
  console.log(currData);
  return (
    <div className="movie-compare-block flex align-center space-center">
      <div className="movie-compare-line">
        <ResponsiveLine
          data={currData}
          margin={{ top: 25, right: 25, bottom: 25, left: 35 }}
          xScale={{ type: "point" }}
          yScale={{ type: "linear", min: "auto", max: "auto", reverse: false }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            format: (value) =>
              shortenValue(value, "$", 0, window.innerWidth <= 800),
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
          }}
          enableGridY={false}
          enableGridX={false}
          axisLeft={null}
          colors={{ scheme: "nivo" }}
          pointSize={20}
          pointColor={"rgba(0, 0, 0, 0.75)"}
          pointBorderWidth={5}
          pointBorderColor={(p) => {
            const currColor =
              searchedIndex === p.index
                ? "transparent"
                : topColors[p.index];
            return currColor;
          }}
          pointLabel="y"
          pointLabelYOffset={-12}
          useMesh={true}
          tooltip={(episode) => {
            // console.log(episode);
            return (
              <div
                style={{
                  background:
                    theme === "dark"
                      ? "rgba(255, 255, 255, 0.99)"
                      : "rgba(32,33,36, 0.95)",
                  color: theme === "dark" ? "black" : "rgba(255, 255, 255, 1)",
                  padding: "4.5px 12px",
                  border: "1px solid #ccc",
                  borderRadius: "3px",
                  fontFamily: "Consolas",
                  fontSize: "1rem",
                }}
              >
                {/* <span className="flex align-center space-center">
                  <div
                    className="tooltip-season"
                    style={{
                      color: episode.point.serieColor,
                      padding: "3px 0",
                      fontWeight: "bold",
                    }}
                  >
                    {episode.point.serieId + " "}:
                  </div>
                  <div
                    className="tooltip-episode"
                    style={{
                      padding: "3px 0",
                      fontWeight: "bold",
                    }}
                  >
                    :{" " + episode.point.data.xFormatted}
                  </div>
                </span> */}

                <div
                  className="tooltip-name"
                  style={{
                    color: episode.point.serieColor,
                    textAlign: "center",
                    fontSize: "1.25rem",
                    padding: "3px 0",
                    fontWeight: "bolder",
                  }}
                >
                  '{episode.point.data.name}'
                </div>

                <div
                  className="tooltip-rating"
                  style={{
                    color: episode.point.serieColor,
                    textAlign: "center",
                    fontSize: "1.25rem",
                    padding: "3px 0",
                    fontWeight: "bolder",
                  }}
                >
                  {shortenValue(episode.point.data.xFormatted, "$")}
                </div>
              </div>
            );
          }}
          // legends={[
          //     {
          //         anchor: 'bottom-right',
          //         direction: 'column',
          //         justify: false,
          //         translateX: 100,
          //         translateY: 0,
          //         itemsSpacing: 0,
          //         itemDirection: 'left-to-right',
          //         itemWidth: 80,
          //         itemHeight: 20,
          //         itemOpacity: 0.75,
          //         symbolSize: 12,
          //         symbolShape: 'circle',
          //         symbolBorderColor: 'rgba(0, 0, 0, .5)',
          //         effects: [
          //             {
          //                 on: 'hover',
          //                 style: {
          //                     itemBackground: 'rgba(0, 0, 0, .03)',
          //                     itemOpacity: 1
          //                 }
          //             }
          //         ]
          //     }
          // ]}
        />
      </div>
      <TypeSwitcher
        handleTypeChange={handleVerticalChange}
        dataTypes={[
          { type: "boxOffice", img: <MoneyIcon />, label: "Box Office" },
          { type: "rating", img: <RatingIcon />, label: "Rating" },
        ]}
        initType={0}
        animation="activeTab"
        switcherClass="type-switcher switcher-movie-line"
        switcherImgClass="switcher-img"
        swticherLabelClass="switcher-label"
      />
    </div>
  );
};

export default MovieCompareLine;
