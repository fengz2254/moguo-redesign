
import React, { useState } from 'react';
import { 
  Monitor, Smartphone, Download, Command, Cpu, HardDrive, 
  Wifi, CheckCircle2, ArrowRight, Apple, PlayCircle, Layers,
  Cast, Mic2, Laptop, ShieldCheck, Zap
} from 'lucide-react';

export const DownloadCenter: React.FC = () => {
  const [activeSpecTab, setActiveSpecTab] = useState<'teacher' | 'student'>('teacher');

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen font-sans pb-24 transition-colors">
      
      {/* 1. Hero / Header Section */}
      <div className="relative bg-white dark:bg-slate-900 pt-24 pb-20 overflow-hidden border-b border-slate-200 dark:border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.4]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 text-xs font-bold mb-6 border border-brand-100 dark:border-brand-900/30">
                <Zap size={14} className="fill-brand-600 dark:fill-brand-400" />
                <span>V4.2.0 全新发布</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
                全场景覆盖，<br className="md:hidden" />让教学无处不在
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                无论是专业的桌面直播教学，还是灵活的移动端学习，<br className="hidden md:block" />
                魔果云课客户端都能为您提供极致流畅的互动体验。
            </p>
        </div>
      </div>

      {/* 2. Main Downloads Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 space-y-8">
        
        {/* Desktop Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-white dark:border-slate-800 p-8 md:p-12 flex flex-col lg:flex-row gap-12 lg:items-center group overflow-hidden relative">
             {/* Decor */}
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-brand-50 to-blue-50 dark:from-brand-900/10 dark:to-blue-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

             <div className="flex-1 relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400">
                        <Monitor size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">桌面端工作台</h2>
                        <span className="text-xs font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20 px-2 py-0.5 rounded">
                            讲师 / 助教 / 学员通用
                        </span>
                    </div>
                </div>
                
                <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed text-base">
                    专为大屏设计，集成 4K 高清直播、多路音视频连麦、专业互动白板。
                    支持多屏协作，是老师授课与学生沉浸式学习的最佳选择。
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                    <DownloadButton 
                        os="Windows" 
                        desc="支持 Win 10/11 (64位)"
                        icon={<img src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Windows_logo_-_2012.svg" className="w-5 h-5" alt="Win" />}
                        primary
                    />
                    <DownloadButton 
                        os="macOS" 
                        desc="支持 Intel & Apple M1/M2"
                        icon={<Command size={20} />}
                    />
                </div>

                <div className="flex gap-6 text-sm text-slate-400 font-medium">
                    <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-brand-500" /> 4K 画质</span>
                    <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-brand-500" /> 离线缓存</span>
                    <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-brand-500" /> 屏幕共享</span>
                </div>
             </div>

             {/* Visual Placeholder */}
             <div className="lg:w-1/2 relative">
                <div className="relative rounded-xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 aspect-[16/10] group-hover:scale-[1.02] transition-transform duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
                        {/* Abstract UI representation */}
                        <div className="w-[80%] h-[80%] bg-white dark:bg-slate-900 rounded-lg shadow-lg flex flex-col overflow-hidden">
                            <div className="h-8 bg-slate-50 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 flex items-center px-3 gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                            </div>
                            <div className="flex-1 p-4 grid grid-cols-3 gap-4">
                                <div className="col-span-2 bg-slate-100 dark:bg-slate-800 rounded-lg relative overflow-hidden">
                                     <div className="absolute inset-0 flex items-center justify-center">
                                         <PlayCircle size={40} className="text-slate-300 dark:text-slate-600" />
                                     </div>
                                </div>
                                <div className="col-span-1 flex flex-col gap-2">
                                    <div className="bg-slate-50 dark:bg-slate-800 h-8 rounded w-full"></div>
                                    <div className="bg-slate-50 dark:bg-slate-800 h-8 rounded w-full"></div>
                                    <div className="bg-slate-50 dark:bg-slate-800 flex-1 rounded w-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Mobile Card */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-white dark:border-slate-800 p-8 flex flex-col sm:flex-row gap-8 relative overflow-hidden group">
                 <div className="absolute top-0 left-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

                 <div className="flex-1 relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                            <Smartphone size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">移动端 App</h2>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                        碎片时间高效利用。完美适配手机与平板，支持作业批改、课程回放与投屏播放。
                    </p>
                    <div className="flex gap-3">
                        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl text-slate-700 dark:text-slate-200 text-sm font-bold transition-colors">
                            <Apple size={16} /> iOS
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl text-slate-700 dark:text-slate-200 text-sm font-bold transition-colors">
                            <Download size={16} /> Android
                        </button>
                    </div>
                 </div>

                 <div className="sm:w-32 shrink-0 flex flex-col items-center justify-center">
                      <div className="p-2 bg-white rounded-xl shadow-md border border-slate-100 dark:border-slate-700 mb-2">
                           <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=MoguoApp" alt="QR" className="w-24 h-24 dark:opacity-90" />
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">扫码直接下载</span>
                 </div>
            </div>

            {/* Specs Card */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-white dark:border-slate-800 p-8 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <ShieldCheck size={20} className="text-slate-400" /> 配置检测
                    </h2>
                    
                    {/* Tabs */}
                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                        <button 
                            onClick={() => setActiveSpecTab('teacher')}
                            className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${activeSpecTab === 'teacher' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
                        >
                            讲师端
                        </button>
                        <button 
                            onClick={() => setActiveSpecTab('student')}
                            className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${activeSpecTab === 'student' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
                        >
                            学员端
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    <SpecItem 
                        icon={Cpu} 
                        label="处理器" 
                        value={activeSpecTab === 'teacher' ? 'Intel i5 / M1 及以上' : '双核 2.0GHz 及以上'} 
                    />
                    <SpecItem 
                        icon={Layers} 
                        label="运行内存" 
                        value={activeSpecTab === 'teacher' ? '8GB RAM (推荐 16GB)' : '4GB RAM'} 
                    />
                    <SpecItem 
                        icon={HardDrive} 
                        label="操作系统" 
                        value="Win 10+ / macOS 11.0+" 
                    />
                    <SpecItem 
                        icon={Wifi} 
                        label="网络环境" 
                        value={activeSpecTab === 'teacher' ? '上行 10Mbps / 下行 20Mbps' : '2Mbps 带宽'} 
                    />
                </div>
            </div>

        </div>

        {/* Tools (Footer) */}
        <div className="pt-8 pb-4 text-center">
             <p className="text-slate-400 text-sm mb-4">
                遇到安装问题？
                <a href="#" className="text-brand-600 dark:text-brand-400 hover:underline font-bold mx-1">查看帮助文档</a>
                或联系
                <a href="#" className="text-brand-600 dark:text-brand-400 hover:underline font-bold mx-1">在线客服</a>
             </p>
        </div>

      </div>
    </div>
  );
};

// --- Sub-Components ---

const DownloadButton = ({ os, desc, icon, primary }: { os: string, desc: string, icon: React.ReactNode, primary?: boolean }) => (
    <button className={`
        group flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-300 active:scale-95 border
        ${primary 
            ? 'bg-brand-600 hover:bg-brand-700 text-white border-brand-500 shadow-xl shadow-brand-500/20' 
            : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-white border-slate-200 dark:border-slate-700 shadow-sm'
        }
    `}>
        <div className={`p-2 rounded-lg ${primary ? 'bg-brand-500/30' : 'bg-slate-100 dark:bg-slate-700'} transition-colors`}>
            {icon}
        </div>
        <div className="text-left">
            <div className="font-bold text-lg leading-none mb-1.5 flex items-center gap-2">
                {os}
                <ArrowRight size={14} className={`opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all ${primary ? 'text-white' : 'text-slate-400'}`} />
            </div>
            <div className={`text-xs font-medium ${primary ? 'text-brand-100' : 'text-slate-400'}`}>
                {desc}
            </div>
        </div>
    </button>
);

const SpecItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
            <div className="text-slate-400 dark:text-slate-500">
                <Icon size={18} />
            </div>
            <span className="text-sm font-bold text-slate-600 dark:text-slate-300">{label}</span>
        </div>
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400 text-right">{value}</span>
    </div>
);
