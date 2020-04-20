import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// pages
import { Homepage } from './pages';

export default function Routes() {
  return (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Homepage} />
        </Switch>
    </BrowserRouter>
  );
}

