import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "./auth.api";
import type { RegisterFormData } from "../types";

export const useRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const registerMutation = useMutation({
    mutationFn: () =>
      authApi.register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      }),
    onSuccess: () => {
      setValidationError(null);
      // Sesuai dokumen Sprint 0: redirect ke /verify-notice dengan membawa email terdaftar
      navigate("/verify-notice", {
        replace: true,
        state: { email: formData.email.trim() },
      });
    },
  });

  const handleChange = (field: keyof RegisterFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (validationError) setValidationError(null);
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const { password, confirmPassword } = formData;

    if (!trimmedName) {
      setValidationError("Nama lengkap wajib diisi.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setValidationError("Format email tidak valid.");
      return;
    }

    if (password.length < 8) {
      setValidationError("Password minimal 8 karakter.");
      return;
    }

    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[^a-zA-Z0-9]/.test(password);

    if (!hasLetter || !hasNumber || !hasSymbol) {
      setValidationError(
        "Password wajib berupa kombinasi huruf, angka, dan simbol."
      );
      return;
    }

    if (password !== confirmPassword) {
      setValidationError("Konfirmasi password tidak cocok.");
      return;
    }

    registerMutation.mutate();
  };

  return {
    formData,
    showPassword,
    validationError,
    isLoading: registerMutation.isPending,
    isSuccess: registerMutation.isSuccess,
    apiError: registerMutation.error ? (registerMutation.error as Error).message : null,
    handleChange,
    toggleShowPassword,
    handleSubmit,
  };
};