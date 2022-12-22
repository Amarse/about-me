import { Button } from 'features/ui';
import React from "react";
import { authService, firebaseInstance } from "Fbase";


const GoogleLogin = () => {
  const onSocialClick = async (event) => {
    console.log(event.target.value)
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };

  return (
    <>
      {/* {user ? (
        <Button
          name='google'
          value='로그아웃'
        />
      ) : (
        <Button
          name='google'
          value='로그인'
        />
      )} */}
      <Button
          name='google'
          value='구글로그인'
          onClick={onSocialClick}
        />
      <Button
          name='github'
          value='깃헙로그인'
          onClick={onSocialClick}
        />
    </>
  );
};

export default GoogleLogin;
