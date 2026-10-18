import React from 'react';
import { useRegister } from '../api/useRegister';
import { Button, Input, Alert } from '@/components/ui';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const {
    formData,
    showPassword,
    validationError,
    apiError,
    isLoading,
    isSuccess,
    handleChange,
    toggleShowPassword,
    handleSubmit,
  } = useRegister();

  const activeError = validationError || apiError;

  return (
    <div className="space-y-4">
      {activeError && (
        <Alert variant="error" className="mb-4">
          {activeError}
        </Alert>
      )}

      {isSuccess && (
        <Alert variant="success" className="mb-4">
          Akun berhasil dibuat! Mengalihkan ke halaman konfirmasi...
        </Alert>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <Input
          label="Nama Lengkap"
          type="text"
          placeholder="Contoh: Dewi Ayu"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          fullWidth
          required
          autoComplete="name"
        />

        <Input
          label="Email"
          type="email"
          placeholder="nama@email.com"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          fullWidth
          required
          autoComplete="email"
        />

        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Min. 8 karakter (huruf, angka, simbol)"
          value={formData.password}
          helperText="Minimal 8 karakter, wajib kombinasi huruf, angka, dan simbol"
          onChange={(e) => handleChange("password", e.target.value)}
          fullWidth
          required
          autoComplete="new-password"
          rightIcon={
            <button
              type="button"
              onClick={toggleShowPassword}
              className="text-app-subtext hover:text-app-title transition-colors cursor-pointer"
              aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
        />

        <Input
          label="Konfirmasi Password"
          type={showPassword ? "text" : "password"}
          placeholder="Ulangi password"
          value={formData.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
          fullWidth
          required
          autoComplete="new-password"
        />

        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={isLoading || isSuccess}
          className="mt-2"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Mendaftarkan Akun...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <UserPlus className="w-4 h-4" />
              Daftar Sekarang
            </span>
          )}
        </Button>
      </form>

      <div className="text-center text-sm text-app-subtext pt-2">
        Sudah punya akun?{" "}
        <Link to="/login" className="text-accent-forest font-semibold hover:underline">
          Masuk di sini
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;