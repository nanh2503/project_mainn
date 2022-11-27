import React from "react";
import './Navigation.scss'
import {
    Link, NavLink
} from 'react-router-dom';

class Navigation extends React.Component {
    render() {
        return (
            <div className="topnav">
                <NavLink to="/" exact activeClassName="active">
                    Home
                </NavLink>
                <NavLink to="/todo" activeClassName="active">
                    Todos
                </NavLink>
                <NavLink to="/about" activeClassName="active">
                    About
                </NavLink>
                <NavLink to="/user" activeClassName="active">
                    Users
                </NavLink>

            </div>
        )
    }
}

export default Navigation;