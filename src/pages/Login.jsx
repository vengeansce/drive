import React, { useState, useCallback, useEffect } from 'react';
import { Input, Button, Alert } from 'components';
import { Link } from 'react-router-dom';
import { useProgress } from 'custom-hooks';
import { firebase } from 'config/firebase';

export default function Login() {
  const { progress, handleProgress } = useProgress();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = useCallback((e) => setEmail(e.target.value), []);
  const handleChangePassword = useCallback(
    (e) => setPassword(e.target.value),
    []
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    handleProgress.start();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => handleProgress.end())
      .catch(() => handleProgress.error());
  };

  useEffect(() => {
    document.title = 'Login';
  }, []);

  return (
    <div className="flex bg-gray-100 h-screen w-screen">
      <div className="self-center mx-auto">
        <h1 className="py-8 text-center">Sign in to your account</h1>
        <div className="w-full max-w-sm mx-auto">
          {progress.error && (
            <Alert.Danger message="Incorrect username or password" />
          )}
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
              <Button disabled={!(email && password)}>Sign in</Button>
            </form>
            <hr className="my-6" />
            <div className="text-center leading-none">
              <span>Don&apos;t have an account?</span>
              <Link to="/sign-up" className="text-indigo-500 font-medium">
                {' '}
                Sign up here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
