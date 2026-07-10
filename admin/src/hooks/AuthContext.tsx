import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';

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
      const apiUrl = import.meta.env.VITE_API_URL || 'https://hartapi.digiindiasolutions.com';
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        let errorMessage = 'E-Mail oder Passwort ist falsch';
        try {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.error || errorMessage;
          } else {
            const textData = await response.text();
            errorMessage = textData || errorMessage;
          }
        } catch (e) {
          // Ignore parsing error
        }
        return { success: false, error: errorMessage };
      }

      const data = await response.json();

      if (data.success) {
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
      return { success: false, error: error.message || 'Verbindung zum Server failed' };
    }
  }, []);

  const logout = useCallback(async () => {
    const token = sessionStorage.getItem('haertner_token');
    if (token) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'https://hartapi.digiindiasolutions.com';
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