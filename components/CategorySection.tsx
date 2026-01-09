import React from 'react';
import { CATEGORIES } from '../constants';
import { SectionHeader } from './SectionHeader';
import { Building2, ArrowRight } from 'lucide-react';

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

export const CategorySection: React.FC = () => {
  return (
    <div>
      <SectionHeader 
        title="热门课程分类" 
        subtitle="探索您感兴趣的领域，开启技能提升之旅"
      />
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {CATEGORIES.slice(0, 7).map((category, index) => {
          const Icon = category.icon;
          const colors = COLOR_PALETTE[index % COLOR_PALETTE.length];
          
          return (
            <a 
              key={category.id} 
              href={`#category/${category.id}`}
              className="group flex flex-col items-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-transparent hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-2xl ${colors.bg} ${colors.text} flex items-center justify-center ${colors.hover} group-hover:text-white transition-all duration-300 mb-4 shadow-sm group-hover:rotate-6`}>
                <Icon size={26} strokeWidth={2.5} />
              </div>
              <h3 className="font-bold text-slate-700 group-hover:text-slate-900 text-center text-sm md:text-base whitespace-nowrap">
                {category.name}
              </h3>
              <span className="text-xs font-semibold text-slate-400 mt-1 bg-slate-50 px-2 py-0.5 rounded-full group-hover:bg-slate-100">
                {category.count}+ 
              </span>
            </a>
          );
        })}

        {/* Institution Entry Card - Replaces the last category slot */}
        <a 
          href="#join"
          className="group relative flex flex-col items-center justify-center p-6 bg-slate-900 rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-brand-500/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden border border-slate-800 hover:border-brand-500/50"
        >
          {/* Decorative background circle */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
          
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-brand-400 mb-4 shadow-inner ring-1 ring-white/10 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
             <Building2 size={26} strokeWidth={2.5} />
          </div>
          <h3 className="font-black text-white text-center text-sm md:text-base flex items-center gap-1 group-hover:text-brand-400 transition-colors">
            机构入驻 <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
          </h3>
          <span className="text-xs font-medium text-slate-400 mt-1 group-hover:text-brand-200 transition-colors">
            免费加入平台
          </span>
        </a>
      </div>
    </div>
  );
};