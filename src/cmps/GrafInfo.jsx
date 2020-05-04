import React from 'react';

import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Switch from '@material-ui/core/Switch';
import Fab from '@material-ui/core/Fab';

export class GrafInfo extends React.Component {


    state = {

    };

    componentDidMount() {

    }
    componentDidUpdate() {

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
                    <Fab variant="extended" onClick={() => {this.props.onViewChange()}}>{grafView}</Fab>
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
                            color="black"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    </div>
                </header>
            </React.Fragment>
        )
    }
};