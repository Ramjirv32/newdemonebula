import { useState, useEffect } from "react"
import type React from "react"
import { Check, Play, BarChart3, RotateCcw, Rss, Shuffle } from "lucide-react"
import { useNavigate } from "react-router-dom" // Add this import
import robotImage from "../assets/robot-ai.jpg" // Update path as needed

const GenerativeAIHero: React.FC = () => {
  // Add navigate hook
  const navigate = useNavigate()
  
  const phrases = [
    "Generative AI made for creators.",
    "AI solutions that inspire innovation.",
    "Next-gen AI for the digital future.",
    "Transforming ideas with AI power."
  ]
  
  const [currentText, setCurrentText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  
  useEffect(() => {
    const phrase = phrases[currentIndex]
    
    // Typing effect
    if (isTyping) {
      if (currentText.length < phrase.length) {
        const timeout = setTimeout(() => {
          setCurrentText(phrase.substring(0, currentText.length + 1))
        }, 100) // Typing speed
        return () => clearTimeout(timeout)
      } else {
        // Pause at the end of typing before starting to delete
        const timeout = setTimeout(() => {
          setIsTyping(false)
        }, 2000) // Pause time
        return () => clearTimeout(timeout)
      }
    } 
    // Deleting effect
    else {
      if (currentText.length > 0) {
        const timeout = setTimeout(() => {
          setCurrentText(phrase.substring(0, currentText.length - 1))
        }, 50) // Deleting speed (faster than typing)
        return () => clearTimeout(timeout)
      } else {
        // Move to next phrase
        setIsTyping(true)
        setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length)
      }
    }
  }, [currentText, currentIndex, isTyping, phrases])
  
  return (
    <>
      <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
        {/* Right side glow effect */}
        <div className="absolute top-0 right-0 w-1/3 h-[40rem] bg-gradient-to-b from-purple-500/20 to-transparent blur-2xl z-10"></div>
        
        {/* Additional ambient glow effects */}
        <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-purple-600/10 rounded-full blur-3xl z-10"></div>
        <div className="absolute top-40 right-[20%] w-80 h-80 bg-blue-600/10 rounded-full blur-3xl z-10"></div>
        
        {/* Light beam effect similar to Hero.tsx */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-96 bg-gradient-to-b from-purple-500/20 to-transparent blur-2xl z-20"></div>
        
        <div className="container mx-auto px-8 py-24">
         
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-bold mb-4 min-h-[calc(1.5em*2)]">
              {currentText}
              <span className="inline-block w-1 h-12 ml-1 bg-purple-500 animate-pulse"></span>
            </h1>
            <p className="text-gray-400 text-lg">Nebulx unlocks the potential of AI-powered applications</p>
          </div>
        
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl -z-10"></div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            
            <div className="space-y-8 relative z-20">
              <div>
                <h2 className="text-6xl font-bold mb-4">Smartest AI</h2>
                {/* Cyan/blue highlight effect */}
<div className="absolute top-1/4 left-1/3 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl -z-10"></div>
<div className="absolute inset-0 overflow-hidden">
  <div className="w-40 h-40 bg-blue-500/20 rounded-full blur-3xl absolute -z-10 animate-pulse-slow"></div>
</div>
                <p className="text-gray-400 leading-relaxed mb-8">
                  Nebulx unlocks the potential of AI-powered applications with advanced machine learning capabilities and neural network processing.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-600 rounded-full p-2">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg">Photo generating</span>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-purple-600 rounded-full p-2">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg">Photo enhance</span>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-blue-600 rounded-full p-2">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg">Seamless Integration</span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-600 rounded-full p-2">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg">Advanced Neural Networks</span>
                </div>
              </div>
              
              {/* CTA Button */}
              <div className="mt-10">
                <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 text-lg shadow-lg shadow-purple-900/30">
                  Get Started Now
                </button>
              </div>
            </div>
            
            {/* Right Content - Robot Image */}
            <div className="relative">
              <div className="w-full h-[40rem] rounded-2xl p-8 backdrop-blur-sm bg-gradient-to-br from-purple-900/30 to-blue-900/20 border border-purple-700/20 shadow-xl shadow-purple-900/10 flex items-center justify-center overflow-hidden">
                {/* Robot Image */}
                <div className="relative w-full h-full">
                  <img
                    src="/img/robo2.png"
                    alt="AI Robot"
                    className="object-cover w-full h-full animate-pulse-slow rounded-2xl shadow-lg"
                  />
                  {/* Overlay glow effect */}
                </div>
                
                {/* Enhanced glow effect inside the image container */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-purple-600/20 rounded-full blur-3xl"></div>
              </div>
              
              {/* Additional glow effect under the image */}
              <div className="absolute -bottom-10 right-1/4 w-3/4 h-40 bg-purple-600/20 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -top-10 right-1/4 w-1/2 h-40 bg-blue-600/20 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Creative App Section */}
      <div className="min-h-screen bg-gray-950 text-white p-8 flex items-center justify-center relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 left-0 w-1/3 h-[40rem] bg-gradient-to-b from-purple-500/20 to-transparent blur-2xl z-0"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-[40rem] bg-gradient-to-t from-blue-500/20 to-transparent blur-2xl z-0"></div>
        
        <div className="max-w-7xl w-full h-400px grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
          {/* Left Side - Photo Editing */}
          <div className="relative">
            <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-purple-500/20 rounded-3xl p-8 h-full">
              {/* Robot Image with Chat Bubble */}
              <div className="relative mb-8">
                <div className="w-full h-[400px] rounded-2xl overflow-hidden relative">
                  <img
                    src="/img/photoedit.png"
                    alt="AI Robot Character"
                    className="w-full h-[380px] object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/40 to-blue-600/40"></div>
                </div>

                {/* Chat Bubble */}
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm rounded-2xl px-4 py-3 max-w-xs">
                  <p className="text-white text-sm font-medium">Hey Nebulx, enhance this photo</p>
                  <div className="absolute bottom-0 left-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-black/80 transform translate-y-full"></div>
                </div>
              </div>

              {/* Photo Editing Content */}
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-white">Photo editing</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Automatically enhance your photos using our AI app's photo editing feature. Try it now!
                </p>
                <button 
                  onClick={() => navigate('/features/image-enhancer')}
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 text-lg shadow-lg shadow-purple-500/40 relative group"
                >
                  <span className="relative z-10">Explore</span>
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/20 to-blue-400/20 blur-lg group-hover:blur-xl transition-all duration-300"></span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Video Generation */}
          <div className="space-y-8">
            {/* Video Generation Header */}
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-white">Video generation</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                The world's most powerful AI photo and video art generation engine. What will you create?
              </p>
              <button 
                onClick={() => navigate('/features/video-audio-extractor')}
                className="mt-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 text-lg shadow-lg shadow-purple-500/40 relative group"
              >
                <span className="relative z-10">Explore Videos</span>
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/20 to-blue-400/20 blur-lg group-hover:blur-xl transition-all duration-300"></span>
              </button>
            </div>

            {/* Tool Icons */}
            <div className="flex gap-4">
              <button className="w-12 h-12 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/20 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </button>
              <button className="w-12 h-12 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/20 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </button>
              <button className="w-12 h-12 bg-slate-700/40 hover:bg-slate-700/60 border-2 border-white/40 rounded-xl flex items-center justify-center">
                <RotateCcw className="w-6 h-6 text-white" />
              </button>
              <button className="w-12 h-12 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/20 rounded-xl flex items-center justify-center">
                <Rss className="w-6 h-6 text-white" />
              </button>
              <button className="w-12 h-12 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/20 rounded-xl flex items-center justify-center">
                <Shuffle className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-800/40 to-purple-900/40 backdrop-blur-sm border border-purple-500/20 rounded-2xl overflow-hidden">
                {/* Video Content */}
                <div className="relative h-120 ">
                  <img
                    src="/img/greenrobo.png"
                    alt="Generated Video Content"
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-purple-600/40"></div>

                  {/* Video Generated Notification */}
                  <div className="absolute top-4 left-4 bg-purple-600/90 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                    <span className="text-white font-medium">Video generated!</span>
                  </div>

                  {/* Timestamp */}
                  <div className="absolute top-4 right-4 text-gray-300 text-sm font-medium">JUST NOW</div>
                </div>

                {/* Video Controls */}
                <div className="p-4 bg-black/40 backdrop-blur-sm">
                  <div className="flex items-center gap-4">
                    <button className="w-8 h-8 hover:bg-white/10 rounded-full flex items-center justify-center">
                      <Play className="w-4 h-4 text-white fill-white" />
                    </button>

                    {/* Progress Bar */}
                    <div className="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden">
                      <div className="w-1/4 h-full bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GenerativeAIHero
