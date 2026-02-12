
import React, { useState, useEffect } from 'react';
import { Search, ChevronRight, ChevronLeft, Sparkles, User, ArrowRight } from 'lucide-react';
import { RECOMMENDED_COURSES } from '../constants';

interface HeroProps {
  onSearch: (query: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Use first 5 courses as banner slides
  const slides = RECOMMENDED_COURSES.slice(0, 5);
  const hotSearchTags = ['Java', 'Python', '考研', '雅思', '公务员'];

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000); 
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsAnimating(false);
    }, 500);
  };

  const handlePrev = () => {
    setIsAnimating(true);
    setTimeout(() => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        setIsAnimating(false);
    }, 500);
  };

  const handleSearchSubmit = (e?: React.FormEvent | React.KeyboardEvent) => {
      if (e) e.preventDefault();
      if (!searchValue.trim()) return;
      onSearch(searchValue);
  };

  const currentCourse = slides[currentSlide];

  return (
    <div className="relative pb-16 pt-4"> {/* Reduced top/bottom padding for tighter layout */}
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Modern Card Banner Container */}
        {/* Height Reduced: h-[360px] mobile / h-[480px] desktop (Was 480/640) */}
        <div className="relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl h-[360px] md:h-[500px] group bg-slate-900 ring-1 ring-slate-900/5 select-none transition-all duration-500">
            
             {/* Dynamic Background Image Layer */}
             {slides.map((slide, index) => (
                <div 
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        index === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10'
                    }`}
                >
                    <img 
                        src={slide.coverImage} 
                        alt={slide.title} 
                        className="w-full h-full object-cover"
                    />
                    
                    {/* Gradient Overlay */}
                    {!slide.hideTextOverlay && (
                         <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
                    )}
                    
                    {/* Minimal Overlay for Poster Images */}
                    {slide.hideTextOverlay && (
                         <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
                    )}
                </div>
             ))}

             {/* Content Layer (Left Aligned - High Readability) */}
             {!currentCourse.hideTextOverlay && (
                 <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 md:px-20 max-w-4xl">
                    
                    {/* Content Animation Wrapper */}
                    <div className={`transition-all duration-500 transform ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                        
                        {/* Badge / Tag */}
                        <div className="flex items-center gap-3 mb-4 md:mb-6">
                            <span className="bg-brand-500 text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-brand-500/30 tracking-wide uppercase">
                                <Sparkles size={12} fill="currentColor" /> 
                                {currentCourse.tags[0] || 'Editor\'s Choice'}
                            </span>
                            <div className="h-4 w-px bg-white/20"></div>
                            <span className="text-brand-200 text-xs md:text-sm font-bold tracking-wide">
                                {currentCourse.institution}
                            </span>
                        </div>

                        {/* Main Title - Scaled down slightly for new height */}
                        {/* Text size reduced from 6xl to 5xl to fit the shorter banner */}
                        <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-[1.15] mb-4 md:mb-6 drop-shadow-md tracking-tight line-clamp-2">
                            {currentCourse.title}
                        </h1>
                        
                        {/* Meta Info Row */}
                        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-slate-300 mb-6 md:mb-8 font-medium text-xs md:text-sm">
                            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/5 backdrop-blur-sm">
                                <div className="w-5 h-5 rounded-full bg-white/20 p-0.5">
                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentCourse.instructor}`} className="w-full h-full rounded-full" />
                                </div>
                                <span className="text-white">{currentCourse.instructor}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <User size={14} />
                                <span>{currentCourse.studentCount} 人在学</span>
                            </div>
                        </div>

                        {/* Action Area: Price & CTA */}
                        <div className="flex items-center gap-6 md:gap-8">
                            <button className="h-10 md:h-14 px-8 md:px-10 rounded-full bg-white text-slate-900 font-bold text-sm md:text-base flex items-center gap-2 transition-all hover:bg-brand-50 hover:text-brand-600 hover:scale-105 active:scale-95 shadow-xl group/btn">
                                开始学习
                                <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                            </button>

                            <div className="flex flex-col">
                                <div className="flex items-baseline gap-1.5">
                                    {currentCourse.price === 0 ? (
                                        <span className="text-2xl md:text-3xl font-black text-brand-400">免费</span>
                                    ) : (
                                        <>
                                            <span className="text-xs md:text-sm font-bold text-white/60">¥</span>
                                            <span className="text-2xl md:text-3xl font-black text-white tracking-tighter">{currentCourse.price}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                 </div>
             )}

             {/* For Poster Images: Minimal CTA Button (Bottom Left) */}
             {currentCourse.hideTextOverlay && (
                  <div className={`absolute bottom-8 left-8 md:left-12 z-20 transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                      <button className="h-10 md:h-14 px-8 rounded-full bg-white/90 backdrop-blur-md text-slate-900 font-bold text-sm md:text-base flex items-center gap-2 transition-all hover:bg-brand-500 hover:text-white shadow-lg hover:shadow-brand-500/30 group/btn">
                          查看详情
                          <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                  </div>
             )}

             {/* Navigation Arrows (Subtle) */}
             <div className="hidden md:flex absolute bottom-8 right-8 gap-3 z-20">
                <button 
                    onClick={handlePrev}
                    className="w-10 h-10 rounded-full border border-white/10 bg-black/20 hover:bg-white hover:text-slate-900 backdrop-blur-md text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                >
                    <ChevronLeft size={20} />
                </button>
                <button 
                    onClick={handleNext}
                    className="w-10 h-10 rounded-full border border-white/10 bg-black/20 hover:bg-white hover:text-slate-900 backdrop-blur-md text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                >
                    <ChevronRight size={20} />
                </button>
             </div>

             {/* Slide Indicators */}
             <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 md:translate-x-0 ${currentCourse.hideTextOverlay ? 'md:left-auto md:right-40' : 'md:left-20'} flex gap-1.5 z-20 transition-all duration-500`}>
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-1 rounded-full transition-all duration-300 shadow-sm ${
                            idx === currentSlide ? 'bg-brand-500 w-8' : 'bg-white/40 w-2 hover:bg-white/80'
                        }`}
                    />
                ))}
             </div>
        </div>
      </div>

      {/* FLOATING SEARCH DOCK - Enhanced Design */}
      <div className="absolute bottom-0 left-0 right-0 z-30 px-4 translate-y-1/2 pointer-events-none">
         <div className="max-w-3xl mx-auto pointer-events-auto">
            <div className="bg-white/90 dark:bg-slate-800/90 rounded-2xl p-2 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-white/50 dark:border-white/10 flex items-center gap-2 relative ring-1 ring-white/40 dark:ring-white/5 backdrop-blur-xl transition-colors duration-300">
                
                {/* Input */}
                <div className="flex-1 flex items-center h-12 md:h-14 bg-slate-50 dark:bg-slate-900/50 rounded-xl px-4 border border-transparent focus-within:bg-white dark:focus-within:bg-slate-900 focus-within:border-brand-200 dark:focus-within:border-brand-900 focus-within:ring-2 focus-within:ring-brand-50 dark:focus-within:ring-brand-900/20 transition-all group">
                    <Search className="text-slate-400 group-focus-within:text-brand-500 mr-3 transition-colors" size={20} />
                    <input 
                        type="text" 
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit(e)}
                        placeholder="搜索你感兴趣的课程、导师..." 
                        className="flex-1 bg-transparent outline-none text-slate-800 dark:text-slate-100 font-bold placeholder:text-slate-400/80 placeholder:font-medium h-full w-full text-sm md:text-base"
                    />
                </div>

                {/* Button */}
                <button 
                    onClick={() => handleSearchSubmit()}
                    className="h-12 md:h-14 px-6 md:px-8 bg-slate-900 dark:bg-brand-600 hover:bg-brand-600 dark:hover:bg-brand-500 text-white rounded-xl font-bold text-sm md:text-base transition-all shadow-lg hover:shadow-xl active:scale-95 shrink-0 flex items-center gap-2"
                >
                    搜索
                </button>
            </div>
            
            {/* Hot Tags - Better Contrast */}
            <div className="flex justify-center mt-3 gap-2 sm:gap-4 text-xs font-medium text-slate-400 dark:text-slate-500 flex-wrap">
                 {hotSearchTags.map(tag => (
                     <button key={tag} onClick={() => onSearch(tag)} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-white/20 dark:border-white/5 px-2.5 py-1 rounded-lg hover:bg-white dark:hover:bg-slate-800 shadow-sm">
                        #{tag}
                     </button>
                 ))}
            </div>
         </div>
      </div>

    </div>
  );
};
