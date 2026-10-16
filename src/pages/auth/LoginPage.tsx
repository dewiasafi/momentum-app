import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthContext";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Ambil halaman asal yang disimpan oleh ProtectedRoute (jika ada)
  const from = (location.state as { from?: Location })?.from?.pathname;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const user = await login(email, password);
      // Prioritaskan halaman asal, fallback by role
      const destination = from || (user.role === "admin" ? "/dashboard" : "/activities");
      navigate(destination, { replace: true });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login gagal.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-app-title mb-1">Selamat datang kembali</h1>
        <p className="text-sm text-app-subtext">Masuk untuk melanjutkan ke Momentum</p>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-error-bg border border-error text-error text-sm">
          {error}
        </div>
      )}

      {/* Mock Credentials Helper */}
      <div className="mb-5 px-4 py-3 rounded-xl bg-accent-yellow/10 border border-accent-yellow/30 text-xs text-app-body space-y-1">
        <p className="font-semibold text-app-title">🧪 Akun Demo:</p>
        <p>Admin — <span className="font-mono">admin@momentum.app</span> / <span className="font-mono">admin123</span></p>
        <p>User &nbsp; — <span className="font-mono">user@momentum.app</span> / <span className="font-mono">user123</span></p>
      </div>

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
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Memproses...
            </span>
          ) : (
            <span className="flex items-center gap-2">
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

export default LoginPage;

