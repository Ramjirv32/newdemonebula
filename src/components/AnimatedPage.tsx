import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useLoading } from "../context/LoadingContext";
import LoadingSpinner from "./LoadingSpinner";

type AnimatedPageProps = {
  children: React.ReactNode;
};

const AnimatedPage = ({ children }: AnimatedPageProps) => {
  const { pathname } = useLocation();
  // const { isLoading } = useLoading();
  
  // Determine direction based on pathname
  const direction = pathname === "/signin" ? -1 : 1;
  
 
  
  return (
    <motion.div
      key={pathname}
      initial={{ x: direction * 1000, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: direction * -1000, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 50,
        damping: 15
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;