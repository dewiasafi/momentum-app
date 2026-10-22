import React, { useState } from "react";
import { useSearchParams, useLocation, Link } from "react-router-dom";
import { Mail, Send, ArrowLeft, CheckCircle2 } from "lucide-react";
import { authApi } from "@/features/auth/api/auth.api";
import { Button, Input, Alert } from "@/components/ui";

const ResendVerificationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const initialEmail =
    searchParams.get("email") ||
    (location.state as { email?: string } | null)?.email ||
    "";

  const [email, setEmail] = useState(initialEmail);
  const [isLoading, setIsLoading] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateEmail = (value: string): string | null => {
    if (!value.trim()) {
      return "Silakan masukkan alamat email Anda.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value.trim())) {
      return "Format email tidak valid.";
    }

    return null;
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setSuccessMessage(null);
    setErrorMessage(null);

    if (emailTouched) {
      setEmailError(validateEmail(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmailTouched(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    const trimmedEmail = email.trim();
    const validation = validateEmail(trimmedEmail);

    setEmailError(validation);

    if (validation) return;

    setIsLoading(true);

    try {
      const response = await authApi.resendVerification({
        email: trimmedEmail,
      });

      setSuccessMessage(
        response.message ||
          "Jika email terdaftar dan belum diverifikasi, tautan verifikasi akan dikirim."
      );
    } catch (err: unknown) {
      const error = err as {
        message?: string;
        response?: {
          data?: {
            message?: string;
            error?: string;
          };
        };
      };

      setErrorMessage(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Gagal mengirim tautan verifikasi. Silakan coba kembali."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-accent-forest/10 border border-accent-forest/20 flex items-center justify-center text-accent-forest">
          <Mail className="w-7 h-7" />
        </div>

        <h1 className="text-2xl font-bold text-app-title mb-1">
          Kirim Ulang Verifikasi
        </h1>

        <p className="text-sm text-app-subtext">
          Masukkan email yang Anda daftarkan untuk meminta tautan verifikasi
          baru.
        </p>
      </div>

      {successMessage ? (
        <div className="space-y-4">
          <Alert variant="success">
            <div>
              <p className="font-semibold mb-1">Permintaan Diproses</p>
              <p className="text-xs">{successMessage}</p>
            </div>
          </Alert>

          <div className="text-xs text-app-subtext bg-app-bg border border-app-subtext/20 rounded-xl p-3.5 space-y-1.5">
            <p className="font-semibold text-app-title flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-accent-forest shrink-0" />
              Langkah Selanjutnya:
            </p>
            <p>
              1. Periksa kotak masuk atau folder spam email{" "}
              <strong>{email.trim()}</strong>.
            </p>
            <p>
              2. Jika email terdaftar dan memenuhi syarat, ikuti tautan
              verifikasi yang dikirimkan.
            </p>
          </div>

          <div className="pt-2 space-y-2">
            <Link to="/login" className="block">
              <Button variant="primary" fullWidth>
                Ke Halaman Login
              </Button>
            </Link>

            <button
              type="button"
              onClick={() => {
                setSuccessMessage(null);
                setErrorMessage(null);
                setEmailError(null);
                setEmailTouched(false);
              }}
              className="text-xs text-center w-full text-app-subtext hover:text-app-title underline cursor-pointer pt-2"
            >
              Kirim ke alamat email lain
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {errorMessage && (
            <Alert variant="error">{errorMessage}</Alert>
          )}

          <div>
            <Input
              label="Alamat Email Terdaftar"
              type="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              onBlur={() => {
                setEmailTouched(true);
                setEmailError(validateEmail(email));
              }}
              fullWidth
              required
              autoComplete="email"
              aria-invalid={Boolean(emailError)}
            />

            {emailError && (
              <p className="error-message" role="alert">
                {emailError}
              </p>
            )}
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
                Mengirim Tautan...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                Kirim Tautan Verifikasi Baru
              </span>
            )}
          </Button>

          <div className="text-center pt-2">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-sm text-accent-forest font-semibold hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Halaman Login
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default ResendVerificationPage;
