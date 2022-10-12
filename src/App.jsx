import Avatar from "./Pages/Avatar";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Chat from "./Pages/Chat";
function App() {
  let user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={user ? <Chat /> : <Navigate replace to="/landing" />}
          ></Route>
          <Route path="/chat" element={<Navigate to="/" />}></Route>
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/landing"
            element={!user ? <Landing /> : <Navigate to="/" />}
          ></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/avatar" element={<Avatar />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
