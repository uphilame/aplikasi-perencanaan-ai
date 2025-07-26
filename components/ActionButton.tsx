
import React from 'react';

interface ActionButtonProps {
    text: string;
    onClick?: () => void;
    isLoading: boolean;
    type?: 'button' | 'submit';
    isNextStep?: boolean;
}

const LoadingIcon = () => (
    <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line>
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
        <line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line>
        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
    </svg>
);

const InitialIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 3v4"/><path d="M3 19h4"/><path d="M17 19h4"/>
    </svg>
);

const NextStepIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 16 16 12 12 8"/><line x1="8" y1="12" x2="16" y2="12"/>
    </svg>
);


const ActionButton: React.FC<ActionButtonProps> = ({ text, onClick, isLoading, type = 'button', isNextStep = false }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-sky-400 to-purple-600 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:opacity-90 disabled:from-slate-400 disabled:to-slate-400 disabled:cursor-not-allowed"
        >
            <span className="button-icon">
                {isLoading ? <LoadingIcon /> : (isNextStep ? <NextStepIcon /> : <InitialIcon />)}
            </span>
            <span className="button-text">{isLoading ? 'Sedang Membuat...' : text}</span>
        </button>
    );
};

export default ActionButton;
