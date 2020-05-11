import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
// store
import { store } from '../store';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  notFound,
  ...rest
}) {
  const { signed } = store.getState().auth;

  if (!signed && isPrivate && !notFound) {
    return <Redirect to="/entrar" />;
  }

  if (signed && !isPrivate && !notFound) {
    return <Redirect to="/dashboard" />;
  }

  return <Route {...rest} component={Component} />;
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  notFound: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
}

RouteWrapper.defaultProps = {
  isPrivate: false,
  notFound: false
}
