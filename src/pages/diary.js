import React from 'react';
import Calender from 'features/calender';

const Diary = ({userObj}) => {
  console.log('user', userObj)
  return (
    <main className="body">
      <Calender userObj={userObj}/>
    </main>
  );
};

export default Diary;
