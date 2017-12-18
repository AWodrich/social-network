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
            store.dispatch(getMessages(messageObj))
        })

        return socket;
    }
}
