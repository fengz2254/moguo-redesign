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
    <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10 gap-4">
      <div className="relative">
        <div className="relative inline-block">
            {/* Main Title with Tight Tracking */}
            <h2 className="relative z-10 text-3xl sm:text-4xl md:text-[2.5rem] font-black text-slate-900 dark:text-white tracking-tight leading-none">
              {title}
            </h2>
            {/* Modern "Highlighter" Decoration Style */}
            <div className="absolute bottom-1 left-0 w-full h-3 bg-brand-400/30 dark:bg-brand-500/40 -skew-x-12 -z-0 rounded-sm"></div>
        </div>
        
        {subtitle && (
          <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm md:text-base font-medium transition-colors max-w-xl leading-relaxed tracking-normal">
            {subtitle}
          </p>
        )}
      </div>
      
      {onAction && (
        <button 
          onClick={onAction}
          className="group flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          {actionText}
          <span className="bg-slate-200 dark:bg-slate-700 rounded-full p-0.5 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
            {actionIcon ? actionIcon : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14m-7-7 7 7-7 7"/>
                </svg>
            )}
          </span>
        </button>
      )}
    </div>
  );
};