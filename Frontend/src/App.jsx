import React from "react";
import { Navigate, Route, Router, Routes, useNavigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import getCurrentUser from "./hooks/getCurrentUser";
import Step1Setup from "./components/Step1Setup";
import InterviewPage from "./pages/InterviewPage";

const App = () => {

  getCurrentUser();

  const { userData } = useSelector((state) => state.user);

  return (
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/signin" element={!userData? <SignIn/> : <Navigate to={'/'}/>}></Route>
      <Route path="/signup" element={!userData? <SignUp/> : <Navigate to={'/'}/>}></Route>
      <Route path="/interview" element={userData? <InterviewPage/> : <Navigate to={'/'}/>}></Route>
      {/* <Route path="/" element={userData? <Home /> : <Navigate to={'/signin'}/>} />
      <Route path="/signup" element={!userData ? <SignUp /> : <Navigate to={'/'}/>} />
      <Route path="/signin" element={!userData ? <SignIn /> : <Navigate to={'/'}/>} />
      <Route path="/interview" element={userData ? <Step1Setup /> : <Navigate to={'/'}/>} /> */}
    </Routes>
  );
};

export default App;