import React, { useState, useEffect } from 'react';
import { X, Plus, Check } from 'lucide-react';
import { INITIAL_MY_CATEGORIES, ALL_CATEGORY_GROUPS } from '../constants';

interface CategoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CategoryDrawer: React.FC<CategoryDrawerProps> = ({ isOpen, onClose }) => {
  const [myCategories, setMyCategories] = useState<string[]>(INITIAL_MY_CATEGORIES);
  
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleCategory = (category: string) => {
    if (myCategories.includes(category)) {
      setMyCategories(myCategories.filter(c => c !== category));
    } else {
      setMyCategories([...myCategories, category]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity opacity-100"
        onClick={onClose}
      ></div>

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl animate-slide-in overflow-hidden flex flex-col rounded-l-3xl">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <h2 className="text-xl font-black text-slate-800 tracking-tight">
            全部分类
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* My Categories Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800">我的分类</h3>
              <button 
                className="text-xs font-semibold text-brand-500 hover:text-brand-600 bg-brand-50 px-3 py-1 rounded-full transition-colors"
                onClick={() => setMyCategories([])}
              >
                清空
              </button>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {myCategories.map((cat) => (
                <div 
                  key={cat} 
                  className="group relative flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-brand-50 to-white border border-brand-200 rounded-xl shadow-sm text-brand-700 font-bold text-sm select-none animate-scale-in cursor-default"
                >
                  {cat}
                  <button 
                    onClick={() => toggleCategory(cat)}
                    className="ml-1 p-0.5 rounded-full hover:bg-brand-100 text-brand-400 hover:text-brand-600 transition-colors"
                  >
                    <X size={14} strokeWidth={3} />
                  </button>
                </div>
              ))}
              {myCategories.length === 0 && (
                <p className="text-sm text-slate-400 italic py-2">
                  暂无分类，请从下方添加...
                </p>
              )}
            </div>
          </section>

          {/* Divider */}
          <div className="h-px bg-slate-100"></div>

          {/* All Categories Section */}
          <section className="space-y-8">
            <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                <span>更多分类</span>
                <span className="w-full h-px bg-slate-100"></span>
                <span>点击添加</span>
            </div>

            {ALL_CATEGORY_GROUPS.map((group, groupIdx) => (
              <div key={group.title} className="space-y-3">
                <div className="flex items-center gap-2">
                    <div className={`w-1 h-4 rounded-full ${
                        ['bg-blue-400', 'bg-purple-400', 'bg-orange-400', 'bg-green-400', 'bg-pink-400'][groupIdx % 5]
                    }`}></div>
                    <h4 className="font-bold text-slate-700">{group.title}</h4>
                </div>
                
                <div className="flex flex-wrap gap-2.5">
                  {group.items.map((item) => {
                    const isSelected = myCategories.includes(item);
                    if (isSelected) return null; // Hide if already in "My Categories" (optional style, or show disabled)

                    return (
                      <button
                        key={item}
                        onClick={() => toggleCategory(item)}
                        className="px-4 py-2 bg-slate-50 hover:bg-white border border-transparent hover:border-slate-200 rounded-xl text-slate-600 text-sm font-medium transition-all hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5"
                      >
                        <Plus size={14} className="text-slate-400" />
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
        <div className="p-6 border-t border-slate-100 bg-slate-50/50">
            <button 
                onClick={onClose}
                className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-brand-200 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
                <Check size={20} strokeWidth={3} />
                完成设置
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
        .animate-slide-in {
            animation: slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-scale-in {
            animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};