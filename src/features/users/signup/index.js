import './signup.modules.scss';
import React, { useState } from 'react';
import { useSignup } from 'hooks/useSignup';

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickName, setNickName] = useState('');
  const { error, isPending, signup } = useSignup();

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'text') {
      setNickName(value);
    }

    const onSubmit = async (event) => {
      event.preventDefault();
      signup(email, password, nickName); //hook에 써놓은거
    };

    return (
      <>
        <form onSubmit={onSubmit} className='signup-form'>
          <label htmlFor='nickName'></label>
          <input
            name='nickName'
            value={nickName}
            type='text'
            id='nickName'
            placeholder='닉네임을 입력하세요'
            required
            onChange={onChange}
          />
          <label htmlFor='email'></label>
          <input
            name='email'
            value={email}
            type='email'
            id='email'
            placeholder='Email'
            required
            onChange={onChange}
          />
          <label htmlFor='password'></label>
          <input
            name='password'
            value={password}
            type='password'
            id='password'
            placeholder='Password'
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
      </>
    );
  };
};

export default UserSignup;
