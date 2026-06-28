import React from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText,
} from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-[#f3f3f3] flex flex-col">
      <Navbar></Navbar>
      <div className="flex-1 px-6 py-10">
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 text-gray-600 text-sm px-4 py-2 rounded-full flex items-center gap-2">
            <HiSparkles size={16} className="bg-green-50 text-green-600" />
            AI Powered Smart Interview Platform
          </div>
        </div>
        <div className="text-center mb-28">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="text-4xl md:text-6xl max-w-6xl font-semibold mx-auto"
          >
            Practice Interview With <br />
            <span className="relative inline-block mt-5">
              <span className="bg-green-100 text-green-600 px-5 py-1 rounded-full">
                AI Intelligence
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-gray-500 mt-6 max-w-2xl mx-auto text-lg "
          >
            Role-based mock interview with smart follow-ups, adaptive difficulty
            and real-time performance evaluation.
          </motion.p>

          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <motion.button
              whileHover={{ opacity: 0.9, scale: 1.03 }}
              whileTap={{ opacity: 1, scale: 0.98 }}
              className="bg-black text-white px-10 py-3 rounded-full shadow-md cursor-pointer"
              onClick={()=>navigate("/interview")}
            >
              Start Interview
            </motion.button>
            <motion.button
              whileHover={{ opacity: 0.9, scale: 1.03 }}
              whileTap={{ opacity: 1, scale: 0.98 }}
              className="text-gray-800 px-10 py-3 rounded-full border-1 border-gray-300 cursor-pointer"
              onClick={()=>navigate("/history")}
            >
              Interview History
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
