import React, { useState } from 'react';
import { CATEGORIES } from '../constants';
import { SectionHeader } from './SectionHeader';
import { CategoryDrawer } from './CategoryDrawer';
import { Settings2, Plus } from 'lucide-react';

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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div>
      <SectionHeader 
        title="热门课程分类" 
        subtitle="探索您感兴趣的领域，开启技能提升之旅"
        onAction={() => setIsDrawerOpen(true)}
        actionText="全部分类"
        actionIcon={<Settings2 size={16} />}
      />
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {CATEGORIES.map((category, index) => {
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
              <h3 className="font-bold text-slate-700 group-hover:text-slate-900 text-center text-sm md:text-base">
                {category.name}
              </h3>
              <span className="text-xs font-semibold text-slate-400 mt-1 bg-slate-50 px-2 py-0.5 rounded-full group-hover:bg-slate-100">
                {category.count}+ 
              </span>
            </a>
          );
        })}

        {/* Add Button as the last card for quick access */}
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="group flex flex-col items-center justify-center p-6 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 hover:border-brand-300 hover:bg-brand-50 transition-all duration-300 cursor-pointer h-full"
        >
          <div className="w-12 h-12 rounded-full bg-white text-slate-400 flex items-center justify-center group-hover:text-brand-500 group-hover:scale-110 transition-all duration-300 mb-2 shadow-sm">
             <Plus size={24} strokeWidth={3} />
          </div>
          <h3 className="font-bold text-slate-500 group-hover:text-brand-600 text-sm">
            自定义分类
          </h3>
        </button>
      </div>

      {/* The Sidebar Drawer */}
      <CategoryDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
};