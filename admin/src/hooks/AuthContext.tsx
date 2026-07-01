import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('haertner_auth') === 'true';
  });

  const login = useCallback(async (email: string, password: string) => {
    if (!email.trim() || !password.trim()) {
      return { success: false, error: 'Bitte füllen Sie alle Felder aus.' };
    }
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        sessionStorage.setItem('haertner_auth', 'true');
        sessionStorage.setItem('haertner_token', data.token);
        if (data.refreshToken) {
          sessionStorage.setItem('haertner_refresh_token', data.refreshToken);
        }
        if (data.user) {
          sessionStorage.setItem('haertner_user', JSON.stringify(data.user));
        }
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, error: data.message || 'E-Mail oder Passwort ist falsch' };
      }
    } catch (error: any) {
      console.error('Login error:', error);
      return { success: false, error: 'Verbindung zum Server failed' };
    }
  }, []);

  const logout = useCallback(async () => {
    const token = sessionStorage.getItem('haertner_token');
    if (token) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        await fetch(`${apiUrl}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Logout API error:', error);
      }
    }
    sessionStorage.removeItem('haertner_auth');
    sessionStorage.removeItem('haertner_token');
    sessionStorage.removeItem('haertner_refresh_token');
    sessionStorage.removeItem('haertner_user');
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}