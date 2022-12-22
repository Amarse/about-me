import Table from 'react-bootstrap/Table';
import React, { useEffect } from 'react';
import { dbService } from 'Fbase';

const BoardList = (props) => {
console.log(props)

  return (
    <>
      {/* {Object.keys(postLists)} */}
      {/* {Object.keys(postLists).map((post, index) => {
        <Table bordered hover id='table' key={index}>
          <thead>
            <tr>
              <th scope='col'>번 호</th>
              <th scope='col'>제 목</th>
              <th scope='col'>날 짜</th>
              <th scope='col'>작성자</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{post[index]}</td>
              <th>
                <a href='#!'>{post.title}</a>
              </th>
              <td>{post.date}</td>
              <td>{post.name}</td>
            </tr>
          </tbody>
        </Table>;
      })} */}
    </>
  );
};

export default BoardList;
