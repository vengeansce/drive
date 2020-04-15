import React, { useEffect, useState, useMemo } from 'react';
import db, { firebase } from 'config/firebase';

const initialState = {
  user: {
    length: 0,
  },
};

const Context = React.createContext();
export function Provider({ children }) {
  const [user, setUser] = useState(initialState.user);
  const dispatch = useMemo(
    () => ({
      user: (payload) => setUser(payload),
    }),
    []
  );
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const ref = db.ref('users').child(user.uid);
        ref.once('value').then((snapshot) => {
          const val = snapshot.val();
          const length = Object.keys(val).length;
          setUser({ ...val, length });
        });
      } else setUser(initialState.user);
    });
  }, []);
  return (
    <Context.Provider value={{ user, dispatch }}>{children}</Context.Provider>
  );
}

export default Context;
