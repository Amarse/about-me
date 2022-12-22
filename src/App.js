import React, { useState, useEffect } from 'react';
import AppRouter from './router';
import Navi from 'features/ui/navi';
import { authService } from 'Fbase';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  console.log(userObj);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          email: user.email,
          profile: user.photoURL,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      email: user.email,
      profile: user.photoURL,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  return (
    <>
      <Navi userObj={userObj} />
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        'loading...'
      )}
      <footer>&copy; {new Date().getFullYear()} Alice</footer>
    </>
  );
}

export default App;
