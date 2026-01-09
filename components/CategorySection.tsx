import React from 'react';
import { CATEGORIES } from '../constants';
import { SectionHeader } from './SectionHeader';
import { Building2, ArrowRight, Sparkles } from 'lucide-react';

// Define a palette for the categories to rotate through
const COLOR_PALETTE = [
    { bg: 'bg-blue-50', text: 'text-blue-600', hover: 'group-hover:bg-blue-500' },
    { bg: 'bg-orange-50', text: 'text-orange-600', hover: 'group-hover:bg-orange-500' },
    { bg: 'bg-purple-50', text: 'text-purple-600', hover: 'group-hover:bg-purple-500' },
    { bg: 'bg-green-50', text: 'text-green-600', hover: 'group-hover:bg-green-500' },
    { bg: 'bg-pink-50', text: 'text-pink-600', hover: 'group-hover:bg-pink-500' },
    { bg: 'bg-cyan-50', text: 'text-cyan-600', hover: 'group-hover:bg-cyan-500' },
    { bg: 'bg-yellow-50', text: 'text-yellow-600', hover: 'group-hover:bg-yellow-500' },
    { bg: 'bg-indigo-50', text: 'text-indigo-600', hover: 'group-hover:bg-indigo-500' },
];

interface CategorySectionProps {
  onCategoryClick: (categoryName: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ onCategoryClick }) => {
  return (
    <div>
      <SectionHeader 
        title="热门课程分类" 
        subtitle="探索您感兴趣的领域，开启技能提升之旅"
      />
      
      {/* Categories Grid - 8 Items in one row on large screens */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-6">
        {CATEGORIES.map((category, index) => {
          const Icon = category.icon;
          const colors = COLOR_PALETTE[index % COLOR_PALETTE.length];
          
          return (
            <div 
              key={category.id} 
              onClick={() => onCategoryClick(category.name)}
              className="group flex flex-col items-center p-4 py-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-transparent hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full justify-center"
            >
              <div className={`w-12 h-12 rounded-2xl ${colors.bg} ${colors.text} flex items-center justify-center ${colors.hover} group-hover:text-white transition-all duration-300 mb-3 shadow-sm group-hover:rotate-6`}>
                <Icon size={22} strokeWidth={2.5} />
              </div>
              <h3 className="font-bold text-slate-700 group-hover:text-slate-900 text-center text-sm whitespace-nowrap">
                {category.name}
              </h3>
            </div>
          );
        })}
      </div>

      {/* Institution Entry Banner - Displayed as a single row */}
      <a 
        href="#join"
        className="group relative w-full bg-slate-900 rounded-3xl px-6 py-5 md:px-8 md:py-6 flex items-center justify-between overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-brand-500/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-slate-800"
      >
         {/* Background Decoration */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-500/30 transition-all duration-500"></div>
         <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
         
         <div className="relative z-10 flex items-center gap-4 md:gap-6">
             <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/10 flex items-center justify-center text-brand-400 shadow-inner ring-1 ring-white/10 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300 shrink-0">
                 <Building2 size={28} strokeWidth={2} />
             </div>
             <div className="flex flex-col justify-center">
                 <h3 className="text-lg md:text-xl font-black text-white flex items-center gap-2 mb-1">
                    机构入驻通道
                    <span className="text-[10px] md:text-xs font-bold text-slate-900 bg-brand-400 px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                        <Sparkles size={10} fill="currentColor" /> 免费入驻
                    </span>
                 </h3>
                 <p className="text-slate-400 text-xs md:text-sm font-medium group-hover:text-slate-200 transition-colors line-clamp-1 md:line-clamp-none">
                    携手打造优质教育生态，共享千万级流量扶持
                 </p>
             </div>
         </div>

         <div className="relative z-10 hidden sm:flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-bold transition-all border border-white/10 group-hover:border-brand-500/50 shrink-0">
             立即加入 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
         </div>
      </a>
    </div>
  );
};