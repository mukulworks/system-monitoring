import React from "react";
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
        <Sysmonitoring />
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
//           element={<Sysmonitoring />}
//         />

//       </Routes >

//     </>
//   );
// }



export default App;



