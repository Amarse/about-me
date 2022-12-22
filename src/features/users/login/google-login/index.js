import { Button } from 'features/ui';
import React from 'react';
import { authService, firebaseInstance } from 'Fbase';
import { useNavigate } from 'react-router-dom';

const GoogleLogin = () => {
  const navigate = useNavigate();
  const onSocialClick = (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    }
    authService.signInWithPopup(provider).then(() => {
      navigate('/');
    });
  };

  return (
    <>
      <Button name='google' value='구글로그인' onClick={onSocialClick} />
    </>
  );
};

export default GoogleLogin;
