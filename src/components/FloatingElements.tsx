
export const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-purple-500 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-blue-500 rounded-full opacity-40 animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-20 w-8 h-8 bg-cyan-500 rounded-full opacity-30 animate-pulse delay-2000"></div>
      <div className="absolute bottom-20 right-10 w-5 h-5 bg-green-500 rounded-full opacity-50 animate-pulse delay-500"></div>
      
      {/* Gradient overlays */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
    </div>
  );
};
