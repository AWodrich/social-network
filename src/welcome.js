import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';


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
        this.state = {
          first: '',
          last: '',
          email: '',
          password: '',
          imgUrl: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        const { first, last, email, password, imgUrl } = this.state;

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
        const state = {};
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    render() {
        const { first, last, email, password } = this.state;

        return (
            <div>
                {this.state.error && <div className="errorRegister">You made a mistake</div>}
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
        e.preventDefault();
        let { email, password } = this.state;

        axios.post('/authorize', { email, password })
            .then(res => {
                console.log('what is res?', res);
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
                <input className="input" onChange={this.onChange} type="text" nameClass="inputRegister" name="email" placeholder="Enter E-Mail" />
                <input className="input" onChange={this.onChange} type="password" nameClass="inputRegister" name="password" placeholder="Enter Password" />
                <button className="submitBtnWelcome" onClick={this.onSubmit} type="button" nameClass="registerSubmit">Login</button>
                <div className="goToLogin">
                    Go back for <button className="welcomeBtn" onClick={() => this.props.showRegistration('register')}>Register</button>
                    {this.props.children}
                </div>
                {this.state.error && <p className="errorLogin">You made a mistake</p>}
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
        return(
            <div className="welcomeWrapper">
                <img className="welcomeBackground" src="/bitcoin-background.jpg" />
                <div className="clickForRegister" onClick={() => this.props.showRegistration('register')} className="clickForRegister" />
            </div>
        )
    }
}
