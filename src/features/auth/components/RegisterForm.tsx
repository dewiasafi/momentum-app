
import React, { useState } from 'react';
import { useRegister } from '../api/useRegister';
import { Button, Input, Alert } from '@/components/ui';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

type FieldErrors = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm = () => {
  const {
    formData,
    showPassword,
    showConfirmPassword,
    validationError,
    apiError,
    isLoading,
    isSuccess,
    handleChange,
    toggleShowPassword,
    toggleShowConfirmPassword,
    handleSubmit,
  } = useRegister();

  const [errors, setErrors] = useState<FieldErrors>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const validateField = (
    field: keyof FieldErrors,
    value: string,
  ): string => {
    switch (field) {
      case 'name':
        return value.trim() ? '' : 'Nama lengkap wajib diisi.';

      case 'email':
        if (!value.trim()) return 'Email wajib diisi.';
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
          ? ''
          : 'Masukkan alamat email dengan format yang valid.';

      case 'password':
        if (!value) return 'Password wajib diisi.';
        if (value.length < 8) return 'Password minimal 8 karakter.';
        if (!/[A-Za-z]/.test(value))
          return 'Password harus mengandung huruf.';
        if (!/[0-9]/.test(value))
          return 'Password harus mengandung angka.';
        if (!/[!@#$%^&*(),.?"{}|<>_\-+=~`]/.test(value))
          return 'Password harus mengandung simbol yang didukung.';
        return '';

      case 'confirmPassword':
        if (!value) return 'Konfirmasi password wajib diisi.';
        return value === formData.password
          ? ''
          : 'Konfirmasi password tidak sama.';

      default:
        return '';
    }
  };

  const updateField = (field: keyof FieldErrors, value: string) => {
    handleChange(field, value);

    setErrors((previous) => ({
      ...previous,
      [field]: validateField(field, value),
      ...(field === 'password' && formData.confirmPassword
        ? {
          confirmPassword: validateField(
            'confirmPassword',
            formData.confirmPassword,
          ),
        }
        : {}),
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setSubmitted(true);

    const nextErrors: FieldErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      password: validateField('password', formData.password),
      confirmPassword: validateField(
        'confirmPassword',
        formData.confirmPassword,
      ),
    };

    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      e.preventDefault();
      return;
    }

    handleSubmit(e);
  };

  const fieldError = (field: keyof FieldErrors) =>
    submitted || formData[field]
      ? errors[field]
      : '';

  const activeError = apiError || validationError;


const handleConfirmPasswordPaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();

    const randomValue = Array.from(
      { length: 50 },
      () => Math.random().toString(36).charAt(2),
    ).join('');

    updateField('confirmPassword', randomValue);
  };

  const hasFormErrors = (Object.keys(errors) as (keyof FieldErrors)[]).some(
    (field) => validateField(field, formData[field]) !== '',
  );


  return (
    <div className="space-y-4">


      {isSuccess && (
        <Alert variant="success" className="mb-4">
          Akun berhasil dibuat! Silakan verifikasi email sebelum login.
        </Alert>
      )}

      <form onSubmit={handleFormSubmit} noValidate className="space-y-4">
        <div>
          <Input
            label="Nama Lengkap"
            type="text"
            placeholder="Contoh: Admin"
            value={formData.name}
            errorText={errors.name}
            onChange={(e) => updateField('name', e.target.value)}
            fullWidth
            required
            autoComplete="name"
          />
          {fieldError('name') && (
            <p className="error-message" role="alert">
              {fieldError('name')}
            </p>
          )}
        </div>

        <div>
          <Input
            label="Email"
            type="email"
            placeholder="nama@email.com"
            value={formData.email}
            errorText={errors.email}
            onChange={(e) => updateField('email', e.target.value)}
            fullWidth
            required
            autoComplete="email"
          />
        </div>

        <div>
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Min. 8 karakter (huruf, angka, simbol)"
            value={formData.password}
            errorText={errors.password}
            onChange={(e) => updateField('password', e.target.value)}
            fullWidth
            required
            autoComplete="new-password"
            rightIcon={
              <button
                type="button"
                onClick={toggleShowPassword}
                className="text-app-subtext hover:text-app-title transition-colors cursor-pointer"
                aria-label={
                  showPassword ? 'Sembunyikan password' : 'Tampilkan password'
                }
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            }
          />
        </div>


        <div>

          <Input
            label="Konfirmasi Password"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Ulangi password"
            value={formData.confirmPassword}
            onChange={(e) =>
              updateField('confirmPassword', e.target.value)
            }
            errorText={errors.confirmPassword}
            onPaste={handleConfirmPasswordPaste}
            fullWidth
            required
            autoComplete="new-password"
            rightIcon={
              <button
                type="button"
                onClick={toggleShowConfirmPassword}
                className="text-app-subtext hover:text-app-title transition-colors cursor-pointer"
                aria-label={
                  showConfirmPassword
                    ? 'Sembunyikan konfirmasi password'
                    : 'Tampilkan konfirmasi password'
                }
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            }
          />
        </div>

        {activeError && (
          <Alert variant="error" className="mb-4">
            {activeError}
          </Alert>
        )}

        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={isLoading || isSuccess || hasFormErrors}
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
        Sudah punya akun?{' '}
        <Link
          to="/login"
          className="text-accent-forest font-semibold hover:underline"
        >
          Masuk di sini
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
