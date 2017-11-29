import React from 'react';


// props.children ist coming from react-Router

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <h1>Welcome on your side</h1>
                {this.props.children}
            </div>
        )
    }
}
