import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login, SignUp } from './pages';

import { Global as GlobalProvider } from './contexts/providers';

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            file list
          </Route>
          <Route exact path="/dashboard">
            dashboard
          </Route>
          <Route exact path="/login" component={Login} />
          <Route exact path="/sign-up" component={SignUp} />
        </Switch>
      </Router>
    </GlobalProvider>
  );
}

export default App;
