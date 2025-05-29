import { useState, useRef, useEffect } from "react";
import { User, LogOut, Settings, ChevronDown } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const ProfileDropdown = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };
  
  if (!user) return null;
  
  const initials = user.firstName && user.lastName 
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
    : user.email.substring(0, 2).toUpperCase();
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 transition-all hover:opacity-80"
      >
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-medium">
          {initials}
        </div>
        <span className="hidden md:block text-white">{user.firstName || user.email}</span>
        <ChevronDown className="w-4 h-4 text-slate-400" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-slate-800 rounded-lg shadow-lg border border-slate-700 overflow-hidden z-50">
          <div className="p-4 border-b border-slate-700">
            <p className="text-white font-medium">
              {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : 'User'}
            </p>
            <p className="text-slate-400 text-sm truncate">{user.email}</p>
          </div>
          
          <div className="p-1">
            <button 
              className="w-full px-4 py-2 text-left text-white hover:bg-slate-700 rounded-md flex items-center space-x-2"
              onClick={() => {setIsOpen(false); navigate("/profile")}}
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </button>
            <button 
              className="w-full px-4 py-2 text-left text-white hover:bg-slate-700 rounded-md flex items-center space-x-2"
              onClick={() => {setIsOpen(false); navigate("/settings")}}
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
            <button 
              className="w-full px-4 py-2 text-left text-red-400 hover:bg-slate-700 rounded-md flex items-center space-x-2"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};