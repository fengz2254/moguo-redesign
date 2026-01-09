import React, { useState, useEffect } from 'react';
import { Store, MessageCircle, Phone, Gift, ChevronUp } from 'lucide-react';
import { SIDEBAR_GIFTS } from '../constants';

export const FloatingSidebar = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getGiftColorClasses = (color: string) => {
    switch (color) {
        case 'rose': return { bg: 'bg-rose-50', border: 'border-rose-100', text: 'text-rose-500', btn: 'bg-rose-500' };
        case 'blue': return { bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-500', btn: 'bg-blue-500' };
        case 'orange': return { bg: 'bg-orange-50', border: 'border-orange-100', text: 'text-orange-500', btn: 'bg-orange-500' };
        default: return { bg: 'bg-slate-50', border: 'border-slate-100', text: 'text-slate-500', btn: 'bg-slate-500' };
    }
  }

  return (
    <div className="fixed right-4 md:right-6 bottom-[10vh] z-40 flex flex-col gap-3 items-center font-sans">
      
      {/* 1. Institution Entry - Separate Floating Button */}
      <a href="#join" className="group relative flex flex-col items-center justify-center w-[68px] h-[72px] bg-white rounded-2xl shadow-lg shadow-slate-200/60 border border-slate-100 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
        <div className="text-brand-500 mb-1 p-1.5 bg-brand-50 rounded-lg group-hover:bg-brand-500 group-hover:text-white transition-colors">
          <Store size={22} strokeWidth={2} />
        </div>
        <span className="text-[11px] font-bold text-brand-600">机构入驻</span>
        
        {/* Tooltip */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 pointer-events-none">
          <div className="bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl whitespace-nowrap shadow-xl flex items-center gap-2">
            <span>我是机构，立即入驻</span>
            {/* Triangle */}
            <div className="w-2 h-2 bg-slate-900 rotate-45 absolute -right-1 top-1/2 -translate-y-1/2"></div>
          </div>
        </div>
      </a>

      {/* 2. Main Action Group */}
      <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/60 border border-slate-100 flex flex-col divide-y divide-slate-100 w-[68px]">
        
        {/* WeChat */}
        <div className="group relative py-3.5 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors first:rounded-t-2xl">
          <MessageCircle size={24} className="text-slate-600 mb-1 group-hover:text-[#00c800] transition-colors" />
          <span className="text-[10px] text-slate-500 font-medium">微信咨询</span>
          
          {/* Popover */}
          <div className="absolute right-full top-0 mr-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 origin-top-right z-50 pointer-events-none">
            <div className="bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center gap-2 w-40">
               <div className="w-32 h-32 bg-slate-100 rounded-xl overflow-hidden p-1 border border-slate-100">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=MoguoConsult" alt="WeChat QR" className="w-full h-full opacity-90" />
               </div>
               <p className="text-xs text-slate-500 text-center leading-relaxed">
                 扫码添加专属顾问<br/>
                 <span className="text-brand-600 font-bold">1对1在线解答</span>
               </p>
               {/* Arrow */}
               <div className="absolute right-[-6px] top-6 w-3 h-3 bg-white border-t border-r border-slate-100 rotate-45"></div>
            </div>
          </div>
        </div>

        {/* Phone */}
        <div className="group relative py-3.5 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors">
          <Phone size={24} className="text-slate-600 mb-1 group-hover:text-blue-500 transition-colors" />
          <span className="text-[10px] text-slate-500 font-medium">电话咨询</span>
          
          {/* Popover */}
           <div className="absolute right-full top-1/2 -translate-y-1/2 mr-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 z-50 pointer-events-none">
            <div className="bg-white p-5 rounded-2xl shadow-xl border border-slate-100 w-52 relative">
               <h4 className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">咨询热线</h4>
               <p className="text-xl font-black text-brand-600 font-mono tracking-tight">400-888-666</p>
               <div className="text-[10px] text-slate-400 mt-2 bg-slate-50 p-2 rounded-lg flex items-center justify-center">
                 工作时间：09:00 - 21:00
               </div>
               {/* Arrow */}
               <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-t border-r border-slate-100 rotate-45"></div>
            </div>
          </div>
        </div>

        {/* Gift */}
        <div className="group relative py-3.5 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors last:rounded-b-2xl">
          <div className="relative">
             <Gift size={24} className="text-slate-600 mb-1 group-hover:text-rose-500 transition-colors animate-bounce-slow" />
             <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
          </div>
          <span className="text-[10px] text-slate-500 font-medium">限时礼包</span>

           {/* Popover */}
           <div className="absolute right-full bottom-0 mr-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 z-50 pointer-events-none">
            <div className="bg-white p-0 rounded-2xl shadow-xl border border-slate-100 w-72 overflow-hidden relative">
               
               {/* Header */}
               <div className="bg-gradient-to-r from-rose-500 to-orange-500 p-4 text-white text-center relative overflow-hidden">
                  <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/20 rounded-full blur-2xl"></div>
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                  <h4 className="font-bold text-base relative z-10">新人专享大礼包</h4>
                  <p className="text-[10px] opacity-90 relative z-10">注册即送价值 299 元课程资料</p>
               </div>
               
               {/* List */}
               <div className="p-3 bg-white flex flex-col gap-2.5 max-h-[300px] overflow-y-auto">
                  {SIDEBAR_GIFTS.map((gift) => {
                      const colors = getGiftColorClasses(gift.color);
                      return (
                        <div key={gift.id} className={`border ${colors.border} ${colors.bg} rounded-xl p-2.5 border-dashed flex justify-between items-center px-3 relative overflow-hidden`}>
                            {/* Decorative circles */}
                            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border border-inherit"></div>
                            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border border-inherit"></div>
                            
                            <div className="flex flex-col items-start min-w-0">
                                <span className={`text-[10px] ${colors.text} opacity-80 truncate`}>{gift.label}</span>
                                <div className={`flex items-baseline ${colors.text}`}>
                                    {gift.type !== 'material' && <span className="text-xs font-bold mr-0.5">{gift.unit}</span>}
                                    <span className="text-xl font-black tracking-tighter">{gift.value}</span>
                                    {gift.type === 'discount' && <span className="text-xs font-bold ml-0.5">{gift.unit}</span>}
                                </div>
                                <span className="text-[10px] text-slate-400 -mt-0.5 scale-90 origin-left">{gift.condition}</span>
                            </div>
                            
                            <button className={`px-3 py-1 ${colors.btn} text-white text-xs font-bold rounded-full shadow-sm hover:brightness-110 active:scale-95 transition-all`}>
                                {gift.action}
                            </button>
                        </div>
                      )
                  })}

                  <button className="w-full mt-2 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-brand-600 transition-colors shadow-lg shadow-slate-200">
                      一键领取全部
                  </button>
               </div>

                {/* Arrow */}
               <div className="absolute right-[-6px] bottom-8 w-3 h-3 bg-white border-t border-r border-slate-100 rotate-45"></div>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Back to Top */}
      <button 
        onClick={scrollToTop}
        className={`
            w-10 h-10 rounded-full bg-white border border-slate-100 text-slate-400 hover:bg-slate-800 hover:border-slate-800 hover:text-white 
            flex items-center justify-center shadow-md transition-all duration-500 
            ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
        `}
      >
        <ChevronUp size={18} />
      </button>

        <style>{`
        @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
        }
        .animate-bounce-slow {
            animation: bounce-slow 2s infinite;
        }
        `}</style>
    </div>
  );
};