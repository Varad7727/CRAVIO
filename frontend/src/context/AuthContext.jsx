import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '../api/apiClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('foodreel_auth');
    return saved ? JSON.parse(saved) : null;
  });

  const [role, setRole] = useState(() => {
    return localStorage.getItem('foodreel_role') || null; // 'user' | 'partner'
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('foodreel_auth', JSON.stringify(currentUser));
      if (role) localStorage.setItem('foodreel_role', role);
    } else {
      localStorage.removeItem('foodreel_auth');
      localStorage.removeItem('foodreel_role');
    }
  }, [currentUser, role]);

  const loginUser = async (email, password) => {
    const data = await apiClient.loginUser({ email, password });
    if (data.token || data.status === 'success' || data.user) {
      const userObj = data.user || { email, _id: 'demo-user-1' };
      setCurrentUser(userObj);
      setRole('user');
    }
    return data;
  };

  const registerUser = async (fullName, email, password) => {
    const data = await apiClient.registerUser({ fullName, email, password });
    if (data.token || data.status === 'success') {
      setCurrentUser({ fullName, email, _id: 'new-user-id' });
      setRole('user');
    }
    return data;
  };

  const loginPartner = async (email, password) => {
    const data = await apiClient.loginFoodPartner({ email, password });
    if (data.token || data.foodPartner) {
      const partnerObj = data.foodPartner || { email, name: 'Food Partner', _id: 'demo-partner-1' };
      setCurrentUser(partnerObj);
      setRole('partner');
    }
    return data;
  };

  const registerPartner = async (partnerData) => {
    const data = await apiClient.registerFoodPartner(partnerData);
    if (data.token || data.status === 'success') {
      setCurrentUser({ ...partnerData, _id: 'new-partner-id' });
      setRole('partner');
    }
    return data;
  };

  const logout = async () => {
    try {
      if (role === 'partner') {
        await apiClient.logoutFoodPartner();
      } else {
        await apiClient.logoutUser();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setCurrentUser(null);
      setRole(null);
    }
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      role,
      isAuthenticated: !!currentUser,
      loginUser,
      registerUser,
      loginPartner,
      registerPartner,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
