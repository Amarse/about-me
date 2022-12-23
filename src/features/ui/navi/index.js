import './navi.modules.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { authService } from 'Fbase.js';
import { useNavigate } from 'react-router-dom';

const Navi = (props) => {
  const history = useNavigate();
  const user = props.userObj;

  const onLogoutClick = () => {
    authService.signOut();
    history('/');
  };

  return (
    <nav className='menu-items'>
      <h1 className='title'>My Dite Diary</h1>
      <ul className='list'>
        {!user && (
          <li>
            <Link to='/login'>login</Link>
          </li>
        )}
        {user && (
          <li>
            <button onClick={onLogoutClick} value='로그아웃'>
              Log Out
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};
export default Navi;
