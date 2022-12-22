import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import BoardList from './board-list';
import { useNavigate } from 'react-router';
import { Route, Routes } from 'react-router-dom';
import BoardWrite from './board-write';
import { dbService } from 'Fbase';

const Board = ({ userObj, refreshUser }) => {
  const [post, setPost] = useState([]);
  console.log(userObj, refreshUser);
  const navigate = useNavigate();

  const onClick = () => {
    navigate('write');
  };

  const postLists = dbService
    .collection('board')
    .orderBy('date', 'desc')
    .limit(10)
    .get()
    .then((docs) => {
      let postList = [];
      docs.forEach((list) => {
        let post = list.data();
        postList.push(post);
      });
    });

  // const career = {
  //   title: title,
  //   date: Date.now(),
  //   uid: userObj.uid,
  //   name: userObj.displayName,
  //   veiw: veiw,
  // };

  return (
    <>
      <span>커뮤니티</span>
      <Button onClick={onClick}>글쓰기</Button>
      <Routes>
        <Route
          path='/'
          element={
            <BoardList
              userObj={userObj}
              value={postLists}
              refreshUser={refreshUser}
            />
          }
        />
        <Route
          path='write'
          element={<BoardWrite userObj={userObj} refreshUser={refreshUser} />}
        />
      </Routes>
    </>
  );
};

export default Board;
