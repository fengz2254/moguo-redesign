import React, { useState } from 'react';
import { RECOMMENDED_COURSES, INITIAL_MY_CATEGORIES } from '../constants';
import { CourseCard } from './CourseCard';

export const RecommendedCourses: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('推荐');

  // Backend configured tabs (Static list, no user customization)
  const tabs = ['推荐', ...INITIAL_MY_CATEGORIES];

  return (
    <div className="flex flex-col gap-8">
      {/* Header & Tabs Container */}
      <div className="flex flex-col gap-6">
        <div className="flex items-end justify-between">
             <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                    精品课推荐
                </h2>
                <p className="mt-2 text-slate-500 font-medium">
                    严选名师好课，打造最佳学习体验
                </p>
             </div>
        </div>

        <div className="flex items-center gap-3">
             {/* Tabs Scroll Area */}
             <div className="flex-1 overflow-x-auto pb-4 -mb-4 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 md:mb-0 no-scrollbar mask-gradient">
                <div className="flex items-center gap-3">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveCategory(tab)}
                            className={`
                                whitespace-nowrap px-6 py-2.5 rounded-2xl font-bold text-sm transition-all duration-300 border select-none
                                ${activeCategory === tab
                                    ? 'bg-brand-500 border-brand-500 text-white shadow-lg shadow-brand-500/30 scale-105'
                                    : 'bg-white border-slate-100 text-slate-500 hover:border-brand-200 hover:text-brand-600 hover:bg-brand-50/50'
                                }
                            `}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
             </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
        {RECOMMENDED_COURSES.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};