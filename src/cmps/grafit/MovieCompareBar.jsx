import React, { useState } from "react";

import { topData } from "../../topData";
import TypeSwitcher from "../navigation/TypeSwitcher/TypeSwitcher";
import { ReactComponent as MoneyIcon } from "../../assets/img/money.svg";
import { ReactComponent as RatingIcon } from "../../assets/img/rating.svg";
import utilService from "../../services/utilService";

import { ResponsiveBar } from "@nivo/bar";

const MovieCompareBar = (props) => {
  const { dataCompare, theme, name } = props;
  const [compareVertical, setCompareVertical] = useState("imdbRating");
  const [searchedIndex, setSearchedIndex] = useState("");

  const getDataByVertical = () => {
    let field = "";
    field =
      compareVertical === "boxOffice"
        ? compareVertical[0].toUpperCase() + compareVertical.slice(1)
        : compareVertical;
    let dataVertical = topData.dataSet.map((data) => {
      // console.log(compareVertical);
      const dataSnip =
        compareVertical === "boxOffice"
          ? +data[field].slice(1).replace(/,/gi, "")
          : +data[field];

      return { x: dataSnip, y: 0, name: data["Title"], color: data.color };
    });
    // console.log(dataCompare);
    const currDataSnip =
      dataCompare[compareVertical] !== "N/A"
        ? compareVertical === "boxOffice"
          ? +dataCompare["boxOffice"].slice(1).replace(/,/gi, "")
          : +dataCompare["imdbRating"]
        : null;
    dataVertical.push({ x: currDataSnip, y: 0, name: name, color: "#efea5a" });
    // console.log(dataVertical[dataVertical.length - 1]);
    const isReversed = false;
    dataVertical.sort(utilService.dynamicSort(`${isReversed ? "-" : ""}x`));
    const searchedForIndex = dataVertical.findIndex((vertical) => {
      return vertical.name === name;
    });
    // setSearchedIndex(searchedForIndex);
    // console.log(dataVertical);
    return [{ id: "Top Movies", data: dataVertical, searchedIndex }];
  };

  const handleVerticalChange = () => {
    const newVewrtical =
      compareVertical === "boxOffice" ? "imdbRating" : "boxOffice";
    setCompareVertical(newVewrtical);
  };

  const shortenValue = (value, prefix = "", decimal = 1, veryShort = false) => {
    if (compareVertical === "imdbRating") return value;

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

  const barGraphSettings = {
    theme: {
      fontSize: 12,
      textColor: theme === "dark" ? "rgba(255, 255, 255, 0.9)" : "black",
      fontFamily: "animosaExtraLight",
      crosshair: {
        line: {
          stroke:
            theme === "dark" ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)",
          strokeWidth: 1,
          strokeOpacity: 0.35,
        },
      },
      annotations: {
        text: {
          fill: "rgba(255, 255, 255, 1)",
        },
      },
    },
  };

  const CustomTick = (tick) => {
    let tickValue = tick.value.slice(0, 20);
    tickValue += tick.value.length > 31 ? ".." : "";

    return (
      <g transform={`translate(${tick.x},${tick.y + 22})`}>
        <rect
          x={-45}
          y={-14}
          rx={3}
          ry={3}
          width={90}
          height={28}
          fill="rgba(0, 0, 0, .05)"
        />
        {/* <rect
          x={-25}
          y={-12}
          rx={2}
          ry={2}
          width={50}
          height={24}
          fill="rgba(247, 247, 247, 1)"
        /> */}

        <line stroke="rgb(232, 193, 160)" strokeWidth={1.5} y1={-22} y2={-12} />
        <text
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fill: "#333",
            fontSize: 10,
          }}
        >
          {tickValue}
        </text>
      </g>
    );
  };

  const currData = getDataByVertical();
  console.log(currData);
  const isBoxOffice = compareVertical === "boxOffice";
  // console.log(isBoxOffice);
  return (
    <div className="movie-compare-block flex align-center space-center">
      <div className="compare-info flex column align-start space-start">
        <p className="compare-info-title">{`${currData[0].id} By:`}</p>
        <TypeSwitcher
          handleTypeChange={handleVerticalChange}
          dataTypes={[
            { type: "boxOffice", img: <MoneyIcon />, label: "Box Office" },
            { type: "imdbRating", img: <RatingIcon />, label: "Rating" },
          ]}
          initType={0}
          animation="activeTab"
          switcherClass="type-switcher switcher-movie-bar"
          switcherImgClass="switcher-img"
          swticherLabelClass="switcher-label"
          switchOnStart={true}
        />
      </div>
      <div className="movie-compare-bar">
        <ResponsiveBar
          data={currData[0].data}
          keys={["x"]}
          indexBy="name"
          margin={{ top: 10, right: 10, bottom: 30, left: 10 }}
          padding={0.3}
          colors={(point) => point.data.color}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          theme={barGraphSettings.theme}
          axisTop={null}
          axisRight={null}
          enableGridX={false}
          enableGridY={false}
        labelFormat={(value) => shortenValue(value, "$", 1, true)}
          // layout="horizontal"
          axisBottom={{
            // format: (value) => {
            //   return value.slice(0, 20);
            // },
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            renderTick: CustomTick,
            // legend: compareVertical,
            // legendPosition: 'middle',
            // legendOffset: 32
          }}
          tooltip={(tip) => {
            console.log(tip);
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
                  fontSize: "16px",
                }}
              >
                <span className="flex column align-center space-center">
                  <div
                    className="tooltip-season"
                    style={{
                      color: tip.color,
                      // padding: "3px 0",
                      fontWeight: "bold",
                    }}
                  >
                    {tip.indexValue}
                  </div>
                  <div
                    className="tooltip-episode"
                    style={{
                      // padding: "3px 0",
                      fontWeight: "bold",
                    }}
                  >
                    {shortenValue(tip.value, "$", 2, false)}
                  </div>
                </span>
              </div>
            );
          }}
          axisLeft={null}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor="rgba(255, 255, 255, 0.75)"
          animate={true}
          motionStiffness={90}
          motionDamping={15}
        />
      </div>
    </div>
  );
};

export default MovieCompareBar;
