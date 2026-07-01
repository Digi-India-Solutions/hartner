import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/AuthContext';

export default function LoginPage() {
  const { t } = useTranslation();
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/admin/properties" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    const errors: { email?: string; password?: string } = {};
    if (!email.trim()) errors.email = t('login.fieldRequired');
    if (!password.trim()) errors.password = t('login.fieldRequired');

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const result = await login(email, password);
      if (result.success) {
        navigate('/admin/properties', { replace: true });
      } else {
        setError(result.error || t('login.wrongCredentials'));
      }
    } catch (err: any) {
      setError(err.message || t('login.wrongCredentials'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-[400px] bg-white rounded-xl shadow-sm border border-gray-200 p-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-accent-500 flex items-center justify-center">
            <i className="ri-building-line text-white text-xl"></i>
          </div>
          <h1 className="text-xl font-bold text-gray-900">Haertner Immobilien</h1>
          <p className="text-sm text-gray-400 mt-1">{t('login.adminPanel')}</p>
        </div>

        {/* Error banner */}
        {error && (
          <div className="flex items-center gap-2 mb-5 p-3 bg-red-50 border border-red-200 rounded-lg">
            <i className="ri-error-warning-line text-red-500 text-sm"></i>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {t('login.emailLabel')}
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setFieldErrors((p) => ({ ...p, email: undefined })); setError(''); }}
              placeholder={t('login.emailPlaceholder')}
              className={`w-full px-3 py-2.5 text-sm border rounded-lg bg-white focus:outline-none focus:ring-2 transition-colors ${
                fieldErrors.email
                  ? 'border-red-400 focus:ring-red-300'
                  : 'border-gray-300 focus:ring-accent-300 focus:border-accent-400'
              }`}
            />
            {fieldErrors.email && (
              <p className="text-xs text-red-500 mt-1">{fieldErrors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {t('login.passwordLabel')}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setFieldErrors((p) => ({ ...p, password: undefined })); setError(''); }}
                placeholder="••••••••"
                className={`w-full px-3 py-2.5 pr-10 text-sm border rounded-lg bg-white focus:outline-none focus:ring-2 transition-colors ${
                  fieldErrors.password
                    ? 'border-red-400 focus:ring-red-300'
                    : 'border-gray-300 focus:ring-accent-300 focus:border-accent-400'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
              </button>
            </div>
            {fieldErrors.password && (
              <p className="text-xs text-red-500 mt-1">{fieldErrors.password}</p>
            )}
          </div>

          {/* Remember me */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-accent-600 focus:ring-accent-500 cursor-pointer"
            />
            <span className="text-sm text-gray-600">{t('login.rememberMe')}</span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-accent-500 text-white text-sm font-medium rounded-lg hover:bg-accent-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer whitespace-nowrap"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <i className="ri-loader-4-line animate-spin"></i>
                {t('login.signingIn')}
              </span>
            ) : (
              t('login.signIn')
            )}
          </button>
        </form>

        {/* Demo credentials */}
        <div className="mt-6 p-3 bg-accent-50/50 border border-accent-100 rounded-lg">
          <p className="text-xs text-accent-700 flex items-center gap-1.5">
            <i className="ri-key-2-line"></i>
            <span>
              {t('login.demoNote')}{' '}
              <code className="bg-accent-100 px-1.5 py-0.5 rounded text-accent-800 font-mono text-[11px]">
                admin@haertner.com
              </code>
              {' / '}
              <code className="bg-accent-100 px-1.5 py-0.5 rounded text-accent-800 font-mono text-[11px]">
                Admin@1234
              </code>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}