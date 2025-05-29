"use client"

// import type React from "react"
import { useState } from "react"
import { Upload, Download, Sparkles, Zap, Palette, Focus, Maximize } from "lucide-react"
import { Navigation } from "../../components/Navigation" // Import Navigation component

const ImageEnhancer: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [enhancementType, setEnhancementType] = useState("")
  const [isEnhancing, setIsEnhancing] = useState(false)
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null)

  const enhancementOptions = [
    { id: "upscale", name: "AI Upscale", description: "Increase resolution 4x", icon: Maximize },
    { id: "denoise", name: "Noise Reduction", description: "Remove grain and artifacts", icon: Focus },
    { id: "colorize", name: "Colorization", description: "Add natural colors", icon: Palette },
    { id: "enhance", name: "Smart Enhance", description: "Overall quality boost", icon: Zap },
  ]

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      setEnhancedImage(null)
    }
  }

  const handleEnhance = async () => {
    if (!selectedImage || !enhancementType) return

    setIsEnhancing(true)
    setTimeout(() => {
      setEnhancedImage(imagePreview)
      setIsEnhancing(false)
    }, 4000)
  }

  const downloadEnhancedImage = () => {
    if (!enhancedImage) return;
    
    // Create a link element
    const link = document.createElement("a");
    
    // Set the link's href to the enhanced image data URL
    link.href = enhancedImage;
    
    // Determine file extension from original file
    const fileExtension = selectedImage?.name.split('.').pop()?.toLowerCase() || 'jpg';
    
    // Create a filename with enhancement type
    const fileName = `nebulx-${enhancementType}-${new Date().getTime()}.${fileExtension}`;
    
    // Set the download attribute with the filename
    link.download = fileName;
    
    // Append to body (not visible)
    document.body.appendChild(link);
    
    // Trigger click
    link.click();
    
    // Clean up
    document.body.removeChild(link);
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
              <Sparkles className="w-4 h-4" />
              AI Image Enhancer
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Enhance Your Images:</h1>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">AI transforms them instantly.</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Upload any image and let our AI enhance it with advanced algorithms. Upscale, denoise, colorize, or boost
              overall quality.
            </p>
          </div>

          {/* Main Interface */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Side - Upload and Options */}
              <div>
                {/* Image Upload */}
                <div className="mb-8">
                  <label className="block text-white text-lg font-medium mb-4">Upload Image</label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept="image/*"
                    />
                    <div className="border-2 border-dashed border-slate-600/50 rounded-xl p-8 text-center hover:border-slate-500/50 transition-colors bg-slate-800/30">
                      {imagePreview ? (
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Preview"
                          className="max-w-full max-h-48 mx-auto rounded-lg"
                        />
                      ) : (
                        <>
                          <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                          <p className="text-white text-lg mb-2">Click to upload or drag and drop</p>
                          <p className="text-slate-400">PNG, JPG, WEBP up to 10MB</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Enhancement Options */}
                {selectedImage && (
                  <div className="mb-8">
                    <label className="block text-white text-lg font-medium mb-4">Enhancement Type</label>
                    <div className="space-y-3">
                      {enhancementOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setEnhancementType(option.id)}
                          className={`w-full text-left p-4 rounded-lg border transition-all ${
                            enhancementType === option.id
                              ? "bg-blue-600/20 border-blue-500 text-white"
                              : "bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-700/50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <option.icon className="w-6 h-6 text-blue-400" />
                            <div>
                              <h3 className="font-medium">{option.name}</h3>
                              <p className="text-sm opacity-80">{option.description}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Enhance Button */}
                {selectedImage && enhancementType && (
                  <button
                    onClick={handleEnhance}
                    disabled={isEnhancing}
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-105"
                  >
                    {isEnhancing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Enhancing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Enhance Image
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Right Side - Result */}
              <div>
                <label className="block text-white text-lg font-medium mb-4">Enhanced Result</label>
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 h-96 flex items-center justify-center">
                  {enhancedImage ? (
                    <div className="text-center">
                      <img
                        src={enhancedImage || "/placeholder.svg"}
                        alt="Enhanced"
                        className="max-w-full max-h-64 mx-auto rounded-lg mb-4"
                      />
                      <button 
                        onClick={downloadEnhancedImage}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Download Enhanced
                      </button>
                    </div>
                  ) : (
                    <div className="text-center text-slate-400">
                      <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Enhanced image will appear here</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="text-center text-slate-400">
            <p className="text-lg">1.8M+ images enhanced with AI Image Enhancer.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageEnhancer
