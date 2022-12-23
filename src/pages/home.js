import React from "react";

import Calender from './diary'


const Home = () => {

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