import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory, browserHistory, Redirect } from 'react-router';
import { Welcome, Default, Register, Login } from './welcome';
import { UploadImage, ProfilePic, Bio, OtherUsers, FriendButton } from './app';
import Profile from './profile';
import App from './app';
import OtherUser from './other_user';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import reducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import FriendList from './friendList';
import * as io from 'socket.io-client';
import Online from './online';
import Chat from './chat';
import FetchNews from './fetchNews';



export const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));
let router;

const notLoggedInRouter = (
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Welcome}>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <IndexRoute component={Default} />
      	    </Route>
        </Router>
    </Provider>
);

const loggedInRouter = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <Route path="/upload" component={UploadImage} />
                <Route path="/profile-img" component={ProfilePic} />
                <Route path="/add-bio" component={Bio} />
                <Route path="/friend-status/:id" component={FriendButton} />
                <Route path="/user/:id" component={OtherUser} />
                <Route path="/friends" component={FriendList} />
                <Route path="/online" component={Online}/>
                <Route path="/chat" component={Chat} />
                <Route path="/news" component ={FetchNews} />
                <IndexRoute component={Profile} />
                <Redirect from="*" to="/" />
            </Route>
        </Router>
    </Provider>
);



if(location.pathname == '/welcome/') {
    router = notLoggedInRouter;
} else {
    router = loggedInRouter;
}

ReactDOM.render(router, document.querySelector('main'));
