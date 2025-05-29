import { Code, Image, ArrowUpFromLine, Globe, QrCode, FileType, Music, MessageSquareQuote, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Features = () => {
  const [showAll, setShowAll] = useState(false);
  
  const allFeatures = [
    {
      icon: <Code className="w-8 h-8 text-white" />,
      title: "Code Generator",
      description: "Generate code snippets in multiple programming languages from natural language prompts.",
      color: "from-purple-500 to-pink-500",
      borderColor: "border-purple-500",
      iconBg: "bg-gradient-to-br from-purple-500 to-pink-500",
      link: "/features/code-generator"
    },
    {
      icon: <Image className="w-8 h-8 text-white" />,
      title: "AI Image Generator",
      description: "Create images from text descriptions with advanced AI models.",
      color: "from-orange-500 to-yellow-500",
      borderColor: "border-orange-500",
      iconBg: "bg-gradient-to-br from-orange-500 to-yellow-500",
      link: "/features/image-generator"
    },
    {
      icon: <ArrowUpFromLine className="w-8 h-8 text-white" />,
      title: "Image Enhancer / Upscaler",
      description: "Improve image resolution and quality automatically.",
      color: "from-green-500 to-emerald-500",
      borderColor: "border-green-500",
      iconBg: "bg-gradient-to-br from-green-500 to-emerald-500",
      link: "/features/image-enhancer"
    },
    {
      icon: <Globe className="w-8 h-8 text-white" />,
      title: "Language Translator",
      description: "Translate text between multiple languages accurately and quickly.",
      color: "from-blue-500 to-cyan-500",
      borderColor: "border-blue-500",
      iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
      link: "/features/language-translator"
    },
    {
      icon: <QrCode className="w-8 h-8 text-white" />,
      title: "QR Code Generator",
      description: "Generate customizable QR codes for URLs, text, and more.",
      color: "from-purple-500 to-blue-500",
      borderColor: "border-purple-500",
      iconBg: "bg-gradient-to-br from-purple-500 to-blue-500",
      link: "/features/qr-code-generator"
    },
    {
      icon: <FileType className="w-8 h-8 text-white" />,
      title: "File Converter",
      description: "Convert documents, images, and audio files between popular formats.",
      color: "from-red-500 to-pink-500",
      borderColor: "border-red-500",
      iconBg: "bg-gradient-to-br from-red-500 to-pink-500",
      link: "/features/file-converter"
    },
    {
      icon: <Music className="w-8 h-8 text-white" />,
      title: "Video Generator",
      description: "Convert Text into videos with AI-generated visuals ",
      color: "from-indigo-500 to-blue-500",
      borderColor: "border-indigo-500",
      iconBg: "bg-gradient-to-br from-indigo-500 to-blue-500",
      link: "/features/video-audio-extractor"
    },
    {
      icon: <MessageSquareQuote className="w-8 h-8 text-white" />,
      title: "Text-to-Speech (TTS)",
      description: "Convert written text into natural-sounding audio with customizable voices.",
      color: "from-amber-500 to-yellow-500",
      borderColor: "border-amber-500",
      iconBg: "bg-gradient-to-br from-amber-500 to-yellow-500",
      link: "/features/text-to-speech"
    }
  ];

  // Display either the first 6 features or all features
  const displayedFeatures = showAll ? allFeatures : allFeatures.slice(0, 6);

  return (
    <section id="features" className="py-20 px-6 relative">
      {/* Background glow effects */}
      <div className="absolute top-20 left-[10%] w-96 h-96 bg-purple-600/10 rounded-full blur-3xl z-0"></div>
      <div className="absolute bottom-20 right-[5%] w-80 h-80 bg-blue-600/10 rounded-full blur-3xl z-0"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-96 bg-gradient-to-b from-purple-500/20 to-transparent blur-2xl z-0"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Chat Smarter, Not Harder
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              with Nebulx
            </span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedFeatures.map((feature, index) => (
            <div 
              key={index} 
              className="group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Custom shape with right-side curve and hover image effect */}
              <div
                className="relative p-6 bg-slate-900 border-2 overflow-hidden"
                style={{
                  clipPath: "polygon(0% 0%, 85% 0%, 95% 15%, 95% 85%, 85% 100%, 0% 100%)",
                  borderRadius: "24px 0px 24px 24px",
                  borderColor: `var(--${feature.borderColor.split('-')[1]})`,
                }}
              >
                {/* Hover background image */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-0"
                  style={{
                    backgroundImage: "url('/img/purple-bg.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    mixBlendMode: "soft-light"
                  }}
                ></div>
                
                <div className="flex flex-col h-full min-h-[280px] relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-3 rounded-xl ${feature.iconBg}`}>{feature.icon}</div>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>

                  <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">{feature.description}</p>

                  {/* Enhanced explore button with Link */}
                  <div className="flex items-center">
                    <Link 
                      to={feature.link} 
                      className={`flex items-center justify-between text-white font-medium text-sm tracking-wider px-5 py-2 rounded-md w-36 transition-all hover:shadow-lg hover:shadow-purple-500/20`}
                    >
                      <span className="">EXPLORE MORE</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More/Less Button */}
        <div className="flex justify-center mt-12">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600/30 hover:to-blue-600/30 text-white font-medium rounded-xl transition-all duration-300 border border-purple-500/30"
          >
            <span>{showAll ? "View Less" : "View More Features"}</span>
            {showAll ? 
              <ChevronUp className="w-5 h-5 text-purple-400" /> : 
              <ChevronDown className="w-5 h-5 text-purple-400" />
            }
          </button>
        </div>
      </div>
    </section>
  );
};
