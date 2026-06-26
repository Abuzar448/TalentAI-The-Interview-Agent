import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { BsCoin } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { RiRobot3Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setUserData } from "../redux/userSlice.js";

const Navbar = () => {
  const { userData } = useSelector((state) => state.user);
  const [creditPopUp, setCreditPopUp] = useState(false);
  const [userPopUp, setUserPopUp] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const creditRef = useRef(null);
  const userRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (creditRef.current && !creditRef.current.contains(event.target)) {
        setCreditPopUp(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setUserPopUp(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    if (isLoggingOut) return;
    try {
      setIsLoggingOut(true);
      
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signOut`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      setCreditPopUp(false);
      setUserPopUp(false);

      navigate("/signin", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!userData) return null;

  return (
    <div className="bg-[#f3f3f3] flex justify-center px-4 py-6 select-none">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-6xl bg-white rounded-[24px] shadow-sm border border-gray-200 px-8 py-4 flex justify-between items-center"
      >
        {/* Logo Section */}
        <div onClick={() => navigate("/")} className="flex items-center gap-3 cursor-pointer group">
          <div className="bg-black text-white p-2 rounded-xl transition group-hover:scale-105">
            <RiRobot3Fill size={20} />
          </div>
          <h1 className="font-semibold hidden md:block text-black tracking-tight">
            TalentAI: <span className="text-gray-500 font-normal">Interview Agent</span>
          </h1>
        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-4 relative">
          {/* Credits Container */}
          <div className="relative" ref={creditRef}>
            <button
              onClick={() => {
                setCreditPopUp(!creditPopUp);
                setUserPopUp(false);
              }}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full font-medium text-sm transition cursor-pointer"
            >
              <BsCoin size={18} className="text-amber-500" />
              <span>{userData?.credits ?? 0}</span>
            </button>

            <AnimatePresence>
              {creditPopUp && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="absolute right-0 mt-3 w-64 bg-white shadow-xl border border-gray-100 rounded-2xl p-5 z-50"
                >
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                    Need more credits to continue live mock interviews?
                  </p>
                  <button
                    onClick={() => {
                      setCreditPopUp(false);
                      navigate("/pricing");
                    }}
                    className="w-full bg-black hover:bg-zinc-800 text-white py-2.5 rounded-xl text-sm font-medium transition cursor-pointer"
                  >
                    Buy more credits
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Profile Container */}
          <div className="relative" ref={userRef}>
            <button
              onClick={() => {
                setUserPopUp(!userPopUp);
                setCreditPopUp(false);
              }}
              className="w-9 h-9 bg-black text-white rounded-full flex items-center justify-center font-semibold border-2 border-transparent hover:border-black transition shadow-sm cursor-pointer"
            >
              {userData?.name?.slice(0, 1).toUpperCase()}
            </button>

            <AnimatePresence>
              {userPopUp && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="absolute right-0 mt-3 w-56 bg-white shadow-xl border border-gray-200/60 rounded-2xl p-3 z-50 flex flex-col gap-1"
                >
                  <div className="px-3 py-2 border-b border-gray-100 mb-1">
                    <p className="text-xs text-gray-400 font-medium">Logged in as</p>
                    <p className="text-sm font-semibold text-black truncate">{userData?.name}</p>
                  </div>

                  <button
                    onClick={() => {
                      setUserPopUp(false);
                      navigate("/history");
                    }}
                    className="w-full text-left text-sm px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-xl transition cursor-pointer"
                  >
                    Interview History
                  </button>

                  <button
                    disabled={isLoggingOut}
                    onClick={handleSignOut}
                    className="flex justify-center items-center w-full bg-red-50 hover:bg-red-100 text-red-600 transition py-2.5 mt-2 rounded-xl text-sm cursor-pointer gap-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoggingOut ? "Logging out..." : "Logout"}
                    {!isLoggingOut && <HiOutlineLogout size={18} />}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Navbar;