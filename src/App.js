import React, { useState, useEffect } from 'react';
import AppRouter from './router';
import Navi from 'features/ui/navi';
import { authService } from 'Fbase';
import { AuthContextProvider } from 'centext/user.context';
import { DiaryContextProvider } from 'centext/diary.context';
import { useAuthContext } from 'hooks/useAuth';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Calender from 'pages/diary';
import Login from 'pages/login';
import Signup from 'pages/signup';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  // console.log(user);

  useEffect(() => {
    // 구글 로그인 유지
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
      <Navi />
      <DiaryContextProvider>
        {init ? (
          <Routes>
            <Route
              path='/'
              element={
                userObj ? (
                  <Calender userObj={userObj} />
                ) : (
                  <Navigate replace={true} to='/login' />
                )
              }
            />
            <Route
              path='/login'
              element={
                !userObj ? <Login /> : <Navigate replace={true} to='/' />
              }
            />
            {/*
            <Route
              path='/signup'
              element={
                !userObj ? <Signup /> : <Navigate replace={true} to='/' />
              }
            /> */}
          </Routes>
        ) : (
          'loading...'
        )}
      </DiaryContextProvider>
      <footer>&copy; {new Date().getFullYear()} Alice</footer>
    </>
  );
}

export default App;
