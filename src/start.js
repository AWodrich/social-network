import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';
import Welcome from './welcome';
import Login from './login';
import Register from './register';
import { Home } from './home';
import { App, Logo, UploadImage, ProfilePic, Bio } from './app';



let router;

const notLoggedInRouter = (
    <Router history={hashHistory}>
        <Route path="/" component={Welcome}>
            <Route path="/login" component={Login} />
            <IndexRoute component={Register} />
  	    </Route>
    </Router>
);

const loggedInRouter = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="/upload" component={UploadImage} />
            <Route path="/logo" component={Logo} />
            <Route path="/profile" component={ProfilePic} />
            <Route path="/bio" component={Bio} />
        </Route>
    </Router>
)


if(location.pathname == '/welcome/') {
    router = notLoggedInRouter;
} else {
    router = loggedInRouter;
}

ReactDOM.render(router, document.querySelector('main'));
