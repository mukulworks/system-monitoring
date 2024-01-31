import { useState } from "react";
import Sidebar from "./common/Side Bar/Sidebar";
import Header from "./common/Header/Header";
import Toogle from "./common/Toggle/Toggle";
import Circleobject from "./objects/Circles/Circleobject";
import Boxobject from "./objects/Boxes/Boxobject";
import Cardobject from "./objects/Cards/Cardoject";
import Object from "./objects/object";
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
