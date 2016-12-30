import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute, Redirect } from 'react-router';
import App from '../../../client/components/App.jsx';
import Home from '../../../client/components/home/index.jsx';
import Login from '../../../client/components/auth/Login.jsx';
import Auth from '../../../client/components/auth/Auth.jsx';

const authenticate = (nextState, replace) => {
  console.log(nextState);
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
          <Route name="singup" path="singup" component={Login} />
        </Route>
        <Redirect from='*' to='/' />
      </Route>
    </Router>,
    document.getElementById('app')
  );
});