import { authService } from 'Fbase';
import { Input, Button } from 'features/ui';
import React, { useState } from 'react';
import GoogleLogin from '../google-login';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [newAccount, setNewAccount] = useState(true);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    console.log(event)
    event.preventDefault();
    try {
      if (newAccount) {
        await authService.createUserWithEmailAndPassword(email, password);
      } else {
        await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <>
      <form onSubmit={onSubmit}>
        <Input
        name="email"
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={onChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <Button
          type='submit'
          onClick={toggleAccount}
          value={newAccount ? 'Login' : 'Create Account'}
        />
      </form>
      <GoogleLogin />
    </>
  );
};

export default Auth;
