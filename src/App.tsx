import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LoadingProvider, useLoading } from "./context/LoadingContext";
import { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import LoadingIndicator from "./components/LoadingIndicator"; // Add this import

// Main pages
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import HowToUse from "./pages/HowToUse";
import Roadmap from "./pages/Roadmap";
import NotFound from "./pages/NotFound";

// Feature pages
import CodeGenerator from "./pages/features/CodeGenerator";
import ImageGenerator from "./pages/features/ImageGenerator";
import ImageEnhancer from "./pages/features/ImageEnhancer";
import LanguageTranslator from "./pages/features/LanguageTranslator";
import QrCodeGenerator from "./pages/features/QrCodeGenerator";
import FileConverter from "./pages/features/FileConvertor";
import VideoAudioExtractor from "./pages/features/VideoAudioExtractor";
import TextToSpeech from "./pages/features/TextToSpeech";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

// Animation wrapper component
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <LoadingProvider>
      <LoadingIndicator />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/how-to-use" element={<HowToUse />} />
          <Route path="/roadmap" element={<Roadmap />} />
          
          {/* Feature routes */}
          <Route path="/features/code-generator" element={<CodeGenerator />} />
          <Route path="/features/image-generator" element={<ImageGenerator />} />
          <Route path="/features/image-enhancer" element={<ImageEnhancer />} />
          <Route path="/features/language-translator" element={<LanguageTranslator />} />
          <Route path="/features/qr-code-generator" element={<QrCodeGenerator />} />
          <Route path="/features/file-converter" element={<FileConverter />} />
          <Route path="/features/video-audio-extractor" element={<VideoAudioExtractor />} />
          <Route path="/features/text-to-speech" element={<TextToSpeech />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </LoadingProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <div className="font-sans"> {/* Add this wrapper with font-sans class */}
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
