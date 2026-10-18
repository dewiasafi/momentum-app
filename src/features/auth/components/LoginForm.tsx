import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn, Mail, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../api/auth.api';
import { Alert, Button, Input } from '@/components/ui';

export const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Ambil state dari navigasi (misal redirect dari register atau verify-email)
  const navState = location.state as { from?: Location; email?: string; successMessage?: string } | null;
  const from = navState?.from?.pathname;

  const [email, setEmail] = useState(navState?.email || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUnverified, setIsUnverified] = useState(false);
  const [resendStatus, setResendStatus] = useState<{ loading: boolean; message: string | null; error: string | null }>({
    loading: false,
    message: null,
    error: null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsUnverified(false);
    setResendStatus({ loading: false, message: null, error: null });

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    setIsLoading(true);

    try {
      await login({ email: trimmedEmail, password });
      const destination = from || "/dashboard";
      navigate(destination, { replace: true });
    } catch (err: unknown) {
      const errorObj = err as { message?: string; status?: number; response?: { status?: number } };
      const status = errorObj.status || errorObj.response?.status;
      const message = errorObj.message || "Login gagal.";

      // 403 Forbidden: Email belum diverifikasi
      if (status === 403 || message.toLowerCase().includes("verifikasi")) {
        setIsUnverified(true);
        setError("Akun Anda belum aktif karena email belum diverifikasi.");
      } else {
        setError(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setResendStatus({
        loading: false,
        message: null,
        error: "Masukkan email terlebih dahulu.",
      });
      return;
    }

    setResendStatus({ loading: true, message: null, error: null });

    try {
      const response = await authApi.resendVerification({ email: trimmedEmail });
      setResendStatus({
        loading: false,
        message: response.message || "Tautan verifikasi baru berhasil dikirim ke email Anda.",
        error: null,
      });
    } catch (err: unknown) {
      setResendStatus({
        loading: false,
        message: null,
        error: err instanceof Error ? err.message : "Gagal mengirim ulang verifikasi.",
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Banner Notifikasi Berhasil dari Halaman Sebelumnya */}
      {navState?.successMessage && !error && (
        <Alert variant="success" className="mb-4">
          {navState.successMessage}
        </Alert>
      )}

      {/* Error Banner */}
      {error && (
        <Alert variant={isUnverified ? "warning" : "error"} className="mb-4">
          <div>
            <p className="font-medium">{error}</p>
            {isUnverified && (
              <div className="mt-3 pt-2 border-t border-amber-200/60 flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleResendVerification}
                  disabled={resendStatus.loading}
                  className="text-xs py-1 px-3 border-amber-400 text-amber-900 hover:bg-amber-100"
                >
                  {resendStatus.loading ? (
                    <span className="flex items-center gap-1.5">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      Mengirim...
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3 h-3" />
                      Kirim Ulang Tautan Verifikasi
                    </span>
                  )}
                </Button>
                <Link
                  to={`/resend-verification${email ? `?email=${encodeURIComponent(email)}` : ''}`}
                  className="text-xs text-amber-900 underline hover:no-underline font-medium"
                >
                  Buka halaman verifikasi
                </Link>
              </div>
            )}
          </div>
        </Alert>
      )}

      {/* Status Kirim Ulang Verifikasi */}
      {resendStatus.message && (
        <Alert variant="success" className="mb-4">
          {resendStatus.message}
        </Alert>
      )}

      {resendStatus.error && (
        <Alert variant="error" className="mb-4">
          {resendStatus.error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="nama@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          autoComplete="email"
        />

        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
          autoComplete="current-password"
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="text-app-subtext hover:text-app-title transition-colors cursor-pointer"
              aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
        />

        <div className="flex items-center justify-end">
          <Link
            to="/forgot-password"
            className="text-sm text-accent-forest hover:underline font-medium"
          >
            Lupa password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={isLoading}
          className="mt-2"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Memproses Masuk...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <LogIn className="w-4 h-4" />
              Masuk
            </span>
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-app-subtext">
        Belum punya akun?{" "}
        <Link to="/register" className="text-accent-forest font-semibold hover:underline">
          Daftar sekarang
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;