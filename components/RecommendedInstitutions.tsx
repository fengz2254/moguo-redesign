
import React from 'react';
import { INSTITUTIONS } from '../constants';
import { SectionHeader } from './SectionHeader';
import { Star, GraduationCap, Users, ArrowRight, Sparkles, Building2 } from 'lucide-react';

export const RecommendedInstitutions: React.FC = () => {
  return (
    <div>
      <SectionHeader 
        title="优选教育机构" 
        subtitle="汇聚行业顶尖机构，提供权威教学服务"
      />

      {/* 
        Responsive Layout:
        Mobile: Horizontal Scroll
        Desktop: Grid
      */}
      <div className="
        flex overflow-x-auto snap-x snap-mandatory gap-4 -mx-4 px-4 pb-8 
        md:grid md:grid-cols-2 md:gap-6 md:mx-0 md:px-0 md:pb-0 md:overflow-visible
        no-scrollbar
      ">
        {INSTITUTIONS.map((inst, idx) => (
          <div 
            key={inst.id} 
            className="
                min-w-[85vw] sm:min-w-[60vw] md:min-w-0 snap-center
                group flex flex-col bg-white dark:bg-slate-800 rounded-[2rem] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-none hover:shadow-[0_20px_40px_-4px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_-4px_rgba(0,0,0,0.5)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden h-full
            "
          >
            {/* Top Section: Header info */}
            <div className="p-6 pb-2 relative z-10">
                <div className="flex justify-between items-start mb-4">
                     <div className="flex gap-4">
                        <div className="w-14 h-14 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] bg-white p-1 shrink-0">
                             <img 
                                src={inst.logo} 
                                alt={inst.name} 
                                className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform"
                            />
                        </div>
                        <div className="min-w-0">
                             <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 flex items-center gap-2 truncate transition-colors">
                                <span className="truncate">{inst.name}</span>
                                <span className="p-1 bg-blue-50 dark:bg-blue-900/30 rounded-full text-blue-500 shrink-0">
                                    <Building2 size={10} />
                                </span>
                             </h3>
                             <div className="flex items-center gap-3 mt-1 text-xs font-medium text-slate-500 dark:text-slate-400 transition-colors">
                                <span className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-1.5 py-0.5 rounded text-amber-600 dark:text-amber-500 shrink-0">
                                    <Star size={10} className="fill-current" /> {inst.rating}
                                </span>
                                <span className="truncate">{(inst.studentCount / 10000).toFixed(1)}w 学员</span>
                             </div>
                        </div>
                     </div>
                     <button className="w-9 h-9 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 dark:group-hover:bg-brand-600 group-hover:text-white transition-all shadow-sm shrink-0">
                        <ArrowRight size={16} />
                     </button>
                </div>
                
                <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 leading-relaxed pl-[4.5rem] transition-colors">
                    {inst.description}
                </p>
            </div>

            {/* Middle: Stats Divider */}
            <div className="px-6 py-4 pl-[5rem]">
                 <div className="flex gap-2">
                    <span className="bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-bold px-2 py-1 rounded transition-colors">
                        {inst.courseCount} 门好课
                    </span>
                    <span className="bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-bold px-2 py-1 rounded transition-colors">
                        官方认证
                    </span>
                 </div>
            </div>

            {/* Bottom: Featured Course "Ticket" */}
            {inst.featuredCourse && (
                <div className="mt-auto mx-2 mb-2">
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-[1.5rem] p-3 flex items-center gap-3 group/item hover:bg-brand-50 dark:hover:bg-slate-700 transition-colors cursor-pointer border border-transparent hover:border-brand-100 dark:hover:border-slate-600">
                        <div className="relative w-16 h-12 rounded-xl overflow-hidden shrink-0 shadow-sm">
                            <img 
                                src={inst.featuredCourse.image} 
                                alt={inst.featuredCourse.title} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5">
                                <Sparkles size={10} className="text-brand-500" />
                                <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">Editor's Pick</span>
                            </div>
                            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1 group-hover/item:text-brand-700 dark:group-hover/item:text-brand-300 transition-colors">
                                {inst.featuredCourse.title}
                            </h4>
                        </div>
                        <div className="pr-3 text-right">
                             <span className="block text-sm font-black text-slate-900 dark:text-white transition-colors">¥{inst.featuredCourse.price}</span>
                        </div>
                    </div>
                </div>
            )}
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
