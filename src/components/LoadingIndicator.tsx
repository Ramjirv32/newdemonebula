import { useEffect } from "react"
import { useLoading } from "../context/LoadingContext"
import { motion } from "framer-motion"

const LoadingIndicator = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
};

export default LoadingIndicator;