import React from 'react';
import { Course } from '../types';
import { Star, User, Users, Heart } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-soft hover:-translate-y-2 transition-all duration-300 flex flex-col h-full cursor-pointer relative">
      
      {/* Floating Action */}
      <button className="absolute top-3 right-3 z-20 p-2 bg-white/80 backdrop-blur-sm rounded-full text-slate-400 hover:text-pop-pink hover:bg-pink-50 transition-colors opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300">
        <Heart size={18} />
      </button>

      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden rounded-t-3xl m-2 mb-0">
        <img 
          src={course.coverImage} 
          alt={course.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 rounded-2xl"
        />
        <div className="absolute bottom-3 left-3 flex gap-2">
            {course.tags.map((tag, idx) => (
                <span key={idx} className="bg-white/90 backdrop-blur-md text-brand-600 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                    {tag}
                </span>
            ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-3">
            <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md">
                <Users size={14} className="text-brand-400" /> {course.institution}
            </span>
            <span className="flex items-center gap-1 text-amber-500 font-bold">
                <Star size={14} fill="currentColor" /> {course.rating}
            </span>
        </div>

        <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-brand-600 transition-colors leading-snug">
          {course.title}
        </h3>

        <div className="flex items-center text-sm text-slate-500 mb-5">
            <div className="w-6 h-6 rounded-full bg-slate-200 mr-2 overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${course.instructor}`} alt="avatar" />
            </div>
            {course.instructor}
        </div>

        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
                <span className={`text-xl font-black ${course.price === 0 ? 'text-green-500' : 'text-accent-600'}`}>
                    {course.price === 0 ? '免费' : `¥${course.price}`}
                </span>
                {course.originalPrice && (
                    <span className="text-xs text-slate-400 line-through decoration-slate-300">
                        ¥{course.originalPrice}
                    </span>
                )}
            </div>
          </div>
          <span className="text-xs font-semibold text-brand-300 bg-brand-50 px-2 py-1 rounded-lg">
            {course.studentCount} 人在学
          </span>
        </div>
      </div>
    </div>
  );
};