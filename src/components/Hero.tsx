import { ArrowDown, Home, Search, FileText, Plus, Settings, ChevronRight, MessageSquare } from "lucide-react";
import { FloatingElements } from "./FloatingElements";
import { useState, useEffect } from "react";

// Enhanced infinite typewriter effect hook
const useInfiniteTypewriter = (phrases: string[], typingSpeed = 100, eraseSpeed = 50, pauseDelay = 1500) => {
  const [displayText, setDisplayText] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];

    if (isPaused) {
      // Pause before starting to erase
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsTyping(false);
      }, pauseDelay);
      
      return () => clearTimeout(pauseTimer);
    }

    if (isTyping) {
      // Typing phase
      if (charIndex < currentPhrase.length) {
        const timer = setTimeout(() => {
          setDisplayText(prev => prev + currentPhrase.charAt(charIndex));
          setCharIndex(prev => prev + 1);
        }, typingSpeed);
        
        return () => clearTimeout(timer);
      } else {
        // Finished typing, pause before erasing
        setIsPaused(true);
      }
    } else {
      // Erasing phase
      if (displayText.length > 0) {
        const timer = setTimeout(() => {
          setDisplayText(prev => prev.slice(0, -1));
        }, eraseSpeed);
        
        return () => clearTimeout(timer);
      } else {
        // Finished erasing, move to next phrase
        setIsTyping(true);
        setCharIndex(0);
        setCurrentPhraseIndex(prev => (prev + 1) % phrases.length);
      }
    }
  }, [charIndex, displayText, isTyping, isPaused, currentPhraseIndex, phrases, typingSpeed, eraseSpeed, pauseDelay]);

  return { displayText, isTyping, isPaused };
};

export const Hero = () => {
  // Array of phrases to cycle through
  const phrases = [
    "Hi, I'm Nebulx",
    "I can help with coding tasks",
    "Let's create something amazing",
    "AI at your service"
  ];
  
  const { displayText, isTyping, isPaused } = useInfiniteTypewriter(phrases, 100, 50, 1500);

  // Add this function to handle scrolling to features
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-slate-950/70 z-10"></div> {/* Overlay to ensure text readability */}
        <img 
          src="/img/two.gif" 
          alt="" 
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      <FloatingElements />
      
      {/* Keep some of the decorative elements for additional depth */}
      <div className="absolute top-20 left-[10%] w-96 h-96 bg-purple-600/10 rounded-full blur-3xl z-20"></div>
      <div className="absolute bottom-20 right-[5%] w-80 h-80 bg-blue-600/10 rounded-full blur-3xl z-20"></div>
      
      {/* Left floating menu */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 bg-slate-800/80 backdrop-blur-md rounded-full py-3 px-4 shadow-lg shadow-purple-900/20 border border-slate-700/50 hidden md:flex z-30 animate-bounce">
        <div className="flex flex-col space-y-6">
          <button className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-full transition-all">
            <Home className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-full transition-all">
            <FileText className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-full transition-all">
            <MessageSquare className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-full transition-all">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Right floating menu */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-slate-800/80 backdrop-blur-md rounded-full py-3 px-4 shadow-lg shadow-purple-900/20 border border-slate-700/50 hidden md:block z-30">
        <div className="flex items-center space-x-6">
          <button className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-full transition-all">
            <Home className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-full transition-all">
            <FileText className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-full transition-all">
            <Search className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-full transition-all">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Light beam effect - keep this for additional visual interest */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-96 bg-gradient-to-b from-purple-500/20 to-transparent blur-2xl z-20"></div>
      
      {/* Main content */}
      <div className="relative z-30 text-center max-w-4xl mx-auto font-sans">
        <div className="mb-8">
          <span className="inline-block px-4 py-2 bg-slate-800/50 border border-purple-700/50 rounded-full text-sm text-slate-300 mb-6 backdrop-blur-sm">
            [ GET STARTED WITH NebulX ]
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-pulse">
          Explore the Possibilities
          <br />
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
            of AI Chatting with Nebulx
          </span>
        </h1>
        
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Unleash the power of AI within StarForge. Upgrade your productivity with 
          Nebulx, the open AI chat app.
        </p>
        
        <button 
          onClick={scrollToFeatures}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 text-lg shadow-lg shadow-purple-900/30"
        >
          GET STARTED
        </button>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center">
            <span className="text-sm text-slate-400 mb-2">Scroll down</span>
            <ArrowDown className="w-5 h-5 text-purple-500" />
          </div>
        </div>

        <div className="mt-16">
          <div className="relative rounded-2xl p-8 max-w-4xl mx-auto backdrop-blur-sm bg-gradient-to-br from-purple-900/30 to-blue-900/20 border border-purple-700/20 shadow-xl shadow-purple-900/10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="text-3xl font-bold">Need Any Help ?...</div>
                <img src="/img/robo.png" className="rounded-lg shadow-lg shadow-purple-900/20" alt="AI Robot" />
              </div>
              
              {/* Enhanced infinite typewriter text */}
              <div className="text-left md:max-w-md">
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent min-h-[32px]">
                  {displayText}
                  <span className={`animate-pulse`}>|</span>
                </h3>
                <p className="text-slate-200 text-lg mb-4">
                  Go through my works and explore the possibilities of AI chatting
                </p>
                <button 
                  onClick={scrollToFeatures}
                  className="px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-lg text-white font-medium transition-all rounded-xl"
                >
                  Explore Now →
                </button>
              </div>
            </div>
          </div>
          
          {/* Keep existing badge */}
          <div className="absolute top-4 right-4 flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 px-3 py-1 rounded-full shadow-lg shadow-purple-900/30">
            <ArrowDown className="w-4 h-4" />
            <span className="text-sm">Code generation</span>
            <div className="flex -space-x-1">
              <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white"></div>
              <div className="w-6 h-6 bg-purple-500 rounded-full border-2 border-white"></div>
              <div className="w-6 h-6 bg-violet-400 rounded-full border-2 border-white"></div>
            </div>
            <span className="text-xs text-slate-200">1m ago</span>
          </div>
        </div>
      </div>
    </section>
  );
};
