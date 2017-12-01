import React from 'react';
import axios from 'axios';
import Login from './login';
import { Link } from 'react-router'


export default class Register extends React.Component {
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
        const { first, last, email } = this.state;
        return (
            <div>
                {this.state.error && <div>You made a mistake</div>}
                <div className="register">
                    <input onChange={this.onChange} type="text" nameClass="inputRegister" name="first" placeholder="Enter First Name" />
                    <input onChange={this.onChange} type="text" nameClass="inputRegister" name="last" placeholder="Enter Last Name" />
                    <input onChange={this.onChange} type="text" nameClass="inputRegister" name="email" placeholder="Enter E-Mail" />
                    <input onChange={this.onChange} type="password" nameClass="inputRegister" name="password" placeholder="Enter Password" />
                    <button onClick={this.onSubmit} type="button" nameClass="registerSubmit">Register</button>
                    <p>Already a Member?
                    <Link to="/login">Login </Link>
                    here</p>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

//
