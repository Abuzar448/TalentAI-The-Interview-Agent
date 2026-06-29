import React from "react";
import { motion } from "framer-motion";
import axios from 'axios';
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

  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [resumeText, setResumeText] = useState("");

  const resumeInput = useRef(null);

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
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200 px-4 py-8"
    >
      <div className="w-full max-w-5xl bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] grid md:grid-cols-12 overflow-hidden border border-slate-100">
        
        {/* Left Informational Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="md:col-span-5 relative bg-gradient-to-br from-green-50 via-green-100/60 to-emerald-50 p-8 md:p-12 flex flex-col justify-center overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-200/20 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 tracking-tight leading-tight">
            Start Your {" "}
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent font-black block mt-1">
              AI Interview
            </span>
          </h2>
          <p className="text-gray-600 mb-10 text-sm leading-relaxed font-medium">
            Practice real-world interview scenarios powered by AI. Improve communication, technical skills, and confidence.
          </p>
          <div className="space-y-4">
            {steps.map((item, idx) => (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.12 }}
                whileHover={{ scale: 1.02, x: 4 }}
                key={idx}
                className="flex items-center space-x-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-green-100/50 group"
              >
                <div className="p-2.5 rounded-lg bg-green-50 text-green-600 transition-colors group-hover:bg-green-600 group-hover:text-white">
                  {item.icon}
                </div>
                <span className="text-gray-700 font-semibold tracking-wide text-sm">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Form Setup Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.82 }}
          className="p-8 md:p-12 md:col-span-7 bg-white flex flex-col justify-center"
        >
          <h2 className="text-2xl font-extrabold text-gray-800 mb-6 tracking-tight">
            Interview Setup
          </h2>
          <div className="space-y-5">
            <div className="relative group">
              <FaUserTie className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors" />
              <input
                type="text"
                placeholder="Enter Role (e.g., Full Stack Developer)"
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all placeholder:text-gray-400 text-gray-700 font-medium"
                onChange={(e) => setRole(e.target.value)}
                value={role}
              />
            </div>

            <div className="relative group">
              <FaBriefcase className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors" />
              <input
                type="text"
                placeholder="Experience (e.g., Fresher, 2 Years)"
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all placeholder:text-gray-400 text-gray-700 font-medium"
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
              />
            </div>

            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all font-semibold text-gray-600 cursor-pointer"
            >
              <option value="" disabled hidden>Select Interview Type</option>
              <option value="Technical">Technical Interview</option>
              <option value="HR">HR Interview</option>
            </select>

            {!analysisDone && (
              <motion.div
                onClick={() => resumeInput.current.click()}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -1 }}
                className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center cursor-pointer hover:border-green-500 hover:bg-green-50/30 transition-all duration-300 relative group"
              >
                <FaFileUpload className="text-3xl mx-auto text-green-600 mb-2 transition-transform group-hover:-translate-y-0.5" />
                <input
                  type="file"
                  accept="application/pdf"
                  ref={resumeInput}
                  id="resume_upload"
                  className="hidden"
                  onChange={(e) => setResumeFile(e.target.files[0])}
                />
                <p className="font-semibold text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                  {resumeFile ? resumeFile.name : "Click to upload resume"}
                </p>
                {resumeFile && (
                  <motion.button
                    onClick={(e)=>{e.stopPropagation(),handleResumeAnalyzing()}}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4 bg-gray-900 text-white text-xs font-bold tracking-wide px-5 py-2.5 rounded-xl hover:bg-gray-800 transition shadow-sm cursor-pointer" // Added cursor-pointer
                  >
                    {analyzing ? "Analyzing..." : "Analyze Resume"}
                  </motion.button>
                )}
              </motion.div>
            )}

            {/* Analysis Matrix Yield View */}
            {analysisDone && (
              <motion.div 
                initial={{opacity:0, y:15}} 
                animate={{opacity:1, y:0}} 
                className="bg-slate-50/80 border border-slate-100 rounded-2xl p-5 space-y-4 max-h-[220px] overflow-y-auto"
              >
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Resume Profile Artifacts</h3>
                
                {projects.length > 0 && (
                  <div className="text-xs">
                    <p className="font-bold text-gray-700 mb-1">Extracted Projects:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1 pl-1">
                      {projects.map((p,idx)=>(<li key={idx} className="truncate">{p}</li>))}
                    </ul>
                  </div>
                )}

                {skills.length > 0 && (
                  <div className="text-xs">
                    <p className="font-bold text-gray-700 mb-1.5">Identified Skills:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.map((s,idx)=>(
                        <span key={idx} className="bg-green-50 text-green-700 border border-green-100/60 px-2.5 py-1 rounded-md font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            <motion.button
              disabled={!role || !experience}
              whileHover={{ scale: !role || !experience ? 1 : 1.015 }}
              whileTap={{ scale: !role || !experience ? 1 : 0.985 }}
              className="w-full disabled:bg-slate-200 disabled:text-gray-400 disabled:cursor-not-allowed bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3.5 rounded-xl text-base font-bold tracking-wide transition-all duration-300 shadow-sm text-center cursor-pointer"
            >
              Start Interview
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Step1Setup;