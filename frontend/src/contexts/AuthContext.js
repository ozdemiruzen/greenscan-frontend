import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('greenscan-token'));

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('greenscan-token', token);
    }
  }, [token]);

  const loginAsGuest = async () => {
    const res = await axios.post('http://localhost:8000/api/auth/guest');
    setToken(res.data.token);
  };

  return <AuthContext.Provider value={{ token, loginAsGuest }}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);