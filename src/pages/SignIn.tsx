import { Star, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AnimatedPage from "../components/AnimatedPage";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const success = login(email, password);
      
      if (success) {
        toast.success("Welcome back!");
        navigate("/");
      } else {
        toast.error("Invalid email or password");
      }
      
      setIsLoading(false);
    }, 800);
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-slate-950 text-white flex">
        {/* Left side - Form */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="max-w-md w-full">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">Nebulx</span>
              </div>
              <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
              <p className="text-slate-400">Sign in to your account to continue</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors pr-12"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-purple-600 bg-slate-900 border-slate-700 rounded focus:ring-purple-500" />
                  <span className="ml-2 text-sm text-slate-300">Remember me</span>
                </label>
                <a href="#" className="text-sm text-purple-400 hover:text-purple-300">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-slate-100 transition-colors flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2"></div>
                ) : null}
                Sign In
              </button>

              <div className="text-center">
                <span className="text-slate-400">Don't have an account? </span>
                <Link to="/register" className="text-purple-400 hover:text-purple-300">
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* Right side - Image/Illustration */}
        <div className="hidden lg:flex flex-1 bg-gradient-to-br from-purple-900/20 to-blue-900/20 items-center justify-center p-12">
          <div className="text-center">
            <div className="w-64 h-64 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-8 mx-auto">
              <div className="text-8xl">🤖</div>
            </div>
            <h2 className="text-3xl font-bold mb-4">AI-Powered Conversations</h2>
            <p className="text-slate-300 max-w-md">
              Experience the future of AI chatting with Nebulx's advanced conversational capabilities.
            </p>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default SignIn;
