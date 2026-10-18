import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Mail, CheckCircle2, RefreshCw, ArrowLeft } from 'lucide-react';
import { Button, Alert } from '@/components/ui';
import { authApi } from '@/features/auth/api/auth.api';

const VerifyNoticePage: React.FC = () => {
  const location = useLocation();
  const registeredEmail = (location.state as { email?: string })?.email;

  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState<string | null>(null);
  const [resendError, setResendError] = useState<string | null>(null);

  const handleResend = async () => {
    if (!registeredEmail) {
      setResendError("Email tidak ditemukan. Silakan gunakan formulir kirim ulang verifikasi.");
      return;
    }

    setIsResending(true);
    setResendSuccess(null);
    setResendError(null);

    try {
      const response = await authApi.resendVerification({ email: registeredEmail });
      setResendSuccess(
        response.message || "Tautan verifikasi baru berhasil dikirim ke email Anda."
      );
    } catch (err: unknown) {
      setResendError(
        err instanceof Error ? err.message : "Gagal mengirim ulang tautan verifikasi."
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="text-center py-2 space-y-6">
      {/* Icon Ilustrasi */}
      <div className="w-16 h-16 mx-auto rounded-full bg-accent-forest/10 border border-accent-forest/20 flex items-center justify-center text-accent-forest">
        <Mail className="w-8 h-8" />
      </div>

      {/* Judul & Penjelasan */}
      <div>
        <h1 className="text-2xl font-bold text-app-title mb-2">Cek Email Anda</h1>
        <p className="text-sm text-app-subtext leading-relaxed">
          Kami telah mengirimkan tautan verifikasi akun ke alamat email:
        </p>
        <div className="mt-3 inline-block px-4 py-2 bg-app-bg border border-app-subtext/20 rounded-xl font-medium text-app-title text-sm">
          {registeredEmail || "Email Anda"}
        </div>
      </div>

      {/* Informasi Tambahan */}
      <div className="text-xs text-app-subtext bg-accent-yellow/10 border border-accent-yellow/30 rounded-xl p-3.5 text-left space-y-1">
        <p className="font-semibold text-app-title flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-accent-forest shrink-0" />
          Petunjuk Aktivasi Akun:
        </p>
        <ul className="list-disc list-inside space-y-1 pl-1 text-app-body">
          <li>Buka kotak masuk atau folder spam di email Anda.</li>
          <li>Klik tombol atau tautan verifikasi di dalam pesan.</li>
          <li>Tautan verifikasi hanya berlaku selama <strong>30 menit</strong>.</li>
        </ul>
      </div>

      {/* Feedback Alert */}
      {resendSuccess && (
        <Alert variant="success" className="text-left">
          {resendSuccess}
        </Alert>
      )}

      {resendError && (
        <Alert variant="error" className="text-left">
          {resendError}
        </Alert>
      )}

      {/* Tombol Aksi */}
      <div className="space-y-3 pt-2">
        {registeredEmail ? (
          <Button
            type="button"
            variant="outline"
            fullWidth
            onClick={handleResend}
            disabled={isResending}
          >
            {isResending ? (
              <span className="flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                Mengirim Ulang...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Kirim Ulang Tautan Verifikasi
              </span>
            )}
          </Button>
        ) : (
          <Link to="/resend-verification">
            <Button type="button" variant="outline" fullWidth>
              Kirim Ulang Tautan Verifikasi
            </Button>
          </Link>
        )}

        <Link
          to="/login"
          className="inline-flex items-center justify-center gap-2 text-sm text-accent-forest font-semibold hover:underline w-full pt-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Halaman Login
        </Link>
      </div>
    </div>
  );
};

export default VerifyNoticePage;

