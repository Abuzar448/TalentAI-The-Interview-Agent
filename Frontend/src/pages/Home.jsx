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

  const process = [
    {
      icon: <BsRobot size={24}></BsRobot>,
      step: "Step 1",
      title: "Role & Experience Selection",
      desc: "AI adjusts difficulty based on selection job role.",
    },
    {
      icon: <BsMic size={24}></BsMic>,
      step: "Step 2",
      title: "Smart Voice Interview",
      desc: "Dynamic follow-up questions based on your answers.",
    },
    {
      icon: <BsClock size={24}></BsClock>,
      step: "Step 3",
      title: "Timer Based Simulation",
      desc: "Real interview pressure with time tracking",
    },
  ];

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
              onClick={() => navigate("/interview")}
            >
              Start Interview
            </motion.button>
            <motion.button
              whileHover={{ opacity: 0.9, scale: 1.03 }}
              whileTap={{ opacity: 1, scale: 0.98 }}
              className="text-gray-800 px-10 py-3 rounded-full border-1 border-gray-300 cursor-pointer"
              onClick={() => navigate("/history")}
            >
              Interview History
            </motion.button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-10 mb-28">
          {process.map((item, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 + idx*0.2 }}
              whileHover={{ rotate: 0, scale: 1.06 }}
              key={idx}
              className={`relative bg-white rounded-3xl border-2 border-green-100 hover:border-green-500 px-10 py-8 w-80 max-w-[90%] cursor-pointer shadow-md hover:shadow-2xl transition-all ${idx === 0 ? "rotate-[-4deg]" : ""} ${idx === 1 ? "rotate-[3deg] md:-mt-6 shadow-xl" : ""} ${idx === 2 ? "rotate-[-3deg]" : ""}`}
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white border-2 border-green-500 text-green-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg">
                {item.icon}
              </div>

              <div className="pt-10 text-center">
                <div className="text-xs text-green-600 font-semibold mb-2 tracking-wider">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-3 text-lg">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
