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
        actionText="全部机构"
        onAction={() => console.log('查看机构')}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {INSTITUTIONS.map((inst, idx) => (
          <div 
            key={inst.id} 
            className="group flex flex-col bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-brand-200/50 transition-all duration-300 relative overflow-hidden"
          >
            {/* Top Section: Header info */}
            <div className="p-6 pb-2 relative z-10">
                <div className="flex justify-between items-start mb-4">
                     <div className="flex gap-4">
                        <div className="w-14 h-14 rounded-xl shadow-inner border border-slate-100 bg-white p-1">
                             <img 
                                src={inst.logo} 
                                alt={inst.name} 
                                className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform"
                            />
                        </div>
                        <div>
                             <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                                {inst.name}
                                <span className="p-0.5 bg-blue-50 rounded-full text-blue-500">
                                    <Building2 size={12} />
                                </span>
                             </h3>
                             <div className="flex items-center gap-3 mt-1 text-xs font-medium text-slate-500">
                                <span className="flex items-center gap-1">
                                    <Star size={10} className="text-amber-500 fill-amber-500" /> {inst.rating}
                                </span>
                                <span className="w-0.5 h-3 bg-slate-200"></span>
                                <span>{(inst.studentCount / 10000).toFixed(1)}w 学员</span>
                             </div>
                        </div>
                     </div>
                     <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:border-slate-900 group-hover:text-white transition-all">
                        <ArrowRight size={14} />
                     </button>
                </div>
                
                <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed pl-[4.5rem]">
                    {inst.description}
                </p>
            </div>

            {/* Middle: Stats Divider */}
            <div className="px-6 py-4 pl-[5rem]">
                 <div className="flex gap-2">
                    <span className="bg-slate-50 text-slate-600 text-[10px] font-bold px-2 py-1 rounded border border-slate-100">
                        {inst.courseCount} 门好课
                    </span>
                    <span className="bg-slate-50 text-slate-600 text-[10px] font-bold px-2 py-1 rounded border border-slate-100">
                        官方认证
                    </span>
                 </div>
            </div>

            {/* Bottom: Featured Course "Ticket" */}
            {inst.featuredCourse && (
                <div className="mt-auto mx-2 mb-2">
                    <div className="bg-slate-50 rounded-[1.5rem] p-3 flex items-center gap-3 group/item border border-slate-100 hover:bg-brand-50/50 hover:border-brand-100 transition-colors cursor-pointer">
                        <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0">
                            <img 
                                src={inst.featuredCourse.image} 
                                alt={inst.featuredCourse.title} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5">
                                <Sparkles size={10} className="text-brand-500" />
                                <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider">Editor's Pick</span>
                            </div>
                            <h4 className="text-xs font-bold text-slate-800 line-clamp-1 group-hover/item:text-brand-700 transition-colors">
                                {inst.featuredCourse.title}
                            </h4>
                        </div>
                        <div className="pr-3 text-right">
                             <span className="block text-sm font-black text-slate-900">¥{inst.featuredCourse.price}</span>
                        </div>
                    </div>
                </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};