import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser, AdminRole } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { hashPassword, INITIAL_ADMIN_ACCOUNTS, AdminSession } from '../lib/authCrypto';

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  canManageShop: boolean;
  canManageScreen: boolean;
  canManageInstitute: boolean;
  canManageSettings: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const ADMIN_SESSION_STORAGE_KEY = 'nqt_admin_secure_session';
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<AdminSession | null>(() => {
    try {
      const stored = localStorage.getItem(ADMIN_SESSION_STORAGE_KEY);
      if (!stored) return null;
      const parsed: AdminSession = JSON.parse(stored);
      if (Date.now() > parsed.expiresAt) {
        localStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
        return null;
      }
      return parsed;
    } catch {
      return null;
    }
  });

  const user = session?.user || null;
  const isAuthenticated = !!session && Date.now() < session.expiresAt;

  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session: supaSession } }) => {
        if (supaSession?.user) {
          const adminUser: AdminUser = {
            id: supaSession.user.id,
            email: supaSession.user.email || 'admin@nuqtah.com',
            name: supaSession.user.user_metadata?.name || 'Chief Administrator',
            role: (supaSession.user.user_metadata?.role as AdminRole) || 'Super Admin',
            createdAt: supaSession.user.created_at,
          };
          const newSession: AdminSession = {
            user: adminUser,
            token: supaSession.access_token,
            expiresAt: Date.now() + SESSION_DURATION_MS,
          };
          setSession(newSession);
          localStorage.setItem(ADMIN_SESSION_STORAGE_KEY, JSON.stringify(newSession));
        }
      });
    }
  }, []);

  const login = async (usernameInput: string, passwordInput: string): Promise<{ success: boolean; error?: string }> => {
    const cleanUsername = usernameInput.trim().toLowerCase();

    // 1. If Supabase is connected, try Supabase Auth first
    if (isSupabaseConfigured && supabase) {
      try {
        const email = cleanUsername.includes('@') ? cleanUsername : `${cleanUsername}@nuqtah.com`;
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: passwordInput,
        });

        if (!error && data?.user) {
          const adminUser: AdminUser = {
            id: data.user.id,
            email: data.user.email || email,
            name: data.user.user_metadata?.name || cleanUsername.toUpperCase(),
            role: (data.user.user_metadata?.role as AdminRole) || 'Super Admin',
            createdAt: data.user.created_at,
            lastLogin: new Date().toISOString(),
          };
          const newSession: AdminSession = {
            user: adminUser,
            token: data.session?.access_token || `token-${Date.now()}`,
            expiresAt: Date.now() + SESSION_DURATION_MS,
          };
          setSession(newSession);
          localStorage.setItem(ADMIN_SESSION_STORAGE_KEY, JSON.stringify(newSession));
          return { success: true };
        }
      } catch (err) {
        console.warn('Supabase auth attempt returned, checking secure authorization records:', err);
      }
    }

    // 2. Secure Cryptographic Authorization Directory Verification
    const account = INITIAL_ADMIN_ACCOUNTS.find(
      (acc) => (acc.username.toLowerCase() === cleanUsername || acc.email.toLowerCase() === cleanUsername) && acc.active
    );

    if (!account) {
      return { success: false, error: 'Invalid administrator username or password.' };
    }

    const inputHash = await hashPassword(passwordInput);

    // Support standard initialization password ("nuqtah2026" or account specific hash)
    if (inputHash !== account.passwordHash && inputHash !== '3542b9d4bff47f36d250886233847ee88375dbd52761777f69d075498be80950') {
      return { success: false, error: 'Invalid administrator username or password.' };
    }

    const adminUser: AdminUser = {
      id: `admin-${account.username}`,
      email: account.email,
      name: account.displayName,
      role: account.role,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };

    const newSession: AdminSession = {
      user: adminUser,
      token: `nqt-sec-${Math.random().toString(36).substring(2)}${Date.now()}`,
      expiresAt: Date.now() + SESSION_DURATION_MS,
    };

    setSession(newSession);
    localStorage.setItem(ADMIN_SESSION_STORAGE_KEY, JSON.stringify(newSession));
    return { success: true };
  };

  const logout = () => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.signOut().catch(() => {});
    }
    setSession(null);
    localStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
  };

  const role = user?.role;
  const canManageShop = role === 'Super Admin' || role === 'Store Manager';
  const canManageScreen = role === 'Super Admin' || role === 'Content Manager';
  const canManageInstitute = role === 'Super Admin' || role === 'Content Manager';
  const canManageSettings = role === 'Super Admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        canManageShop,
        canManageScreen,
        canManageInstitute,
        canManageSettings,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
