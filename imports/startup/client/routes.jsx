import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute, Redirect } from 'react-router';
import App from '../../../client/components/App.jsx';
import Home from '../../../client/components/home/index.jsx';
import Auth from '../../../client/components/auth/Auth.jsx';
import Login from '../../../client/components/auth/Login.jsx';
import Signup from '../../ui/components/auth/Signup.jsx';


const authenticate = (nextState, replace) => {
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
        <IndexRoute name="index" component={ Home } onEnter={ authenticate } />
        <Route name="auth" path="auth" component={Auth} >
          <Route name="login" path="login" component={Login} />
          <Route name="singup" path="singup" component={Signup} />
        </Route>
        <Redirect from='*' to='/' />
      </Route>
    </Router>,
    document.getElementById('app')
  );
});