import React from 'react'
import { useRegister } from '../api/useRegister';
import { Button, Input } from '@/components/ui';
import { Eye, EyeOff } from 'lucide-react';
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

  const activeError = validationError || apiError || ""

  return (
    <div>
      {activeError && (
        <div className="">
          {activeError}
        </div>
      )}
      {isSuccess && (
        <div className="">
          New Account Successfully Created
        </div>
      )}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          placeholder="Your name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          fullWidth
          required
          autoComplete="name"
        />
        <Input
          label="Email"
          type="email"
          placeholder="your@gmail.com"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          fullWidth
          required
          autoComplete="email"
        />
        <Input
          label='Password'
          type={showPassword ? "text" : "password"}
          placeholder="Min. 8 character"
          errorText={activeError}
          onChange={(e) => handleChange("password", e.target.value)}
          fullWidth
          required
          autoComplete="new-password"
          rightIcon={
            <button
              type="button"
              onClick={toggleShowPassword}
              aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
        />
        <Input
          label="Confirmation Password"
          type={showPassword ? "text" : "password"}
          placeholder="confirm password"
          value={formData.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
          fullWidth
          required
          autoComplete="new-password"
          errorText={activeError}
        />
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={isLoading || isSuccess}
          className="mt-2"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Mendaftarkan...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Daftar
            </span>
          )}
        </Button>
      </form>
      <div className="">
        Have an account?{" "}
        <Link to="/login" className=''>
          Login here
        </Link>
      </div>
    </div>
  )
}

export default RegisterForm