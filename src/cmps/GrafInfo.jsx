import React from 'react';

import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { Switch, Grid } from '@material-ui/core';

import { ReactComponent as IconSharp } from '../assets/img/sharp.svg';
import { ReactComponent as IconWave } from '../assets/img/wave.svg';
import { ReactComponent as IconCurve } from '../assets/img/curve.svg';
import { ReactComponent as IconSquare } from '../assets/img/square.svg';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

export class GrafInfo extends React.Component {


    state = {

    };

    componentDidMount() {

    }
    componentDidUpdate() {

    }

    handleAlignment = (value) => {
        console.log(value);
        this.props.onViewChange(value);
    }


    render() {
        const { error, snackbar, name, theme, toggleDark, episodeCount, grafView } = this.props;
        return (
            <React.Fragment>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={snackbar}

                ><Alert severity={(!error) ? `success` : 'error'}>
                        {(!error) ? `Success! Showing: '${name}'` : 'Sorry, please refine your search'}</Alert></Snackbar>
                <header className="info-header flex align-center space-around">
                    {/* <Fab variant="extended" onClick={() => {this.props.onViewChange()}}>{grafView}</Fab> */}

                    <Grid item sm={12} md={6} id='view-selector'>
                        <div className={`view-selection`}>
                            <ToggleButtonGroup
                                value={grafView}
                                exclusive
                                // onChange={this.handleAlignment}
                                aria-label="text alignment"
                            >
                                <ToggleButton value="linear" aria-label="left aligned">
                                    <IconSharp value="linear" onClick={() => {this.handleAlignment('linear')} }/>
                                </ToggleButton>
                                <ToggleButton value="cardinal" aria-label="centered">
                                    <IconWave onClick={() => {this.handleAlignment('cardinal')} }/>
                                </ToggleButton>
                                <ToggleButton value="monotoneY" aria-label="right aligned">
                                    <IconCurve onClick={() => {this.handleAlignment('monotoneY')} }/>
                                </ToggleButton>
                                <ToggleButton value="step" aria-label="justified">
                                    <IconSquare onClick={() => {this.handleAlignment('step')} } />
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                    </Grid>

                    <title className={`graf-title flex space-center ${(theme === 'dark') ? 'light' : 'dark'}`}>
                        <p className={'graf-name'}>
                            {(name !== '') ? `'${name}'` : ''}</p>
                        <p className="episode-count">{`[${episodeCount} episodes]`}</p>
                    </title>
                    <div className="darkmode-switch flex align-center space-center">
                        <p className={`${(theme === 'dark') ? 'light' : 'dark'}`} >Dark-Mode</p>
                        <Switch
                            checked={(theme === 'dark') ? true : false}
                            // defaultChecked
                            onChange={toggleDark}
                            name="theme"
                            color="default"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    </div>
                </header>
            </React.Fragment>
        )
    }
};