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
    showRegistration(string) {
        this.setState({
            active: string
        })

    }
    render() {

        const children = React.cloneElement(this.props.children, {
            showRegistration: this.showRegistration,
        });

        return (
            <div>
                {this.state.active == "register" && <Register showRegistration={this.showRegistration} />}
                {this.state.active == "login" && <Login showRegistration={this.showRegistration} />}
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
        console.log('this.props. registration+++++', this.props);
        const { first, last, email } = this.state;
        return (
            <div>
                {this.state.error && <div>You made a mistake</div>}
                <div className="register">
                    <input className="input" onChange={this.onChange} type="text" nameClass="inputRegister" name="first" placeholder="Enter First Name" />
                    <input className="input" onChange={this.onChange} type="text" nameClass="inputRegister" name="last" placeholder="Enter Last Name" />
                    <input className="input" onChange={this.onChange} type="text" nameClass="inputRegister" name="email" placeholder="Enter E-Mail" />
                    <input className="input" onChange={this.onChange} type="password" nameClass="inputRegister" name="password" placeholder="Enter Password" />
                    <button className="submitBtnWelcome" onClick={this.onSubmit} type="button" nameClass="registerSubmit">Register</button>
                    <div className="goToLogin">
                        <p>Already a Member?
                        <button className="welcomeBtn" onClick={() => this.props.showRegistration('login')}>Login </button>
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
        this.goBackToRegister = this.goBackToRegister.bind(this)
    }
    onChange(e) {
        const state = {};
        state[e.target.name] = e.target.value;
        this.setState(state);


    }
    onSubmit(e) {
        console.log('in here');
        e.preventDefault();
        let { email, password } = this.state;

        axios.post('/authorize', { email, password })
            .then(res => {
                if(res.data.success) {
                    location.replace('/')
                } else {
                    this.setState({ error: true })
                }

         });

    }

    goBackToRegister() {
        this.setState({register:true})
    }
    render() {
        return(
            <div className="register">
                {this.state.error && <div>Wrong login data</div>}
                <h1></h1>
                <input className="input" onChange={this.onChange} type="text" nameClass="inputRegister" name="email" placeholder="Enter E-Mail" />
                <input className="input" onChange={this.onChange} type="password" nameClass="inputRegister" name="password" placeholder="Enter Password" />
                <button className="submitBtnWelcome" onClick={this.onSubmit} type="button" nameClass="registerSubmit">Login</button>
                <div className="goToLogin">
                    Go back for <button className="welcomeBtn" onClick={() => this.props.showRegistration('register')}>Register</button>
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
        console.log('in default?????????', this.props);
        return(
            <div className="welcomeWrapper">
                <img className="welcomeBackground" src="/bitcoin-background.jpg" />
                <h1>Bit$Net</h1>
                <h2>The Social Network for Bitcoin Lovers</h2>
                <div className="clickForRegister" onClick={() => this.props.showRegistration('register')} className="clickForRegister" />
            </div>
        )
    }
}
