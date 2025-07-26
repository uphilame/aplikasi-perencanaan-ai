
import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthUser } from '../types';
import { callBackend } from '../services/api';

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  apiKey: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  updateApiKey: (key: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => JSON.parse(localStorage.getItem('user') || 'null'));
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [apiKey, setApiKey] = useState<string | null>(() => localStorage.getItem('apiKey'));
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token || '');
    localStorage.setItem('apiKey', apiKey || '');
  }, [user, token, apiKey]);

  const login = useCallback(async (email: string, pass: string) => {
    setIsLoading(true);
    try {
      const response = await callBackend('login', { email, password: pass });
      
      if (response.status === 'success' && response.token && response.user) {
        setUser(response.user);
        setToken(response.token);
        navigate('/');
      } else {
        throw new Error(response.message || 'Respons login tidak valid dari server.');
      }

    } catch (error) {
       if (error instanceof Error) throw error;
       throw new Error("Login gagal. Periksa koneksi dan pastikan backend aktif.");
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);
  
  const register = useCallback(async (email: string, pass: string) => {
    setIsLoading(true);
    try {
      const response = await callBackend('register', { email, password: pass });
      
      if (response.status === 'success') {
        // Setelah registrasi berhasil, otomatis loginkan pengguna
        await login(email, pass);
      } else {
        throw new Error(response.message || 'Registrasi gagal.');
      }

    } catch (error) {
       if (error instanceof Error) throw error;
       throw new Error("Registrasi gagal. Email mungkin sudah terdaftar atau ada masalah koneksi.");
    } finally {
      setIsLoading(false);
    }
  }, [login]);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    // Jangan hapus API key saat logout agar lebih nyaman bagi pengguna
    navigate('/login');
  }, [navigate]);

  const updateApiKey = useCallback((key: string) => {
    setApiKey(key);
  }, []);

  const contextValue = useMemo(() => ({
    user,
    token,
    apiKey,
    isAuthenticated: !!token,
    isLoading,
    login,
    register,
    logout,
    updateApiKey,
  }), [user, token, apiKey, isLoading, login, register, logout, updateApiKey]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
