import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute, Redirect } from 'react-router';
import App from '../../../client/components/App.jsx';
import Home from '../../../client/components/home/index.jsx';
import Auth from '../../../client/components/auth/Auth.jsx';
import Login from '../../../client/components/auth/Login.jsx';
import Signup from '../../ui/components/auth/Signup.jsx';
import Backend from '../../../client/components/backend/index.jsx';
import Dashboard from '../../../client/components/dashboard/index.jsx';
import Stage from '../../../client/components/backend/stage/index.jsx';
import Resource from '../../../client/components/backend/resource/index.jsx';

const authenticate = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/auth/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
};

const checkIsAdmin = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/auth/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
};

Meteor.startup(() => {
  render(
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} onEnter={authenticate} />
        <Route path="/auth" component={Auth} >
          <IndexRoute component={Login} />
          <Route path="/auth/login" component={Login} />
          <Route path="/auth/singup" component={Signup} />
        </Route>
        <Route path="/backend" component={Backend} onEnter={checkIsAdmin}>
          <IndexRoute component={Resource} />
          <Route path="/backend/resource" component={Resource} />
          <Route path="/backend/stage" component={Stage} />
        </Route>
        <Route path="/dashboard" component={Dashboard} onEnter={checkIsAdmin}>
        </Route>
      </Route>
      <Redirect from="*" to="/" />
    </Router>,
    document.getElementById('app')
  );
});