import React, { useState, useEffect } from 'react';
import { Menu, X, Search, User, LogIn, Sparkles, Store } from 'lucide-react';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '首页', href: '#' },
    { name: '全部课程', href: '#courses' },
    { name: '机构入驻', href: '#institutions', highlight: true },
    { name: '关于我们', href: '#' },
    { name: '帮助中心', href: '#' },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-soft py-2' 
        : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo withText />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1 items-center bg-slate-100/50 p-1 rounded-full px-4">
            {navLinks.map((link) => {
              // @ts-ignore
              if (link.highlight) {
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="relative flex items-center gap-2 px-4 py-2 rounded-full text-slate-700 font-bold hover:text-brand-600 hover:bg-white transition-all duration-200 group"
                  >
                    <span className="p-1 rounded-full bg-brand-100 text-brand-600 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                        <Store size={14} />
                    </span>
                    {link.name}
                    <span className="absolute top-0 right-0 -mt-1 -mr-2 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white shadow-sm transform scale-90 group-hover:scale-105 transition-transform animate-pulse">
                      免费
                    </span>
                  </a>
                );
              }
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-slate-600 hover:text-brand-600 hover:bg-white font-medium px-4 py-1.5 rounded-full transition-all duration-200 flex items-center"
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden lg:flex flex-1 max-w-xs ml-4 relative group">
            <input
              type="text"
              placeholder="搜索课程..."
              className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-slate-100 bg-white focus:border-brand-400 focus:ring-4 focus:ring-brand-100 outline-none transition-all text-sm group-hover:border-slate-200"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 group-hover:text-brand-500 transition-colors" />
          </div>

          {/* User Actions (Desktop) */}
          <div className="hidden md:flex items-center space-x-3 ml-4">
            <button className="text-slate-600 hover:text-brand-600 font-bold text-sm">
              登录
            </button>
            <button className="bg-slate-900 hover:bg-brand-600 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2">
              免费注册 <Sparkles className="w-3 h-3 text-accent-400" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-brand-600 p-2 bg-slate-100 rounded-full"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-xl rounded-b-3xl">
          <div className="px-6 pt-4 pb-8 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`block px-4 py-3 rounded-2xl text-base font-medium transition-colors ${
                    // @ts-ignore
                    link.highlight 
                    ? 'text-brand-600 bg-brand-50 font-bold'
                    : 'text-slate-700 hover:text-brand-600 hover:bg-brand-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {/* @ts-ignore */}
                {link.highlight && <span className="inline-block mr-2 text-xs bg-rose-500 text-white px-1.5 rounded">免费</span>}
                {link.name}
              </a>
            ))}
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col space-y-3">
              <button className="w-full text-center py-3 border-2 border-slate-200 rounded-xl text-slate-600 font-bold">
                登录
              </button>
              <button className="w-full text-center py-3 bg-slate-900 text-white rounded-xl font-bold shadow-lg">
                立即注册
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};