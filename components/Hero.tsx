import React from 'react';
import { ArrowRight, Sparkles, PlayCircle, MessageCircle, Heart } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-slate-50 selection:bg-brand-200">
      {/* Abstract Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-20 w-[40rem] h-[40rem] bg-brand-200/40 rounded-full mix-blend-multiply filter blur-[64px] opacity-70 animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-20 right-0 w-[30rem] h-[30rem] bg-cyan-200/40 rounded-full mix-blend-multiply filter blur-[64px] opacity-60 blob-shape" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-32 left-1/3 w-[35rem] h-[35rem] bg-yellow-200/40 rounded-full mix-blend-multiply filter blur-[64px] opacity-60 blob-shape" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-10 px-4 sm:px-6 lg:px-8">
          <main className="mt-10 mx-auto max-w-7xl sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wide shadow-sm mb-8 hover:shadow-md transition-shadow cursor-default">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-500"></span>
                </span>
                MOOC 2.0 在线教育平台
              </div>
              
              <h1 className="text-5xl tracking-tight font-black text-slate-900 sm:text-6xl md:text-7xl leading-[1.1]">
                <span className="block xl:inline">开启您的</span>{' '}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-emerald-400 xl:inline">
                  探索之旅
                </span>
              </h1>
              
              <p className="mt-6 text-lg text-slate-600 sm:mt-8 sm:text-xl sm:max-w-xl sm:mx-auto md:mt-8 md:text-xl lg:mx-0 leading-relaxed font-medium">
                汇聚行业顶尖名师，打造沉浸式互动课堂。
                <br className="hidden md:block"/>
                无论是职场进阶还是兴趣培养，魔果云课都能助您一臂之力。
              </p>
              
              <div className="mt-8 sm:mt-12 sm:flex sm:justify-center lg:justify-start gap-4">
                <div className="rounded-full shadow-lg shadow-brand-500/25">
                  <a
                    href="#courses"
                    className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-full text-white bg-slate-900 hover:bg-brand-600 md:text-xl transition-all hover:-translate-y-1 active:scale-95 duration-300"
                  >
                    开始学习 <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="#"
                    className="group w-full flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full text-slate-700 bg-white border border-slate-200 hover:border-brand-300 hover:bg-brand-50/50 md:text-xl transition-all hover:-translate-y-1 active:scale-95 duration-300"
                  >
                    <PlayCircle className="mr-2 w-6 h-6 text-brand-500 group-hover:scale-110 transition-transform" />
                    观看演示
                  </a>
                </div>
              </div>
              
              <div className="mt-10 flex items-center gap-6 text-sm font-semibold text-slate-500 sm:justify-center lg:justify-start">
                 <div className="flex -space-x-3">
                    {[1,2,3,4].map((i) => (
                         <div key={i} className="w-10 h-10 rounded-full ring-2 ring-white overflow-hidden shadow-sm">
                            <img className="w-full h-full object-cover" src={`https://picsum.photos/seed/user${i}/100`} alt=""/>
                         </div>
                    ))}
                 </div>
                 <div className="flex flex-col">
                    <div className="flex items-center gap-1 text-yellow-500">
                        {[1,2,3,4,5].map(s => <span key={s} className="text-xs">★</span>)}
                    </div>
                    <p>超过 <span className="text-slate-900 font-bold">10,000+</span> 学员已加入</p>
                 </div>
              </div>

            </div>
          </main>
        </div>
      </div>
      
      {/* Decorative Image Container - Right Side */}
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-[45%] lg:h-full hidden lg:flex items-center justify-center pr-8 pointer-events-none">
        <div className="relative w-full max-w-lg aspect-square">
            
            {/* Main "App Window" */}
            <div className="absolute inset-0 bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100 transform rotate-[-3deg] transition-transform hover:rotate-0 duration-700 ease-out z-10">
                 {/* Window Header */}
                 <div className="h-8 bg-slate-50 border-b border-slate-100 flex items-center gap-2 px-4">
                    <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                 </div>
                 {/* Video Area */}
                 <div className="relative h-[65%] bg-slate-900 overflow-hidden group">
                    <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" className="w-full h-full object-cover opacity-90" alt="Class" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                         <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40 shadow-lg">
                            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                         </div>
                    </div>
                    {/* Live Badge */}
                    <div className="absolute top-4 left-4 bg-red-500/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span> LIVE
                    </div>
                 </div>
                 {/* Chat Area Mockup */}
                 <div className="p-4 space-y-3 bg-white">
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 shrink-0"></div>
                        <div className="space-y-1 w-full">
                            <div className="h-2 w-20 bg-slate-100 rounded"></div>
                            <div className="h-2 w-3/4 bg-slate-50 rounded"></div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 shrink-0"></div>
                        <div className="space-y-1 w-full">
                            <div className="h-2 w-16 bg-slate-100 rounded"></div>
                            <div className="h-2 w-full bg-slate-50 rounded"></div>
                        </div>
                    </div>
                 </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -right-8 top-20 bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-white z-20 animate-bounce" style={{ animationDuration: '4s' }}>
                <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2.5 rounded-xl text-green-600">
                        <MessageCircle size={20} fill="currentColor" className="text-green-500/20 stroke-green-600" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 font-semibold uppercase">Student feedback</p>
                        <p className="text-sm font-bold text-slate-800">"课程非常有帮助！"</p>
                    </div>
                </div>
            </div>

            <div className="absolute -left-12 bottom-32 bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-white z-20 animate-bounce" style={{ animationDuration: '5s' }}>
                <div className="flex items-center gap-3">
                    <div className="bg-rose-100 p-2.5 rounded-xl text-rose-500">
                        <Heart size={20} fill="currentColor" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 font-semibold uppercase">Daily Likes</p>
                        <p className="text-sm font-bold text-slate-800">1,240+</p>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};