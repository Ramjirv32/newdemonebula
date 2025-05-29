import  { createContext, useContext, useState, useEffect } from 'react';

interface User {
  firstName?: string;
  lastName?: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (firstName: string, lastName: string, email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => false,
  register: () => false,
  logout: () => {},
  isAuthenticated: false
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Login function
  const login = (email: string, password: string): boolean => {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find user with matching email
    const user = users.find((u: any) => u.email === email);
    
    // Check if user exists and password matches
    if (user && user.password === password) {
      const userData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      };
      
      // Store current user in localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Update state
      setUser(userData);
      setIsAuthenticated(true);
      return true;
    }
    
    return false;
  };

  // Register function
  const register = (firstName: string, lastName: string, email: string, password: string): boolean => {
    // Get existing users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    if (users.some((u: any) => u.email === email)) {
      return false;
    }
    
    // Create new user
    const newUser = {
      firstName,
      lastName,
      email,
      password
    };
    
    // Add user to array
    users.push(newUser);
    
    // Save back to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto login after registration
    const userData = {
      firstName,
      lastName,
      email
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
    
    return true;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};