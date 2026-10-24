
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { KeyRound } from "lucide-react";
import { authApi } from "@/features/auth/api/auth.api";
import { Button, Alert } from "@/components/ui";
import PasswordInput from "@/components/common/PasswordInput";
import AuthFooter from "./AuthFooter";
import {
  validatePassword,
  validateConfirmPassword,
} from "@/features/auth/utils/passwordValidation";

const ResetPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token")?.trim() ?? "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] =
    useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError(
        "Token reset tidak ditemukan. Silakan minta tautan reset password baru."
      );
      return;
    }

    const currentPasswordError = validatePassword(password);
    const currentConfirmPasswordError = validateConfirmPassword(
      password,
      confirmPassword
    );

    setPasswordError(currentPasswordError);
    setConfirmPasswordError(currentConfirmPasswordError);

    if (currentPasswordError || currentConfirmPasswordError) {
      return;
    }

    setIsLoading(true);

    try {
      await authApi.resetPassword({
        token,
        new_password: password,
      });

      navigate("/login", {
        replace: true,
        state: {
          successMessage:
            "Password berhasil diperbarui. Silakan masuk kembali.",
        },
      });
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
          "Reset password gagal. Silakan coba kembali."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {error && (
        <Alert variant="error" className="mb-4">
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <PasswordInput
          label="Password baru"
          placeholder="Masukkan password baru"
          value={password}
          onChange={(e) => {
            const value = e.target.value;
            setPassword(value);
            setPasswordError(validatePassword(value));

            if (confirmPassword) {
              setConfirmPasswordError(
                validateConfirmPassword(value, confirmPassword)
              );
            }
          }}
          onBlur={() => setPasswordError(validatePassword(password))}
          errorText={passwordError || ""}
          aria-invalid={!!passwordError}
          fullWidth
          required
          autoComplete="new-password"
        />

        <PasswordInput
          label="Konfirmasi password"
          placeholder="Masukkan ulang password baru"
          value={confirmPassword}
          onChange={(e) => {
            const value = e.target.value;
            setConfirmPassword(value);
            setConfirmPasswordError(
              validateConfirmPassword(password, value)
            );
          }}
          onBlur={() =>
            setConfirmPasswordError(
              validateConfirmPassword(password, confirmPassword)
            )
          }
          errorText={confirmPasswordError || ""}
          aria-invalid={!!confirmPasswordError}
          fullWidth
          required
          autoComplete="new-password"
        />

        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={isLoading || !token}
        >
          <span className="flex items-center justify-center gap-2">
            <KeyRound className="h-4 w-4" />
            {isLoading ? "Memproses..." : "Simpan Password Baru"}
          </span>
        </Button>

        {!token && (
          <p className="text-center text-sm text-app-subtext">
            Token reset tidak ditemukan.{" "}
            <Link
              to="/forgot-password"
              className="font-semibold text-accent-forest hover:underline"
            >
              Minta tautan baru
            </Link>
          </p>
        )}

        <AuthFooter
          prompt="Ingat password?"
          linkText="Masuk"
          linkTo="/login"
        />
      </form>
    </div>
  );
};

export default ResetPasswordForm;
