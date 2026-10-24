
import { useState } from "react";
import { Link } from "react-router-dom";
import { MailCheck, Send } from "lucide-react";
import { authApi } from "@/features/auth/api/auth.api";
import { Button, Input, Alert } from "@/components/ui";
import { validateEmail } from "../utils/emailValidation";
import AuthFooter from "./AuthFooter";

const getErrorMessage = (err: unknown): string => {
  const error = err as {
    message?: string;
    response?: {
      data?: {
        message?: string;
        error?: string;
      };
    };
  };

  return (
    error.response?.data?.message ||
    error.response?.data?.error ||
    error.message ||
    "Permintaan reset password gagal. Silakan coba kembali."
  );
};

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setEmailTouched(true);

    const validation = validateEmail(email);

    setEmailError(validation);

    if (validation) return;

    setIsLoading(true);

    try {
      await authApi.forgotPassword({ email: email.trim() });
      setSent(true);
    } catch (err: unknown) {
      setError(getErrorMessage(err));
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
      {error && (
        <Alert variant="error" className="mb-4">
          {error}
        </Alert>
      )}

      {sent ? (
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success-bg">
            <MailCheck className="h-7 w-7 text-success" />
          </div>

          <div>
            <p className="mb-1 font-semibold text-app-title">
              Permintaan diproses
            </p>
            <p className="text-sm text-app-subtext">
              Jika email tersebut terdaftar, instruksi reset password akan
              dikirim. Periksa inbox atau folder spam.
            </p>
          </div>

          <Link
            to="/login"
            className="mt-2 text-sm font-semibold text-accent-forest hover:underline"
          >
            ← Kembali ke halaman login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
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
            errorText={emailError || ""}
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={isLoading}
          >
            <span className="flex items-center gap-2">
              {isLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Mengirim...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Reset Password
                </>
              )}
            </span>
          </Button>

          <AuthFooter
            prompt="Ingat password?"
            linkText="Masuk"
            linkTo="/login"
          />
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
