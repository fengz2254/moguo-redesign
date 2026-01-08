import React from 'react';
import { ArrowRight, Sparkles, PlayCircle } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-slate-50">
      {/* Abstract Background Blobs - Updated colors for Green Theme */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Blob 1: Light Green */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-brand-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 blob-shape"></div>
        {/* Blob 2: Cyan/Blue (Was Pink) */}
        <div className="absolute top-0 -right-20 w-96 h-96 bg-pop-cyan/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 blob-shape" style={{ animationDelay: '2s' }}></div>
        {/* Blob 3: Yellow/Lime (Was Purple) - Adds warmth to green */}
        <div className="absolute -bottom-32 left-20 w-96 h-96 bg-pop-yellow/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 blob-shape" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-3xl lg:w-full lg:pb-28 xl:pb-32 pt-10 px-4 sm:px-6 lg:px-8">
          <main className="mt-10 mx-auto max-w-7xl sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 text-brand-700 text-sm font-semibold mb-6 border border-brand-100 shadow-sm">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-500"></span>
                </span>
                新一代在线教育平台
              </div>
              
              <h1 className="text-5xl tracking-tight font-black text-slate-900 sm:text-6xl md:text-7xl">
                <span className="block xl:inline">开启您的</span>{' '}
                {/* Updated Gradient: Green -> Cyan -> Lime */}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-pop-cyan xl:inline">
                  探索之旅
                </span>
              </h1>
              
              <p className="mt-6 text-lg text-slate-600 sm:mt-8 sm:text-xl sm:max-w-xl sm:mx-auto md:mt-8 md:text-2xl lg:mx-0 leading-relaxed">
                魔果云课，让教与学变得更有趣。
                <br className="hidden md:block"/>
                连接每一位热爱学习的你，发现无限可能。
              </p>
              
              <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start gap-4">
                <div className="rounded-full shadow-glow">
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-full text-white bg-slate-900 hover:bg-brand-600 md:text-xl transition-all hover:scale-105 active:scale-95"
                  >
                    开始学习 <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-4 border-2 border-slate-200 text-lg font-bold rounded-full text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 md:text-xl transition-all hover:scale-105 active:scale-95"
                  >
                    <PlayCircle className="mr-2 w-6 h-6 text-brand-500" />
                    观看演示
                  </a>
                </div>
              </div>
              
              <div className="mt-10 flex items-center gap-6 text-sm font-medium text-slate-500 sm:justify-center lg:justify-start">
                 <div className="flex -space-x-2 overflow-hidden">
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://picsum.photos/seed/u1/100" alt=""/>
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://picsum.photos/seed/u2/100" alt=""/>
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://picsum.photos/seed/u3/100" alt=""/>
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-slate-100 flex items-center justify-center text-xs" src="https://picsum.photos/seed/u4/100" alt=""/>
                 </div>
                 <p>超过 <span className="text-brand-600 font-bold">10,000+</span> 学员已加入</p>
              </div>

            </div>
          </main>
        </div>
      </div>
      
      {/* Decorative Image Container */}
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full relative">
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-slate-50 z-10"></div>
            <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            alt="Happy students"
            />
            {/* Floating Card */}
            <div className="absolute bottom-10 left-10 z-20 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 hidden lg:block animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="flex items-center gap-3">
                    <div className="bg-brand-100 p-2 rounded-full text-brand-600">
                        <Sparkles size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 font-medium">今日新课</p>
                        <p className="text-sm font-bold text-slate-800">创意插画设计</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};