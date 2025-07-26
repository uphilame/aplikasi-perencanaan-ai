import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import ResultCard from '../components/ResultCard';
import PageHeader from '../components/Header';

const Settings = () => {
  const { apiKey, updateApiKey } = useAuth();
  const [newKey, setNewKey] = useState(apiKey || '');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setNewKey(apiKey || '');
  }, [apiKey]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newKey.trim().length < 10) {
        setMessage('Mohon masukkan API Key yang valid.');
        return;
    }
    updateApiKey(newKey.trim());
    setMessage('API Key berhasil diperbarui!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div>
      <PageHeader
        title="Pengaturan Akun"
        subtitle="Kelola Google Gemini API Key Anda di sini."
      />
      <ResultCard>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="apiKey">
              Google Gemini API Key Anda
            </label>
            <input
              type="password"
              id="apiKey"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              placeholder="Masukkan API Key Anda di sini"
            />
            <p className="text-xs text-slate-400 mt-2 italic">
                API Key Anda penting untuk mengakses model AI. Kunci ini hanya disimpan di browser Anda dan tidak akan dibagikan.
            </p>
          </div>
          <div className="flex items-center justify-between pt-2">
            <button
              type="submit"
              className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors hover:bg-purple-700 disabled:bg-slate-400"
              disabled={newKey === apiKey || !newKey.trim()}
            >
              Simpan Perubahan
            </button>
            {message && <p className="text-green-600 text-sm font-medium">{message}</p>}
          </div>
        </form>
      </ResultCard>
       <div className="text-center mt-6 text-sm text-slate-500">
            <p>Tidak punya API Key? <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Dapatkan di Google AI Studio</a></p>
        </div>
    </div>
  );
};

export default Settings;
