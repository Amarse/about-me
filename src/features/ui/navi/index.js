import './navi.modules.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import Profile from 'features/users/profile';
import Signup from 'pages/signup';

const Navi = ({ userObj, refreshUser }) => (
  <nav>
    <ul className='menuItems'>
      {/* <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/board'>board</Link>
      </li>
      <li>
        <Link to='/calender'>calender</Link>
      </li> */}
      <li>
        {!userObj && <Signup />}
        {userObj ? (
          <Profile userObj={userObj} refreshUser={refreshUser} />
        ) : (
          <Link to='/login'>Login</Link>
        )}
      </li>
    </ul>
  </nav>
);

export default Navi;
