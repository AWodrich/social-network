import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';
import { Welcome, Default, Register, Login } from './welcome';
import { App, Logo, UploadImage, ProfilePic, Bio, Profile, OtherUsers } from './app';



let router;

const notLoggedInRouter = (
    <Router history={hashHistory}>
        <Route path="/" component={Welcome}>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <IndexRoute component={Default} />
  	    </Route>
    </Router>
);

const loggedInRouter = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="/upload" component={UploadImage} />
            <Route path="/logo" component={Logo} />
            <Route path="/profile-img" component={ProfilePic} />
            <Route path="/add-bio" component={Bio} />
            <Route path="/user/:id" component={OtherUsers} />
            <IndexRoute component={Profile} />
        </Route>
    </Router>
)


if(location.pathname == '/welcome/') {
    router = notLoggedInRouter;
} else {
    router = loggedInRouter;
}

ReactDOM.render(router, document.querySelector('main'));
