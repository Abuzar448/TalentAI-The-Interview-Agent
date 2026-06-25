import React from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { useSelector } from "react-redux";

const App = () => {
  const { userData } = useSelector((state) => state.user);
  return (
    <Routes>
      <Route path="/" element={userData? <Home /> : <Navigate to={'/signin'}/>} />
      <Route path="/signup" element={!userData ? <SignUp /> : <Navigate to={'/'}/>} />
      <Route path="/signin" element={!userData ? <SignIn /> : <Navigate to={'/'}/>} />
    </Routes>
  );
};

export default App;
