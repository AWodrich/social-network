// import React, { Component } from 'react';
// import OtherRandomComponent from './OtherRandomComponent';
//
// export default class RandomComponent extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             first: 'Julie',
//             last: 'Fewer',
//             age: 23
//         }
//     }
//     render() {
//
//         const { first, last, age } = this.state
//         // NEVER FORGET THE RETURN!!!!
//         return(
//             <div>
//                 <h1>RandomComponentIMade!!</h1>
//                 // When i want to pass these props to the OtherRandomComponent
//
//                 <OtherRandomComponent
//                 first={first}
//                 last={last}
//                 age={age}/>
//         )
//     }
//
//
// if it is a class then you access these values inside the Component
// => this.props.first
//
// if it is a function then you access these values inside it:
// => props.firstname
// }
//
// this.state.age
//
//
// ====================================================
//
//
// export default class OtherRandomComponent extends Component {
//     constructor(props) {
//         super(props)
//     }
//
//     render() {
//
//         return (
//             // if we want to destructure like this:
//             const { last } = this.props
//             <div>
//                 <p> First: {this.props.first}</p>
//                 // Then you can write it like this below
//                 <p> Last: {last}</p>
//         )
//     }
// }
//
//
// // ///////////////////////////////////////////////
//
// route: /
// Components rendered: App => Profile
//
// <Profile /> == this.props.children
//
// class MyComponent extends React.Component {
//     log(msg) {
//         console.log(msg);
//     }
//     render() {
//         const children = React.cloneElement(this.props.children, {
//             log: this.log
//         });
//         return (
//             <div>
//                 {children}
//             </div>
//         );
//     }
// }
//
//
// ///////////////////////////
//
// in child Component
// render() {
//     return(
//         <div>
//         // accessing the function called log, can now be accessed like this
//             {this.props.log}
//         </div>
//     )
// }
//
//
//
// // get profile info
//
// inside my main App componentn:
//
// componentDidMount() {
//     // asyncronous request to the server
//     axios.get('/getInfo')
//         .then(({data}) => {
//             console.log(data);
//             this.setState({
//                 first: data.first,
//                 last: data.last,
//                 age: data.age
//                 // the callback function is not necessary, buttonIn the life cycle method.
//                 // every componentn has a lifecycle
//                 // first run contrsutctor => look at the lifecycle of React Compjonents!!!Very important!!
//             }, () => console.log('set state', this.state);)
//         })
//
// // no i want to pass the results from the server to my child components.
//     render() {
//         // now i have access to those data from the server, because i put it on the state object.
//         const { first, last, age } = this.state;
//         // passing props to the children, so you can access them inside the children.
//
//         // because we have the ComponentDidMount() the component does not have the values when it renders.
//         // so it will give you an error.
//         // still we use the componentnDidMount() because the ComponentWillMount() will not run all the time. so it is
//         // better to user the ComponentDidMount.
//
//         // but in order not to get the error message use an if statement
//
//         if(!this.state) {
//             return(
//                 <div>Loading......</div>
//             )
//         }
//
//         const children = React.cloneElement(this.props.children, {
//                 first: this.state.first,
//                 last: this.state.last,
//                 age: this.state.age
//
//                 first:first,
//                 last:last,
//                 age:age
// //
//                 first, last, age
//         })
//         return (
//             <div>
//                 <h1>App</h1>
//                 {children}
//             </div>
//         )
//     }
//
//
// app.get('/getinfo', (req, res) => {
//     const q= 'Select * from users where id=$1'
//     const params = [req.session.user.ud]
//     db.query(q,params)
//         .then(resutlts => {
//             res.json(results.rows[0])
//         })
//     var resultsFromMyDbQueryToGetInfo
// })
//
// /////////
//
// accessing the data from app component inside the children
// render(){
//     return(
//
//         <p> first: this.props.first</p>
//         <p> last: this.props.last</p>
//     )
// }
//
//
// // /////////
// // import Chat into start.js
// <Route path="chat" comonent={Chat} />
//
// export default function Chat(props {
//     return (
//         <div>
//             <h1> Chat<h1>
//             <p>first:
//     )
// })
//
// this.state ={
//     showUploader = false
// }
//
//
// render(){
//     clone(....,
//
//     showUploader: this.showUploader
// }
//
// {showUploader && <div>Show stuff</div>}
