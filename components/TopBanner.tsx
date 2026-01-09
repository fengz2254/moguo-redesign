import React, { useState, useEffect } from 'react';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { RECOMMENDED_COURSES } from '../constants';

export const TopBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % RECOMMENDED_COURSES.length);
        setIsAnimating(false);
      }, 500); // Duration of exit animation
    }, 4000); // Show each for 4 seconds

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  const course = RECOMMENDED_COURSES[currentIndex];

  return (
    <div className="bg-slate-900 text-slate-300 relative overflow-hidden border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between relative">
        
        {/* Center Content - Ticker */}
        <div className="flex-1 flex justify-center items-center overflow-hidden h-full relative">
            <div 
                className={`
                    flex items-center gap-2 sm:gap-3 transition-all duration-500 transform absolute w-full justify-center
                    ${isAnimating ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}
                `}
            >
                <span className="flex items-center gap-1.5 text-brand-400 font-bold uppercase tracking-wider text-[10px] bg-brand-900/50 px-2 py-0.5 rounded-full border border-brand-500/20 whitespace-nowrap">
                    <Sparkles size={10} fill="currentColor" /> 热门推荐
                </span>
                <span className="text-slate-100 font-medium truncate max-w-[140px] sm:max-w-sm text-xs sm:text-sm">
                    {course.title}
                </span>
                <span className="hidden md:inline-block w-1 h-1 rounded-full bg-slate-600"></span>
                <span className="hidden md:inline text-xs text-slate-400">
                   {course.institution}
                </span>
                <a href={`#course/${course.id}`} className="flex items-center gap-1 text-white hover:text-brand-400 font-bold ml-1 sm:ml-2 transition-colors text-xs group whitespace-nowrap">
                    立即查看 <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
            </div>
        </div>

        {/* Close Button */}
        <button 
            onClick={() => setIsVisible(false)}
            className="absolute right-0 sm:static p-1.5 rounded-full hover:bg-white/10 text-slate-500 hover:text-white transition-colors z-10"
            aria-label="关闭"
        >
            <X size={14} />
        </button>
      </div>
    </div>
  );
};