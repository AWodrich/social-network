import React from 'react';
import { Link } from 'react-router';
import { Logo } from './app';
import { App } from './app';


export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first:'',
            last:''
        }
    }

    render() {
        // console.log('this.props.first in home', this.props.first);
        return (
            <div className="wrapLogoH1">
                <h1>Welcome, {this.props.first} {this.props.last}, to you Profile Page</h1>
                <a href="/logout">Logout</a>
            </div>
        )
    }
}
