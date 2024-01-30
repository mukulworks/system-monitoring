import { useState } from "react";
import Sidebar from "./common/Side Bar/sidebar";
import Header from "./common/Header/Header";
import Toogle from "./common/Toggle/Toggle";
import Circleobject from "./objects/Circles/circleobject";
import Boxobject from "./objects/Boxes/boxobject";
import Cardobject from "./objects/Cards/cardoject";
import ".//app.css";
function App() {
  return (
    <div className="con">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="content">
        <div className="header">
          <Header />
        </div>
        <div className="circleobject">
          <Circleobject />
          {/* <Boxobject /> */}
          {/* <Cardobject /> */}
        </div>
      </div>


      {/* <Toogle /> */}





    </div>
  );
}

export default App;
