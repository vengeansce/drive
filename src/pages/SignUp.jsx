import React, { useState, useCallback, useEffect } from 'react';
import { Input, Button, Alert } from 'components';
import { Link } from 'react-router-dom';
import { useProgress } from 'custom-hooks';
import db, { firebase } from 'config/firebase';

export default function Login() {
  const { progress, handleProgress } = useProgress();
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangeEmail = useCallback((e) => setEmail(e.target.value), []);
  const handleChangePassword = useCallback(
    (e) => setPassword(e.target.value),
    []
  );
  const handleChangeConfirmPassword = useCallback(
    (e) => setConfirmPassword(e.target.value),
    []
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (password.length < 6) {
        setErrorMessage('Password too weak, should be at least 6 characters.');
        handleProgress.error();
      } else if (password != confirmPassword) {
        setErrorMessage('Confirm password tidak sama.');
        handleProgress.error();
      } else {
        handleProgress.start();
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(({ user }) => {
            const displayName = user.email.split('@', 1)[0];
            user.updateProfile({ displayName });
            return { user, displayName };
          })
          .then(({ user, displayName }) => {
            // db.ref('users/' + user.uid).set({
            //   permissions: {
            //     create: true,
            //     read: true,
            //     delete: true,
            //   },
            //   role: 2,
            //   email: user.email,
            //   displayName,
            // }); //Hapus user

            // db.ref('users/' + user.uid).set({ role: 1, email: user.email, displayName }); //Olah permission

            db.ref('users/' + user.uid).set({
              permissions: {
                create: false,
                read: false,
                delete: false,
              },
              role: 0,
              email: user.email,
              displayName,
            });
            return;
          })
          .then(() => handleProgress.end())
          .then(() => window.location.replace('/'))
          .catch((err) => {
            if (err && err.code == 'auth/email-already-in-use') {
              setErrorMessage('The email already registered.');
            }
            handleProgress.error();
          });
      }
    },
    [email, password, confirmPassword]
  );

  useEffect(() => {
    document.title = 'Sign Up';
  }, []);

  return (
    <div className="flex bg-gray-100 h-screen w-screen">
      <div className="self-center mx-auto">
        <h1 className="py-8 text-center">Create new account</h1>
        <div className="w-full max-w-sm mx-auto">
          {progress.error && <Alert.Danger message={errorMessage} />}
          <div className="bg-white p-8 shadow rounded-md mt-4">
            <form onSubmit={handleSubmit}>
              <Input
                id="email"
                type="email"
                label="Email"
                disabled={progress.isLoading}
                value={email}
                onChange={handleChangeEmail}
              />
              <Input
                id="password"
                type="password"
                label="Password"
                disabled={progress.isLoading}
                value={password}
                onChange={handleChangePassword}
              />
              <Input
                id="confirm-password"
                type="password"
                label="Confirm password"
                disabled={progress.isLoading}
                value={confirmPassword}
                onChange={handleChangeConfirmPassword}
              />
              <Button disabled={!(email && password && confirmPassword)}>
                Create account
              </Button>
            </form>
            <hr className="my-6" />
            <div className="text-center leading-none">
              <span>Already have an account?</span>
              <Link to="/login" className="text-indigo-500 font-medium">
                {' '}
                Login here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
