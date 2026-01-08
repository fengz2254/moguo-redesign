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
      {/* Updated Gradient: From Brand (Green) to Cyan/Teal */}
      <div className={`${className} bg-gradient-to-br from-brand-400 via-brand-500 to-pop-cyan rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20 transform transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105`}>
        {/* Custom Magic Fruit / Swirl Icon */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-[60%] h-[60%] text-white"
        >
          {/* Outer Fruit Shape with Swirl */}
          <path 
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="opacity-20"
          />
          <path 
            d="M12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          {/* Leaf */}
          <path 
             d="M16 5C16 5 18 3 20 5C22 7 20 9 20 9"
             stroke="currentColor"
             strokeWidth="2"
             strokeLinecap="round"
             strokeLinejoin="round"
          />
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