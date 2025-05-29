"use client"

// import type React from "react"
import { useState } from "react"
import { Send, Menu, Edit3, Gift, Calendar, Smile, Dumbbell, BookOpen, Sparkles, Code, ChevronLeft, Search, User } from "lucide-react"
import { Link } from "react-router-dom"
import { GiBlackHoleBolas } from "react-icons/gi"
interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

const CodeGenerator: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const suggestionButtons = [
    { icon: Code, text: "Generate React component" },
    { icon: Code, text: "Create API endpoint" },
    { icon: Code, text: "Sort array algorithm" },
    { icon: Code, text: "CSS animation" },
    { icon: Code, text: "Database query" },
    { icon: Sparkles, text: "Optimize my code" },
  ]

  const generateCodeSample = async (prompt: string): Promise<string> => {
    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAcaCvxhvFTy26Pbr1jiFm5PElXJ1TAFkE",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Generate code for the following request. Format your response with code blocks using triple backticks: ${prompt}`,
                  },
                ],
              },
            ],
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
  
      const data = await response.json();
      const generatedText = data.candidates[0].content.parts[0].text;
  
      // Return the generated text which should already contain code blocks
      return generatedText;
    } catch (error) {
      console.error("Error generating code:", error);
      
      // Fallback to our simple demo responses if the API fails
      if (prompt.toLowerCase().includes("react")) {
        return "```jsx\nimport React, { useState } from 'react';\n\nconst Button = ({ text, onClick }) => {\n  const [isHovered, setIsHovered] = useState(false);\n  \n  return (\n    <button\n      className={`px-4 py-2 rounded-md ${isHovered ? 'bg-purple-600' : 'bg-purple-500'}`}\n      onMouseEnter={() => setIsHovered(true)}\n      onMouseLeave={() => setIsHovered(false)}\n      onClick={onClick}\n    >\n      {text}\n    </button>\n  );\n};\n\nexport default Button;```";
      } else if (prompt.toLowerCase().includes("algorithm") || prompt.toLowerCase().includes("sort")) {
        return "```javascript\nfunction quickSort(arr) {\n  if (arr.length <= 1) return arr;\n  \n  const pivot = arr[Math.floor(arr.length / 2)];\n  const left = arr.filter(x => x < pivot);\n  const middle = arr.filter(x => x === pivot);\n  const right = arr.filter(x => x > pivot);\n  \n  return [...quickSort(left), ...middle, ...quickSort(right)];\n}\n\n// Example usage:\nconst array = [9, 3, 7, 1, 5];\nconst sorted = quickSort(array);\nconsole.log(sorted); // [1, 3, 5, 7, 9]```";
      }
      
      return `Error generating code. Please try again later.\n\n\`\`\`javascript\n// Fallback sample code\nconsole.log("Requested: ${prompt}");\n\`\`\``;
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    try {
      // Get the AI-generated code
      const generatedCode = await generateCodeSample(text);
  
      // Create and add bot response message
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generatedCode,
        sender: "bot",
        timestamp: new Date(),
      };
  
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error in code generation:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I encountered an issue while generating code. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
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
      {/* Navigation Bar */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Back Button */}
            <div className="flex items-center">
            
              
              <Link to="/" className="flex items-center gap-2">
                <div className="p-1.5 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg">
                  <div className="text-white text-lg font-bold"> <GiBlackHoleBolas/></div>
                </div>
                <h1 className="text-white text-lg font-semibold">Nebulx</h1>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              <Link to="/features" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">Features</Link>
              <Link to="/pricing" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">Pricing</Link>
              <Link to="/how-to-use" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">How to Use</Link>
              <Link to="/roadmap" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">Roadmap</Link>
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-slate-800">
                <Search size={20} />
              </button>
              
              <Link to="/signin" className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 transition-colors">
                <User size={16} />
                <span>Sign In</span>
              </Link>
              
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-slate-800"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/features" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800">Features</Link>
              <Link to="/pricing" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800">Pricing</Link>
              <Link to="/how-to-use" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800">How to Use</Link>
              <Link to="/roadmap" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800">Roadmap</Link>
              <Link to="/signin" className="block px-3 py-2 rounded-md text-base font-medium text-purple-400 hover:text-purple-300 hover:bg-slate-800">Sign In</Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row relative">
        {/* Left side - Robot image with eye marker (MOVED TO LEFT) */}
        <div className="hidden md:flex w-2/5 pl-8 pr-8 py-8 items-center justify-center">
          <div className="w-full h-full rounded-3xl overflow-hidden relative">
            {/* Laser source point - positioned based on robot's eye location */}
            <div id="robot-eye" className="absolute top-1/3 left-1/2 w-4 h-4 rounded-full bg-purple-500/50 z-20"></div>
            
            <div className="absolute inset-0 z-10">
              {/* Animated dots and balls container */}
              <div className="absolute inset-0 overflow-hidden">
                {/* Large floating balls */}
                <div className="floating-ball w-16 h-16 rounded-full bg-purple-600/20 absolute top-[15%] left-[20%] blur-sm"></div>
                <div className="floating-ball delay-1 w-12 h-12 rounded-full bg-violet-500/20 absolute top-[35%] right-[25%] blur-sm"></div>
                <div className="floating-ball delay-2 w-20 h-20 rounded-full bg-purple-800/20 absolute bottom-[20%] left-[35%] blur-sm"></div>
                
                {/* Medium floating balls */}
                <div className="floating-ball-reverse w-8 h-8 rounded-full bg-purple-500/30 absolute top-[45%] left-[15%] blur-sm"></div>
                <div className="floating-ball-reverse delay-2 w-10 h-10 rounded-full bg-violet-600/30 absolute top-[25%] right-[10%] blur-sm"></div>
                <div className="floating-ball-reverse delay-1 w-6 h-6 rounded-full bg-purple-700/30 absolute bottom-[15%] right-[20%] blur-sm"></div>
                
                {/* Small dots */}
                <div className="floating-dot w-2 h-2 rounded-full bg-purple-400/50 absolute top-[10%] left-[50%]"></div>
                <div className="floating-dot delay-1 w-2 h-2 rounded-full bg-violet-400/50 absolute top-[60%] left-[30%]"></div>
                <div className="floating-dot delay-2 w-2 h-2 rounded-full bg-purple-300/50 absolute top-[30%] right-[40%]"></div>
                <div className="floating-dot delay-3 w-2 h-2 rounded-full bg-violet-300/50 absolute bottom-[20%] right-[35%]"></div>
                <div className="floating-dot-reverse w-2 h-2 rounded-full bg-purple-400/50 absolute bottom-[40%] left-[25%]"></div>
                <div className="floating-dot-reverse delay-2 w-2 h-2 rounded-full bg-violet-400/50 absolute top-[80%] right-[15%]"></div>
                
                {/* Glowing dots */}
                <div className="floating-pulse w-4 h-4 rounded-full bg-purple-500/40 absolute top-[70%] left-[60%] shadow-lg shadow-purple-500/30"></div>
                <div className="floating-pulse delay-2 w-3 h-3 rounded-full bg-violet-400/40 absolute top-[20%] left-[40%] shadow-lg shadow-violet-500/30"></div>
                <div className="floating-pulse delay-1 w-5 h-5 rounded-full bg-purple-300/40 absolute bottom-[30%] right-[30%] shadow-lg shadow-purple-500/30"></div>
              </div>
            </div>
            
            <img 
              src="/img/robo3.png" 
              alt="AI Code Generator" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Laser beam from robot eye to code icon - UPDATED POSITIONING */}
        <div className="hidden md:block absolute z-40 inset-0 pointer-events-none">
          {/* The laser beam container */}
          <div className="laser-container">
            <div className="laser-beam"></div>
            <div className="laser-glow"></div>
            <div className="laser-particles"></div>
          </div>
        </div>

        {/* Right side - Chatbot (MOVED TO RIGHT) */}
        <div className="w-full md:w-3/5 pl-0 md:pl-8 md:pr-8 py-8">
          <div className="h-full bg-gradient-to-b from-slate-900 to-slate-950 border border-purple-900/30 rounded-3xl overflow-hidden shadow-xl shadow-purple-900/20 flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-purple-900/20">
              <div className="flex items-center gap-3">
                <div id="code-icon" className="p-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl relative">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-white text-xl font-semibold">Nebulx Code Assistant</h2>
              </div>
              <Menu className="w-6 h-6 text-gray-400 cursor-pointer hover:text-purple-300 transition-colors" />
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {messages.length === 0 ? (
                /* Welcome Screen */
                <div className="flex-1 flex flex-col items-center justify-center px-8 py-10 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-6">
                    <Code className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-white text-2xl font-medium mb-3">Code Generator</h1>
                  <p className="text-gray-400 text-lg mb-10 max-w-md">
                    Generate snippets in multiple programming languages from natural language prompts.
                  </p>

                  {/* Suggestion Buttons */}
                  <div className="grid grid-cols-2 gap-3 mb-8 w-full max-w-lg">
                    {suggestionButtons.map((suggestion, index) => {
                      const IconComponent = suggestion.icon
                      return (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion.text)}
                          className="flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-white text-sm transition-all duration-200 backdrop-blur-sm border border-white/5"
                        >
                          <IconComponent className="w-4 h-4 text-purple-400" />
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
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" 
                          : "bg-slate-800 text-white border border-slate-700"
                        }`}
                      >
                        {message.text.includes("```") ? (
                          <div>
                            <div className="mb-2">{message.text.split("```")[0]}</div>
                            <pre className="bg-slate-950 p-3 rounded-lg overflow-x-auto text-sm text-gray-300 whitespace-pre-wrap">
                              <code>{message.text.split("```")[1].replace(/^[a-z]+\n/i, '')}</code>
                            </pre>
                            {message.text.split("```").length > 2 && 
                              <div className="mt-2">{message.text.split("```")[2]}</div>
                            }
                          </div>
                        ) : (
                          message.text
                        )}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-slate-800 border border-slate-700 text-white px-5 py-3 rounded-2xl">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Input Area */}
              <div className="p-6 border-t border-purple-900/20">
                <form onSubmit={handleSubmit} className="relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Describe the code you need..."
                    className="w-full px-5 py-4 pr-14 bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:from-gray-700 disabled:to-gray-700 rounded-lg flex items-center justify-center transition-all shadow-lg shadow-purple-900/20"
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
  )
}

export default CodeGenerator
