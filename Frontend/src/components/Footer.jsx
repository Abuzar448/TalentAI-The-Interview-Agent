import React from 'react';
import { BsRobot } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className="w-full bg-[#f3f3f3] flex justify-center px-4 py-8">
      <div className="w-full max-w-6xl bg-white rounded-[24px] shadow-sm border border-gray-200/80 py-8 px-6 text-center">
        
        <div className="flex justify-center items-center gap-3 mb-3">
          <div className="bg-black text-white p-2 rounded-xl flex items-center justify-center shadow-inner">
            <BsRobot size={18} />
          </div>
          <h2 className="font-semibold text-gray-900 tracking-tight">
            talentAI: Interview Agent
          </h2>
        </div>

        <p className="text-gray-500 text-sm max-w-xl mx-auto leading-relaxed">
          AI-Powered interview preparation platform designed to improve communication skills, technical depth, and professional confidence.
        </p>

      </div>
    </footer>
  );
};

export default Footer;