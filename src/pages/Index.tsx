
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";
import WorkProgress from "../components/Work";
import GenerativeAIHero from "../components/Ai";
import CollaborationHero from "../components/Collaboration";
const Index = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <Navigation />
      <Hero />
      <Features />
      <GenerativeAIHero />
      <Pricing />
    
      <WorkProgress />
      <CollaborationHero />
  
      <Footer />
    </div>
  );
};

export default Index;
