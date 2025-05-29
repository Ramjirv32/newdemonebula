"use client"

// import type React from "react"
import { useState } from "react"
import { ArrowRightLeft, Copy, Volume2, Sparkles, Globe } from "lucide-react"
import { Navigation } from "../../components/Navigation" // Import Navigation component
import axios from "axios"


// To this:
const TRANSLATION_API = import.meta.env.VITE_TRANSLATION_API ;
const TRANSLATION_FALLBACK_API = import.meta.env.VITE_TRANSLATION_FALLBACK_API;
const LanguageTranslator: React.FC = () => {
  const [sourceText, setSourceText] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [sourceLang, setSourceLang] = useState("en")
  const [targetLang, setTargetLang] = useState("es")
  const [isTranslating, setIsTranslating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Spanish", flag: "🇪🇸" },
    { code: "fr", name: "French", flag: "🇫🇷" },
    { code: "de", name: "German", flag: "🇩🇪" },
    { code: "it", name: "Italian", flag: "🇮🇹" },
    { code: "pt", name: "Portuguese", flag: "🇵🇹" },
    { code: "ru", name: "Russian", flag: "🇷🇺" },
    { code: "ja", name: "Japanese", flag: "🇯🇵" },
    { code: "ko", name: "Korean", flag: "🇰🇷" },
    { code: "zh", name: "Chinese", flag: "🇨🇳" },
    { code: "ar", name: "Arabic", flag: "🇸🇦" },
    { code: "hi", name: "Hindi", flag: "🇮🇳" },
  ]

  const handleTranslate = async () => {
    if (!sourceText.trim()) return

    setIsTranslating(true)
    setError(null)
    
    try {
      // First try your API
      try {
        const response = await axios.post(TRANSLATION_API, {
          text: sourceText,
          targetLang: targetLang,
          sourceLang: sourceLang
        }, {
          timeout: 5000 // Set a timeout so we don't wait too long
        });
        
        // If successful, set the translated text
        if (response?.data?.translatedText) {
          setTranslatedText(response.data.translatedText);
        } else {
          throw new Error('Invalid response format');
        }
        
      } catch (primaryError) {
        console.error('Primary translation API failed:', primaryError);
        
        // Fallback to LibreTranslate API
        console.log('Falling back to LibreTranslate API...');
        const fallbackResponse = await axios.post(TRANSLATION_FALLBACK_API, {
          q: sourceText,
          source: sourceLang || 'auto',
          target: targetLang,
          format: 'text'
        }, {
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (fallbackResponse?.data?.translatedText) {
          setTranslatedText(fallbackResponse.data.translatedText);
        } else {
          throw new Error('Fallback API response invalid');
        }
      }
    } catch (error) {
      console.error('Translation error:', error);
      
      // Show user-friendly error in the translation area
      setTranslatedText("Translation failed. Please try again later.");
      
      // Add a dedicated error state for better UX
      setError("Translation service is currently unavailable. Please try again later.");
    } finally {
      setIsTranslating(false);
    }
  }

  const swapLanguages = () => {
    setSourceLang(targetLang)
    setTargetLang(sourceLang)
    setSourceText(translatedText)
    setTranslatedText(sourceText)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const speakText = (text: string, lang: string) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    speechSynthesis.speak(utterance)
  }

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Use the Navigation component */}
      <Navigation />
      
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Blue Glow Effect */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-2xl" />

      {/* Add padding-top to account for fixed navigation */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6 pt-24">
        <div className="w-full max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full text-slate-300 text-sm mb-6">
              <Globe className="w-4 h-4" />
              AI Language Translator
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Translate Any Language:</h1>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">AI translates it instantly.</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Break down language barriers with our AI-powered translator. Support for 100+ languages with natural,
              contextual translations.
            </p>
          </div>

          {/* Main Interface */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 mb-8">
            {/* Language Selection */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex-1">
                <label className="block text-white text-sm font-medium mb-2">From</label>
                <select
                  value={sourceLang}
                  onChange={(e) => setSourceLang(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code} className="bg-slate-800">
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={swapLanguages}
                className="mt-6 p-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-full transition-colors"
              >
                <ArrowRightLeft className="w-5 h-5 text-white" />
              </button>

              <div className="flex-1">
                <label className="block text-white text-sm font-medium mb-2">To</label>
                <select
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code} className="bg-slate-800">
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Translation Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Source Text */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-white text-lg font-medium">
                    {languages.find((l) => l.code === sourceLang)?.flag}{" "}
                    {languages.find((l) => l.code === sourceLang)?.name}
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => speakText(sourceText, sourceLang)}
                      disabled={!sourceText}
                      className="p-2 bg-slate-800/50 hover:bg-slate-700/50 disabled:opacity-50 rounded-lg transition-colors border border-slate-700/50"
                    >
                      <Volume2 className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={() => copyToClipboard(sourceText)}
                      disabled={!sourceText}
                      className="p-2 bg-slate-800/50 hover:bg-slate-700/50 disabled:opacity-50 rounded-lg transition-colors border border-slate-700/50"
                    >
                      <Copy className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
                <textarea
                  value={sourceText}
                  onChange={(e) => setSourceText(e.target.value)}
                  placeholder="Enter text to translate..."
                  className="w-full h-64 px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <div className="flex justify-between items-center mt-3">
                  <span className="text-slate-400 text-sm">{sourceText.length} characters</span>
                  <button
                    onClick={handleTranslate}
                    disabled={!sourceText.trim() || isTranslating}
                    className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-white font-medium rounded-lg transition-all"
                  >
                    {isTranslating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Translating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Translate
                      </>
                    )}
                  </button>
                </div>
                {error && (
                  <div className="mt-6 p-4 bg-red-900/20 border border-red-500/40 rounded-lg">
                    <div className="flex items-center justify-between">
                      <p className="text-red-400">{error}</p>
                      <button 
                        onClick={() => setError(null)}
                        className="text-xs text-red-400 hover:text-red-300 underline"
                      >
                        Dismiss
                      </button>
                    </div>
                    <div className="mt-3 text-center">
                      <a 
                        href={`https://translate.google.com/?sl=${sourceLang}&tl=${targetLang}&text=${encodeURIComponent(sourceText)}&op=translate`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline text-sm"
                      >
                        Try with Google Translate instead
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Translated Text */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-white text-lg font-medium">
                    {languages.find((l) => l.code === targetLang)?.flag}{" "}
                    {languages.find((l) => l.code === targetLang)?.name}
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => speakText(translatedText, targetLang)}
                      disabled={!translatedText}
                      className="p-2 bg-slate-800/50 hover:bg-slate-700/50 disabled:opacity-50 rounded-lg transition-colors border border-slate-700/50"
                    >
                      <Volume2 className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={() => copyToClipboard(translatedText)}
                      disabled={!translatedText}
                      className="p-2 bg-slate-800/50 hover:bg-slate-700/50 disabled:opacity-50 rounded-lg transition-colors border border-slate-700/50"
                    >
                      <Copy className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
                <div className="w-full h-64 px-4 py-3 bg-slate-800/30 border border-slate-700/50 rounded-lg text-white overflow-y-auto">
                  {translatedText || <span className="text-slate-400">Translation will appear here...</span>}
                </div>
                <div className="mt-3">
                  <span className="text-slate-400 text-sm">{translatedText.length} characters</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="text-center text-slate-400">
            <p className="text-lg">translations completed with AI Language Translator.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LanguageTranslator
