import React from 'react';

interface LogoProps {
  className?: string; // Dimensions for the icon container
  withText?: boolean; // Whether to show the brand name
  light?: boolean; // For dark backgrounds (text color)
}

export const Logo: React.FC<LogoProps> = ({ 
  className = "w-10 h-10", 
  withText = false, 
  light = false 
}) => {
  return (
    <div className="flex items-center gap-2.5 group cursor-pointer select-none">
      {/* Icon Container - Green Gradient */}
      <div className={`${className} bg-gradient-to-br from-brand-400 via-brand-500 to-pop-cyan rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20 transform transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105`}>
        {/* Magic Fruit Swirl SVG */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-[65%] h-[65%] text-white"
        >
          {/* A stylized fruit/drop shape with a spiral */}
          <path d="M12 21a9 9 0 1 1 0-18c4.97 0 9 4.03 9 9 0 4.97-4.03 9-9 9z" className="opacity-0" />
          <path d="M12 21C7.029 21 3 16.97 3 12 3 7.03 7.029 3 12 3c4.97 0 9 4.03 9 9 0 4.97-4.03 9-9 9" />
          <path d="M12 7v0c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5" />
          {/* Leaf accent */}
          <path d="M16.5 7.5c-.5-1.5-2-2.5-3.5-2.5" />
        </svg>
      </div>
      
      {withText && (
        <div className="flex flex-col">
            <span className={`font-black text-2xl tracking-tight leading-none ${light ? 'text-white' : 'text-slate-800'} group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-600 group-hover:to-pop-cyan transition-all duration-300`}>
            魔果云课
            </span>
        </div>
      )}
    </div>
  );
};