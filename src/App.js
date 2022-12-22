import React, { useState, useEffect } from 'react';
import AppRouter from './router';
import Navi from 'features/ui/navi';
import { authService } from 'Fbase';
import { DiaryContextProvider } from 'centext/diary.context';

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
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      <Navi userObj={userObj} />
      {init ? (
        <DiaryContextProvider>
          <AppRouter userObj={userObj}  />
        </DiaryContextProvider>
      ) : (
        'loading...'
      )}
      <footer>&copy; {new Date().getFullYear()} Alice</footer>
    </>
  );
}

export default App;
