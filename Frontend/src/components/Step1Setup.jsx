import React from "react";
import { motion } from "framer-motion";
import axios from 'axios';
import {
  FaUserTie,
  FaBriefcase,
  FaFileUpload,
  FaMicrophoneAlt,
  FaChartLine,
  FaFile,
} from "react-icons/fa";
import { useState } from "react";
import { useRef } from "react";

const Step1Setup = ({ onStart }) => {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [mode, setMode] = useState("");

  const [resumeFile, setResumeFile] = useState("");
  const [analysisDone, setAnalysisDone] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [resumeText, setResumeText] = useState("");

  const resumeInput = useRef(null);

  const steps = [
    {
      icon: <FaUserTie className="text-green-600 text-xl" />,
      text: "Choose Role & Experience",
    },
    {
      icon: <FaMicrophoneAlt className="text-green-600 text-xl" />,
      text: "Smart Voice Interview",
    },
    {
      icon: <FaChartLine className="text-green-600 text-xl" />,
      text: "Performance Analytics.",
    },
  ];

  const handleResumeAnalyzing = async()=>{
    if(!resumeFile || analyzing) return;
    setAnalyzing(true);

    const formData = new FormData();
    formData.append('resume',resumeFile);

    try {
      const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/interview/resume`,formData,{withCredentials:true});

      console.log(result.data);
      setRole(result.data.role || '');
      setExperience(result.data.experience || '');
      setProjects(result.data.projects || []);
      setSkills(result.data.skills || []);
      setResumeText(result.data.resumeText || '');
      setAnalysisDone(true);

      setAnalyzing(false);

    } catch (error) {
      console.log(error);
      setAnalyzing(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.62 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4"
    >
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden scale-90">
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative bg-gradient-to-br from-green-50 to-green-100 p-12 flex flex-col justify-center"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Start Your {" "}
            <span className="font-bold text-green-600 text-5xl">
              AI Interview{" "}
            </span>
          </h2>
          <p className="text-gray-600 mb-10">
             Practice real-world interview scenarios powered by AI.
            improve  communication, technical skills, and confidence.
          </p>
          <div className="space-y-5">
            {steps.map((item, idx) => (
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.15 }}
                whileHover={{ scale: 1.03 }}
                key={idx}
                className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-sm cursor-pointer"
              >
                 {item.icon}
                <span className="text-gray-700 font-semibold">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.82 }}
          className="p-12 bg-white"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Interview SetUp 
          </h2>
          <div className="space-y-6">
            <div className="relative">
              <FaUserTie className="absolute top-4 left-4 text-gray-400" />
              <input
                type="text"
                placeholder="Enter Role"
                className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
                onChange={(e) => setRole(e.target.value)}
                value={role}
              />
            </div>
            <div className="relative">
              <FaBriefcase className="absolute top-4 left-4 text-gray-400" />
              <input
                type="text"
                placeholder="Experience"
                className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
              />
            </div>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
            >
              <option value="Technical">Technical Interview</option>
              <option value="HR">HR Interview</option>
            </select>
            {!analysisDone && (
              <motion.div
                onClick={() => resumeInput.current.click()}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="border-2 border-dashed border-gray-300 rounded-3xl p-8 text-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition"
              >
                <FaFileUpload className="text-4xl mx-auto text-green-600 mb-3" />
                <input
                  type="file"
                  accept="application/pdf"
                  ref={resumeInput}
                  id="resume_upload"
                  className="hidden"
                  onChange={(e) => setResumeFile(e.target.files[0])}
                />
                <p className="font-medium text-gray-600">
                  {resumeFile ? resumeFile.name : "Click to upload resume"}
                </p>
                {resumeFile && (
                  <motion.button
                  onClick={(e)=>{e.stopPropagation(),handleResumeAnalyzing()}}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4 bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
                  >
                    {analyzing ? "Analyzing..." : "Analyze Resume"}
                  </motion.button>
                )}
              </motion.div>
            )}
            <motion.button
              disabled={!role || !experience}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="w-full disabled:bg-gray-600 bg-green-600 hover:bg-green-700 text-white py-3 rounded-full text-lg font-semibold transition duration-300 shadow-md text-center cursor-pointer"
            >Start Interview
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Step1Setup;
