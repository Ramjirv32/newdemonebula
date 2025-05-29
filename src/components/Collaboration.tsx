"use client"

import { Check } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function Collaboration() {
  return (
    <section className="min-h-screen  py-20 px-8 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-1/3 h-[40rem] bg-gradient-to-b from-purple-500/10 to-transparent blur-2xl z-0"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-[30rem] bg-gradient-to-t from-blue-500/10 to-transparent blur-2xl z-0"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 backdrop-blur-sm bg-slate-800/30 rounded-2xl p-8 border border-purple-500/10 shadow-lg shadow-purple-500/5">
            {/* Main Heading */}
            <div className="space-y-6">
              <h2 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                AI Chat App for seamless collaboration
              </h2>
              
              <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                With smart automation and top-notch security, it's the perfect solution for teams looking to work smarter.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-md shadow-purple-500/30">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Seamless Integration</h3>
                  <p className="text-gray-400 leading-relaxed">
                    With smart automation and top-notch security, it's the perfect solution for teams looking to work smarter.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-md shadow-purple-500/30">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Smart Automation</h3>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-md shadow-purple-500/30">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Top-notch Security</h3>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button 
                className="bg-transparent border-2 border-purple-600 text-white hover:bg-purple-600 hover:text-white px-8 py-3 rounded-xl text-sm font-medium tracking-wider relative group"
              >
                <span className="relative z-10">TRY IT NOW</span>
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/20 to-blue-400/20 blur-lg group-hover:blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
              </Button>
            </div>
          </div>

          {/* Right Side - Image with increased size */}
          <div className="relative h-[450px] lg:h-[600px] backdrop-blur-sm bg-slate-800/20 rounded-3xl border border-purple-500/20 shadow-xl shadow-purple-900/10 overflow-hidden">
            {/* Main image */}
            <div className="absolute inset-0">
              <img 
                src="/img/circle.png" 
                alt="AI Collaboration" 
                className="w-full h-full object-cover object-center"
              />
              
              {/* Overlay for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 to-purple-900/50"></div>
            </div>
            
            {/* Ambient glow effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-purple-600/20 rounded-full blur-3xl"></div>
            
            {/* Optional: Title overlay */}
            <div className="absolute bottom-8 left-8 right-8">
              <h3 className="text-2xl font-bold text-white mb-2">Connect Everything</h3>
              <p className="text-gray-300">Integrate with your favorite tools and platforms</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}