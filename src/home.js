import React from 'react';
import { Link } from 'react-router';
import { Logo } from './app';


export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="wrapLogoH1">
                <Logo />
                <h1>At Home Page Personal Profile</h1>
                <a href="/logout">Logout</a>
            </div>
        )
    }
}
