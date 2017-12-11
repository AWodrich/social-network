import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {} from './actions';
import * as io from 'socket.io-client';
import axios from './axios';
import { userJoined, userLeft, usersOnline } from './actions';
import { store } from './start'

let socket;

function getSocket() {
  if (!socket) {
    socket = io.connect();
    socket.on('connect', () => {
      axios.get('/connected/' + socket.id)
    });

  socket.on('userJoined', data => {
    console.log('user joined');
    store.dispatch(userJoined(data))
  })

  socket.on('userLeft', data => {
    console.log('user left');
    store.dispatch(userLeft(data))
  })

  socket.on('usersOnline', data => {
    console.log('all online users');
    store.dispatch(usersOnline(data))
  })
}
return socket;
}

export { getSocket } ;
