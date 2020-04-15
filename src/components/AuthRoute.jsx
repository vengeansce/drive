import React, { useContext } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { Global } from 'contexts';

export default function AuthRoute({ ...rest }) {
  const history = useHistory();
  const { user } = useContext(Global);
  return user.length ? (
    <Redirect
      to={history.location.state ? history.location.state.from.pathname : '/'}
    />
  ) : (
    <Route {...rest} />
  );
}
