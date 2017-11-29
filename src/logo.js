import React from 'react';


export default class Logo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {};
    }
    render() {
        console.log('props in logo', this.props);
        return(
            <div className="containerLogo">
                <img className="logoImg" src="../public/logo.jpg" />
                <h1>Welcome to your personal page</h1>
            </div>
        )
    }
}
