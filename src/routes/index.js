import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
// pages
import { NotFound , Homepage, SignIn, SignUp, Dashboard, SchoolClass } from '../pages';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Homepage} />
      <Route path="/entrar" component={SignIn} />
      <Route path="/cadastro" component={SignUp} />

      {/* private routes */}
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/turmas/:grade/:schoolClass" component={SchoolClass} isPrivate />

      <Route path="*" component={NotFound} notFound />
    </Switch>
  );
}
