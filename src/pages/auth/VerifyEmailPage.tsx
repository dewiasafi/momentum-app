import React, { useEffect, useRef } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2, XCircle, AlertCircle, RefreshCw, LogIn } from "lucide-react";
import { authApi } from "@/features/auth/api/auth.api";
import { Button, Alert } from "@/components/ui";

const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const hasTriggeredRef = useRef(false);

  const verifyMutation = useMutation({
    mutationFn: (verifyToken: string) => authApi.verifyEmail({ token: verifyToken }),
    onSuccess: () => {
      // Tunggu 3 detik lalu arahkan otomatis ke login
      const timer = setTimeout(() => {
        navigate("/login", {
          replace: true,
          state: { successMessage: "Email berhasil diverifikasi! Silakan login untuk masuk ke akun Anda." },
        });
      }, 3000);
      return () => clearTimeout(timer);
    },
  });

  useEffect(() => {
    if (token && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      verifyMutation.mutate(token);
    }
  }, [token]);

  // Kasus 1: Token tidak ditemukan di parameter URL
  if (!token) {
    return (
      <div className="text-center py-4 space-y-5">
        <div className="w-16 h-16 mx-auto rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-app-title mb-2">Token Tidak Ditemukan</h1>
          <p className="text-sm text-app-subtext">
            Tautan verifikasi tidak memiliki token yang valid. Pastikan Anda mengklik seluruh tautan yang ada pada email.
          </p>
        </div>

        <div className="pt-2 space-y-3">
          <Link to="/resend-verification">
            <Button variant="primary" fullWidth>
              Kirim Ulang Tautan Verifikasi
            </Button>
          </Link>
          <Link to="/login" className="inline-block text-sm text-accent-forest font-semibold hover:underline">
            Kembali ke Login
          </Link>
        </div>
      </div>
    );
  }

  // Kasus 2: Sedang dalam proses verifikasi API
  if (verifyMutation.isPending) {
    return (
      <div className="text-center py-8 space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-accent-forest/10 border border-accent-forest/20 flex items-center justify-center text-accent-forest">
          <RefreshCw className="w-8 h-8 animate-spin" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-app-title mb-2">Memverifikasi Akun</h1>
          <p className="text-sm text-app-subtext">
            Mohon tunggu sebentar, kami sedang memvalidasi token verifikasi email Anda...
          </p>
        </div>
      </div>
    );
  }

  // Kasus 3: Terjadi error validasi token (kedaluwarsa, invalid, replay attack)
  if (verifyMutation.isError) {
    const errorMessage =
      (verifyMutation.error as Error)?.message ||
      "Verifikasi email gagal. Tautan mungkin telah kedaluwarsa atau tidak valid.";

    return (
      <div className="text-center py-4 space-y-5">
        <div className="w-16 h-16 mx-auto rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
          <XCircle className="w-8 h-8" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-app-title mb-2">Verifikasi Gagal</h1>
          <p className="text-sm text-app-subtext mb-4">
            Kami tidak dapat mengonfirmasi alamat email Anda karena masalah berikut:
          </p>
          <Alert variant="error" className="text-left">
            {errorMessage}
          </Alert>
        </div>

        <div className="pt-2 space-y-3">
          <Link to="/resend-verification">
            <Button variant="primary" fullWidth>
              Minta Tautan Verifikasi Baru
            </Button>
          </Link>

          <Link to="/login" className="inline-block text-sm text-accent-forest font-semibold hover:underline">
            Kembali ke Halaman Login
          </Link>
        </div>
      </div>
    );
  }

  // Kasus 4: Verifikasi Sukses
  return (
    <div className="text-center py-4 space-y-5">
      <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <div>
        <h1 className="text-2xl font-bold text-app-title mb-2">Email Terverifikasi!</h1>
        <p className="text-sm text-app-subtext leading-relaxed">
          Selamat! Akun Momentum Anda telah aktif dan siap digunakan. Anda akan dialihkan secara otomatis ke halaman login dalam 3 detik...
        </p>
      </div>

      <div className="pt-2">
        <Button
          variant="primary"
          fullWidth
          onClick={() =>
            navigate("/login", {
              replace: true,
              state: { successMessage: "Email berhasil diverifikasi! Silakan login untuk masuk ke akun Anda." },
            })
          }
        >
          <span className="flex items-center justify-center gap-2">
            <LogIn className="w-4 h-4" />
            Masuk Sekarang
          </span>
        </Button>
      </div>
    </div>
  );
};

export default VerifyEmailPage;

