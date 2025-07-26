import React from 'react';

interface PageHeaderProps {
    title: string;
    subtitle: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
    return (
        <header className="mb-10">
            <h1 className="text-4xl font-extrabold text-slate-800">
                {title}
            </h1>
            <p className="text-slate-500 mt-1">
                {subtitle}
            </p>
        </header>
    );
};

export default PageHeader;
