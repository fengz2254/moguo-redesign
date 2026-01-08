import React, { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionText?: string;
  actionIcon?: ReactNode;
  onAction?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  subtitle, 
  actionText = "查看全部", 
  actionIcon,
  onAction 
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center mb-10 gap-4">
      <div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight relative inline-block">
          {title}
          <div className="absolute -bottom-2 left-0 w-1/3 h-1.5 bg-brand-500 rounded-full"></div>
        </h2>
        {subtitle && (
          <p className="mt-4 text-slate-500 text-lg font-medium">{subtitle}</p>
        )}
      </div>
      {onAction && (
        <button 
          onClick={onAction}
          className="px-6 py-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-brand-600 hover:border-brand-200 font-bold text-sm flex items-center gap-2 group whitespace-nowrap shadow-sm hover:shadow-md transition-all"
        >
          {actionText}
          <span className="transition-transform group-hover:translate-x-1 bg-brand-100 rounded-full p-1 text-brand-600">
            {actionIcon ? actionIcon : '→'}
          </span>
        </button>
      )}
    </div>
  );
};