import './login.modules.scss';
import React, { useState } from 'react';
import { authService, firebaseInstance } from 'Fbase';
import { useNavigate } from 'react-router-dom';

const GoogleLogin = () => {
  const onSocialClick = (event) => {
    console.log(event.target.value);
    const {
      target: { name, value },
    } = event;
    let provider;
    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    }
    authService.signInWithPopup(provider);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '30px',
      }}
    >
      {/* <img
        src={require('../../../../assets/images/google.png').default}
        alt='구글 로그인'
        style={{ width: '250px', marginTop: '20px' }}
      /> */}
      <button name='google' value={google} onClick={onSocialClick} className='button'>
        구글 로그인
      </button>
    </div>
  );
};

export default GoogleLogin;
