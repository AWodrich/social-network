import React from 'react';
import axios from 'axios';
import Logo from './logo';


export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          fname: '',
          lname: '',
          email: '',
          password: ''
        };
        this.onChange = this.onChange.bind(this);
    }
    onSubmit(e) {
        e.preventDefault();
       // getting form data out of state
        const { fname, lname, email } = this.state;

        axios.post('/', { fname, lname, email })
            .then(res => {
                if(res.data.success) {
                    location.replace('/profile')
                } else {
                    this.setState({ error: true })
                }
                <Logo />
                console.log('result', res);
         });
    }
    onChange(e) {
        // Because inputs are named to match their corresponding values in state, it's
        // easy to update the state
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);

    }
    render() {
        const { fname, lname, email } = this.state;
        return (
            <div>
                {this.state.error && <div>You made a mistake</div>}
                <form className="register" method="post">
                    <input onChange={this.onChange} type="text" nameClass="inputRegister" name="fname" placeholder="Enter First Name" />
                    <input onChange={this.onChange} type="text" nameClass="inputRegister" name="lname" placeholder="Enter Last Name" />
                    <input onChange={this.onChange} type="text" nameClass="inputRegister" name="email" placeholder="Enter E-Mail" />
                    <input onChange={this.onChange} type="password" nameClass="inputRegister" name="password" placeholder="Enter Password" />
                    <button type="submit" nameClass="registerSubmit">Register</button>
                </form>
            </div>
        )
    }
}

//
