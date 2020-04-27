import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// pages
import { Homepage, SignIn, SignUp } from './pages';

export default function Routes() {
  return (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/entrar" component={SignIn} />
            <Route path="/cadastro" component={SignUp} />
        </Switch>
    </BrowserRouter>
  );
}

