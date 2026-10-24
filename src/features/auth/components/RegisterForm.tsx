
import React, { useState } from "react";
import { UserPlus } from "lucide-react";
import { useRegister } from "../api/useRegister";
import { Button, Input, Alert } from "@/components/ui";
import PasswordInput from "@/components/common/PasswordInput";
import AuthFooter from "./AuthFooter";
import {
  validatePassword,
  validateConfirmPassword,
} from "@/features/auth/utils/passwordValidation";
import { validateEmail } from "../utils/emailValidation";

type FieldErrors = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm = () => {
  const {
    formData,
    validationError,
    apiError,
    isLoading,
    isSuccess,
    handleChange,
    handleSubmit,
  } = useRegister();

  const [errors, setErrors] = useState<FieldErrors>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const validateField = (
    field: keyof FieldErrors,
    value: string,
    currentPassword = formData.password,
  ): string => {
    switch (field) {
      case "name":
        return value.trim() ? "" : "Nama lengkap wajib diisi.";

      case "email":
          return validateEmail(value) ?? "";

      case "password":
        return validatePassword(value) ?? "";

      case "confirmPassword":
        return validateConfirmPassword(currentPassword, value) ?? "";

      default:
        return "";
    }
  };

  const updateField = (field: keyof FieldErrors, value: string) => {
    handleChange(field, value);

    setErrors((previous) => {
      const nextErrors = {
        ...previous,
        [field]: validateField(field, value),
      };

      if (field === 'password' && formData.confirmPassword) {
        nextErrors.confirmPassword = validateField(
          "confirmPassword",
          formData.confirmPassword,
          value,
        );
      }

      return nextErrors;
    });
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
    submitted || Boolean(formData[field]) ? errors[field] : "";

  const activeError = apiError || validationError;

  const handleConfirmPasswordPaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();

    const randomValue = Array.from(
      { length: 50 },
      () => Math.random().toString(36).charAt(2),
    ).join("");

    updateField("confirmPassword", randomValue);
  };

  const hasFormErrors = (
    Object.keys(errors) as (keyof FieldErrors)[]
  ).some((field) => validateField(field, formData[field]) !== "");

  return (
    <div className="space-y-4">
      {isSuccess && (
        <Alert variant="success" className="mb-4">
          Akun berhasil dibuat! Silakan verifikasi email sebelum login.
        </Alert>
      )}

      <form onSubmit={handleFormSubmit} noValidate className="space-y-4">
        <Input
          label="Nama Lengkap"
          type="text"
          placeholder="Contoh: Admin"
          value={formData.name}
          errorText={fieldError("name")}
          onChange={(e) => updateField("name", e.target.value)}
          fullWidth
          required
          autoComplete="name"
        />

        <Input
          label="Email"
          type="email"
          placeholder="nama@email.com"
          value={formData.email}
          errorText={fieldError("email")}
          onChange={(e) => updateField("email", e.target.value)}
          fullWidth
          required
          autoComplete="email"
        />

        <PasswordInput
          label="Password"
          placeholder="Min. 8 karakter (huruf, angka, simbol)"
          value={formData.password}
          errorText={fieldError("password")}
          onChange={(e) => updateField("password", e.target.value)}
          fullWidth
          required
          autoComplete="new-password"
        />

        <PasswordInput
          label="Konfirmasi Password"
          placeholder="Ulangi password"
          value={formData.confirmPassword}
          errorText={fieldError("confirmPassword")}
          onChange={(e) => updateField("confirmPassword", e.target.value)}
          onPaste={handleConfirmPasswordPaste}
          fullWidth
          required
          autoComplete="new-password"
        />

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

      <AuthFooter
        prompt="Sudah punya akun?"
        linkText="Masuk di sini"
        linkTo="/login"
      />
    </div>
  );
};

export default RegisterForm;
