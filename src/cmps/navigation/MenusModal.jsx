import React from "react";

import { Menu } from "@material-ui/core";
import {
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";


const OptionsModal = (props) => {

  const { anchorEl, onCloseOptions, children, onExiting, theme, type } = props;

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
          

          elevation={(type === "search") ? 5 : 7}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: (type === "search") ? "center" : "bottom",
            horizontal: (type === "search") ? "left" : "center",
          }}
          transformOrigin={{
            vertical: (type === "search") ? "center"  : "top",
            horizontal: (type === "search") ? "right" : "center",
          }}
        >
          {children && children}
        </Menu>
      </ThemeProvider>
    </div>
  );
};

export default OptionsModal;
