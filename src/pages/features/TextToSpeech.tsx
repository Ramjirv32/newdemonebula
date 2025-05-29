"use client"

// import type React from "react"
import { useState } from "react"
import { Play, Pause, Download, Volume2, Sparkles, Mic } from "lucide-react"
import { Navigation } from "../../components/Navigation" // Import Navigation component

const TextToSpeech: React.FC = () => {
  const [text, setText] = useState("")
  const [selectedVoice, setSelectedVoice] = useState("female-1")
  const [speed, setSpeed] = useState(1)
  const [pitch, setPitch] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)

  const voices = [
    { id: "female-1", name: "Sarah", gender: "Female", accent: "American", description: "Warm and professional" },
    { id: "male-1", name: "David", gender: "Male", accent: "American", description: "Clear and confident" },
    { id: "female-2", name: "Emma", gender: "Female", accent: "British", description: "Elegant and sophisticated" },
    { id: "male-2", name: "James", gender: "Male", accent: "British", description: "Distinguished and authoritative" },
    { id: "female-3", name: "Maria", gender: "Female", accent: "Spanish", description: "Expressive and melodic" },
    { id: "male-3", name: "Alex", gender: "Male", accent: "Canadian", description: "Friendly and approachable" },
  ]

  const handleGenerate = async () => {
    if (!text.trim()) return

    setIsGenerating(true)
    setTimeout(() => {
      setAudioUrl("/placeholder-audio.mp3")
      setIsGenerating(false)
    }, 3000)
  }

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  const previewVoice = (voiceId: string) => {
    console.log(`Previewing voice: ${voiceId}`)
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
              <Volume2 className="w-4 h-4" />
              AI Text to Speech
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Convert Text to Speech:</h1>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">AI voices it instantly.</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Transform any text into natural-sounding speech with our AI-powered voices. Choose from multiple voices,
              accents, and customize speed and pitch.
            </p>
          </div>

          {/* Main Interface */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Side - Text Input and Settings */}
              <div>
                {/* Text Input */}
                <div className="mb-6">
                  <label className="block text-white text-lg font-medium mb-4">Text to Convert</label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter the text you want to convert to speech..."
                    className="w-full h-48 px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                  <div className="mt-2 flex justify-between text-sm text-slate-400">
                    <span>{text.length} characters</span>
                    <span>~{Math.ceil(text.length / 150)} minutes</span>
                  </div>
                </div>

                {/* Voice Selection */}
                <div className="mb-6">
                  <label className="block text-white text-lg font-medium mb-4">Voice Selection</label>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {voices.map((voice) => (
                      <div
                        key={voice.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          selectedVoice === voice.id
                            ? "bg-blue-600/20 border-blue-500"
                            : "bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50"
                        }`}
                        onClick={() => setSelectedVoice(voice.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-white font-medium">{voice.name}</h3>
                            <p className="text-slate-400 text-sm">
                              {voice.gender} • {voice.accent}
                            </p>
                            <p className="text-slate-500 text-xs mt-1">{voice.description}</p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              previewVoice(voice.id)
                            }}
                            className="p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors border border-slate-600/50"
                          >
                            <Play className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Audio Settings */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Speed</label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={speed}
                        onChange={(e) => setSpeed(Number.parseFloat(e.target.value))}
                        className="w-full accent-blue-500"
                      />
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>0.5x</span>
                        <span>{speed}x</span>
                        <span>2x</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Pitch</label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={pitch}
                        onChange={(e) => setPitch(Number.parseFloat(e.target.value))}
                        className="w-full accent-blue-500"
                      />
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Low</span>
                        <span>{pitch}x</span>
                        <span>High</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={handleGenerate}
                  disabled={!text.trim() || isGenerating}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-105"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Generating Audio...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate Speech
                    </>
                  )}
                </button>
              </div>

              {/* Right Side - Audio Player */}
              <div>
                <label className="block text-white text-lg font-medium mb-4">Generated Audio</label>
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8">
                  {audioUrl ? (
                    <div className="text-center">
                      {/* Audio Visualizer Placeholder */}
                      <div className="bg-black/20 rounded-lg p-8 mb-6">
                        <div className="flex items-center justify-center space-x-1 h-24">
                          {[...Array(20)].map((_, i) => (
                            <div
                              key={i}
                              className="bg-blue-500 w-2 rounded-full animate-pulse"
                              style={{
                                height: `${Math.random() * 60 + 20}px`,
                                animationDelay: `${i * 0.1}s`,
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Audio Controls */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-center gap-4">
                          <button
                            onClick={togglePlayback}
                            className="p-4 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
                          >
                            {isPlaying ? (
                              <Pause className="w-6 h-6 text-white" />
                            ) : (
                              <Play className="w-6 h-6 text-white" />
                            )}
                          </button>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-slate-700/50 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full w-1/3" />
                        </div>

                        {/* Time Display */}
                        <div className="flex justify-between text-sm text-slate-400">
                          <span>0:45</span>
                          <span>2:30</span>
                        </div>

                        {/* Download Button */}
                        <button className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors">
                          <Download className="w-4 h-4" />
                          Download Audio
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-slate-400 py-16">
                      <Mic className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Generated audio will appear here</p>
                      <p className="text-sm mt-2">High-quality MP3 format</p>
                    </div>
                  )}
                </div>

                {/* Voice Info */}
                {selectedVoice && (
                  <div className="mt-6 p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg">
                    <h3 className="text-white font-medium mb-2">Selected Voice</h3>
                    <div className="text-slate-300 text-sm">
                      <p>
                        <strong>{voices.find((v) => v.id === selectedVoice)?.name}</strong>
                      </p>
                      <p>
                        {voices.find((v) => v.id === selectedVoice)?.gender} •{" "}
                        {voices.find((v) => v.id === selectedVoice)?.accent}
                      </p>
                      <p className="text-slate-400 mt-1">{voices.find((v) => v.id === selectedVoice)?.description}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="text-center text-slate-400">
            <p className="text-lg">4.3M+ audio files generated with AI Text to Speech.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextToSpeech
