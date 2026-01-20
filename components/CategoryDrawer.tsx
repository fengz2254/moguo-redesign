
import React, { useState, useEffect } from 'react';
import { X, Plus, Check, LayoutGrid, Trash2, RotateCcw } from 'lucide-react';
import { ALL_CATEGORY_GROUPS, INITIAL_MY_CATEGORIES } from '../constants';

interface CategoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  onUpdateCategories: (categories: string[]) => void;
}

export const CategoryDrawer: React.FC<CategoryDrawerProps> = ({ 
  isOpen, 
  onClose,
  categories,
  onUpdateCategories
}) => {
  // Local state to manage changes before saving
  const [localCategories, setLocalCategories] = useState<string[]>(categories);
  const [isModified, setIsModified] = useState(false);

  // Sync local state when drawer opens or props change
  useEffect(() => {
    if (isOpen) {
      setLocalCategories(categories);
      setIsModified(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, categories]);

  const toggleCategory = (category: string) => {
    let newCategories;
    if (localCategories.includes(category)) {
      if (localCategories.length <= 1) return; // Prevent deleting the last one
      newCategories = localCategories.filter(c => c !== category);
    } else {
      newCategories = [...localCategories, category];
    }
    setLocalCategories(newCategories);
    setIsModified(true);
  };

  const handleSave = () => {
      onUpdateCategories(localCategories);
      onClose();
  };

  const resetToDefault = () => {
      setLocalCategories(INITIAL_MY_CATEGORIES);
      setIsModified(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity opacity-100"
        onClick={onClose}
      ></div>

      {/* Drawer Panel */}
      <div className="relative w-full max-w-[500px] bg-white dark:bg-slate-900 h-full shadow-2xl animate-slide-in overflow-hidden flex flex-col rounded-l-[2rem] border-l border-white/20">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white/95 dark:bg-slate-900/95 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400">
                <LayoutGrid size={20} />
            </div>
            <div>
                <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">
                    全部分类
                </h2>
                <p className="text-xs text-slate-400 font-medium">定制您的专属兴趣频道</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-10">
          
          {/* My Categories Section */}
          <section className="animate-fade-in-up">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-end gap-2">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white">我的频道</h3>
                  <span className="text-xs text-slate-400 font-medium mb-1">点击移除，拖拽排序</span>
              </div>
              <button 
                className="flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-brand-600 px-2 py-1 transition-colors"
                onClick={resetToDefault}
              >
                <RotateCcw size={12} /> 恢复默认
              </button>
            </div>
            
            <div className="flex flex-wrap gap-3 min-h-[60px] content-start">
              {localCategories.length > 0 ? localCategories.map((cat) => (
                <div 
                  key={cat} 
                  className="group relative flex items-center gap-1.5 pl-4 pr-2 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:text-rose-600 text-slate-700 dark:text-slate-200 border border-transparent hover:border-rose-200 dark:hover:border-rose-900/30 rounded-xl font-bold text-sm select-none animate-scale-in cursor-pointer transition-all active:scale-95"
                  onClick={() => toggleCategory(cat)}
                >
                  {cat}
                  <div className="p-0.5 rounded-full text-slate-400 group-hover:text-rose-500 transition-colors">
                    <X size={14} strokeWidth={3} />
                  </div>
                </div>
              )) : (
                  <div className="w-full h-20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center text-slate-400 text-sm">
                      请从下方选择您感兴趣的分类
                  </div>
              )}
            </div>
          </section>

          {/* Divider */}
          <div className="h-px bg-slate-100 dark:bg-slate-800"></div>

          {/* All Categories Section */}
          <section className="space-y-8 animate-fade-in-up delay-100">
            <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                <span>推荐频道</span>
                <span className="w-full h-px bg-slate-100 dark:bg-slate-800"></span>
                <span>点击添加</span>
            </div>

            {ALL_CATEGORY_GROUPS.map((group, groupIdx) => (
              <div key={group.title} className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-4 rounded-full ${
                        ['bg-blue-500', 'bg-purple-500', 'bg-orange-500', 'bg-green-500', 'bg-pink-500', 'bg-cyan-500'][groupIdx % 6]
                    }`}></div>
                    <h4 className="font-bold text-slate-700 dark:text-slate-200 text-base">{group.title}</h4>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {group.items.map((item) => {
                    const isSelected = localCategories.includes(item);
                    if (isSelected) return null; // Hide if already in "My Categories"

                    return (
                      <button
                        key={item}
                        onClick={() => toggleCategory(item)}
                        className="px-4 py-2.5 bg-white dark:bg-slate-800 hover:bg-brand-50 dark:hover:bg-brand-900/20 hover:text-brand-600 dark:hover:text-brand-400 border border-slate-200 dark:border-slate-700 hover:border-brand-200 dark:hover:border-brand-900/30 rounded-xl text-slate-600 dark:text-slate-300 text-sm font-medium transition-all hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5 group"
                      >
                        <Plus size={14} className="text-slate-400 group-hover:text-brand-500 transition-colors" />
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </section>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky bottom-0 z-10">
            <button 
                onClick={handleSave}
                className={`w-full py-3.5 rounded-2xl font-bold text-lg shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 ${
                    isModified 
                    ? 'bg-brand-600 hover:bg-brand-500 text-white shadow-brand-500/20' 
                    : 'bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700'
                }`}
            >
                <Check size={20} strokeWidth={3} />
                {isModified ? '保存修改' : '完成'}
            </button>
        </div>
      </div>
      
      <style>{`
        @keyframes slide-in {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
        @keyframes scale-in {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        @keyframes fade-in-up {
            from { transform: translateY(10px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-in {
            animation: slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-scale-in {
            animation: scale-in 0.2s ease-out;
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.4s ease-out forwards;
        }
        .delay-100 {
            animation-delay: 100ms;
        }
      `}</style>
    </div>
  );
};
