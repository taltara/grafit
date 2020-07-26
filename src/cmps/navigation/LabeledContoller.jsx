import React, { Children } from "react";

import { Switch } from "@material-ui/core";

const LabeledContoller = (props) => {
  const { onToggle, paradict, name, label, classes, children } = props;
  // console.log(paradict);
  return (
    <div
      className={`${
        classes ? classes : ""
      } labeled-controller flex column align-center space-center`}
    >
      <p className="">{label}</p>
      {!children ? (
        <Switch
          checked={paradict}
          // defaultChecked
          onChange={onToggle}
          name={name}
          color="default"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      ) : (
        children
      )}
    </div>
  );
};

export default LabeledContoller;
