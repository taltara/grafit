import React from 'react';
import './App.css';
import { GrafitApp } from './pages/GrafitApp.jsx';
import { SideMenu } from './cmps/SideMenu.jsx';
import { Home } from './pages/Home.jsx';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
} from "react-router-dom";

export class App extends React.Component {

    state = {
        theme: 'dark',
    }


    render() {
        return (
            <Router>
                <main className="app-content">
                    <SideMenu />
                    <Switch>
                        <Route component={GrafitApp} path="/graf" />
                        <Route component={Home} path="/" />
                    </Switch>
                </main>
            </Router>
        );
    }
}

export default App;
