import React from 'react';
import { dataSet } from "../data";
import dataGrapher from '../services/dataGrapher';
import { ResponsiveLine } from "@nivo/line";
import { GrafFilter } from '../cmps/GrafFilter.jsx';

import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Switch from '@material-ui/core/Switch';

export class GrafitApp extends React.Component {


    state = {
        data: dataSet,
        name: 'Default',
        snackbar: false,
        theme: 'dark',
        average: null,
        error: false
    }

    componentDidMount() {

    }


    graph = (data, average) => {

        const { theme } = this.state;

        const lineGraphSettings = {
            theme: {
                fontSize: 14,
                textColor: (theme === 'dark') ? 'rgba(255, 255, 255, 0.9)' : 'black',
            },
        };

        return (<ResponsiveLine
            data={data}
            margin={{ top: 50, right: 110, bottom: 60, left: 50 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 'auto', max: 10, stacked: false, reverse: false }}
            curve='cardinal'
            // enableArea={true}
            // areaOpacity={0.1}
            // areaBlendMode='difference'
            motionStiffness={150}
            motionDamping={30}
            enableGridX={false}
            lineWidth={3}
            axisTop={null}
            theme={lineGraphSettings.theme}
            axisRight={null}
            markers={(average) ? [
                {
                    axis: 'y',
                    value: average,
                    lineStyle: {
                        stroke: (theme === 'dark') ? 'rgba(255, 255, 255, 1)' : 'black',
                        strokeWidth: 3
                    },
                    textStyle: {
                        fill: (theme === 'dark') ? 'rgba(255, 255, 255, 1)' : 'black',
                        fontWeight: 'bold',
                        fontSize: 16,
                        pointerEvents: 'none'
                    },
                    legend: `Average [${average.toFixed(2)}]`,

                }
            ] : null}
            axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: `Episodes`,
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Rating',
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            colors={{ scheme: 'set3' }}
            pointSize={10}

            pointColor={{ from: 'color', modifiers: [] }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}

            pointLabel="y"
            pointLabelYOffset={-12}
            useMesh={true}
            crosshairType='cross'
            layers={['grid', 'axes', 'areas', 'crosshair', 'lines', 'points', 'slices', 'mesh', 'legends', 'markers']}
            legends={[
                {
                    anchor: 'right',
                    direction: 'column',
                    // theme: { textColor: (theme === 'dark') ? 'rgba(255, 255, 255, 0.9)' : 'black' },
                    // textColor: (theme === 'dark') ? 'rgba(255, 255, 255, 0.9)' : 'black',
                    color: (theme === 'dark') ? 'rgba(255, 255, 255, 0.9)' : 'black',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 15,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1,
                            }
                        }
                    ]
                }
            ]}
        />
        )
    };

    onDatachange = (newData) => {
        if (!newData) {
            this.setState({ error: true }, () => {
                this.handleSnackbar();
            });
        } else {
            dataGrapher.fitShowtoGraf(newData)
                .then(data => {
                    console.log(data);
                    this.setState({ data: data.dataSet, name: data.name, average: data.average, error: false }, () => {
                        this.handleSnackbar();
                    });
                })
        }

    }

    handleSnackbar = () => {

        this.setState(({ snackbar }) => ({ snackbar: !snackbar }), () => {

            setTimeout(() => {
                this.setState(({ snackbar }) => ({ snackbar: !snackbar }));
            }, 3000);
        });
    }

    handleDarkModeChange = () => {
        console.log('here');
        let newMode = (this.state.theme === 'dark') ? 'light' : 'dark';
        this.setState({ theme: newMode });
    }

    handleChange = ({ target }) => {
        console.log(target);
        let property = target.name;
        let value = target.value;

        this.setState({ [property]: value }, console.log(this.state));
    }

    render() {
        // const [open, setOpen] = React.useState(false);

        const { data, name, average, snackbar, theme, error } = this.state
        return (
            <main className={`main-graf ${(theme === 'dark') ? 'dark-bgc' : 'light-bgc'}`}>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={snackbar}

                ><Alert severity={(!error) ? `success` : 'error'}>
                        {(!error) ? `Success! Showing: '${name}'` : 'Sorry, please refine your search'}</Alert></Snackbar>

                <p className={`graf-title flex align-center space-center ${(theme === 'dark') ? 'light' : 'dark'}`}>
                    {(name !== '') ? `'${name}'` : ''}</p>
                <div className="darkmode-switch flex align-center space-center">
                    <p className={`${(theme === 'dark') ? 'light' : 'dark'}`} >Dark-Mode</p>
                    <Switch
                        checked={(theme === 'dark') ? true : false}
                        // defaultChecked
                        onChange={this.handleDarkModeChange}
                        name="theme"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                </div>

                <main className="graf-app grid">

                    <section className="graf">
                        {this.graph(data, average)}
                    </section>
                    <footer className="filter-section">
                        <GrafFilter onDatachange={this.onDatachange} name={name} />
                    </footer>
                </main>
            </main>
        )
    }
}