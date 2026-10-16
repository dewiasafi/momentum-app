import { useState } from "react";
import { Link } from "react-router-dom";
import { MailCheck, Send } from "lucide-react";
import AuthLayout from "@/layouts/AuthLayout";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { MOCK_USERS } from "@/features/auth/data/mockUsers";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const exists = MOCK_USERS.some((u) => u.email === email);
    if (!exists) {
      setError("Email tidak ditemukan dalam sistem kami.");
      return;
    }

    setIsLoading(true);
    // Simulasi pengiriman email
    await new Promise((res) => setTimeout(res, 1000));
    setIsLoading(false);
    setSent(true);
  };

  return (
    <div>
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-app-title mb-1">Lupa password?</h1>
        <p className="text-sm text-app-subtext">
          Masukkan email akunmu. Kami akan mengirim instruksi reset password.
        </p>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-error-bg border border-error text-error text-sm">
          {error}
        </div>
      )}

      {sent ? (
        /* State: Email terkirim */
        <div className="flex flex-col items-center text-center py-4 gap-4">
          <div className="w-14 h-14 rounded-full bg-success-bg flex items-center justify-center">
            <MailCheck className="w-7 h-7 text-success" />
          </div>
          <div>
            <p className="font-semibold text-app-title mb-1">Email terkirim!</p>
            <p className="text-sm text-app-subtext">
              Instruksi reset password sudah dikirim ke{" "}
              <span className="font-medium text-app-title">{email}</span>.<br />
              Silakan cek inbox (atau folder spam) kamu.
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
          <Input
            label="Email"
            type="email"
            placeholder="kamu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            autoComplete="email"
          />

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
            <Link to="/login" className="text-accent-forest font-semibold hover:underline">
              Masuk
            </Link>
          </p>
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordPage;

