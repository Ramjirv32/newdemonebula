import { useEffect } from "react"
import { useLoading } from "../context/LoadingContext"
import { motion } from "framer-motion"

export const LoadingIndicator = () => {
  const { loading } = useLoading()
  
  return (
    <>
      {/* Top loading bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 z-50"
        initial={{ scaleX: 0, transformOrigin: "left" }}
        animate={{ 
          scaleX: loading ? [0, 0.5, 0.8, 0.9] : 1,
          opacity: loading ? 1 : 0
        }}
        transition={{
          duration: loading ? 2 : 0.2,
          ease: "easeInOut",
          times: loading ? [0, 0.4, 0.7, 0.9] : [0, 1]
        }}
        onAnimationComplete={() => {
          if (!loading) {
            // Reset the animation state after it completes
          }
        }}
      />
      
      {/* Full screen overlay for longer loads */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center z-40"
        >
          <div className="relative">
            {/* Nebula-like animated background */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 opacity-30">
                {/* Animated dots and balls container */}
                <div className="absolute inset-0 overflow-hidden">
                  {/* Floating balls */}
                  <div className="floating-ball w-16 h-16 rounded-full bg-blue-600/30 absolute top-[15%] left-[20%] blur-md"></div>
                  <div className="floating-ball delay-1 w-12 h-12 rounded-full bg-purple-500/30 absolute top-[35%] right-[25%] blur-md"></div>
                  <div className="floating-ball delay-2 w-20 h-20 rounded-full bg-blue-800/30 absolute bottom-[20%] left-[35%] blur-md"></div>
                </div>
              </div>
            </div>
            
            <div className="p-8 rounded-2xl flex flex-col items-center">
              {/* Spinning logo */}
              <div className="w-16 h-16 mb-6 relative">
                <div className="absolute inset-0 rounded-full border-4 border-blue-500/20"></div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 text-3xl font-bold text-blue-500">N</div>
                </div>
              </div>
              <p className="text-white text-lg font-medium">Loading...</p>
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
}