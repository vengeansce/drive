import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { Global } from 'contexts';

export default function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useContext(Global);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.length ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.elementType,
};
