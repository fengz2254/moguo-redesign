import React, { useState, useEffect } from 'react';
import { Menu, X, Search, User, LogIn, Sparkles, Store, LogOut, Sun, Moon } from 'lucide-react';
import { Logo } from './Logo';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onNavigate: (view: 'home' | 'learning-center' | 'download' | 'institution-settlement') => void;
  currentView: 'home' | 'learning-center' | 'search-results' | 'download' | 'institution-settlement' | 'course-detail';
  onSearch: (query: string) => void;
  onLoginClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView, onSearch, onLoginClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Search State
  const [searchValue, setSearchValue] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>(['公考', '机械', '小', '3月5日测试']);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '首页', href: '#', view: 'home' },
    { name: '学习中心', href: '#learning-center', view: 'learning-center' },
    { name: '机构入驻', href: '#institution-settlement', highlight: true, view: 'institution-settlement' },
    { name: '下载中心', href: '#download', view: 'download' },
    { name: '帮助中心', href: '#', view: 'home' },
  ];

  const handleNavClick = (e: React.MouseEvent, linkName: string, view: string) => {
    e.preventDefault();
    
    if (linkName === '学习中心') {
      if (!isAuthenticated) {
        onLoginClick();
        return;
      }
      onNavigate('learning-center');
    } else if (linkName === '下载中心') {
      onNavigate('download');
    } else if (linkName === '机构入驻') {
      onNavigate('institution-settlement');
    } else {
      onNavigate('home');
      // Simple hash navigation for home sections
      const element = document.getElementById(view === 'home' && linkName !== '首页' ? linkName : ''); 
    }
  };

  const handleSearchSubmit = (e?: React.KeyboardEvent) => {
      if (e && e.key !== 'Enter') return;
      if (!searchValue.trim()) return;
      
      onSearch(searchValue);
      setIsSearchFocused(false);
      // Add to history if unique
      if (!searchHistory.includes(searchValue)) {
          setSearchHistory(prev => [searchValue, ...prev].slice(0, 8));
      }
  };

  const handleSearchHistoryClick = (item: string) => {
      setSearchValue(item);
      onSearch(item);
      setIsSearchFocused(false);
  };

  const removeHistoryItem = (e: React.MouseEvent, itemToRemove: string) => {
      e.stopPropagation(); // Prevent triggering the row click
      setSearchHistory(prev => prev.filter(item => item !== itemToRemove));
  };

  const clearHistory = () => {
      setSearchHistory([]);
  };

  return (
    <>
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
        ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-soft py-2' 
        : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0" onClick={() => onNavigate('home')}>
            <Logo withText light={isScrolled && theme === 'dark'} />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1 items-center bg-slate-100/50 dark:bg-slate-800/50 p-1 rounded-full px-4">
            {navLinks.map((link) => {
              const isActive = (link.view === currentView && currentView !== 'home') || (link.name === '首页' && currentView === 'home');
              
              // @ts-ignore
              if (link.highlight) {
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.name, link.view)}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all duration-200 group
                        ${isActive 
                            ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30' 
                            : 'text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-white dark:hover:bg-slate-700'
                        }
                    `}
                  >
                    <span className={`p-1 rounded-full transition-colors ${isActive ? 'bg-white/20 text-white' : 'bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 group-hover:bg-brand-500 group-hover:text-white'}`}>
                        <Store size={14} />
                    </span>
                    {link.name}
                    <span className="absolute top-0 right-0 -mt-1 -mr-2 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white dark:border-slate-800 shadow-sm transform scale-90 group-hover:scale-105 transition-transform animate-pulse">
                      免费
                    </span>
                  </a>
                );
              }
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.name, link.view)}
                  className={`
                    font-medium px-4 py-1.5 rounded-full transition-all duration-200 flex items-center
                    ${isActive 
                        ? 'text-brand-600 dark:text-brand-400 bg-white dark:bg-slate-700 shadow-sm' 
                        : 'text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-white dark:hover:bg-slate-700'
                    }
                  `}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Search Bar (Desktop) - REDESIGNED */}
          <div className="hidden lg:block flex-1 max-w-xs ml-4 relative">
            <div className="relative group">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={handleSearchSubmit}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  placeholder="请输入课程名称"
                  className={`
                    w-full pl-4 pr-10 py-2 rounded-lg border-2 outline-none transition-all text-sm
                    ${isSearchFocused 
                        ? 'border-brand-400 bg-white dark:bg-slate-800 dark:border-brand-500 shadow-sm' 
                        : 'border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-slate-200 focus:bg-white dark:focus:bg-slate-800 focus:border-brand-400'
                    }
                  `}
                />
                <Search 
                    className={`w-4 h-4 absolute right-3 top-3 cursor-pointer transition-colors ${isSearchFocused ? 'text-brand-500' : 'text-slate-400'}`} 
                    onClick={() => handleSearchSubmit()}
                />
            </div>

            {/* Search History Dropdown */}
            {isSearchFocused && (
                <div 
                    className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 p-4 z-50 animate-fade-in origin-top"
                    onMouseDown={(e) => e.preventDefault()} // Prevent blur when clicking inside dropdown
                >
                    <div className="flex justify-between items-center mb-3 text-xs text-slate-400 px-1">
                        <span>搜索历史</span>
                        {searchHistory.length > 0 && (
                            <button 
                                onClick={clearHistory}
                                className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                            >
                                清空
                            </button>
                        )}
                    </div>
                    
                    {searchHistory.length > 0 ? (
                        <div className="space-y-2">
                            {searchHistory.map((item) => (
                                <div 
                                    key={item}
                                    className="flex items-center justify-between bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg px-3 py-2 cursor-pointer group/item transition-colors"
                                    onClick={() => handleSearchHistoryClick(item)}
                                >
                                    <span className="text-sm text-slate-600 dark:text-slate-300">{item}</span>
                                    <button 
                                        onClick={(e) => removeHistoryItem(e, item)}
                                        className="text-slate-300 hover:text-slate-500 dark:hover:text-slate-200 p-1 opacity-0 group-hover/item:opacity-100 transition-opacity"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-4 text-xs text-slate-300 dark:text-slate-600">
                            暂无搜索历史
                        </div>
                    )}
                </div>
            )}
          </div>

          {/* User Actions (Desktop) */}
          <div className="hidden md:flex items-center space-x-3 ml-4">
            
            {/* Theme Toggle */}
            <button 
                onClick={toggleTheme}
                className="p-2 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title={theme === 'dark' ? '切换亮色模式' : '切换暗夜模式'}
            >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {isAuthenticated ? (
                <div className="relative">
                    <button 
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center gap-2 pl-1 pr-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full hover:shadow-md transition-shadow"
                    >
                        <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900/30 overflow-hidden border border-brand-200 dark:border-brand-900">
                             <img src={user?.avatar} alt="User" />
                        </div>
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200 max-w-[80px] truncate">{user?.username}</span>
                    </button>

                    {showUserMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 animate-scale-in origin-top-right">
                             <div className="px-4 py-2 border-b border-slate-50 dark:border-slate-700 mb-1">
                                 <p className="text-xs text-slate-400">已登录账号</p>
                                 <p className="font-bold text-slate-800 dark:text-slate-100 truncate">{user?.username}</p>
                             </div>
                             <button onClick={() => { onNavigate('learning-center'); setShowUserMenu(false); }} className="w-full text-left px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-slate-700 hover:text-brand-600 font-medium">
                                 我的学习
                             </button>
                             <button className="w-full text-left px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-slate-700 hover:text-brand-600 font-medium">
                                 账号设置
                             </button>
                             <div className="border-t border-slate-50 dark:border-slate-700 mt-1 pt-1">
                                <button onClick={() => { logout(); setShowUserMenu(false); onNavigate('home'); }} className="w-full text-left px-4 py-2 text-sm text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/10 font-medium flex items-center gap-2">
                                    <LogOut size={14} /> 退出登录
                                </button>
                             </div>
                        </div>
                    )}
                </div>
            ) : (
                <>
                    <button 
                    onClick={onLoginClick}
                    className="text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 font-bold text-sm"
                    >
                    登录
                    </button>
                    <button 
                    onClick={onLoginClick}
                    className="bg-slate-900 dark:bg-brand-600 hover:bg-brand-600 dark:hover:bg-brand-500 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
                    >
                    免费注册 <Sparkles className="w-3 h-3 text-accent-400" />
                    </button>
                </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button 
                onClick={toggleTheme}
                className="p-2 rounded-full text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800"
            >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 dark:text-slate-300 hover:text-brand-600 p-2 bg-slate-100 dark:bg-slate-800 rounded-full"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 absolute w-full shadow-xl rounded-b-3xl">
          <div className="px-6 pt-4 pb-8 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`block px-4 py-3 rounded-2xl text-base font-medium transition-colors ${
                    // @ts-ignore
                    link.highlight 
                    ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-slate-800 font-bold'
                    : 'text-slate-700 dark:text-slate-200 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-slate-800'
                }`}
                onClick={(e) => {
                    setIsOpen(false);
                    // @ts-ignore
                    handleNavClick(e, link.name, link.view);
                }}
              >
                {/* @ts-ignore */}
                {link.highlight && <span className="inline-block mr-2 text-xs bg-rose-500 text-white px-1.5 rounded">免费</span>}
                {link.name}
              </a>
            ))}
            
            {!isAuthenticated && (
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col space-y-3">
                <button 
                    onClick={() => {
                    setIsOpen(false);
                    onLoginClick();
                    }}
                    className="w-full text-center py-3 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 font-bold"
                >
                    登录
                </button>
                <button 
                    onClick={() => {
                        setIsOpen(false);
                        onLoginClick();
                    }}
                    className="w-full text-center py-3 bg-slate-900 dark:bg-brand-600 text-white rounded-xl font-bold shadow-lg"
                >
                    立即注册
                </button>
                </div>
            )}
            
            {isAuthenticated && (
                 <button 
                 onClick={() => {
                     logout();
                     setIsOpen(false);
                     onNavigate('home');
                 }}
                 className="w-full text-center py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold mt-4"
             >
                 退出登录
             </button>
            )}
          </div>
        </div>
      )}
    </header>
    </>
  );
};