import { Link } from "react-router-dom";
import { Star, Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { ProfileDropdown } from "./ProfileDropdown";
// import { GiGalaxy } from 'react-icons/gi';

export const Navigation = () => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Nebulx</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            {isAuthenticated ? (
              <ProfileDropdown />
            ) : (
              <>
                <Link to="/signin" className="text-slate-300 hover:text-white transition-colors">
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="bg-white text-black px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
          
          <button className="md:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};
