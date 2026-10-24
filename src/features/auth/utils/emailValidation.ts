export const validateEmail = (value: string): string | null => {
  if (!value.trim()) {
    return "Email wajib diisi.";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(value.trim())) {
    return "Masukkan alamat email dengan format yang valid.";
  }

  return null;
};