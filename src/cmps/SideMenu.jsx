import React from 'react';
import logo from '../assets/img/logo.svg';
import { NavLink } from "react-router-dom";

export class SideMenu extends React.Component {


    state = {
        showMenu: false,
        activeTab: 0
    };

    componentDidMount() {

    }
    componentDidUpdate() {

    }

    onLabelChange = (idx) => {

        if(!this.state.showMenu) return;
        if (this.state.activeTab === idx) return;
        console.log('here');
        this.setState({ activeTab: idx }, () => {
            
        });
    }

    onHover = () => {

        setTimeout(() => {

            this.setState(({ showMenu }) => ({

                showMenu: !showMenu
            }));

        }, 200);
    }

    render() {
        const { showMenu, activeTab } = this.state;

        return (
            <aside className={`side-menu ${(showMenu) ? 'show-menu' : ''}`} onMouseEnter={this.onHover} onMouseLeave={this.onHover}>
                <ul className="labels-list flex column">
                <NavLink exact to='/'><span onClick={() => this.onLabelChange(0)} className={`label-span flex align-center space-start ${(!activeTab) ? 'active-navbar' : ''}`}>
                    <li>Home</li></span></NavLink>
                    <span className="other-labels flex column align-center space-center">
                    {
                        
                    }
                    </span>
                    <NavLink exact to='/graf'><span onClick={() => this.onLabelChange(-1)} className={`label-span flex align-center space-between ${(activeTab === -1) ? 'active-navbar' : ''}`}>
                    <li>Graf</li><img className="menu-logo" src={logo} alt="Logo" /></span></NavLink>
                </ul>

            </aside>
        )
    }
};