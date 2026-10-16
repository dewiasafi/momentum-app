import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { RegisterFormData } from "../types"
import { useMutation } from "@tanstack/react-query"
import { registerUserApi } from "./auth.api"

export const useRegister = () => {
     const navigate = useNavigate()

     const [formData, setFormData] = useState<RegisterFormData>({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
     })
     const [showPassword, setShowPassword] = useState(false);
     const [validationError, setValidationError] = useState<string | null>(null);

     const registerMutation = useMutation({
          mutationFn: registerUserApi,
          onSuccess: () => {
               setValidationError(null)
               localStorage.setItem("token", "mock-jwt-token-12345");
               // setTimeout(() => navigate("/login"), 1500);
          }
     })

     const handleChange = (field: keyof RegisterFormData, value: string) => {
          setFormData((prev) => ({ ...prev, [field]: value }));
     }

     const toggleShowPassword = () => setShowPassword((prev) => !prev);

     const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault()
          setValidationError(null)

          if (formData.password.length < 8) {
               setValidationError("Password minimal 8 karakter.");
               return;
          }

          if (formData.password !== formData.confirmPassword) {
               setValidationError("Konfirmasi password tidak cocok.");
               return;
          }
          registerMutation.mutate(formData);
     }
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
}