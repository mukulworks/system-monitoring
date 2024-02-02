import React from "react";
import Sidebar from "./common/Side Bar/Sidebar";
import Sysmonitoring from "./Sysmonitoring";
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
        {/* <Sysmonitoring /> */}
        <Sidebar />
      </div>
    </>
  );
}


// function App({ isLoggedIn }) {
//   const location = useLocation();
//   // const handleContextMenu = (event) => {
//   //   event.preventDefault();
//   //   console.log('Right-clicked on the block!');
//   // };
//   return (
//     <>
//       {
//         location.pathname !== "/"
//       }

//       <Routes >
//         <
//           Route path="/"
//           element={<Sidebar />}
//         />

//       </Routes >

//     </>
//   );
// }



export default App;



