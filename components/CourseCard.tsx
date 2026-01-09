import React from 'react';
import { Course } from '../types';
import { Star, Users, Heart, ArrowUpRight } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="group bg-white rounded-[1.5rem] overflow-hidden border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer relative">
      
      {/* Top Action Bar (Absolute) */}
      <div className="absolute top-3 left-3 right-3 z-20 flex justify-between items-start">
         {/* Tags */}
         <div className="flex flex-col gap-1.5 items-start">
            {course.tags.slice(0, 2).map((tag, idx) => (
                <span key={idx} className="bg-white/95 backdrop-blur-sm text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm border border-slate-100/50">
                    {tag}
                </span>
            ))}
         </div>
         {/* Favorite Button */}
         <button className="p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-400 hover:text-rose-500 hover:bg-white transition-all shadow-sm group-hover:scale-110">
            <Heart size={16} />
         </button>
      </div>

      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
        <img 
          src={course.coverImage} 
          alt={course.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        {/* Organization Tag on Image Bottom */}
        <div className="absolute bottom-3 left-3 right-3 z-10">
            <div className="bg-slate-900/40 backdrop-blur-md text-white text-[10px] font-medium px-2 py-1 rounded-lg w-fit flex items-center gap-1 border border-white/10">
                <Users size={10} className="text-brand-300" />
                <span className="truncate max-w-[120px]">{course.institution}</span>
            </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col relative">
        <h3 className="text-[15px] font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-brand-600 transition-colors leading-relaxed h-[44px]">
          {course.title}
        </h3>

        {/* Instructor & Rating */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-50">
             <div className="flex items-center text-xs text-slate-500 font-medium">
                <div className="w-5 h-5 rounded-full bg-slate-100 mr-2 overflow-hidden ring-1 ring-slate-50">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${course.instructor}`} alt="avatar" />
                </div>
                {course.instructor}
            </div>
            <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                <Star size={12} fill="currentColor" /> 
                {course.rating}
            </div>
        </div>

        {/* Footer: Price & Students */}
        <div className="mt-auto flex items-end justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
                {course.price === 0 ? (
                    <span className="text-xl font-black text-brand-500 tracking-tight">免费</span>
                ) : (
                    <>
                        <span className="text-sm font-bold text-accent-600">¥</span>
                        <span className="text-xl font-black text-accent-600 tracking-tight">{course.price}</span>
                    </>
                )}
                
                {course.originalPrice && (
                    <span className="text-xs text-slate-400 line-through decoration-slate-300 ml-1">
                        ¥{course.originalPrice}
                    </span>
                )}
            </div>
          </div>
          
          <div className="text-xs font-medium text-slate-400 flex items-center">
             {course.studentCount > 1000 ? `${(course.studentCount / 1000).toFixed(1)}k` : course.studentCount} 人在学
          </div>
        </div>

        {/* Hover Arrow (Decorative) */}
        <div className="absolute right-5 bottom-5 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 text-brand-500 bg-brand-50 p-1.5 rounded-lg">
             <ArrowUpRight size={16} />
        </div>
      </div>
    </div>
  );
};