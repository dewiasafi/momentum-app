// src/features/auth/components/LoginForm.tsx
import React, { useState } from 'react';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Untuk sementara (Mocking), tampilkan alert atau console.log 
    // berisi data email dan password yang diinput user!
    console.log('Submitted data:', { email, password });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Welcome Back to Momentum
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="developer@momentum.com"
            required
          />
        </div>

        {/* TODO: Tugas Kamu Malam Ini!
            Tambahkan field Input Password di sini.
            Gunakan state 'password' dan 'setPassword' yang sudah disiapkan di atas.
            Pastikan type input-nya adalah 'password'.
        */}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition duration-200"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};