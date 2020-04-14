import React, { useEffect } from 'react';
import { firebase } from 'config/firebase';

const Context = React.createContext();
export function Provider({ children }) {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('redirect kalo lagin dilogin/register');
      } else {
        console.log('user null');
      }
    });
  }, []);
  return <Context.Provider>{children}</Context.Provider>;
}

export default Context;
