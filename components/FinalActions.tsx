
import React, { useState } from 'react';

interface FinalActionsProps {
    onCopy: () => void;
    onExport: () => void;
}

const FinalActions: React.FC<FinalActionsProps> = ({ onCopy, onExport }) => {
    const [copyText, setCopyText] = useState('Salin Teks');

    const handleCopyClick = () => {
        onCopy();
        setCopyText('Tersalin!');
        setTimeout(() => {
            setCopyText('Salin Teks');
        }, 2000);
    };

    return (
        <div className="flex justify-end items-center mt-4 gap-2">
            <button
                onClick={handleCopyClick}
                className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-slate-700 rounded-lg hover:bg-slate-200/70 transition-colors text-sm font-medium border border-slate-200"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span>{copyText}</span>
            </button>
            <button
                onClick={onExport}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Ekspor HTML
            </button>
        </div>
    );
};

export default FinalActions;
