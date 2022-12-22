import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from 'pages/home';
import NotFound from 'pages/notfound';
import Login from 'features/users/login/auth';
import Board from 'features/community-board/index';
import Calender from 'pages/calender'
const Router = ({ refreshUser, userObj }) => {
  console.log(userObj);
  return (
    <>
      <Routes>
        {userObj ? (
          <>
            <Route exact path='/' element={<Home userObj={userObj} />} />
            <Route
              path='/board/*'
              element={<Board userObj={userObj} refreshUser={refreshUser} />}
            /> <Route
            path='/calender'
            element={<Calender userObj={userObj} refreshUser={refreshUser} />}
          />
            <Route element={<NotFound />} />
            <Route path='/redirect' element={<Navigate to='/not-found' />} />
          </>
        ) : (
          <>
            <Route path='/login' element={<Login />} />
            <Route path='/404' element={<NotFound />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default Router;
