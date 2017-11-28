import React from 'react';
import ReactDOM from 'react-dom';
import { Welcome } from './welcome';
import { Logo } from './logo';



if(location.pathname == 'welcome') {
    compenent = <Welcome />;
} else {
    component = <Logo />
}



ReactDOM.render(
    component,
    <Hello name='Kitty' />,
    document.querySelector('main')
);


function PrettyInput() {
    console.log('in here');
    var style={border: '1px dotted red', fontSize: '20px', color: 'green'}
    return (
        <input style={style} type="text" />
    )
}

function Receiver(props) {
    return <strong>{props.name}</strong>
}



// handleChange() {
//
//     }
//     handleSubmit() {
//         axios.post('/register', {
//             first: this.first,
//             email: this.email,
//             password: this.password
//         }).
//         then(res => {
//             if(res.data.success) {
//                 // this is a redirect from the browser
//                 location.replace('/')
//             } else {
//                 this.setState({
//                     error: true
//                 })
//             }
//         })
//     }
//
//
//     <div>
//     {this.state.error}
//         <input onChange={() => this.handleChange(e.target.name)}
//         <input />
//         <input />
//         <input />
//         <input />
//         <button onClick={() => this.submit()}></button>
//     </div>
// }
