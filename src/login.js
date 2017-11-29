import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
// import Register from './register';






export default class Login extends React.Component {
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
                console.log('+++++++++what is res after successful login?', res);
                if(res.data.success) {
                    location.replace('/profile')
                } else {
                    this.setState({ error: true })
                }

         });

    }
    render() {
        return(
            <div className="containerLogo">
                {this.state.error && <div>Wrong login data</div>}
                <img className="logoImg" src="../public/logo.jpg" />
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
