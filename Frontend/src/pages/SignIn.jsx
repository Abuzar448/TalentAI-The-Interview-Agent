import React, { useState } from "react";
import { RiRobot3Fill } from "react-icons/ri";
import { IoSparkles } from "react-icons/io5";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";

const SignIn = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/google-auth`,
        {
          name: response.user.displayName,
          email: response.user.email,
        },
        {withCredentials:true}
      );
      dispatch(setUserData(result.data));

      console.log("Google SignIn Success",result.data);
    } catch (error) {
      if (error.response) {
      console.error("Google Auth Backend Error:", error.response.data.message);
    } else {
      console.error("Network Error:", error.message);
    }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/signIn`,
        {
          username,
          password,
        },
        {withCredentials:true}
      );
      dispatch(setUserData(result.data));
      setUserName("");
      setPassword("");
      console.log(result.data.message);
      console.log(result.data);
    } catch (error) {
      if(error.response){
        console.error("Backend Error Message:", error.response.data.message);
      }else{
        console.error("Network Error:", error.message);
      }
      
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f3f3f3] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl border border-gray-100 overflow-hidden grid grid-cols-1 md:grid-cols-2"
      >
        <div className="p-8 sm:p-12 flex flex-col justify-center order-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            SignIn
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                required
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter UserName"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all text-sm"
              />
            </div>

            <motion.button
              whileHover={{ opacity: 0.9, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full mt-2 text-white bg-black py-3 rounded-xl font-medium shadow-md cursor-pointer text-sm transition-all text-center"
            >
              Sign In
            </motion.button>
          </form>

          <p className="text-xs text-center text-gray-500 mt-4">
            New to TalentAI Platform?{" "}
            <a className="text-black font-semibold underline cursor-pointer" onClick={()=>navigate('/signup')}>
              Sign Up
            </a>
          </p>
        </div>

        <div className="bg-gray-50 p-8 sm:p-12 flex flex-col justify-center items-center border-t md:border-t-0 md:border-l border-gray-100 order-2">
          {/* Logo and Name */}
          <div className="flex items-center justify-center gap-3 mb-6 font-semibold">
            <div className="bg-black text-white p-2 rounded-lg">
              <RiRobot3Fill size={20} />
            </div>
            <h2 className="text-[18px] text-gray-900">
              TalentAI: Interview Agent
            </h2>
          </div>

          <h1 className="text-2xl lg:text-3xl font-semibold text-center leading-snug mb-4 text-gray-900">
            Continue with{" "}
            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full inline-flex items-center gap-2 text-base lg:text-lg whitespace-nowrap mt-2 md:mt-0">
              <IoSparkles size={18} />
              AI Smart Interview
            </span>
          </h1>

          <p className="text-gray-500 text-center text-sm leading-relaxed max-w-sm mb-8">
            Sign In to re-start AI-Powered Mock Interviews, track your progress,
            and unlock detailed performance insights.
          </p>

          <div className="w-full flex items-center justify-center gap-2 mb-6 md:hidden">
            <div className="h-[1px] bg-gray-200 flex-1"></div>
            <span className="text-xs text-gray-400 uppercase">Or</span>
            <div className="h-[1px] bg-gray-200 flex-1"></div>
          </div>

          <motion.button
            whileHover={{ opacity: 0.9, scale: 1.02 }}
            whileTap={{ scale: 1 }}
            transition={{ duration: 0.2 }}
            type="button"
            className="w-[80%] max-w-sm h-12 flex items-center justify-center text-black rounded-xl shadow-lg bg-[white] py-3 gap-3 cursor-pointer text-sm font-medium"
            onClick={handleGoogleAuth}
          >
            <FcGoogle size={20} />
            Continue with Google
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;
