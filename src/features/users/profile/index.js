import './profile.modules.scss';
import React, { useState } from 'react';
import { authService } from 'Fbase';
import { useNavigate } from 'react-router-dom';
import { Button } from 'features/ui';
import Modal from 'features/ui/modal';

const Profile = ({ userObj }) => {
  console.log('프로필', userObj);

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
        <img src={userObj.profile} alt='계정' />
      </div>
      {isModal && (
        <Modal isModal={isModal} setIsModal={setIsModal}>
          <div className='profile-info' value={isModal}>
            <span className='user-name'>{userObj.displayName}</span>
            <span className='user-email'>{userObj.email}</span>
            <Button onClick={onLogoutClick} value='로그아웃'>
              Log Out
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Profile;
