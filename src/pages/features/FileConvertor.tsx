"use client"

// Updated imports - add axios for easier API handling
// import type React from "react"
import { useState, useEffect } from "react"
import { Upload, Download, FileText, ImageIcon, Music, Video, Sparkles } from "lucide-react"
import { Navigation } from "../../components/Navigation"
import axios from 'axios' // Make sure to install axios: npm install axios


// To this:
const CLOUDCONVERT_API_KEY = import.meta.env.VITE_CLOUDCONVERT_API_KEY ;
const FILE_CONVERSION_API = import.meta.env.VITE_FILE_CONVERSION_API ;
const FileConverter: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [targetFormat, setTargetFormat] = useState("")
  const [isConverting, setIsConverting] = useState(false)
  const [convertedFile, setConvertedFile] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [conversionProgress, setConversionProgress] = useState(0)
  const [jobId, setJobId] = useState<string | null>(null)

  const fileTypes = [
    { category: "Document", formats: ["PDF", "DOCX", "TXT", "RTF"], icon: FileText },
    { category: "Image", formats: ["JPG", "PNG", "WEBP", "GIF"], icon: ImageIcon },
    { category: "Audio", formats: ["MP3", "WAV", "AAC", "FLAC"], icon: Music },
    { category: "Video", formats: ["MP4", "AVI", "MOV", "WEBM"], icon: Video },
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setConvertedFile(null)
      setDownloadUrl(null)
      setError(null)
    }
  }

  // Function to create a pre-signed upload URL for direct browser-to-S3 upload
  const createUploadUrl = async (file: File) => {
    try {
      const response = await axios.post(
        'https://api.cloudconvert.com/v2/import/upload',
        {},
        {
          headers: {
            Authorization: `Bearer ${CLOUDCONVERT_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        uploadUrl: response.data.data.url,
        uploadId: response.data.data.id
      };
    } catch (error) {
      console.error('Error creating upload URL:', error);
      throw new Error('Failed to initialize file upload');
    }
  };

  // Function to upload the file directly to CloudConvert's storage
  const uploadFile = async (file: File, uploadUrl: string) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      await axios.post(uploadUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return true;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Failed to upload file');
    }
  };

  // Create a conversion job with CloudConvert
  const createConversionJob = async (uploadId: string, targetFormat: string) => {
    try {
      // Determine input and output format
      const fileExt = selectedFile?.name.split('.').pop()?.toLowerCase() || '';
      
      const jobResponse = await axios.post(
        'https://api.cloudconvert.com/v2/jobs',
        {
          tasks: {
            'import-file': {
              operation: 'import/upload',
              upload_id: uploadId
            },
            'convert-file': {
              operation: 'convert',
              input: 'import-file',
              output_format: targetFormat.toLowerCase()
            },
            'export-file': {
              operation: 'export/url',
              input: 'convert-file',
              inline: false,
              archive_multiple_files: false
            }
          }
        },
        {
          headers: {
            Authorization: `Bearer ${CLOUDCONVERT_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return jobResponse.data.data.id;
    } catch (error) {
      console.error('Error creating conversion job:', error);
      throw new Error('Failed to create conversion job');
    }
  };

  // Check job status and get download URL when complete
  const checkJobStatus = async (jobId: string) => {
    try {
      const response = await axios.get(
        `https://api.cloudconvert.com/v2/jobs/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${CLOUDCONVERT_API_KEY}`
          }
        }
      );

      const jobData = response.data.data;
      
      // Calculate approximate progress
      const tasks = jobData.tasks || [];
      const totalTasks = tasks.length;
      let completedTasks = 0;
      
      tasks.forEach((task: any) => {
        if (['finished', 'error'].includes(task.status)) {
          completedTasks++;
        }
      });
      
      setConversionProgress(Math.round((completedTasks / totalTasks) * 100));

      if (jobData.status === 'finished') {
        // Find the export task and get download URL
        const exportTask = tasks.find((t: any) => t.name === 'export-file');
        if (exportTask && exportTask.result && exportTask.result.files) {
          return {
            status: 'finished',
            url: exportTask.result.files[0].url
          };
        }
      } else if (jobData.status === 'error') {
        // Find the error message
        const errorTask = tasks.find((t: any) => t.status === 'error');
        const errorMessage = errorTask ? errorTask.message : 'Unknown error';
        return {
          status: 'error',
          message: errorMessage
        };
      }
      
      return {
        status: 'processing'
      };
    } catch (error) {
      console.error('Error checking job status:', error);
      throw new Error('Failed to check conversion status');
    }
  };

  // Poll job status periodically
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (jobId && isConverting) {
      interval = setInterval(async () => {
        try {
          const status = await checkJobStatus(jobId);
          
          if (status.status === 'finished') {
            clearInterval(interval);
            setIsConverting(false);
            setDownloadUrl(status.url);
            
            // Set the converted file name
            const originalName = selectedFile?.name.split('.')[0];
            setConvertedFile(`${originalName}.${targetFormat.toLowerCase()}`);
            setConversionProgress(100);
          } else if (status.status === 'error') {
            clearInterval(interval);
            setIsConverting(false);
            setError(`Conversion failed: ${status.message}`);
            setConversionProgress(0);
          }
          // 'processing' status just keeps the interval going
        } catch (error) {
          clearInterval(interval);
          setIsConverting(false);
          setError('Failed to check conversion status');
        }
      }, 3000); // Poll every 3 seconds
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [jobId, isConverting, selectedFile, targetFormat]);

  // Add this function for direct CloudConvert conversion as a fallback
  const convertWithCloudConvert = async (file: File, targetFormat: string) => {
    try {
      setError(null);
      setConversionProgress(10);
      console.log("Falling back to direct CloudConvert API");
      
      // Step 1: Create a job with all tasks in one request
      const jobResponse = await axios.post(
        'https://api.cloudconvert.com/v2/jobs',
        {
          tasks: {
            'upload-file': {
              operation: 'import/upload'
            },
            'convert-file': {
              operation: 'convert',
              input: 'upload-file',
              output_format: targetFormat.toLowerCase()
            },
            'export-file': {
              operation: 'export/url',
              input: 'convert-file'
            }
          }
        },
        {
          headers: {
            Authorization: `Bearer ${CLOUDCONVERT_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      setConversionProgress(20);
      console.log("Job created:", jobResponse.data);
      
      // Get the upload task details
      const uploadTask = jobResponse.data.data.tasks.find(
        (task: any) => task.name === 'upload-file'
      );
      
      if (!uploadTask || !uploadTask.result || !uploadTask.result.form) {
        throw new Error('Upload task not found in response');
      }
      
      const uploadUrl = uploadTask.result.form.url;
      
      // Step 2: Upload file with the proper parameters from the API
      const form = new FormData();
      
      // Add all parameters required by CloudConvert
      Object.entries(uploadTask.result.form.parameters).forEach(([key, value]) => {
        form.append(key, value as string);
      });
      
      // Add the file last
      form.append('file', file);
      
      setConversionProgress(30);
      console.log("Uploading file to CloudConvert...");
      
      // Upload the file
      await axios.post(uploadUrl, form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 30) / (progressEvent.total || 100)
          );
          setConversionProgress(30 + percentCompleted); // 30-60% range
        }
      });
      
      setConversionProgress(60);
      console.log("File uploaded successfully");
      
      // Step 3: Wait for job completion by polling
      const jobId = jobResponse.data.data.id;
      let jobComplete = false;
      let retryCount = 0;
      let resultUrl = "";
      
      while (!jobComplete && retryCount < 30) { // Max 90 seconds (30 x 3s)
        await new Promise(resolve => setTimeout(resolve, 3000)); // Wait 3 seconds between checks
        
        const statusResponse = await axios.get(
          `https://api.cloudconvert.com/v2/jobs/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${CLOUDCONVERT_API_KEY}`
            }
          }
        );
        
        const job = statusResponse.data.data;
        
        // Update progress
        setConversionProgress(60 + Math.min(30, retryCount * 3)); // 60-90% range
        
        if (job.status === 'finished') {
          // Find export task to get download URL
          const exportTask = job.tasks.find((t: any) => t.name === 'export-file');
          
          if (exportTask?.result?.files?.length > 0) {
            resultUrl = exportTask.result.files[0].url;
            jobComplete = true;
          }
        } else if (job.status === 'error') {
          throw new Error('CloudConvert job failed');
        }
        
        retryCount++;
      }
      
      if (!resultUrl) {
        throw new Error('Timed out waiting for conversion');
      }
      
      setConversionProgress(100);
      return resultUrl;
      
    } catch (error) {
      console.error("Direct CloudConvert error:", error);
      throw error;
    }
  };

  // Update your handleConvert function to include fallback
  const handleConvert = async () => {
    if (!selectedFile || !targetFormat) return;
    
    if (selectedFile.size > 100 * 1024 * 1024) {
      setError("File size exceeds 100MB limit.");
      return;
    }

    setIsConverting(true);
    setError(null);
    setConversionProgress(10);
    setDownloadUrl(null);
    setJobId(null);
    
    try {
      try {
        // First attempt: Try using the backend server
        const formData = new FormData();
        formData.append('file', selectedFile);
        
        const outputFormat = targetFormat.toLowerCase();
        
        const response = await axios.post(
          `${FILE_CONVERSION_API}?outputFormat=${outputFormat}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
              const uploadProgress = Math.round(
                (progressEvent.loaded * 50) / (progressEvent.total || 100)
              );
              setConversionProgress(uploadProgress);
            },
            // Add shorter timeout to quickly fall back if server is having issues
            timeout: 15000
          }
        );
        
        // If backend works, use its response
        setConversionProgress(75);
        
        if (response.data && response.data.downloadUrl) {
          setDownloadUrl(response.data.downloadUrl);
          
          const originalName = selectedFile.name.split('.')[0];
          setConvertedFile(`${originalName}.${targetFormat.toLowerCase()}`);
          setConversionProgress(100);
          
          setIsConverting(false);
          return; // Success! Exit early
        }
        
      } catch (backendError) {
        // If backend fails, log the error but don't give up
        console.warn("Backend conversion failed, trying direct CloudConvert:", backendError);
        // Don't set error state yet - we'll try the fallback first
      }
      
      // Fallback: Use CloudConvert directly
      const directDownloadUrl = await convertWithCloudConvert(selectedFile, targetFormat);
      setDownloadUrl(directDownloadUrl);
      
      // Set the converted file name
      const originalName = selectedFile.name.split('.')[0];
      setConvertedFile(`${originalName}.${targetFormat.toLowerCase()}`);
      setConversionProgress(100);
      
      // Conversion is complete
      setIsConverting(false);
      
    } catch (error) {
      console.error("Conversion error:", error);
      let errorMessage = "An error occurred during conversion.";
      
      if (axios.isAxiosError(error) && error.response) {
        // Try to extract more specific error details
        if (error.response.data && error.response.data.message) {
          errorMessage = `Error: ${error.response.data.message}`;
        } else if (error.response.status === 500) {
          errorMessage = "The server encountered an error. Please try again or select a different format.";
        } else if (error.response.status === 413) {
          errorMessage = "The file is too large for conversion.";
        }
      }
      
      setError(errorMessage);
      setIsConverting(false);
      setConversionProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Navigation component remains the same */}
      <Navigation />
      
      {/* Grid Background - remains the same */}
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

      {/* Blue Glow Effect - remains the same */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-2xl" />

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6 pt-24">
        <div className="relative z-10 px-6 py-12 max-w-6xl mx-auto">
          {/* Feature Header - remains the same */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full text-slate-300 text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              AI File Converter
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Convert Any File Format
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Upload your file and convert it to any format you need. Our CloudConvert-powered converter supports documents, images, audio, and video files.
            </p>
          </div>

          {/* Main Converter Interface */}
          <div className="bg-slate-900/60 backdrop-blur-md border border-blue-900/30 rounded-3xl p-8 mb-8 shadow-xl shadow-blue-900/10">
            {/* File Upload Area - remains the same */}
            <div className="mb-8">
              <label className="block text-white text-lg font-medium mb-4">Upload File</label>
              <div className="relative cursor-pointer group">
                <input 
                  type="file"
                  id="file-upload"
                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-50" 
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.mp3,.mp4,.wav,.avi,.mov"
                />
                <label 
                  htmlFor="file-upload" 
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium rounded-xl transition-all duration-300 shadow-lg shadow-purple-900/20 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    {selectedFile ? 'Change File' : 'Select File'}
                  </span>
                </label>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/20 to-blue-400/20 blur-lg group-hover:blur-xl transition-all duration-300 -z-10"></div>
              </div>
              
              {/* Selected file details - remains the same */}
              {selectedFile && (
                <div className="mt-4 bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <FileText className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{selectedFile.name}</p>
                        <p className="text-slate-400 text-sm">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedFile(null)} 
                      className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-700/50"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Format Selection - remains mostly the same */}
            {selectedFile && (
              <div className="mb-8">
                <label className="block text-white text-lg font-medium mb-2">Convert To</label>
                <p className="text-slate-400 mb-4">Select your desired output format</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {fileTypes.map((type) => (
                    <div key={type.category} className="bg-slate-800/40 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
                      <div className="flex items-center gap-2 mb-3">
                        <type.icon className="w-5 h-5 text-blue-400" />
                        <h3 className="text-white font-medium">{type.category}</h3>
                      </div>
                      <div className="space-y-2">
                        {type.formats.map((format) => (
                          <button
                            key={format}
                            onClick={() => setTargetFormat(format)}
                            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                              targetFormat === format
                                ? "bg-blue-600 text-white font-medium"
                                : "text-gray-300 hover:bg-slate-700/50"
                            }`}
                          >
                            {format}
                            {targetFormat === format && (
                              <span className="float-right">✓</span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Convert Button - remains the same */}
            {selectedFile && targetFormat && (
              <div className="text-center">
                <div className="mb-3 flex justify-center items-center gap-2 text-slate-300">
                  <FileText className="w-4 h-4" />
                  <span>{selectedFile.name}</span>
                  <span className="text-slate-500 mx-2">→</span>
                  <span className="bg-blue-600/30 px-2 py-1 rounded text-blue-200">{targetFormat}</span>
                </div>
                
                <button
                  onClick={handleConvert}
                  disabled={isConverting}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-blue-900/20"
                >
                  {isConverting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Converting... {conversionProgress > 0 && `${conversionProgress}%`}
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Convert File
                    </>
                  )}
                </button>
              </div>
            )}

            {/* New progress bar for conversion status */}
            {isConverting && conversionProgress > 0 && (
              <div className="mt-8">
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    style={{ width: `${conversionProgress}%` }}
                  ></div>
                </div>
                <p className="text-slate-400 text-center mt-2">Processing your file...</p>
              </div>
            )}

            {/* Download Result - remains mostly the same */}
            {convertedFile && downloadUrl && (
              <div className="mt-8 p-6 bg-green-900/10 border border-green-500/20 rounded-xl text-center">
                <Download className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <p className="text-white text-lg mb-4">Conversion Complete!</p>
                <a 
                  href={downloadUrl}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-lg transition-colors shadow-lg shadow-green-900/20"
                >
                  <Download className="w-4 h-4" />
                  Download {convertedFile}
                </a>
              </div>
            )}

            {/* Error Display - remains the same */}
            {error && (
              <div className="mt-8 p-6 bg-red-900/10 border border-red-500/20 rounded-xl text-center">
                <p className="text-red-400">{error}</p>
                <button 
                  onClick={() => setError(null)} 
                  className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm rounded-lg"
                >
                  Dismiss
                </button>
              </div>
            )}
          </div>

          {/* Stats - remains the same */}
          <div className="text-center text-gray-400">
            <p className="text-lg">2.5M+ files converted with Nebulx File Converter.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FileConverter
