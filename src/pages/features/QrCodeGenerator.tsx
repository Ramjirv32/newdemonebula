"use client"

// import type React from "react"
import { useState, useRef } from "react"
import { Download, QrCode, Sparkles, Link, Wifi, Mail, Phone } from "lucide-react"
import { Navigation } from "../../components/Navigation"
import { QRCodeCanvas as QRCode } from "qrcode.react" // Default export, not named export

const QRCodeGenerator: React.FC = () => {
  const [qrType, setQrType] = useState("url")
  const [qrData, setQrData] = useState("")
  const [qrColor, setQrColor] = useState("#000000")
  const [bgColor, setBgColor] = useState("#ffffff")
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  
  const qrRef = useRef<HTMLDivElement>(null)

  const qrTypes = [
    { id: "url", name: "Website URL", icon: Link, placeholder: "https://example.com" },
    { id: "wifi", name: "WiFi Network", icon: Wifi, placeholder: "Network Name" },
    { id: "email", name: "Email", icon: Mail, placeholder: "email@example.com" },
    { id: "phone", name: "Phone Number", icon: Phone, placeholder: "+1234567890" },
  ]

  const colorPresets = [
    { fg: "#000000", bg: "#FFFFFF", name: "Standard" },
    { fg: "#0066CC", bg: "#FFFFFF", name: "Blue" },
    { fg: "#00CC66", bg: "#FFFFFF", name: "Green" },
    { fg: "#CC0000", bg: "#FFFFFF", name: "Red" },
    { fg: "#FFFFFF", bg: "#000000", name: "Inverse" },
    { fg: "#FFFFFF", bg: "#0066CC", name: "Blue Bg" },
  ];

  const formatQRData = () => {
    switch (qrType) {
      case "url":
        return qrData.startsWith("http") ? qrData : `https://${qrData}`
      case "wifi":
        return `WIFI:S:${qrData};T:WPA;P:password;;` // Simple WiFi format
      case "email":
        return `mailto:${qrData}`
      case "phone":
        return `tel:${qrData}`
      default:
        return qrData
    }
  }

  const generateQR = () => {
    if (!qrData.trim()) return
    
    setIsGenerating(true)
    setTimeout(() => {
      setQrCode(formatQRData())
      setIsGenerating(false)
    }, 1000)
  }

  // Improve the downloadQRCode function for better color handling
  const downloadQRCode = () => {
    if (!qrRef.current) return
    
    // Get the canvas element inside the ref container
    const canvas = qrRef.current.querySelector("canvas")
    if (!canvas) return
      
    try {
      // Create a new canvas with padding to ensure proper background
      const downloadCanvas = document.createElement("canvas");
      const context = downloadCanvas.getContext("2d");
      
      // Set dimensions with padding
      const padding = 20;
      downloadCanvas.width = canvas.width + (padding * 2);
      downloadCanvas.height = canvas.height + (padding * 2);
      
      // Fill with background color
      if (context) {
        context.fillStyle = bgColor;
        context.fillRect(0, 0, downloadCanvas.width, downloadCanvas.height);
        
        // Draw the QR code in the center
        context.drawImage(canvas, padding, padding);
        
        // Get data URL from the new canvas
        const dataURL = downloadCanvas.toDataURL("image/png");
        
        // Create and trigger download
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = `nebulx-qrcode-${qrType}-${new Date().getTime()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Error downloading QR code:", error);
      
      // Fallback to original method if the enhanced version fails
      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = `qrcode-${new Date().getTime()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
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
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full text-slate-300 text-sm mb-6">
              <QrCode className="w-4 h-4" />
              AI QR Code Generator
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Generate QR Codes:</h1>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">AI creates them instantly.</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Create custom QR codes for URLs, WiFi networks, emails, and phone numbers. Customize colors and download
              in high quality.
            </p>
          </div>

          {/* Main Interface */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Side - Configuration */}
              <div>
                {/* QR Type Selection */}
                <div className="mb-6">
                  <label className="block text-white text-lg font-medium mb-4">QR Code Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {qrTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setQrType(type.id)}
                        className={`p-4 rounded-lg border transition-all ${
                          qrType === type.id
                            ? "bg-blue-600/20 border-blue-500 text-white"
                            : "bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-700/50"
                        }`}
                      >
                        <type.icon className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                        <p className="text-sm font-medium">{type.name}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Data Input */}
                <div className="mb-6">
                  <label className="block text-white text-lg font-medium mb-4">Content</label>
                  <textarea
                    value={qrData}
                    onChange={(e) => setQrData(e.target.value)}
                    placeholder={qrTypes.find((t) => t.id === qrType)?.placeholder}
                    className="w-full h-32 px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Color Customization */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">QR Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={qrColor}
                        onChange={(e) => setQrColor(e.target.value)}
                        className="w-12 h-10 rounded border border-slate-700/50 bg-transparent"
                      />
                      <input
                        type="text"
                        value={qrColor}
                        onChange={(e) => setQrColor(e.target.value)}
                        className="flex-1 px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded text-white text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Background</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-12 h-10 rounded border border-slate-700/50 bg-transparent"
                      />
                      <input
                        type="text"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="flex-1 px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded text-white text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Color Presets */}
                <div className="mb-4">
                  <label className="block text-white text-sm font-medium mb-2">Color Presets</label>
                  <div className="flex flex-wrap gap-2">
                    {colorPresets.map((preset, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setQrColor(preset.fg);
                          setBgColor(preset.bg);
                        }}
                        className="p-2 rounded-md border border-slate-700 hover:border-blue-500 transition-colors"
                        title={preset.name}
                      >
                        <div className="w-8 h-8 rounded-sm" style={{ backgroundColor: preset.bg }}>
                          <div className="w-4 h-4 rounded-sm mx-auto mt-2" style={{ backgroundColor: preset.fg }}></div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={generateQR}
                  disabled={!qrData.trim() || isGenerating}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-105"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate QR Code
                    </>
                  )}
                </button>
              </div>

              {/* Right Side - QR Code Preview */}
              <div>
                <label className="block text-white text-lg font-medium mb-4">QR Code Preview</label>
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8 text-center">
                  {qrCode ? (
                    <div>
                      <div
                        ref={qrRef}
                        className="w-64 h-64 mx-auto mb-6 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: bgColor }}
                      >
                        <QRCode
                          value={qrCode}
                          size={200}
                          fgColor={qrColor}
                          bgColor={bgColor}
                          level="H" // High error correction for better readability
                          includeMargin={true}
                        />
                      </div>
                      <button 
                        onClick={downloadQRCode} 
                        className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Download QR Code
                      </button>
                    </div>
                  ) : (
                    <div className="text-slate-400 py-16">
                      <QrCode className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>QR code will appear here</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="text-center text-slate-400">
            <p className="text-lg">3.2M+ QR codes generated with AI QR Generator.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QRCodeGenerator
