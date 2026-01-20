
import React from 'react';
import { RECOMMENDED_COURSES } from '../constants';
import { CourseCard } from './CourseCard';

export const RecommendedCourses: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {/* Header Container */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
             {/* Title & Subtitle */}
             <div>
                <div className="relative inline-block">
                    <h2 className="relative z-10 text-3xl sm:text-4xl md:text-[2.5rem] font-black text-slate-900 dark:text-white tracking-tight leading-none">
                        精品课推荐
                    </h2>
                    <div className="absolute bottom-1 left-0 w-full h-3 bg-brand-400/30 dark:bg-brand-500/40 -skew-x-12 -z-0 rounded-sm"></div>
                </div>
                <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm md:text-base font-medium transition-colors">
                    严选名师好课，打造最佳学习体验
                </p>
             </div>
      </div>

      {/* 
        Responsive Layout:
        Mobile: Flex row with horizontal scroll (overflow-x-auto), snap scrolling
        Desktop: Grid layout
      */}
      <div className="
        flex overflow-x-auto snap-x snap-mandatory gap-4 -mx-4 px-4 pb-4 
        md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:mx-0 md:px-0 md:pb-0 md:overflow-visible
        no-scrollbar
      ">
        {RECOMMENDED_COURSES.map((course) => (
          <div key={course.id} className="min-w-[85vw] sm:min-w-[45vw] md:min-w-0 snap-center h-full">
             <CourseCard course={course} />
          </div>
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
      `}</style>
    </div>
  );
};
