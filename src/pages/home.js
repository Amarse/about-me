import React, { useState, useEffect } from "react";
import { dbService } from "Fbase";
import Calender from './diary'


const Home = ({ userObj }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    dbService.collection("career").onSnapshot((snapshot) => {
      const careerArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setList(careerArray);
    });
  }, []);


  return (
    <main className="body">
      {/* <Navi userObj={userObj} /> */}
      <div>
        <Calender />
      </div>
    </main>
  );
};

export default Home;