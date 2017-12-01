import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Welcome from './welcome';
import Login from './login';
import Register from './register';
import { Home } from './home';
import { App, Logo, UploadImage } from './app';



let router;

const notLoggedInRouter = (
    <Router history={hashHistory}>
        <Route path="/" component={Welcome}>
            <Route path="/login" component={Login} />
            <IndexRoute component={Register} />
  	    </Route>
    </Router>
);

const loggedInRouter = <App />


// const loggedInRouter = <App />

// the server dictates who is deciding where we go.
// in my app.get routes we have
if(location.pathname == '/welcome/') {
    router = notLoggedInRouter;
} else {
    router = loggedInRouter;
}


ReactDOM.render(router, document.querySelector('main'));
