import React from "react";
import Sidebar from "./common/Side Bar/Sidebar";
import Graph from "./objects/Graph/Graph";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

function App() {
  return (
    <>
      <div>
        <Sidebar />
      </div>
    </>
  );
}

export default App;
