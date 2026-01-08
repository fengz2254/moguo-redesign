import React from 'react';
import { INSTITUTIONS } from '../constants';
import { SectionHeader } from './SectionHeader';
import { Star, GraduationCap, Users, ArrowRight, Sparkles } from 'lucide-react';

export const RecommendedInstitutions: React.FC = () => {
  return (
    <div>
      <SectionHeader 
        title="优选教育机构" 
        subtitle="汇聚行业顶尖机构，提供权威教学服务"
        actionText="入驻机构"
        onAction={() => console.log('查看机构')}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {INSTITUTIONS.map((inst, idx) => (
          <div 
            key={inst.id} 
            className="group flex flex-col bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-brand-100 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
          >
            {/* Background Decoration */}
            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${idx % 2 === 0 ? 'from-brand-50' : 'from-accent-50'} to-transparent rounded-bl-full opacity-60 transition-transform group-hover:scale-110 pointer-events-none`}></div>

            {/* Institution Info */}
            <div className="p-8 pb-4 relative z-10">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md ring-4 ring-white bg-white">
                            <img 
                                src={inst.logo} 
                                alt={inst.name} 
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-800 group-hover:text-brand-600 transition-colors mb-1">{inst.name}</h3>
                            <span className="flex items-center text-amber-500 text-xs font-bold bg-white px-2 py-1 rounded-full shadow-sm border border-slate-100 w-fit">
                                <Star size={12} fill="currentColor" className="mr-1" />
                                {inst.rating} 分
                            </span>
                        </div>
                    </div>
                    <button className="hidden sm:flex px-4 py-2 bg-white text-slate-600 font-bold text-xs rounded-full border border-slate-200 hover:border-brand-200 hover:text-brand-600 transition-colors shadow-sm items-center gap-1">
                        进入主页 <ArrowRight size={14} />
                    </button>
                </div>
                
                <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed font-medium">
                    {inst.description}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-slate-600 mb-2">
                    <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                        <GraduationCap size={16} className="text-brand-500" />
                        <span className="font-bold">{inst.courseCount}</span> 课程
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                        <Users size={16} className="text-brand-500" />
                        <span className="font-bold">{(inst.studentCount / 10000).toFixed(1)}w</span> 学员
                    </div>
                </div>
            </div>

            {/* Featured Course Section (The "Ticket") */}
            {inst.featuredCourse && (
                <div className="px-4 pb-4 mt-auto relative z-10">
                    <div className="bg-slate-50 rounded-3xl p-3 border border-slate-100 flex items-center gap-4 group/course cursor-pointer hover:bg-brand-50 hover:border-brand-200 transition-colors duration-300">
                        <div className="relative w-24 h-16 rounded-2xl overflow-hidden flex-shrink-0">
                            <img 
                                src={inst.featuredCourse.image} 
                                alt={inst.featuredCourse.title} 
                                className="w-full h-full object-cover"
                            />
                             <div className="absolute top-0 left-0 bg-accent-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-br-lg shadow-sm">
                                推荐
                            </div>
                        </div>
                        
                        <div className="flex-1 min-w-0 py-1">
                            <div className="flex items-center gap-1 text-[10px] font-bold text-brand-500 mb-0.5 uppercase tracking-wider">
                                <Sparkles size={10} /> 镇店之宝
                            </div>
                            <h4 className="font-bold text-slate-800 text-sm line-clamp-1 mb-1 group-hover/course:text-brand-700">
                                {inst.featuredCourse.title}
                            </h4>
                            <div className="text-accent-600 font-black text-sm">
                                ¥{inst.featuredCourse.price}
                            </div>
                        </div>

                        <div className="pr-2 text-slate-300 group-hover/course:text-brand-400 transition-colors">
                            <ArrowRight size={20} />
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