import React from 'react'

import { ReactComponent as IconSharp } from "../../../assets/img/sharp.svg";
import { ReactComponent as IconWave } from "../../../assets/img/wave.svg";
import { ReactComponent as IconCurve } from "../../../assets/img/curve.svg";
import { ReactComponent as IconSquare } from "../../../assets/img/square.svg";

import { Grid } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

const GrafitInfoShape = (props) => {

    const { grafView, handleAlignment } = props;

    return (
        <Grid item id="view-selector">
          <div className={`view-selection`}>
            <ToggleButtonGroup
              value={grafView}
              exclusive
              // onChange={this.handleAlignment}
              aria-label="text alignment"
            >
              <ToggleButton value="linear" aria-label="left aligned">
                <IconSharp
                  value="linear"
                  onClick={() => {
                    handleAlignment("linear");
                  }}
                />
              </ToggleButton>
              <ToggleButton value="cardinal" aria-label="centered">
                <IconWave
                  onClick={() => {
                    handleAlignment("cardinal");
                  }}
                />
              </ToggleButton>
              <ToggleButton value="monotoneY" aria-label="right aligned">
                <IconCurve
                  onClick={() => {
                    handleAlignment("monotoneY");
                  }}
                />
              </ToggleButton>
              <ToggleButton value="step" aria-label="justified">
                <IconSquare
                  onClick={() => {
                    handleAlignment("step");
                  }}
                />
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </Grid>
    );
}

export default GrafitInfoShape
