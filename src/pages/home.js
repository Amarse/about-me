import React, { useState, useEffect } from "react";
import { dbService } from "Fbase";
import Career from "features/users/career";
import Navi from "features/ui/navi";
import Calender from './calender'


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
    <div>
      {/* <Navi userObj={userObj} /> */}
      <div>
        <Calender />
      </div>
    </div>
  );
};

export default Home;