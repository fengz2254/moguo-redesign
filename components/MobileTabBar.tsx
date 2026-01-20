import React from 'react';
import { Home, Compass, BookOpen, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface MobileTabBarProps {
  currentView: string;
  onNavigate: (view: 'home' | 'learning-center') => void;
  onLogin: () => void;
}

export const MobileTabBar: React.FC<MobileTabBarProps> = ({ currentView, onNavigate, onLogin }) => {
  const { isAuthenticated } = useAuth();

  const handleStudyClick = () => {
    if (isAuthenticated) {
      onNavigate('learning-center');
    } else {
      onLogin();
    }
  };

  const scrollToCategories = () => {
    if (currentView !== 'home') {
        onNavigate('home');
        setTimeout(() => {
            document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    } else {
        document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 pb-safe pt-2 px-6 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] dark:shadow-none z-50 h-[84px] flex justify-between items-start transition-colors duration-300">
      <button 
        onClick={() => onNavigate('home')}
        className={`flex flex-col items-center gap-1 w-12 ${currentView === 'home' ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
      >
        <Home size={24} strokeWidth={currentView === 'home' ? 2.5 : 2} />
        <span className="text-[10px] font-bold">首页</span>
      </button>

      <button 
        onClick={scrollToCategories}
        className="flex flex-col items-center gap-1 w-12 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
      >
        <Compass size={24} />
        <span className="text-[10px] font-medium">选课</span>
      </button>

      {/* Floating Main Action Button Style for 'Study' */}
      <div className="relative -top-6">
        <button 
            onClick={handleStudyClick}
            className="w-14 h-14 rounded-full bg-slate-900 dark:bg-brand-600 text-white flex items-center justify-center shadow-lg shadow-slate-900/30 dark:shadow-brand-500/30 active:scale-95 transition-transform border-4 border-slate-50 dark:border-slate-800"
        >
            <BookOpen size={24} />
        </button>
        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-600 dark:text-slate-400 whitespace-nowrap">学习中心</span>
      </div>

      <button 
        onClick={onLogin} // Simplification: clicking 'Me' opens login if not auth, or could open profile
        className={`flex flex-col items-center gap-1 w-12 ${currentView === 'learning-center' ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
      >
        <User size={24} strokeWidth={currentView === 'learning-center' ? 2.5 : 2} />
        <span className="text-[10px] font-medium">{isAuthenticated ? '我的' : '未登录'}</span>
      </button>
    </div>
  );
};