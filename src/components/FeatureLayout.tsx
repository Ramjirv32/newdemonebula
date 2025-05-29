import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedPage from "./AnimatedPage";

type FeatureLayoutProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  children: React.ReactNode;
  backgroundImage?: string; // New prop for background image
};

const FeatureLayout = ({ title, description, icon, color, children, backgroundImage }: FeatureLayoutProps) => {
  return (
    <AnimatedPage>
      <div className="min-h-screen bg-slate-950 text-white">
        {/* Header with back button */}
        <div className="bg-slate-900 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link to="/#features" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Features</span>
            </Link>
          </div>
        </div>
        
        {/* Feature Hero */}
        <div className={`bg-gradient-to-r ${color} py-24 px-6 relative overflow-hidden`}>
          {/* Background effect */}
          <div className="absolute inset-0 bg-[url('/img/grid-pattern.png')] opacity-10"></div>
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-950 to-transparent"></div>
          
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl">
                {icon}
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
            <p className="text-xl text-white/80 max-w-2xl">{description}</p>
          </div>
        </div>
        
        {/* Content */}
        <div className="relative">
          {/* Full-screen background image (only on desktop) */}
          {backgroundImage && (
            <div className="hidden lg:block absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/90 to-slate-950"></div>
              <img 
                src={backgroundImage} 
                alt="Background" 
                className="w-full h-full object-cover opacity-40"
              />
            </div>
          )}
          
          <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
            {children}
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default FeatureLayout;