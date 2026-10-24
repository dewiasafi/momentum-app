import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogIn, Mail, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../api/auth.api';
import { Alert, Button, Input } from '@/components/ui';
import PasswordInput from '@/components/common/PasswordInput';
import AuthFooter from './AuthFooter';
import { validateEmail } from '../utils/emailValidation';
import { validatePasswordLogin } from '../utils/passwordValidation';

export const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navState = location.state as { from?: Location; email?: string; successMessage?: string } | null;
  const from = navState?.from?.pathname;

  const [email, setEmail] = useState(navState?.email || '');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUnverified, setIsUnverified] = useState(false);
  const [resendStatus, setResendStatus] = useState<{ loading: boolean; message: string | null; error: string | null }>({
    loading: false,
    message: null,
    error: null,
  });

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    setError(null);
    setIsUnverified(false);
    setResendStatus({
      loading: false,
      message: null,
      error: null
    });

    setEmailTouched(true);
    setPasswordTouched(true);

    const currentEmailError = validateEmail(email);
    const currentPasswordError = validatePasswordLogin(password);

    setEmailError(currentEmailError);
    setPasswordError(currentPasswordError);

    if (currentEmailError || currentPasswordError) {
      return;
    }

    const trimmedEmail = email.trim();
    setIsLoading(true);
    try {
      await login({ email: trimmedEmail, password });
      const destination = from || "/dashboard";
      navigate(destination, { replace: true });
    } catch (err: unknown) {
      const errorObj = err as {
        message?: string;
        status?: number;
        response?: {
          status?: number
          data?: {
            message?: string;
            error?: string;
          }
        }
      };
      const status = errorObj.response?.status ?? errorObj.status;
      const message =
        errorObj.response?.data?.message ??
        errorObj.response?.data?.error ??
        errorObj.message ?? "Login gagal.";

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
      const errorObj = err as {
        message?: string,
        response?: {
          data?: {
            message?: string;
            error?: string;
          }
        }
      }
      setResendStatus({
        loading: false,
        message: null,
        error:
          errorObj.response?.data?.message ??
          errorObj.response?.data?.error ??
          errorObj.message ??
          "Gagal mengirim ulang verifikasi"
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
                  variant="ghost"
                  onClick={handleResendVerification}
                  disabled={resendStatus.loading}
                  className="text-xs py-1 px-3 border-amber-400 text-amber-900 hover:bg-amber-100"
                >
                  {resendStatus.loading ? (
                    <span className="flex items-center gap-1.5">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      loading...
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

        <div>
          <Input
            label="Email"
            type="email"
            placeholder="nama@email.com"
            value={email}
            onChange={(e) => {
              const value = e.target.value;
              setEmail(value);

              if (emailTouched) {
                setEmailError(validateEmail(value));
              }
            }}
            onBlur={() => {
              setEmailTouched(true);
              setEmailError(validateEmail(email));
            }}
            fullWidth
            required
            autoComplete="email"
            aria-invalid={!!emailError}
            errorText={emailError || ""}
          />
        </div>
  
        <PasswordInput
          label="Password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => {
            const value = e.target.value;
            setPassword(value);

            if (passwordTouched) {
              setPasswordError(validatePasswordLogin(value));
            }
          }}
          onBlur={() => {
            setPasswordTouched(true);
            setPasswordError(validatePasswordLogin(password));
          }}
          fullWidth
          required
          autoComplete="current-password"
          aria-invalid={!!passwordError}
          errorText={passwordError || ""}
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

      <AuthFooter
        prompt="Belum punya akun?"
        linkText="Daftar sekarang"
        linkTo="/register"
      />
    </div>
  );
};

export default LoginForm;