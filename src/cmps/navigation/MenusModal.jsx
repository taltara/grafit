import React from "react";

import { Menu } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const OptionsModal = (props) => {
  const { anchorEl, onCloseOptions, children, onExiting, theme, type } = props;
  const isMobile = window.innerWidth <= 800;
  const isSearch = type === "search" && !isMobile;

  const getElevation = () => {
    const elevations = {
      5: {
        dark:
          "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)",
        light:
          "0px 4px 5px -2px rgba(255,255,255,0.2), 0px 7px 10px 1px rgba(255,255,255,0.14), 0px 2px 16px 1px rgba(255,255,255,0.12)",
      },
      7: {
        dark:
          "0px 4px 5px -2px rgba(0,0,0,0.2), 0px 7px 10px 1px rgba(0,0,0,0.14), 0px 2px 16px 1px rgba(0,0,0,0.12)",
        light:
          "0px 4px 5px -2px rgba(255,255,255,0.3), 0px 7px 10px 3px rgba(255,255,255,0.25), 0px 2px 16px 1px rgba(255,255,255,0.2)",
      },
    };

    if (isSearch) {
      if (theme === "light") return elevations["5"]["dark"];
      return elevations["5"]["light"];
    } else {
      if (theme === "light") return elevations["7"]["dark"];
      return elevations["7"]["light"];
    }
  };

  const gridTheme = createMuiTheme({
    overrides: {
      MuiGrid: {
        root: {},
      },
      MuiList: {
        root: {
          paddingTop: "0px !important",
          paddingBottom: "0px !important",
        },
      },
      MuiMenu: {
        paper: {
          border: "1px solid rgba(0, 0, 0, 0.15)",
          boxShadow: getElevation(),
          borderRadius: "1px",
          transition: "0.1s ease",
        },
      },
    },
  });

  
  // console.log(children);
  return (
    <div className={`modal modal-${theme}`}>
      <ThemeProvider theme={gridTheme}>
        <Menu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          autoFocus
          open={Boolean(anchorEl)}
          onClose={onCloseOptions}
          onExiting={onExiting}
          elevation={type === "search" && !isMobile ? 5 : 7}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: type === "search" && !isMobile ? "center" : "bottom",
            horizontal: type === "search" && !isMobile ? "left" : "center",
          }}
          transformOrigin={{
            vertical: type === "search" && !isMobile ? "center" : "top",
            horizontal: type === "search" && !isMobile ? "right" : "center",
          }}
        >
          {children && children}
        </Menu>
      </ThemeProvider>
    </div>
  );
};

export default OptionsModal;
