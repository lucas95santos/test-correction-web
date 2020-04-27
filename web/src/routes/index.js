import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
// pages
import { Homepage, SignIn, SignUp, Dashboard } from '../pages';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Homepage} />
      <Route path="/entrar" component={SignIn} />
      <Route path="/cadastro" component={SignUp} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
  );
}
