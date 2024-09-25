import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import TaskDetails from "./components/TaskDetails";

const App = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <Toaster />
      <Router>
        <div className="App">
          {isLoggedIn && <Navbar />}
          <Routes>
            {isLoggedIn ? (
              <>
                <Route path="/tasks/:id" element={<TaskDetails />} />
                <Route path="/tasklist" element={<TaskList />} />
                <Route path="/taskform" element={<TaskForm />} />
                <Route path="/userprofile" element={<UserProfile />} />
              </>
            ) : (
              <>
                <Route path="/" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
              </>
            )}
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
