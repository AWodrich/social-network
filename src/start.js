import React from 'react';
// React library ReactDom for interacting with the DOM
import ReactDOM from 'react-dom';


class Hello extends React.Component {
    constructor(props) {
        super(props);
        console.log('this.props is', this.props);

        this.state = {
            name:'Kitty'
        };
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState({
            name:'World'
        })
    }

    render() {
        return(
        <div>
            <div onClick={this.handleClick}>Hello, <Receiver name={this.state.name} />!</div>
            <PrettyInput changeText={name => this.setState({ name }) }/>
        </div>
        );
    }
}


ReactDOM.render(
    <Hello name='Kitty' />,
    document.querySelector('main')
);


function PrettyInput() {
    console.log('in here');
    var style={border: '1px dotted red', fontSize: '20px', color: 'green'}
    return (
        <input style={style} type="text">
    )
}

function Receiver(props) {
    return <strong> {props.name}</strong>
}
