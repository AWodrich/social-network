import React from 'react';
import Register from './register';
import { Link } from 'react-router';
import Login from './login';

// in functional components we do not have 'this', as no state and no constructor


export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <h1>Welcome on the Social Network, that does not have a proper name yet</h1>
                {this.props.children}
            </div>
        )
    }
}
