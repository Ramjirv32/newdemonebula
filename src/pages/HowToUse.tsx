import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Play, MessageSquare, Zap, Settings, Share2 } from "lucide-react";

const HowToUse = () => {
  const steps = [
    {
      icon: <MessageSquare className="w-12 h-12" />,
      title: "Start a Conversation",
      description: "Simply type your question or request in the chat interface. Nebulx's AI will understand and respond to your queries in natural language.",
      image: "🤖"
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Get Instant Responses",
      description: "Receive intelligent, contextual responses within seconds. Our AI processes your input and provides accurate, helpful information.",
      image: "⚡"
    },
    {
      icon: <Settings className="w-12 h-12" />,
      title: "Customize Your Experience",
      description: "Adjust settings, themes, and preferences to make Nebulx work exactly how you want it to. Personalize your AI assistant.",
      image: "⚙️"
    },
    {
      icon: <Share2 className="w-12 h-12" />,
      title: "Share and Collaborate",
      description: "Share conversations, export chat history, or collaborate with team members using Nebulx's sharing features.",
      image: "🤝"
    }
  ];

  const tips = [
    "Be specific with your questions for better responses",
    "Use natural language - no need for special commands",
    "Try asking follow-up questions to dive deeper",
    "Experiment with different types of requests",
    "Use voice input for hands-free interaction"
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            How to Use
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Nebulx
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Get started with Nebulx in minutes. Follow our simple guide to unlock the full potential of AI-powered conversations.
          </p>
          <button className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
            <Play className="w-5 h-5 mr-2" />
            Watch Tutorial Video
          </button>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get Started in 4 Simple Steps
            </h2>
            <p className="text-slate-400">
              Follow these easy steps to make the most of your Nebulx experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-4">
                      {step.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <span className="text-3xl font-bold text-purple-400 mr-4">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-2xl font-bold">{step.title}</h3>
                    </div>
                    <p className="text-slate-300 leading-relaxed mb-6">
                      {step.description}
                    </p>
                    <div className="w-full h-32 bg-slate-900/50 border border-slate-700 rounded-lg flex items-center justify-center">
                      <span className="text-4xl">{step.image}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pro Tips for Better Results
            </h2>
            <p className="text-slate-400">
              Maximize your Nebulx experience with these helpful tips
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tips.map((tip, index) => (
              <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 hover:border-purple-500/50 transition-colors">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-slate-300">{tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of users who are already experiencing the power of AI with Nebulx.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-slate-100 transition-colors">
              Start Free Trial
            </button>
            <button className="px-8 py-4 border border-slate-600 text-white rounded-lg hover:border-purple-500 transition-colors">
              View Pricing
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowToUse;
