import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import { ALL_CATEGORY_GROUPS, RECOMMENDED_COURSES } from '../constants';

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  // Use first 4 courses as banner slides
  const slides = RECOMMENDED_COURSES.slice(0, 4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="pt-6 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-4 lg:h-[420px]">
          
          {/* Left Sidebar - Categories (Desktop Only) */}
          <div className="hidden lg:flex flex-col w-60 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-visible py-3 shrink-0 relative z-20">
             {ALL_CATEGORY_GROUPS.map((group, idx) => (
                <div key={idx} className="group/item px-5 py-3 hover:bg-slate-50 cursor-pointer flex items-center justify-between transition-colors relative">
                    <div className="flex flex-col">
                        <span className="font-bold text-slate-700 text-sm group-hover/item:text-brand-600 transition-colors">{group.title}</span>
                        <span className="text-[10px] text-slate-400 truncate max-w-[150px] mt-0.5">
                            {group.items.slice(0, 2).join(' / ')}
                        </span>
                    </div>
                    <ChevronRight size={14} className="text-slate-300 group-hover/item:text-brand-500" />
                    
                    {/* Hover Sub-menu */}
                    <div className="absolute left-[calc(100%+0.5rem)] top-0 min-h-full w-[600px] bg-white rounded-2xl shadow-xl border border-slate-100 p-6 opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-200 flex flex-col flex-wrap content-start gap-x-8 gap-y-2 z-50">
                        {/* Little triangle connector */}
                        <div className="absolute top-6 -left-2 w-4 h-4 bg-white transform rotate-45 border-l border-b border-slate-100"></div>
                        
                        <h4 className="w-full text-lg font-black text-slate-800 mb-4 pb-2 border-b border-slate-50 flex items-center gap-2">
                            {group.title}
                            <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">全部课程</span>
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {group.items.map((item) => (
                                <a key={item} href="#" className="text-sm text-slate-600 hover:text-brand-500 hover:font-bold py-1.5 px-3 rounded-lg hover:bg-brand-50 transition-colors">
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
             ))}
             <div className="mt-auto px-5 pt-2 border-t border-slate-50">
                <a href="#categories" className="text-xs font-bold text-slate-400 hover:text-brand-500 flex items-center gap-1 transition-colors">
                    查看全部分类 <ArrowRight size={10} />
                </a>
             </div>
          </div>

          {/* Right Banner Carousel */}
          <div className="flex-1 relative rounded-2xl overflow-hidden shadow-md group border border-slate-100 bg-slate-900 z-10">
             {slides.map((slide, index) => (
                <div 
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                >
                    <img 
                        src={slide.coverImage} 
                        alt={slide.title} 
                        className="w-full h-full object-cover opacity-60 transform scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90"></div>
                    
                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 p-8 sm:p-12 md:p-16 max-w-3xl animate-fade-up">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="inline-block px-3 py-1 bg-brand-500 text-white text-xs font-bold rounded-full shadow-lg shadow-brand-500/30">
                                今日推荐
                            </span>
                            <span className="text-brand-300 text-xs font-bold tracking-wider uppercase">
                                FEATURED COURSE
                            </span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4 drop-shadow-lg tracking-tight">
                            {slide.title}
                        </h2>
                        <p className="text-slate-200 text-lg mb-8 line-clamp-2 max-w-xl font-medium drop-shadow-md">
                            由 {slide.institution} 倾力打造 · {slide.instructor} 导师主讲
                        </p>
                        <button className="bg-white text-slate-900 hover:bg-brand-400 hover:text-white px-8 py-3.5 rounded-full font-bold text-base transition-all transform hover:scale-105 shadow-xl flex items-center gap-2">
                            立即学习 <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
             ))}

             {/* Indicators */}
             <div className="absolute bottom-6 right-8 z-20 flex gap-2">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                            idx === currentSlide ? 'bg-brand-500 w-8' : 'bg-white/30 hover:bg-white/60'
                        }`}
                    />
                ))}
             </div>

             {/* Arrows */}
             <button 
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/20 hover:bg-brand-500 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 border border-white/10"
             >
                <ChevronLeft size={24} />
             </button>
             <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/20 hover:bg-brand-500 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 border border-white/10"
             >
                <ChevronRight size={24} />
             </button>
          </div>

        </div>
      </div>
      
      {/* Inline styles for animations */}
      <style>{`
        @keyframes fade-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
            animation: fade-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};