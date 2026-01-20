import React from 'react';
import { Course } from '../types';
import { Users, Heart, ArrowUpRight, PlayCircle } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="group bg-white dark:bg-slate-800 rounded-[1.5rem] overflow-hidden shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-4px_rgba(0,0,0,0.1)] dark:shadow-none dark:hover:shadow-[0_20px_40px_-4px_rgba(0,0,0,0.5)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full cursor-pointer relative ring-1 ring-slate-100 dark:ring-white/5 hover:ring-brand-200 dark:hover:ring-brand-500/30">
      
      {/* Top Action Bar (Absolute) */}
      <div className="absolute top-3 left-3 right-3 z-20 flex justify-between items-start pointer-events-none">
         {/* Tags */}
         <div className="flex flex-col gap-1.5 items-start">
            {course.tags.slice(0, 2).map((tag, idx) => (
                <span key={idx} className="bg-slate-900/40 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm tracking-wide border border-white/10">
                    {tag}
                </span>
            ))}
         </div>
         {/* Favorite Button - Interactive */}
         <button className="pointer-events-auto p-2 bg-white/90 dark:bg-slate-900/60 backdrop-blur-md rounded-full text-slate-400 hover:text-rose-500 hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm group-hover:scale-110 active:scale-95">
            <Heart size={16} />
         </button>
      </div>

      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* Overlay Darken on Hover */}
        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors duration-300 z-10"></div>
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
             <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-2xl">
                 <PlayCircle size={32} className="text-white fill-white/20" />
             </div>
        </div>

        <img 
          src={course.coverImage} 
          alt={course.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        
        {/* Organization Tag on Image Bottom */}
        <div className="absolute bottom-3 left-3 right-3 z-10 transition-opacity duration-300 group-hover:opacity-0">
            <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-md text-slate-800 dark:text-slate-200 text-[10px] font-bold px-2 py-1 rounded-lg w-fit flex items-center gap-1 shadow-sm border border-white/20">
                <Users size={10} className="text-brand-600 dark:text-brand-400" />
                <span className="truncate max-w-[120px]">{course.institution}</span>
            </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col relative bg-white dark:bg-slate-800">
        <h3 className="text-[15px] font-bold text-slate-800 dark:text-slate-100 mb-2 line-clamp-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-relaxed h-[44px]">
          {course.title}
        </h3>

        {/* Instructor */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-50 dark:border-white/5">
             <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 font-medium">
                <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-700 mr-2 overflow-hidden ring-1 ring-slate-100 dark:ring-slate-600">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${course.instructor}`} alt="avatar" />
                </div>
                {course.instructor}
            </div>
        </div>

        {/* Footer: Price & Students */}
        <div className="mt-auto flex items-end justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-0.5">
                {course.price === 0 ? (
                    <span className="text-xl font-black text-brand-500 tracking-tight">免费</span>
                ) : (
                    <>
                        <span className="text-xs font-bold text-rose-500 mb-1.5 mr-0.5">¥</span>
                        <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none group-hover:text-rose-500 transition-colors tabular-nums">{course.price}</span>
                    </>
                )}
                
                {course.originalPrice && (
                    <span className="text-xs text-slate-400 dark:text-slate-500 line-through decoration-slate-300 dark:decoration-slate-600 ml-1.5 font-medium">
                        ¥{course.originalPrice}
                    </span>
                )}
            </div>
          </div>
          
          <div className="text-[10px] font-bold text-slate-400 flex items-center bg-slate-50 dark:bg-white/5 dark:text-slate-400 px-2 py-1 rounded-md transition-colors border border-slate-100 dark:border-white/5">
             {course.studentCount > 1000 ? `${(course.studentCount / 1000).toFixed(1)}k` : course.studentCount} 人在学
          </div>
        </div>
      </div>
    </div>
  );
};
