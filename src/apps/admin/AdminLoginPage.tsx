import React, { useState } from 'react';
import { Shield, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLoginPage: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('nuqtah2026');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await login(username, password);
      if (!result.success) {
        setError(result.error || 'Authentication failed. Please verify credentials.');
      }
    } catch {
      setError('An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2ECE4] text-[#241F1B] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#FDFBF7] rounded-sm p-8 sm:p-10 border border-[#322C26]/15 shadow-lg space-y-8 animate-fade-in">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <img
            src="/logo/nuqtah black.jfif"
            alt="Nuqtah"
            className="h-10 mx-auto object-contain filter drop-shadow-sm"
          />
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded bg-[#EFE8DE] border border-[#A6854F]/30 text-xs font-mono text-[#A6854F] uppercase tracking-widest font-semibold">
            <Shield className="w-3.5 h-3.5" />
            <span>Restricted Admin Portal</span>
          </div>
          <p className="text-xs text-[#5C5247] font-light leading-relaxed">
            Enter administrator username and security password to access the management console.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-sm text-xs font-mono text-red-800 flex items-start space-x-2 shadow-sm animate-fade-in">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs font-mono">
          <div>
            <label className="text-[#5C5247] font-semibold uppercase tracking-wider block mb-1.5 text-[11px]">
              Admin Username
            </label>
            <div className="relative">
              <input
                type="text"
                required
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. admin"
                className="w-full px-4 py-3 pl-10 bg-[#FAF6F0] border border-[#322C26]/20 rounded-sm text-sm text-[#241F1B] focus:border-[#A6854F] focus:bg-white focus:outline-none transition-colors"
              />
              <User className="w-4 h-4 text-[#877B6E] absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="text-[#5C5247] font-semibold uppercase tracking-wider block mb-1.5 text-[11px]">
              Security Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 pl-10 bg-[#FAF6F0] border border-[#322C26]/20 rounded-sm text-sm text-[#241F1B] focus:border-[#A6854F] focus:bg-white focus:outline-none transition-colors"
              />
              <Lock className="w-4 h-4 text-[#877B6E] absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#241F1B] hover:bg-[#352E28] text-[#FAF6F0] font-bold text-xs uppercase tracking-widest rounded-sm transition-all shadow-md flex items-center justify-center space-x-2 pt-3 disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In To Admin Console'}</span>
            <ArrowRight className="w-4 h-4 text-[#A6854F]" />
          </button>
        </form>

        <div className="text-center text-[11px] text-[#877B6E] font-mono pt-4 border-t border-[#322C26]/10 space-y-1">
          <p>Protected by cryptographic authorization & Supabase Auth.</p>
          <p className="text-[10px] text-[#5C5247]">Default Admin: <code className="bg-[#EFE8DE] px-1 py-0.5 rounded">admin</code> / Password: <code className="bg-[#EFE8DE] px-1 py-0.5 rounded">nuqtah2026</code></p>
        </div>
      </div>
    </div>
  );
};
