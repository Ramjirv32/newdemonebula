import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Check, Clock, Zap } from "lucide-react";

const Roadmap = () => {
  const roadmapItems = [
    {
      quarter: "Q1 2024",
      status: "completed",
      title: "Core AI Chat Platform",
      description: "Launch of the basic AI chatbot with natural language processing capabilities",
      features: [
        "Basic chat interface",
        "Natural language understanding",
        "User authentication",
        "Chat history"
      ]
    },
    {
      quarter: "Q2 2024",
      status: "completed",
      title: "Enhanced Features",
      description: "Advanced AI capabilities and user experience improvements",
      features: [
        "Voice input/output",
        "File upload support",
        "Theme customization",
        "Mobile app launch"
      ]
    },
    {
      quarter: "Q3 2024",
      status: "in-progress",
      title: "AI Model Improvements",
      description: "Upgraded AI models with better accuracy and faster response times",
      features: [
        "GPT-4 integration",
        "Code generation",
        "Image analysis",
        "Multi-language support"
      ]
    },
    {
      quarter: "Q4 2024",
      status: "planned",
      title: "Team Collaboration",
      description: "Features designed for team productivity and collaboration",
      features: [
        "Shared workspaces",
        "Team chat rooms",
        "Project templates",
        "Admin dashboard"
      ]
    },
    {
      quarter: "Q1 2025",
      status: "planned",
      title: "Enterprise Features",
      description: "Advanced security and enterprise-grade features",
      features: [
        "SSO integration",
        "Advanced analytics",
        "Custom AI training",
        "API access"
      ]
    },
    {
      quarter: "Q2 2025",
      status: "planned",
      title: "AI Agents & Automation",
      description: "Intelligent agents that can perform tasks autonomously",
      features: [
        "Task automation",
        "Smart scheduling",
        "Workflow integration",
        "Custom AI agents"
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <Check className="w-6 h-6 text-green-400" />;
      case "in-progress":
        return <Zap className="w-6 h-6 text-yellow-400" />;
      default:
        return <Clock className="w-6 h-6 text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "border-green-400 bg-green-400/10";
      case "in-progress":
        return "border-yellow-400 bg-yellow-400/10";
      default:
        return "border-slate-600 bg-slate-900/50";
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Product
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Roadmap
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Discover what's coming next for Nebulx. Our roadmap shows the exciting features and improvements we're building for you.
          </p>
        </div>
      </section>

      {/* Roadmap Timeline */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-700"></div>
            
            <div className="space-y-12">
              {roadmapItems.map((item, index) => (
                <div key={index} className="relative flex items-start space-x-8">
                  {/* Timeline dot */}
                  <div className={`relative z-10 w-16 h-16 rounded-full border-2 flex items-center justify-center ${getStatusColor(item.status)}`}>
                    {getStatusIcon(item.status)}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="text-sm font-semibold text-purple-400 uppercase tracking-wide">
                        {item.quarter}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === 'completed' ? 'bg-green-900/50 text-green-300' :
                        item.status === 'in-progress' ? 'bg-yellow-900/50 text-yellow-300' :
                        'bg-slate-800 text-slate-300'
                      }`}>
                        {item.status === 'completed' ? 'Completed' :
                         item.status === 'in-progress' ? 'In Progress' : 'Planned'}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-slate-300 mb-6 leading-relaxed">{item.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {item.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-slate-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Requests Section */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Have a Feature Request?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            We love hearing from our community. Share your ideas and help shape the future of Nebulx.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-slate-100 transition-colors">
              Submit Feature Request
            </button>
            <button className="px-8 py-4 border border-slate-600 text-white rounded-lg hover:border-purple-500 transition-colors">
              Join Community
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Roadmap;
