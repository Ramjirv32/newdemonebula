"use client"

// import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Send, Menu, Image, Sparkles, Mountain, Palette, Users, Building } from "lucide-react"
import { Navigation } from "../../components/Navigation"
// import { GiBlackHoleBolas } from "react-icons/gi"


// To this:
const HUGGING_FACE_API_KEY = import.meta.env.VITE_HUGGING_FACE_API_KEY ;
interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  imageUrl?: string
  isLoading?: boolean
}

const ImageGenerator: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const suggestionButtons = [
    { icon: Mountain, text: "A serene mountain landscape at sunset" },
    { icon: Palette, text: "Abstract digital art with vibrant colors" },
    { icon: Users, text: "Portrait of a cyberpunk character with neon lights" },
    { icon: Building, text: "Futuristic cityscape with flying vehicles" },
    { icon: Image, text: "Space nebula with planets and stars" },
    { icon: Sparkles, text: "Magical forest at night with glowing creatures" },
  ]

  const generateImage = async (prompt: string): Promise<string> => {
    try {
      const response = await fetch("https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${HUGGING_FACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Error generating image:', error);
      // Return a fallback image on error
      return `/img/samples/generated.jpg`;
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    // Create and add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    
    // Create a placeholder for the bot response with loading state
    const botMessageId = (Date.now() + 1).toString()
    const botMessagePlaceholder: Message = {
      id: botMessageId,
      text: `Generating image based on: "${text}"`,
      sender: "bot",
      timestamp: new Date(),
      isLoading: true
    }
    
    // Add the placeholder message
    setMessages((prev) => [...prev, botMessagePlaceholder])
    setIsTyping(true)
    
    try {
      // Generate the actual image
      const imageUrl = await generateImage(text)
      
      // Replace the placeholder message with the actual one containing the image
      setMessages((prev) => prev.map(msg => 
        msg.id === botMessageId 
          ? {
              ...msg, 
              imageUrl,
              isLoading: false
            }
          : msg
      ))
    } catch (error) {
      // Handle error by updating the message
      setMessages((prev) => prev.map(msg => 
        msg.id === botMessageId 
          ? {
              ...msg, 
              text: "Sorry, there was an error generating your image. Please try again.",
              isLoading: false
            }
          : msg
      ))
    } finally {
      setIsTyping(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(inputValue)
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navigation />

      <div className="flex-1 flex flex-col relative pt-16">
        {/* Background animation elements remain unchanged */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/95 via-slate-950/90 to-slate-950/95 z-10"></div>
          <img 
            src="/img/robo3.png" 
            alt="AI Background" 
            className="w-full h-full object-cover"
          />
          
          {/* Animated Elements - keep as is */}
          <div className="absolute inset-0 z-5">
            <div className="absolute inset-0 overflow-hidden">
              {/* Animated elements remain unchanged */}
              <div className="floating-ball w-16 h-16 rounded-full bg-orange-500/20 absolute top-[15%] left-[20%] blur-sm"></div>
              <div className="floating-ball delay-1 w-12 h-12 rounded-full bg-orange-500/20 absolute top-[35%] right-[25%] blur-sm"></div>
              <div className="floating-ball delay-2 w-20 h-20 rounded-full bg-yellow-800/20 absolute bottom-[20%] left-[35%] blur-sm"></div>
              <div className="floating-ball-reverse w-8 h-8 rounded-full bg-orange-500/30 absolute top-[45%] left-[15%] blur-sm"></div>
              <div className="floating-ball-reverse delay-2 w-10 h-10 rounded-full bg-orange-600/30 absolute top-[25%] right-[10%] blur-sm"></div>
              <div className="floating-ball-reverse delay-1 w-6 h-6 rounded-full bg-yellow-700/30 absolute bottom-[15%] right-[20%] blur-sm"></div>
              <div className="floating-dot w-2 h-2 rounded-full bg-orange-400/50 absolute top-[10%] left-[50%]"></div>
              <div className="floating-dot delay-1 w-2 h-2 rounded-full bg-orange-400/50 absolute top-[60%] left-[30%]"></div>
              <div className="floating-dot delay-2 w-2 h-2 rounded-full bg-yellow-300/50 absolute top-[30%] right-[40%]"></div>
              <div className="floating-pulse w-4 h-4 rounded-full bg-orange-500/40 absolute top-[70%] left-[60%] shadow-lg shadow-orange-500/30"></div>
              <div className="floating-pulse delay-2 w-3 h-3 rounded-full bg-orange-400/40 absolute top-[20%] left-[40%] shadow-lg shadow-orange-500/30"></div>
            </div>
          </div>
        </div>

        {/* Chat UI */}
        <div className="relative flex justify-center items-center py-4 z-20 flex-grow">
          <div className="w-full max-w-3xl px-4 md:px-0 h-full flex items-center">
            <div className="h-[90vh] w-full backdrop-blur-md bg-slate-900/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-center p-6">
                <div className="flex items-center gap-3">
                  <div id="image-icon" className="p-2 bg-orange-500/10 rounded-xl relative">
                    <Image className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-white text-xl font-semibold">Nebulx Image Generator</h2>
                </div>
                <Menu className="w-6 h-6 text-gray-400 cursor-pointer hover:text-orange-300 transition-colors" />
              </div>

              {/* Chat Area */}
              <div className="flex-1 flex flex-col">
                {messages.length === 0 ? (
                  /* Welcome Screen */
                  <div className="flex-1 flex flex-col items-center justify-center px-8 py-10 text-center">
                    <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mb-6">
                      <Image className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-white text-2xl font-medium mb-3">AI Image Generator</h1>
                    <p className="text-gray-400 text-lg mb-10 max-w-md">
                      Create stunning images from text descriptions with our advanced AI model.
                    </p>

                    {/* Suggestion Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 w-full max-w-lg">
                      {suggestionButtons.map((suggestion, index) => {
                        const IconComponent = suggestion.icon
                        return (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion.text)}
                            className="flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-white text-sm transition-all duration-200 backdrop-blur-sm border border-white/5"
                          >
                            <IconComponent className="w-4 h-4 text-orange-400" />
                            <span>{suggestion.text}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ) : (
                  /* Messages */
                  <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[85%] px-5 py-3 rounded-2xl ${
                            message.sender === "user" 
                            ? "bg-gradient-to-r from-orange-600 to-yellow-600 text-white" 
                            : "bg-slate-800/80 text-white"
                          }`}
                        >
                          <div className="mb-1">{message.text}</div>
                          {message.isLoading ? (
                            <div className="mt-3 bg-slate-700/50 rounded-lg h-64 w-full flex items-center justify-center">
                              <div className="flex flex-col items-center">
                                <div className="w-10 h-10 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mb-3"></div>
                                <p className="text-sm text-slate-400">Generating image...</p>
                              </div>
                            </div>
                          ) : message.imageUrl && (
                            <div className="mt-3 relative group">
                              <img 
                                src={message.imageUrl} 
                                alt="Generated image" 
                                className="rounded-lg w-full max-h-64 object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-3">
                                <a 
                                  href={message.imageUrl}
                                  download={`nebulx-image-${Date.now()}.png`}
                                  className="px-3 py-2 bg-orange-500 text-white rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                >
                                  Download Image
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                )}

                {/* Input Area */}
                <div className="p-6 bg-gradient-to-t from-slate-900/80 to-transparent">
                  <form onSubmit={handleSubmit} className="relative">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Describe the image you want to generate..."
                      className="w-full px-5 py-4 pr-14 bg-slate-800/80 backdrop-blur-sm rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-lg"
                      disabled={isTyping}
                    />
                    <button
                      type="submit"
                      disabled={!inputValue.trim() || isTyping}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-500 hover:to-yellow-500 disabled:from-gray-700 disabled:to-gray-700 rounded-lg flex items-center justify-center transition-all shadow-lg shadow-orange-900/20"
                    >
                      <Send className="w-4 h-4 text-white" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageGenerator
