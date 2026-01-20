import React, { useState, useMemo } from 'react';
import { 
    ArrowLeft, 
    Play, Pause, Volume2, Camera, Flag, RotateCcw, Maximize, 
    ChevronDown, ChevronUp, ChevronRight, FileText, Store,
    MoreVertical, CheckCircle2, Lock, Radio, PlayCircle, Clock,
    ArrowRight, MessageSquare, Share2, Settings, Sidebar
} from 'lucide-react';

interface CourseDetailProps {
  courseId: string;
  onBack: () => void;
}

// Data Model
const PAGE_DATA = {
    course: {
        name: '霍金课堂 - 宇宙起源与探索',
        progress: 35, // Percentage
        totalLessons: 42,
        completedLessons: 15
    },
    institution: {
        name: '质心学院',
        logo: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=400&auto=format&fit=crop',
        verified: true
    }
};

const CHAPTERS = [
    {
        id: 'c1',
        title: '第一章：探索的开始',
        count: 2,
        isOpen: true,
        items: [
            { id: 'l1', title: '宇宙大爆炸理论概述', type: 'video', subId: '慧星1024', time: '15:30', status: 'completed' },
            { id: 'l2', title: '科技与未来', type: 'video', subId: '慧星1024', time: '40:20', status: 'completed' }
        ]
    },
    {
        id: 'c2',
        title: '第二章：未分类课程-系统为您自动命名',
        count: 30,
        isOpen: true,
        items: [
            { id: 'l3', title: 'ghg - 基础理论深化', type: 'video', subId: '慧星1024', time: '45:00', status: 'playing' }, 
            { id: 'l4', title: '下载资源的正确方式', type: 'video', subId: '慧星1024', time: '12:05', status: 'locked' },
            { id: 'l5', title: '进阶：相对论入门', type: 'video', subId: '慧星1024', time: '21:35', status: 'locked' },
            { id: 'l8', title: '在线答疑：黑洞专题', type: 'live', subId: '慧星1024', time: '04.24 21:30', status: 'pending' },
            { id: 'l9', title: '期中测试解析', type: 'live', subId: '慧星1024', time: '04.27 15:35', status: 'pending' },
            { id: 'l10', title: '期末复习重点', type: 'video', subId: '慧星1024', time: '30:00', status: 'locked' },
            { id: 'l11', title: '模拟考试一', type: 'video', subId: '慧星1024', time: '120:00', status: 'locked' },
        ]
    }
];

export const CourseDetail: React.FC<CourseDetailProps> = ({ courseId, onBack }) => {
  const [activeTab, setActiveTab] = useState<'directory' | 'notes'>('directory');
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLessonId, setActiveLessonId] = useState('l3'); 
  const [chapters, setChapters] = useState(CHAPTERS);
  
  // Show controls on hover
  const [showControls, setShowControls] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const currentLessonTitle = useMemo(() => {
    for (const chapter of chapters) {
        const found = chapter.items.find(item => item.id === activeLessonId);
        if (found) return found.title;
    }
    return '加载中...';
  }, [activeLessonId, chapters]);

  const toggleChapter = (id: string) => {
    setChapters(chapters.map(c => c.id === id ? { ...c, isOpen: !c.isOpen } : c));
  };

  return (
    <div className="bg-[#0f172a] h-screen w-screen flex flex-col font-sans overflow-hidden">
      
      {/* 1. Header - Fixed Height */}
      <header className="h-16 bg-[#0f172a] border-b border-white/10 flex items-center justify-between px-6 shrink-0 z-20">
          <div className="flex items-center gap-4 min-w-0">
              <button 
                onClick={onBack} 
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                title="返回课程主页"
              >
                  <ArrowLeft size={20} />
              </button>
              
              <div className="h-5 w-px bg-white/10 mx-1 hidden sm:block"></div>
              
              <div className="flex flex-col min-w-0">
                  <h1 className="font-bold text-slate-100 text-base tracking-wide truncate max-w-md">
                    {currentLessonTitle}
                  </h1>
              </div>
          </div>

          <div className="flex items-center gap-4">
               {/* Progress Pill */}
               <div className="hidden md:flex items-center gap-3 bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
                   <span className="text-xs text-slate-400">学习进度</span>
                   <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                       <div className="h-full bg-brand-500 w-[35%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                   </div>
                   <span className="text-xs font-bold text-brand-400">35%</span>
               </div>

               <div className="flex items-center gap-2">
                   <button 
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    className={`hidden lg:flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${!isSidebarCollapsed ? 'text-brand-400 bg-brand-500/10' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}
                   >
                       <Sidebar size={18} /> <span className="text-xs">{isSidebarCollapsed ? '展开目录' : '目录'}</span>
                   </button>
                   <div className="w-px h-4 bg-white/20 mx-1 hidden sm:block"></div>
                   <button className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors">
                       <Share2 size={18} /> <span className="text-xs hidden sm:inline">分享</span>
                   </button>
               </div>
          </div>
      </header>

      {/* 2. Main Workspace - App Layout (Flex Grow) */}
      {/* No Scroll on this container, content fits 100% */}
      <div className="flex-1 flex w-full overflow-hidden p-4 gap-4">
          
          {/* LEFT: Cinema Player Stage - Auto Resizing */}
          <div 
            className="flex-1 bg-black rounded-2xl overflow-hidden flex flex-col relative group shadow-2xl border border-white/10 ring-1 ring-black transition-all duration-300"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => isPlaying && setShowControls(false)}
          >
              {/* Video Area - Centered & Contained */}
              <div className="flex-1 relative flex items-center justify-center bg-black w-full h-full">
                  <img 
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
                    className="w-full h-full object-contain opacity-90 max-h-full"
                    alt="Video Content"
                  />
                  
                  {/* Big Center Play Button */}
                  {!isPlaying && (
                      <button 
                        onClick={() => setIsPlaying(true)}
                        className="absolute inset-0 m-auto w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-brand-500 hover:scale-110 transition-all duration-300 border border-white/20 shadow-2xl group/play"
                      >
                          <Play size={36} fill="currentColor" className="ml-1 group-hover/play:fill-white" />
                      </button>
                  )}

                  {/* Top Gradient Overlay */}
                  <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent p-6 transition-opacity duration-300 pointer-events-none ${showControls ? 'opacity-100' : 'opacity-0'}`}>
                      <h2 className="text-white font-bold text-lg drop-shadow-md">{currentLessonTitle}</h2>
                  </div>
              </div>

              {/* Floating Control Bar - Always at bottom of player area */}
              <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-3xl transition-all duration-500 transform ${showControls ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}`}>
                  <div className="bg-[#1e293b]/80 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 shadow-2xl">
                      {/* Progress Bar */}
                      <div className="flex items-center gap-3 mb-3 px-1 group/slider cursor-pointer relative py-2">
                          <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                              <div className="h-full w-[30%] bg-brand-500 relative">
                                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg transform scale-0 group-hover/slider:scale-100 transition-transform"></div>
                              </div>
                          </div>
                      </div>

                      <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                              <button onClick={() => setIsPlaying(!isPlaying)} className="text-white hover:text-brand-400 transition-colors">
                                  {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                              </button>
                              
                              <div className="flex items-center gap-3 group/vol">
                                  <Volume2 size={20} className="text-slate-300 group-hover/vol:text-white" />
                                  <div className="w-0 overflow-hidden group-hover/vol:w-24 transition-all duration-300">
                                      <div className="h-1.5 w-20 bg-white/30 rounded-full ml-2">
                                          <div className="w-[70%] h-full bg-white rounded-full"></div>
                                      </div>
                                  </div>
                              </div>

                              <span className="text-xs font-mono font-medium text-slate-300 select-none">
                                  15:30 <span className="text-slate-600 mx-1">/</span> 45:00
                              </span>
                          </div>

                          <div className="flex items-center gap-4">
                              <button className="text-xs font-bold text-slate-300 hover:text-white px-2 py-1 rounded hover:bg-white/10 transition-colors">
                                  倍速 1.0x
                              </button>
                              <button className="text-xs font-bold text-slate-300 hover:text-white px-2 py-1 rounded hover:bg-white/10 transition-colors">
                                  高清
                              </button>
                              <div className="w-px h-4 bg-white/10 mx-1"></div>
                              <button className="text-slate-300 hover:text-white transition-colors" title="全屏">
                                  <Maximize size={20} />
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          {/* RIGHT: Sidebar - Fixed Width, Independent Scroll */}
          <div 
            className={`
                bg-white dark:bg-slate-900 rounded-2xl flex flex-col h-full shadow-xl border border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out
                ${isSidebarCollapsed ? 'w-0 opacity-0 p-0 border-0 pointer-events-none' : 'w-[400px] min-w-[320px] opacity-100'}
            `}
          >
              
              {/* Tabs */}
              <div className="flex items-center px-2 pt-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/30 shrink-0">
                  <button 
                    onClick={() => setActiveTab('directory')}
                    className={`flex-1 py-3.5 text-sm font-bold relative transition-all rounded-t-lg ${activeTab === 'directory' ? 'text-brand-600 dark:text-brand-400 bg-white dark:bg-slate-900 shadow-sm ring-1 ring-black/5 dark:ring-white/5 z-10' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
                  >
                      课程目录
                      {activeTab === 'directory' && <div className="absolute top-2 right-4 w-1.5 h-1.5 bg-rose-500 rounded-full"></div>}
                  </button>
                  <button 
                    onClick={() => setActiveTab('notes')}
                    className={`flex-1 py-3.5 text-sm font-bold relative transition-all rounded-t-lg ${activeTab === 'notes' ? 'text-brand-600 dark:text-brand-400 bg-white dark:bg-slate-900 shadow-sm ring-1 ring-black/5 dark:ring-white/5 z-10' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
                  >
                      讨论区
                  </button>
              </div>

              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto custom-scrollbar bg-white dark:bg-slate-900 relative">
                  {activeTab === 'directory' ? (
                      <div className="pb-4">
                          {chapters.map((chapter, idx) => (
                              <div key={chapter.id} className="relative">
                                  {/* Chapter Header - Sticky within the scroll container */}
                                  <div 
                                    onClick={() => toggleChapter(chapter.id)}
                                    className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors select-none sticky top-0 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-sm z-10 border-b border-slate-100 dark:border-slate-800"
                                  >
                                      <div className="min-w-0 pr-2">
                                          <h4 className="font-black text-sm text-slate-800 dark:text-slate-200 truncate mb-1">
                                              {chapter.title}
                                          </h4>
                                          <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                                              Chapter 0{idx + 1} · {chapter.items.filter(i => i.status === 'completed').length}/{chapter.count} 完成
                                          </p>
                                      </div>
                                      <div className={`transition-transform duration-300 ${chapter.isOpen ? 'rotate-180' : ''}`}>
                                         <ChevronDown size={16} className="text-slate-400" />
                                      </div>
                                  </div>

                                  <div className={`transition-all duration-300 ease-in-out overflow-hidden ${chapter.isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                      {chapter.items.map((item, i) => {
                                          const isActive = activeLessonId === item.id;
                                          const isLocked = item.status === 'locked';
                                          
                                          return (
                                              <div 
                                                key={item.id}
                                                onClick={() => !isLocked && setActiveLessonId(item.id)}
                                                className={`
                                                    relative flex gap-4 px-5 py-4 cursor-pointer transition-all border-l-[4px]
                                                    ${isActive 
                                                        ? 'bg-brand-50/60 dark:bg-brand-900/10 border-brand-500' 
                                                        : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800'
                                                    }
                                                    ${isLocked ? 'opacity-50 cursor-not-allowed grayscale' : ''}
                                                `}
                                              >
                                                  <div className="shrink-0 mt-0.5 relative">
                                                      {isLocked ? (
                                                          <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                                            <Lock size={12} className="text-slate-400" />
                                                          </div>
                                                      ) : isActive ? (
                                                          <div className="relative">
                                                              <div className="absolute inset-0 bg-brand-500 rounded-full animate-ping opacity-20"></div>
                                                              <div className="w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/30">
                                                                <div className="w-0 h-0 border-t-[3px] border-t-transparent border-l-[6px] border-l-white border-b-[3px] border-b-transparent ml-0.5"></div>
                                                              </div>
                                                          </div>
                                                      ) : item.status === 'completed' ? (
                                                          <div className="w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
                                                            <CheckCircle2 size={14} className="text-brand-600 dark:text-brand-400" />
                                                          </div>
                                                      ) : (
                                                          <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600"></div>
                                                      )}
                                                      
                                                      {i !== chapter.items.length - 1 && (
                                                          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-px h-full bg-slate-200 dark:bg-slate-800 -z-10"></div>
                                                      )}
                                                  </div>

                                                  <div className="flex-1 min-w-0">
                                                      <h5 className={`text-sm font-medium leading-relaxed mb-1.5 ${isActive ? 'text-brand-700 dark:text-brand-400 font-bold' : 'text-slate-700 dark:text-slate-300'}`}>
                                                          {item.title}
                                                      </h5>
                                                      <div className="flex items-center gap-3">
                                                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold border ${
                                                            item.type === 'live' 
                                                            ? 'bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-900/30' 
                                                            : 'bg-slate-50 text-slate-500 border-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                                                        }`}>
                                                            {item.type === 'live' ? '直播回放' : '视频课程'}
                                                        </span>
                                                        <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                                                            <Clock size={10} />
                                                            {item.time}
                                                        </span>
                                                      </div>
                                                  </div>
                                              </div>
                                          );
                                      })}
                                  </div>
                              </div>
                          ))}
                      </div>
                  ) : (
                      <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-4 p-8 text-center bg-slate-50/30 dark:bg-slate-900/30">
                          <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-2">
                            <MessageSquare size={32} className="text-slate-300" />
                          </div>
                          <p className="text-sm font-medium text-slate-500">还没有同学提问，来抢沙发吧</p>
                          <button className="px-6 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-bold hover:bg-brand-500 transition-colors shadow-lg shadow-brand-500/20">
                              发起提问
                          </button>
                      </div>
                  )}
              </div>
          </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
            width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(148, 163, 184, 0.2);
            border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(148, 163, 184, 0.4);
        }
      `}</style>
    </div>
  );
};
