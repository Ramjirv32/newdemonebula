
import { Check } from "lucide-react";

export const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: "$0",
      description: "AI chatbot, personalized recommendations",
      features: [
        "An AI chatbot that can understand your queries",
        "Personalized recommendations based on your preferences",
        "Ability to explore the app and its features without any cost"
      ],
      buttonText: "GET STARTED",
      buttonStyle: "bg-white text-black hover:bg-slate-100",
      popular: false
    },
    {
      name: "Premium",
      price: "$9.99",
      description: "Advanced AI chatbot, priority support, analytics dashboard",
      features: [
        "An advanced AI chatbot that can understand complex queries",
        "An analytics dashboard to track your conversations",
        "Priority support to solve issues quickly"
      ],
      buttonText: "GET STARTED",
      buttonStyle: "bg-white text-black hover:bg-slate-100",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Custom AI chatbot, advanced analytics, dedicated account",
      features: [
        "An AI chatbot that can understand your queries",
        "Personalized recommendations based on your preferences",
        "Ability to explore the app and its features without any cost"
      ],
      buttonText: "CONTACT US",
      buttonStyle: "border border-slate-600 text-white hover:border-purple-500",
      popular: false
    }
  ];

  return (


    
    <section id="pricing" className="py-20 px-6">

<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background glow effects instead of particles */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/3 h-[30rem] bg-gradient-to-b from-purple-500/20 to-transparent blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-[20rem] bg-gradient-to-t from-blue-500/20 to-transparent blur-2xl"></div>
        </div>

        {/* Central Image */}
        <div className="relative">
          <img 
            src="/img/earth.png" 
            alt="Technology Sphere"
            className="w-96 h-full object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 rounded-full mix-blend-overlay"></div>
        </div>

        {/* Hero text */}
        <div className="absolute bottom-32 text-center">
          <p className="text-gray-400 text-sm mb-4 tracking-wider">[ GET STARTED WITH STARFORGE ]</p>
          <h1 className="text-5xl lg:text-6xl font-bold">Pay once, use forever</h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pay once, use forever
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className={`relative border rounded-2xl p-8 backdrop-blur-sm ${plan.popular ? 'border-purple-500' : 'border-slate-700'}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-600 px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="mb-8">
                <h3 className={`text-2xl font-bold mb-2 ${index === 0 ? 'text-yellow-400' : index === 1 ? 'text-purple-400' : 'text-orange-400'}`}>
                  {plan.name}
                </h3>
                <p className="text-slate-300 text-sm mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-slate-400">/month</span>}
                </div>
                
                <button className={`w-full py-3 rounded-lg font-semibold transition-colors ${plan.buttonStyle}`}>
                  {plan.buttonText}
                </button>
              </div>
              
              <div className="space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-slate-300 text-sm leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="text-slate-300 hover:text-white transition-colors border-b border-slate-600 hover:border-white">
            SEE THE FULL DETAILS
          </button>
        </div>
      </div>
    </section>
  );
};
