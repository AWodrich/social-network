import React from 'react';
import Register from './register';



export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <h1>Welcome on the Social Network, that does not have a proper name yet</h1>
                <Register />
            </div>
        )
    }
}
