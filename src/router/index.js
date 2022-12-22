import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from 'pages/home';
import NotFound from 'pages/notfound';
import Login from 'features/users/login/auth';
import Calender from 'pages/diary';

const Router = ({ refreshUser, userObj }) => {
  console.log(userObj);
  return (
    <>
      <Routes>
        <>
          <Route exact path='/' element={<Home userObj={userObj} />} />
          <Route path='/calender' element={<Calender userObj={userObj} />} />
          <Route element={<NotFound />} />
          <Route path='/redirect' element={<Navigate to='/not-found' />} />
        </>

        <>
          <Route path='/login' element={<Login />} />
          <Route path='/404' element={<NotFound />} />
        </>
      </Routes>
    </>
  );
};

export default Router;
