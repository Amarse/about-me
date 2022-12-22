import React from 'react';
import { Link } from 'react-router-dom';
// import Profile from 'features/users/profile';

const Navi = ({ userObj }) => (
  <nav >
    <ul>
      <li>
        <Link to='/'>Home</Link>
        
      </li>
      <li><Link to='/board'>board</Link></li>
      <li><Link to='/calender'>calender</Link></li>
      <li>
        {/* <Profile userObj={userObj}/> */}
      </li>
    </ul>
  </nav>
);

export default Navi;
