
import { useState } from "react";
import { Link } from "react-router-dom";
import { MailCheck, Send } from "lucide-react";
import { authApi } from "@/features/auth/api/auth.api";
import { Button, Input, Alert } from "@/components/ui";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const validateEmail = (value: string): string | null => {
    if (!value.trim()) {
      return "Email wajib diisi.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value.trim())) {
      return "Masukkan alamat email dengan format yang valid.";
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setEmailTouched(true);

    const trimmedEmail = email.trim();
    const validation = validateEmail(trimmedEmail);

    setEmailError(validation);
    if (validation) return;

    setIsLoading(true);

    try {
      await authApi.forgotPassword({ email: trimmedEmail });
      setSent(true);
    } catch (err: unknown) {
      const errorObj = err as {
        message?: string;
        response?: {
          data?: {
            message?: string;
            error?: string;
          };
        };
      };

      setError(
        errorObj.response?.data?.message ||
          errorObj.response?.data?.error ||
          errorObj.message ||
          "Permintaan reset password gagal. Silakan coba kembali."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setError(null);
    setSent(false);

    if (emailTouched) {
      setEmailError(validateEmail(value));
    }
  };

  return (
    <div>
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-app-title mb-1">
          Lupa password?
        </h1>
        <p className="text-sm text-app-subtext">
          Masukkan email akunmu. Kami akan mengirim instruksi reset password.
        </p>
      </div>

      {error && (
        <Alert variant="error" className="mb-4">
          {error}
        </Alert>
      )}

      {sent ? (
        <div className="flex flex-col items-center text-center py-4 gap-4">
          <div className="w-14 h-14 rounded-full bg-success-bg flex items-center justify-center">
            <MailCheck className="w-7 h-7 text-success" />
          </div>

          <div>
            <p className="font-semibold text-app-title mb-1">
              Permintaan diproses
            </p>
            <p className="text-sm text-app-subtext">
              Jika email tersebut terdaftar, instruksi reset password akan
              dikirim ke{" "}
              <span className="font-medium text-app-title">{email.trim()}</span>.
              Silakan periksa inbox atau folder spam.
            </p>
          </div>

          <Link
            to="/login"
            className="mt-2 text-sm text-accent-forest font-semibold hover:underline"
          >
            ← Kembali ke halaman login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <Input
              label="Email"
              type="email"
              placeholder="kamu@email.com"
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
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Mengirim...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Kirim Instruksi Reset
              </span>
            )}
          </Button>

          <p className="text-center text-sm text-app-subtext">
            Ingat password?{" "}
            <Link
              to="/login"
              className="text-accent-forest font-semibold hover:underline"
            >
              Masuk
            </Link>
          </p>
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
