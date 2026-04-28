import React from 'react';
import { Home, BookOpen, Search, Download, Building2, BookText, ChevronRight, PanelLeftClose, PanelLeftOpen, Headphones } from 'lucide-react';

interface LeftSidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  isCollapsed: boolean;
  onToggle: () => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({ currentView, onNavigate, isCollapsed, onToggle }) => {
  const menuItems = [
    { id: 'home', label: '首页', icon: Home },
    { id: 'learning-center', label: '学习中心', icon: BookOpen },
    { id: 'search-results', label: '搜索结果', icon: Search },
    { id: 'download', label: '下载中心', icon: Download },
    { id: 'institution-settlement', label: '机构入驻', icon: Building2 },
    { id: 'course-detail', label: '视频课程详情', icon: BookText },
    { id: 'audio-course-detail', label: '音频课程详情', icon: Headphones },
  ];

  return (
    <div className={`fixed left-0 top-0 bottom-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-[60] hidden lg:flex flex-col shadow-lg transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className={`p-6 border-b border-slate-200 dark:border-slate-800 flex items-center ${isCollapsed ? 'justify-center px-0' : 'gap-3'}`}>
        <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white font-bold shrink-0">
          UI
        </div>
        {!isCollapsed && (
          <div className="overflow-hidden whitespace-nowrap">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 leading-tight">页面导航</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">设计预览切换</p>
          </div>
        )}
      </div>
      <nav className="flex-1 overflow-y-auto py-6 px-3">
        {!isCollapsed && (
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-3">
            所有页面
          </div>
        )}
        <ul className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'justify-between px-3'} py-2.5 rounded-xl transition-all duration-200 group ${
                    isActive 
                      ? 'bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400 font-medium shadow-sm' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
                    <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-brand-500' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`} />
                    {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
                  </div>
                  {!isCollapsed && isActive && <ChevronRight className="w-4 h-4 text-brand-500 shrink-0" />}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-4">
        {!isCollapsed && (
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 text-xs text-slate-500 dark:text-slate-400">
            <p className="font-medium text-slate-700 dark:text-slate-300 mb-1">提示</p>
            <p>此侧边栏仅用于方便在不同页面设计之间切换查看。</p>
          </div>
        )}
        <button
          onClick={onToggle}
          className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-3'} py-2.5 w-full rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors`}
          title={isCollapsed ? "展开菜单" : "收起菜单"}
        >
          {isCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
          {!isCollapsed && <span className="text-sm font-medium">收起侧边栏</span>}
        </button>
      </div>
    </div>
  );
};
