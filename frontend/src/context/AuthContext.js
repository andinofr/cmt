import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('cmt_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (role, name) => {
    const userData = {
      role, // 'CMT_TEAM' or 'GENERAL_USER'
      name,
      loginTime: new Date().toISOString()
    };
    localStorage.setItem('cmt_user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('cmt_user');
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    isCMTTeam: user?.role === 'CMT_TEAM'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
