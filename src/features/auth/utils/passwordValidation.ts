export const validatePassword = (value: string): string | null => {
  if (!value) return "Password wajib diisi.";

  if (value.length < 8) {
    return "Password minimal 8 karakter.";
  }

  if (!/[A-Za-z]/.test(value)) {
    return "Password harus mengandung minimal satu huruf.";
  }

  if (!/[0-9]/.test(value)) {
    return "Password harus mengandung minimal satu angka.";
  }

  if (!/[!@#$%^&*(),.?"{}|<>_\-+=~`]/.test(value)) {
    return "Password harus mengandung minimal satu simbol.";
  }

  return null;
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string | null => {
  if (!confirmPassword) {
    return "Konfirmasi password wajib diisi.";
  }

  if (password !== confirmPassword) {
    return "Konfirmasi password tidak cocok.";
  }

  return null;
};

export const validatePasswordLogin = (value: string): string | null => {
    if (!value) return "Password wajib diisi.";

    if (value.length < 8) {
      return "Password minimal 8 karakter.";
    }

    return null;
  };
