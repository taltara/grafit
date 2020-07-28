import React from 'react';

import { ResponsiveLine } from "@nivo/line";
import { categoricalColorSchemes } from "@nivo/colors";
const { category10, paired } = categoricalColorSchemes;


const GrafitSeriesLine = (props) => {

        const { data, average, theme, grafView } = props;
    
        const lineGraphSettings = {
          theme: {
            fontSize: 14,
            textColor: theme === "dark" ? "rgba(255, 255, 255, 0.9)" : "black",
            fontFamily: "animosaExtraLight",
            crosshair: {
              line: {
                stroke:
                  theme === "dark"
                    ? "rgba(255, 255, 255, 1)"
                    : "rgba(0, 0, 0, 1)",
                strokeWidth: 1,
                strokeOpacity: 0.35,
              },
            },
          },
        };
    
        const lineDataColorByTheme = () => {
          return data.map((item, index) => ({
            ...item,
            color: theme === "dark" ? category10[index] : paired[index],
          }));
        };
    
        const dataLineReady = lineDataColorByTheme();
        // console.log(dataLineReady);
        return (
          <ResponsiveLine
            data={dataLineReady}
            margin={{
              top: 50,
              right: window.innerWidth <= 800 ? 60 : 110,
              bottom: 60,
              left: 50,
            }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: 10,
              stacked: false,
              reverse: false,
            }}
            curve={grafView}
            motionStiffness={150}
            motionDamping={30}
            enableGridX={false}
            lineWidth={2}
            axisTop={null}
            theme={lineGraphSettings.theme}
            axisRight={null}
            markers={
              average
                ? [
                    {
                      axis: "y",
                      value: average,
                      lineStyle: {
                        stroke:
                          theme === "dark" ? "rgba(255, 255, 255, 1)" : "black",
                        strokeWidth: 2,
                      },
                      textStyle: {
                        fill: theme === "dark" ? "rgba(255, 255, 255, 1)" : "black",
                        fontWeight: "bold",
                        fontSize: 16,
                        pointerEvents: "none",
                        letterSpacing: "0.5px",
                      },
                      legend: `Average [${average.toFixed(2)}]`,
                    },
                  ]
                : null
            }
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: `Episodes`,
              legendOffset: 36,
              legendPosition: "middle",
            }}
            
            colors={(season) => season.color}
            pointSize={window.innerWidth <= 800 ? 5 : 8}
            pointColor={{ from: "color", modifiers: [] }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            tooltip={(episode) => {
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
                  <span className="flex align-center space-center">
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
                  </span>
    
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
                    '{episode.point.data.episodeName}'
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
                    {episode.point.data.yFormatted}
                  </div>
                </div>
              );
            }}
            pointLabel="y"
            pointLabelYOffset={-12}
            useMesh={true}
            crosshairType="cross"
            layers={[
              "grid",
              "axes",
              "areas",
              "crosshair",
              "lines",
              "points",
              "slices",
              "mesh",
              "legends",
              "markers",
            ]}
            legends={[
              {
                dataFrom: "dataLineReady",
                data: dataLineReady.map((season, index) => {
                  return {
                    id: season.id,
                    label:
                      window.innerWidth <= 800
                        ? season.id.split(" ")[1]
                        : season.id,
                    color: season.color,
                  };
                }),
    
                anchor: "right",
                direction: "column",
                itemTextColor:
                  theme === "dark" ? "rgba(255, 255, 255, 0.9)" : "black",
                justify: false,
                translateX: window.innerWidth <= 800 ? 50 : 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: window.innerWidth <= 800 ? 30 : 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: window.innerWidth <= 800 ? 10 : 15,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        );
      
}

export default GrafitSeriesLine
