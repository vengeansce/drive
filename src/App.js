import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { PrivateRoute, AuthRoute } from 'components';
import { Login, SignUp, Home, Dashboard } from './pages';

import { Global as GlobalProvider } from './contexts/providers';

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/sign-up" component={SignUp} />
        </Switch>
      </Router>
    </GlobalProvider>
  );
}

export default App;
