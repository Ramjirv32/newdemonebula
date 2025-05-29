"use client"

import { Button } from "@/components/ui/button"

export default function Musxi() {
  return (
    <div className="min-h-screen  text-white">
      {/* Hero Section - Pay once, use forever */}
      
      {/* What we're working on section */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gray-400 text-sm mb-4 tracking-wider">[ READY TO GET STARTED ]</p>
            <h2 className="text-4xl lg:text-5xl font-bold">What we're working on</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Voice Recognition Card - Updated with increased height */}
            <div className="relative backdrop-blur-sm p-8 rounded-3xl overflow-hidden min-h-[500px] flex flex-col">
              {/* Gradient border effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-purple-600/30 via-blue-600/30 to-purple-600/30 blur-sm -z-10"></div>
              
              {/* Inner content background with blue/purple gradient */}
              <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 -z-10"></div>
              
              {/* Blue/purple shadow glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl blur-xl -z-20"></div>
              
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-400 text-sm">[ MAY 2023 ]</span>
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">DONE</span>
              </div>

              {/* Voice Recognition Image - Fixed height and made taller */}
              <div className="mb-6 h-[380px] rounded-2xl overflow-hidden">
                <img 
                  src="/img/music.png" 
                  alt="Voice Recognition Interface"
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-2xl font-bold mb-3">Voice recognition</h3>
              <p className="text-gray-400 leading-relaxed">
                Enable the chatbot to understand and respond to voice commands, making it easier for users to interact with the app hands-free.
              </p>
            </div>

            {/* Gamification Card - Updated with gradient border and increased height */}
            <div className="relative backdrop-blur-sm p-8 rounded-3xl overflow-hidden min-h-[500px] flex flex-col">
              {/* Gradient border effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-purple-600/30 via-blue-600/30 to-purple-600/30 blur-sm -z-10"></div>
              
              {/* Inner content background */}
              {/* <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 -z-10"></div> */}
              
              {/* Blue/purple shadow glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl blur-xl -z-20"></div>
              
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-400 text-sm">[ MAY 2023 ]</span>
                <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-xs font-medium">IN PROGRESS</span>
              </div>

              {/* Gamification Image - Increased height */}
              <div className="mb-6 h-[380px] rounded-2xl overflow-hidden">
                <img 
                  src="/img/com.png" 
                  alt="Gamification Features"
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-2xl font-bold mb-3">Gamification</h3>
              <p className="text-gray-400 leading-relaxed">
                Add game-like elements, such as badges or leaderboards, to incentivize users to engage with the chatbot more frequently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Chatbot Customization - with gradient border and increased height */}
          <div className="relative backdrop-blur-sm p-8 rounded-3xl overflow-hidden min-h-[500px] flex flex-col">
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-purple-600/30 via-blue-600/30 to-purple-600/30 blur-sm -z-10"></div>
            
            {/* Inner content background */}
            {/* <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 -z-10"></div> */}
            
            {/* Blue/purple shadow glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl blur-xl -z-20"></div>
            
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-400 text-sm">[ MAY 2023 ]</span>
              <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">DONE</span>
            </div>

            {/* Chatbot Customization Image - Increased height */}
            <div className="mb-6 h-[380px] rounded-2xl overflow-hidden">
              <img 
                src="/img/com.png" 
                alt="Chatbot Customization"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-auto">
              <h3 className="text-3xl font-bold mb-4">Chatbot customization</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                Allow users to customize the chatbot's appearance and behavior, making it more engaging and fun to interact with.
              </p>
            </div>
          </div>

          {/* Integration with APIs - with gradient border and increased height */}
          <div className="relative backdrop-blur-sm p-8 rounded-3xl overflow-hidden min-h-[500px] flex flex-col">
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-purple-600/30 via-blue-600/30 to-purple-600/30 blur-sm -z-10"></div>
            
            {/* Inner content background */}
            <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 -z-10"></div>
            
            {/* Blue/purple shadow glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl blur-xl -z-20"></div>
            
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-400 text-sm">[ MAY 2023 ]</span>
              <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-xs font-medium">IN PROGRESS</span>
            </div>

            {/* API Integration Image - Increased height */}
            <div className="mb-6 h-[380px] rounded-2xl overflow-hidden">
              <img 
                src="/img/api.png" 
                alt="API Integration"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-auto">
              <h3 className="text-3xl font-bold mb-4">Integration with APIs</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                Allow the chatbot to access external data sources, such as weather APIs or news APIs, to provide more relevant recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 text-center">
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-full text-lg font-medium">
          OUR ROADMAP
        </Button>
      </section>
    </div>
  )
}