import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register, isLoading } = useAuth();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok.');
      return;
    }
    if (!email || !password) {
      setError('Mohon lengkapi semua kolom.');
      return;
    }
    try {
      await register(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registrasi gagal. Coba lagi nanti.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-sky-500 to-purple-600 bg-clip-text text-transparent pb-2">
            Buat Akun Baru
          </h1>
          <p className="text-slate-500">
            Daftar untuk mulai membuat perencanaan pembelajaran.
          </p>
        </header>

        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-slate-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="email">
                Alamat Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                placeholder="nama@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                placeholder="Minimal 8 karakter"
                required
              />
            </div>
             <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="confirmPassword">
                Konfirmasi Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                placeholder="Ulangi password"
                required
              />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-sky-400 to-purple-600 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:opacity-90 disabled:from-slate-400 disabled:to-slate-400"
            >
              {isLoading ? 'Memproses...' : 'Daftar'}
            </button>
          </form>
        </div>
        <footer className="text-center mt-6 text-sm text-slate-500">
            <p>Sudah punya akun? <NavLink to="/login" className="text-purple-600 hover:underline font-semibold">Masuk di sini</NavLink></p>
        </footer>
      </div>
    </div>
  );
};

export default Register;
