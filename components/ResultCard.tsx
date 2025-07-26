
import React from 'react';

interface ResultCardProps {
    children: React.ReactNode;
}

const ResultCard: React.FC<ResultCardProps> = ({ children }) => {
    return (
        <div className="bg-slate-50 p-8 rounded-2xl shadow-lg border border-slate-200 animate-fade-in">
            {children}
        </div>
    );
};

export default ResultCard;
