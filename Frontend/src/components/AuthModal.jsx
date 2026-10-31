import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import SignIn from '../pages/SignIn';

const AuthModal = ({ onClose }) => {
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (userData) {
      onClose();
    }
  }, [userData, onClose]);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-md px-4 py-6 overflow-y-auto scrollbar-none">
        <div 
          className="fixed inset-0" 
          onClick={onClose} 
          aria-hidden="true"
        />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-4xl z-10 my-auto"
        >
          {/* Close Button */}
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 z-30 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:text-black hover:bg-gray-200 transition-all cursor-pointer shadow-sm"
            aria-label="Close Modal"
          >
            <FaTimes size={16} />
          </button>

          <SignIn isModal={true} />
          
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;