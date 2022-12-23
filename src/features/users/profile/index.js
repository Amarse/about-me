import './profile.modules.scss';
import React, { useState } from 'react';
import { authService } from 'Fbase';
import { useNavigate } from 'react-router-dom';
import Modal from 'features/ui/modal';

const Profile = (props) => {
  console.log('프로필', props.user);
  const user = props.user;

  const [isModal, setIsModal] = useState(false);
  const history = useNavigate();

  const onLogoutClick = () => {
    authService.signOut();
    history('/');
  };

  const onClick = (event) => {
    console.log(event);
    event.preventDefault();
    setIsModal(true);
  };
  return (
    <div>
      <div onClick={onClick} className="image">
        <span >{user.displayName}</span>
        {/* <img src={user.profile} alt='계정' /> */}
      </div>
      {isModal && (
        <Modal isModal={isModal} setIsModal={setIsModal}>
          <div className='profile-info' value={isModal}>
            <span className='user-name'>{user.displayName}</span>
            <span className='user-email'>{user.email}</span>
            <button onClick={onLogoutClick} value='로그아웃'>
              Log Out
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Profile;
