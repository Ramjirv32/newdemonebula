"use client"

// import type React from "react"
import { useState } from "react"
import { Play, Download, Sparkles, Video } from "lucide-react"
import { Navigation } from "../../components/Navigation" // Import Navigation component

const TextToVideo: React.FC = () => {
  const [prompt, setPrompt] = useState("")
  const [duration, setDuration] = useState("30")
  const [style, setStyle] = useState("realistic")
  const [aspectRatio, setAspectRatio] = useState("16:9")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const videoStyles = [
    { id: "realistic", name: "Realistic", description: "Photorealistic video generation" },
    { id: "animated", name: "Animated", description: "Cartoon-style animation" },
    { id: "cinematic", name: "Cinematic", description: "Movie-like quality" },
    { id: "artistic", name: "Artistic", description: "Stylized artistic rendering" },
  ]

  const durations = [
    { value: "15", label: "15 seconds" },
    { value: "30", label: "30 seconds" },
    { value: "60", label: "1 minute" },
    { value: "120", label: "2 minutes" },
  ]

  const aspectRatios = [
    { value: "16:9", label: "16:9 (Landscape)" },
    { value: "9:16", label: "9:16 (Portrait)" },
    { value: "1:1", label: "1:1 (Square)" },
    { value: "4:3", label: "4:3 (Classic)" },
  ]

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setGeneratedVideo("/placeholder.mp4")
          setIsGenerating(false)
          return 100
        }
        return prev + 2
      })
    }, 200)
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
              <Video className="w-4 h-4" />
              AI Text to Video Generator
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Describe Your Video:</h1>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">AI creates it instantly.</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Transform your text descriptions into stunning videos using advanced AI. Create professional-quality
              videos in minutes, not hours.
            </p>
          </div>

          {/* Main Interface */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Side - Configuration */}
              <div>
                {/* Prompt Input */}
                <div className="mb-6">
                  <label className="block text-white text-lg font-medium mb-4">Video Description</label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the video you want to create... e.g., 'A serene sunset over a mountain lake with birds flying in the distance'"
                    className="w-full h-32 px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                  <div className="mt-2 text-slate-400 text-sm">{prompt.length}/500 characters</div>
                </div>

                {/* Video Settings */}
                <div className="space-y-6">
                  {/* Style Selection */}
                  <div>
                    <label className="block text-white text-lg font-medium mb-3">Video Style</label>
                    <div className="grid grid-cols-2 gap-3">
                      {videoStyles.map((styleOption) => (
                        <button
                          key={styleOption.id}
                          onClick={() => setStyle(styleOption.id)}
                          className={`p-4 rounded-lg border text-left transition-all ${
                            style === styleOption.id
                              ? "bg-blue-600/20 border-blue-500 text-white"
                              : "bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-700/50"
                          }`}
                        >
                          <h3 className="font-medium mb-1">{styleOption.name}</h3>
                          <p className="text-sm opacity-80">{styleOption.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Duration and Aspect Ratio */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Duration</label>
                      <select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {durations.map((dur) => (
                          <option key={dur.value} value={dur.value} className="bg-slate-800">
                            {dur.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Aspect Ratio</label>
                      <select
                        value={aspectRatio}
                        onChange={(e) => setAspectRatio(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {aspectRatios.map((ratio) => (
                          <option key={ratio.value} value={ratio.value} className="bg-slate-800">
                            {ratio.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Generate Button */}
                <div className="mt-8">
                  <button
                    onClick={handleGenerate}
                    disabled={!prompt.trim() || isGenerating}
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-105"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Generating Video... {progress}%
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Generate Video
                      </>
                    )}
                  </button>

                  {isGenerating && (
                    <div className="mt-4">
                      <div className="w-full bg-slate-700/50 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side - Preview */}
              <div>
                <label className="block text-white text-lg font-medium mb-4">Generated Video</label>
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                  {generatedVideo ? (
                    <div className="text-center">
                      <div className="bg-black rounded-lg mb-4 aspect-video flex items-center justify-center">
                        <div className="text-center text-white">
                          <Play className="w-16 h-16 mx-auto mb-4 opacity-60" />
                          <p className="text-lg">Video Preview</p>
                          <p className="text-sm opacity-60">
                            {duration}s • {aspectRatio} • {style}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3 justify-center">
                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors">
                          <Play className="w-4 h-4" />
                          Preview
                        </button>
                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-slate-400 py-16">
                      <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Generated video will appear here</p>
                      <p className="text-sm mt-2">Estimated generation time: 2-5 minutes</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="text-center text-slate-400">
            <p className="text-lg">850K+ videos created with AI Text to Video Generator.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextToVideo
