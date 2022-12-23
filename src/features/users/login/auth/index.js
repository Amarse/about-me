import './auth.modules.scss';
import { useLogin } from 'hooks/useLogin';
import React, { useState } from 'react';
import GoogleLogin from '../google-login';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {error, isPending, login} = useLogin();

  const onChange = (event) => {
    const {
      target: { type, value },
    } = event;

    if (type === 'email') {
      setEmail(value);
    } else if (type === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    login(email, password); //hook에 써놓은거
  };

  return (
    <>
      <form onSubmit={onSubmit} className='login-form'>
        <label htmlFor='email'></label>
        <input
        value={email}
        type="email"
        id="email"
        placeholder="Email"
        required
        onChange={onChange}
        />
        <label htmlFor='password'></label>
        <input
          value={password}
          type="password"
          id='password'
          placeholder="Password"
          required
          onChange={onChange}
        />
      {!isPending && (
          <button type='submit' className='button'>
            Login
          </button>
        )}
        {isPending && <strong>Now Processing...</strong>}
        {error && <strong>{error}</strong>}
      </form>
      <GoogleLogin />
    </>
  );
};

export default Auth;
