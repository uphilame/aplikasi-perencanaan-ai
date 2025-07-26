
import React from 'react';

const LoadingSpinner = () => (
    <svg className="animate-spin text-purple-500 h-12 w-12 mb-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="2" x2="12" y2="6"></line>
        <line x1="12" y1="18" x2="12" y2="22"></line>
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
        <line x1="2" y1="12" x2="6" y2="12"></line>
        <line x1="18" y1="12" x2="22" y2="12"></line>
        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
    </svg>
);

const LoadingView: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 mt-8">
            <LoadingSpinner />
            <p className="text-slate-700 font-medium">KA sedang meracik perencanaan terbaik untuk Anda...</p>
            <p className="text-slate-500 text-sm">Mohon tunggu sebentar.</p>
        </div>
    );
};

export default LoadingView;
