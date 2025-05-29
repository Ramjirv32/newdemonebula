import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import AnimatedPage from "../components/AnimatedPage";
import { Navigation } from "../components/Navigation";
import { User, Mail, LogOut } from "lucide-react";

const Profile = () => {
  const { user, logout, isAuthenticated } = useAuth();
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }
  
  return (
    <AnimatedPage>
      <div className="min-h-screen bg-slate-950 text-white">
        <Navigation />
        
        <div className="pt-24 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-xl p-8">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-4xl font-semibold">
                  {user?.firstName?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
                </div>
                
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-4 text-center md:text-left">
                    {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'User Profile'}
                  </h1>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-slate-400" />
                      <div>
                        <p className="text-sm text-slate-400">Full Name</p>
                        <p className="text-white">{user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'Not provided'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-slate-400" />
                      <div>
                        <p className="text-sm text-slate-400">Email</p>
                        <p className="text-white">{user?.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-slate-800">
                    <button 
                      onClick={() => logout()}
                      className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Profile;