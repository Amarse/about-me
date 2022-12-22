import React, { useEffect, useState } from 'react';
import { authService, dbService } from 'Fbase';
import { useNavigate } from 'react-router-dom';
import { Button } from 'features/ui';

const Profile = ({ userObj, refreshUser }) => {
  console.log('프로필', userObj);
  // const [newDisplayName, setNewDisplayName] = useState();
  const history = useNavigate();

  const onLogoutClick = () => {
    authService.signOut();
    history('/home');
  };

  // const getMyCareer = async () => {
  //   await dbService
  //     .collection('career')
  //     .where('creatorId', '==', userObj.uid)
  //     .orderBy('createdAt')
  //     .get();
  //   //console.log(careers.docs.map((doc) => doc.data()));
  // };

  // useEffect(() => {
  //   getMyCareer();
  // });

  // const onChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setNewDisplayName(value);
  // };
  // // const onSubmit = async (event) => {
  // //   event.preventDefault();
  // //   if (userObj.displayName !== newDisplayName) {
  // //     await userObj.updateProfile({
  // //       displayName: newDisplayName,
  // //     });
  // //     refreshUser();
  // //   }
  // // };
  return (
    <>
      <img src={userObj.profile} />
      <span>{userObj.displayName}</span>
      {/* <form onSubmit={onSubmit}>
        <input type="text" placeholder="Display name" onChange={onChange} />
        <input type="submit" value="Update Profile" />
      </form> */}
      <Button onClick={onLogoutClick} value='로그아웃'>Log Out</Button>
    </>
  );
};

export default Profile;
