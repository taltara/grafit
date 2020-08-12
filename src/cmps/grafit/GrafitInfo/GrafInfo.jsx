import React, { useState } from "react";

import GrafInfoShape from "./GrafInfoShape";

import { Alert } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";

const GrafInfo = (props) => {
  const {
    error,
    snackbar,
    name,
    theme,
    episodeCount,
    toggleDescription,
    isDataNew,
    showDescription,
    dataType,
  } = props;

  const [isHovering, setIsHovering] = useState(false);

  const grafName = name !== "" ? `'${name}'` : "";
  const grafTitleClass = theme === "dark" ? "light" : "dark";
  let grafInfoClass = isHovering || isDataNew ? "title-hover " : "";
  grafInfoClass += theme === "dark" ? "info-light" : "info-dark";
  const grafTitleContentClass = isDataNew ? "title-blink" : "";
  const severity = error ? "error" : "success";
  const alertMessage = !error
    ? `Success! Showing: '${name}'`
    : "Sorry, please refine your search";
  const infoHeaderClass = dataType === "series" ? "" : "info-header-movie"; 
  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={snackbar}
      >
        <Alert severity={severity}>{alertMessage}</Alert>
      </Snackbar>
      <header className={`info-header ${infoHeaderClass} flex align-center space-around`}>
        <title
          onClick={() => {
            if (dataType === "series") toggleDescription();
          }}
          className={`graf-title flex column align-center space-center ${grafTitleClass}`}
        >
          <div
            className={`graf-title-content flex align-baseline space-between ${grafTitleContentClass}`}
            onMouseEnter={() =>
              setIsHovering(
                showDescription ? false : dataType === "series" ? true : false
              )
            }
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="title-text flex align-baseline space-center">
              <p className={"graf-name"}>{grafName}</p>
              {dataType === "series" && (
                <>
                  {episodeCount ? (
                    <p className="episode-count">{`[${episodeCount} episodes]`}</p>
                  ) : null}
                </>
              )}
            </div>

            {dataType === "series" ? (
              <p className={`graf-title-info ${grafInfoClass}`}>?</p>
            ) : null}
          </div>
        </title>
      </header>
    </>
  );
};

export default GrafInfo;
