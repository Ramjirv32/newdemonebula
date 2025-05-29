import { Star, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AnimatedPage from "../components/AnimatedPage";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    if (!agreeToTerms) {
      toast.error("You must agree to the Terms of Service");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const success = register(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password
      );
      
      if (success) {
        toast.success("Account created successfully!");
        navigate("/");
      } else {
        toast.error("Email already exists");
      }
      
      setIsLoading(false);
    }, 800);
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-slate-950 text-white flex">
        {/* Left side - Image/Illustration */}
        <div className="hidden lg:flex flex-1 bg-gradient-to-br from-purple-900/20 to-blue-900/20 items-center justify-center p-12">
          <div className="text-center">
            <div className="w-64 h-64 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-8 mx-auto">
              <div className="text-8xl">✨</div>
            </div>
            <h2 className="text-3xl font-bold mb-4">Join the AI Revolution</h2>
            <p className="text-slate-300 max-w-md">
              Create your account and start experiencing the power of AI with Nebulx today.
            </p>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="max-w-md w-full">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">Nebulx</span>
              </div>
              <h1 className="text-3xl font-bold mb-2">Create account</h1>
              <p className="text-slate-400">Sign up to get started with Nebulx</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                    First name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                    Last name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="john@example.com"
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
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors pr-12"
                    placeholder="Create a password"
                    required
                    minLength={6}
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

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors pr-12"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="terms"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="w-4 h-4 text-purple-600 bg-slate-900 border-slate-700 rounded focus:ring-purple-500" 
                />
                <label htmlFor="terms" className="ml-2 text-sm text-slate-300">
                  I agree to the <a href="#" className="text-purple-400 hover:text-purple-300">Terms of Service</a> and <a href="#" className="text-purple-400 hover:text-purple-300">Privacy Policy</a>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-slate-100 transition-colors flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2"></div>
                ) : null}
                Create Account
              </button>

              <div className="text-center">
                <span className="text-slate-400">Already have an account? </span>
                <Link to="/signin" className="text-purple-400 hover:text-purple-300">
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Register;
