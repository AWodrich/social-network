import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {} from './actions';
import * as io from 'socket.io-client';
import axios from './axios';
import { userJoined, userLeft, usersOnline, getMessages } from './actions';
import { store } from './start'


export { getSocket };

const connections = []

let socket;

function getSocket() {
    if (!socket) {
        socket = io.connect();
        socket.on('connect', () => {
            axios.get('/connected/' + socket.id)
        });

        socket.on('userJoined', data => {
            store.dispatch(userJoined(data))
        })

        socket.on('userLeft', data => {
            store.dispatch(userLeft(data))
        })

        socket.on('usersOnline', data => {
            store.dispatch(usersOnline(data))
        })

        socket.on('newMessage', messageObj => {
            console.log('new message', messageObj);
            store.dispatch(getMessages(messageObj))
        })

        return socket;
    }
}




// online users
// <div className="container">
//     <div className="row">
//         <div className="onlineUsers">
//             <h3>Online Users</h3>
//             <ul className="onlineUsers"></ul>
//         </div>
//     </div>
// </div>
