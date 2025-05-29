import { motion } from "framer-motion";
import { useLoading } from "../context/LoadingContext";

const LoadingSpinner = () => {
  const { loading } = useLoading();
  
  if (!loading) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="relative">
        {/* Star logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center"
        >
          <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
          </svg>
        </motion.div>
        
        {/* Animated spinner - removed "repeat: Infinity" */}
        <motion.div
          className="absolute inset-0 border-4 border-transparent rounded-lg"
          style={{ borderTopColor: '#a855f7', borderRightColor: '#3b82f6' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, ease: "linear" }}
        ></motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingSpinner;