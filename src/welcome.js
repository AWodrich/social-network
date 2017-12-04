import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';

// in functional components we do not have 'this', as no state and no constructor


export class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.showRegistration = this.showRegistration.bind(this)

    }
    showRegistration() {
        this.setState({
            active: true
        })

    }
    render() {

        const children = React.cloneElement(this.props.children, {
            showRegistration: this.showRegistration,
        });

        return (
            <div>
                {this.state.active && <Register />}
                {children}
            </div>
        )
    }
}



// Registration

export class Register extends React.Component {
    constructor(props) {
        super(props);
        // setting a default state.
        this.state = {
          first: '',
          last: '',
          email: '',
          password: '',
          imgUrl: ''
        };
        // if we use functions in a class, we have to BIND something.
        // React always does it the ES6 way.
        // in classes in Javascript, we have to bind the method of that function to that this keyword of that class.
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }
    onSubmit(e) {
        console.log('clicking the register button');
        e.preventDefault();
        console.log(e.target);
       // getting form data out of state
        const { first, last, email, password, imgUrl } = this.state;

        // instead of this.state.first, this.state.lname, this.state.password
        // const { first, lname, email, password } = this.state;
        // => so i only need to write first, lname, email, password

        axios.post('/', { first, last, email, password, imgUrl })
            .then(res => {
                if(res.data.success) {
                    location.replace('/')
                } else {
                    this.setState({ error: true })
                }
         });
    }
    onChange(e) {
        // [e.target.name] => NOT an array!!! THIS is ES6 syntax for
        // dynamically generating a key name. on the fly.
        // name comes from that element name="firstName"
        // another way how to write it ;)
        const state = {};
        state[e.target.name] = e.target.value;
        this.setState(state);

    }
    render() {
        const { first, last, email } = this.state;
        return (
            <div>
                {this.state.error && <div>You made a mistake</div>}
                <div className="register">
                    <input className="input" onChange={this.onChange} type="text" nameClass="inputRegister" name="first" placeholder="Enter First Name" />
                    <input className="input" onChange={this.onChange} type="text" nameClass="inputRegister" name="last" placeholder="Enter Last Name" />
                    <input className="input" onChange={this.onChange} type="text" nameClass="inputRegister" name="email" placeholder="Enter E-Mail" />
                    <input className="input" onChange={this.onChange} type="password" nameClass="inputRegister" name="password" placeholder="Enter Password" />
                    <button onClick={this.onSubmit} type="button" nameClass="registerSubmit">Register</button>
                    <div className="goToLogin">
                        <p>Already a Member?
                        <Link to="/login">Login </Link>
                        here</p>
                    </div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}



// Login

export class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onChange(e) {
        const state = {};
        state[e.target.name] = e.target.value;
        this.setState(state);


    }
    onSubmit(e) {
        e.preventDefault();
        let { email, password } = this.state;

        axios.post('/authorize', { email, password })
            .then(res => {
                // console.log('+++++++++what is res after successful login?', res.data);
                if(res.data.success) {
                    location.replace('/')
                } else {
                    this.setState({ error: true })
                }

         });

    }
    render() {
        console.log('this.props', this.props);
        return(
            <div className="containerLogo">
                {this.state.error && <div>Wrong login data</div>}
                <h1>Login Page</h1>
                <input onChange={this.onChange} type="text" nameClass="inputRegister" name="email" placeholder="Enter E-Mail" />
                <input onChange={this.onChange} type="password" nameClass="inputRegister" name="password" placeholder="Enter Password" />
                <button onClick={this.onSubmit} type="button" nameClass="registerSubmit">Login</button>
                <div>
                    Go back for <Link to='/'>Register</Link>
                    {this.props.children}
                </div>
            </div>
        )
    }
}




//Index Route

export class Default extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        console.log('in default', this.props);
        return(
            <div className="welcomeWrapper">
                <img className="welcomeBackground" src="/bitcoin-background.jpg" />
                <h1>Bit$Net</h1>
                <h2>The Social Network for Bitcoin Lovers</h2>
                <div className="clickForRegister" onClick={this.props.showRegistration} className="clickForRegister" />
            </div>
        )
    }
}
