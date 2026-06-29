import React from "react";
import { motion } from "framer-motion";
import {
  FaUserTie,
  FaBriefcase,
  FaFileUpload,
  FaMicrophoneAlt,
  FaChartLine,
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

  const resumeInput = useRef(false);

  const steps = [
    {
      icon: <FaUserTie className="text-xl" />,
      text: "Choose Role & Experience",
    },
    {
      icon: <FaMicrophoneAlt className="text-xl" />,
      text: "Smart Voice Interview",
    },
    {
      icon: <FaChartLine className="text-xl" />,
      text: "Performance Analytics",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.62 }}
      className="min-h-screen md:max-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200 px-4 py-12"
    >
      <div className="w-full max-w-5xl md:scale-80 bg-white rounded-[32px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.08)] grid md:grid-cols-12 overflow-hidden border border-slate-100">
        
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative md:col-span-5 bg-gradient-to-br from-green-50 via-green-100/70 to-emerald-50 p-8 md:p-12 flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-200/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 my-auto">
            <h2 className="text-3xl md:text-4xl font-black text-gray-800 tracking-tight mb-4 leading-tight">
              Start Your{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent block mt-1 font-extrabold text-4xl md:text-5xl">
                AI Interview
              </span>
            </h2>
            <p className="text-gray-600 mb-10 text-sm md:text-base leading-relaxed font-medium">
              Practice real-world interview scenarios powered by AI. Improve
              communication, technical skills, and confidence.
            </p>

            <div className="space-y-4">
              {steps.map((item, idx) => (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.12, ease: "easeOut" }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  key={idx}
                  className="flex items-center space-x-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-green-100/50 group"
                >
                  <div className="p-2.5 rounded-lg bg-green-50 text-green-600 transition-colors group-hover:bg-green-600 group-hover:text-white">
                    {item.icon}
                  </div>
                  <span className="text-gray-700 font-semibold tracking-wide text-sm">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.82, ease: "easeOut" }}
          className="p-8 md:p-12 md:col-span-7 bg-white flex flex-col justify-center"
        >
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 tracking-tight">
              Interview Setup
            </h2>
            <p className="text-gray-400 text-sm mt-1">Configure your deployment targets</p>
          </div>

          <div className="space-y-5">
            <div className="relative group">
              <FaUserTie className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors" />
              <input
                type="text"
                placeholder="Enter Target Role (e.g., MERN Developer)"
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-200/80 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all placeholder:text-gray-400 text-gray-700 font-medium shadow-inner"
                onChange={(e) => setRole(e.target.value)}
                value={role}
              />
            </div>

            <div className="relative group">
              <FaBriefcase className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors" />
              <input
                type="text"
                placeholder="Experience (e.g., 2 Years, Fresher)"
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-200/80 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all placeholder:text-gray-400 text-gray-700 font-medium shadow-inner"
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
              />
            </div>

            <div className="relative">
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200/80 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all font-semibold text-gray-600 cursor-pointer appearance-none shadow-inner"
              >
                <option value="Technical">Technical Interview</option>
                <option value="HR">Behavioral HR Interview</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                ▼
              </div>
            </div>

            {!analysisDone && (
              <motion.div
                onClick={() => resumeInput.current.click()}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
                className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center cursor-pointer hover:border-green-500 hover:bg-green-50/40 transition-all duration-300 relative group"
              >
                <FaFileUpload className="text-3xl mx-auto text-green-600/80 group-hover:text-green-600 mb-2 transition-transform group-hover:-translate-y-1" />
                <input
                  type="file"
                  accept="application/pdf"
                  ref={resumeInput}
                  id="resume_upload"
                  className="hidden"
                  onChange={(e) => setResumeFile(e.target.files[0])}
                />

                <p className="font-semibold text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                  {resumeFile ? resumeFile.name : "Click to upload resume."}
                </p>
                <p className="text-xs text-gray-400 mt-1">Accepts strictly .pdf files</p>

                {resumeFile && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-4 inline-flex items-center justify-center bg-gray-900 text-white text-xs font-bold tracking-wide px-5 py-2.5 rounded-xl hover:bg-gray-800 shadow-sm transition"
                  >
                    {analyzing ? (
                      <span className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                        Parsing Target Matrix...
                      </span>
                    ) : (
                      "Execute Resume Processing"
                    )}
                  </motion.div>
                )}
              </motion.div>
            )}

            <motion.button
              disabled={!role || !experience}
              whileHover={{ scale: !role || !experience ? 1 : 1.015 }}
              whileTap={{ scale: !role || !experience ? 1 : 0.985 }}
              className="w-full disabled:bg-slate-200 disabled:text-gray-400 disabled:cursor-not-allowed bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3.5 rounded-xl text-base font-bold tracking-wide transition-all duration-300 shadow-[0_8px_20px_-6px_rgba(16,185,129,0.3)] text-center cursor-pointer mt-2"
            >
              Initialize Engine
            </motion.button>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default Step1Setup;