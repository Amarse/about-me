import React, { useState, useEffect } from 'react';
// import Navi from 'features/ui/navi';
import { authService } from 'Fbase';
import { DiaryContextProvider } from 'context/diary.context';
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter,
  useNavigate,
} from 'react-router-dom';
import Calender from 'pages/diary';
import Login from 'pages/login';
import Navi from 'features/ui/navi';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState({});

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
    <DiaryContextProvider>
      <div className='App'>
        {init ? (
          <BrowserRouter>
            <Navi userObj={userObj} />
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
            </Routes>
          </BrowserRouter>
        ) : (
          'loading...'
        )}
        {/* <footer>&copy; {new Date().getFullYear()} Alice</footer> */}
      </div>
    </DiaryContextProvider>
  );
}

export default App;
