import React from "react";

import { Menu } from "@material-ui/core";
import {
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";


const OptionsModal = (props) => {

  const { anchorEl, onCloseOptions, children, onExiting, theme, type } = props;

  const isMobile = window.innerWidth <= 800;

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
          borderRadius: "1px",
          transition: "0.1s ease",
        },
      },
    },
  });

  const isMinified =  window.innerWidth <= 800;
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
          

          elevation={(type === "search" && !isMinified) ? 5 : 7}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: (type === "search" && !isMobile) ? "center" : "bottom",
            horizontal: (type === "search" && !isMobile) ? "left" : "center",
          }}
          transformOrigin={{
            vertical: (type === "search" && !isMobile) ? "center"  : "top",
            horizontal: (type === "search" && !isMobile) ? "right" : "center",
          }}
        >
          {children && children}
        </Menu>
      </ThemeProvider>
    </div>
  );
};

export default OptionsModal;
