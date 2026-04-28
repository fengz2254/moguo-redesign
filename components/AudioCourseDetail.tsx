import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw, RotateCw, Volume2, ListVideo, AlignLeft, Headphones, Share2, PlayCircle, Lock, LayoutList, ChevronDown, ChevronRight, Repeat, Shuffle, SkipBack, SkipForward, LayoutPanelLeft } from 'lucide-react';

// Reusing similar mock data structure but tailored for audio
const AUDIO_CHAPTERS = [
    {
        id: 'c1',
        title: '第一章：探索的开始',
        isOpen: true,
        items: [
            { id: 'l1', title: '直播点播1', type: 'live', duration: '04.15 11:25-12:25', isFree: false },
            { id: 'l2', title: '视频课-试看免费', type: 'video', duration: '16:00', isFree: true },
            { id: 'l3', title: '新时代中国特色社会主义市场经济...', type: 'audio', duration: '41:18', isFree: true },
            { id: 'l4', title: '视频课-不可试看', type: 'video', duration: '25:00', isFree: false },
        ]
    },
    {
        id: 'c2',
        title: '第二章：进阶与时间',
        isOpen: true,
        items: [
            { id: 'l5', title: '《哈佛经典谈判术》1', type: 'video', duration: '41:00', isFree: false },
            { id: 'l6', title: '基础入门实操音频备份', type: 'audio', duration: '01:00:00', isFree: false },
        ]
    }
];

const getTypeConfig = (type: string, isLiveStreaming?: boolean) => {
    if (type === 'video') return { text: '视频', className: 'bg-slate-800 text-slate-400 border-slate-700' };
    if (type === 'audio') return { text: '音频', className: 'bg-fuchsia-900/30 text-fuchsia-400 border-fuchsia-900/50' };
    if (type === 'live') return { text: '直播', className: 'bg-blue-900/20 text-blue-400 border-blue-900/30' };
    return { text: '未知', className: 'bg-slate-800 text-slate-500 border-slate-700' };
};

interface AudioCourseDetailProps {
  courseId: string;
  onBack: () => void;
}

export const AudioCourseDetail: React.FC<AudioCourseDetailProps> = ({ courseId, onBack }) => {
  const [activeTab, setActiveTab] = useState<'directory' | 'notes'>('directory');
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLessonId, setActiveLessonId] = useState('l3'); 
  const [chapters, setChapters] = useState(AUDIO_CHAPTERS);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [progress, setProgress] = useState(0);

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

  // Fake progress bar effect
  useEffect(() => {
      let interval: any;
      if (isPlaying) {
          interval = setInterval(() => {
              setProgress(p => {
                  if (p >= 100) {
                      setIsPlaying(false);
                      return 100;
                  }
                  return p + 0.1;
              });
          }, 100);
      }
      return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="bg-[#0f172a] h-full w-full flex flex-col font-sans overflow-x-hidden lg:overflow-hidden">
      <style>{`
        @keyframes audio-eq {
          0% { height: 20%; }
          100% { height: 100%; }
        }
        .animate-audio-eq {
          animation: audio-eq ease-in-out infinite alternate;
        }
      `}</style>
      
      {/* 1. Header - Fixed Height */}
      <header className={`h-14 lg:h-16 border-b flex items-center justify-between px-4 lg:px-6 shrink-0 z-20 transition-colors duration-500 w-full ${isSidebarCollapsed ? 'bg-[#080b12] border-white/5' : 'bg-[#0f172a] border-white/10'}`}>
          <div className="w-full max-w-[1800px] mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3 lg:gap-4 min-w-0">
                  <button 
                    onClick={onBack} 
                    className={`w-8 h-8 lg:w-9 lg:h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors shrink-0 text-slate-300 hover:text-white`}
                    title="返回"
                  >
                      <ArrowLeft size={20} />
                  </button>
                  
                  <div className="h-4 lg:h-5 w-px bg-white/10 mx-1 hidden sm:block shrink-0"></div>
                  
                  <div className="flex flex-col min-w-0">
                      <h1 className="font-bold text-slate-100 text-sm lg:text-base tracking-wide truncate max-w-[200px] sm:max-w-xs lg:max-w-md">
                        {currentLessonTitle}
                      </h1>
                  </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                   <div className="flex items-center gap-2">
                       <button 
                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        className={`hidden lg:flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${!isSidebarCollapsed ? 'text-brand-400 bg-brand-500/10' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}
                       >
                           <LayoutPanelLeft size={18} /> <span className="text-xs">{isSidebarCollapsed ? '展开目录' : '目录'}</span>
                       </button>
                       <div className="w-px h-4 bg-white/20 mx-1 hidden lg:block"></div>
                       <button className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 px-2 lg:px-3 py-1.5 rounded-lg transition-colors">
                           <Share2 size={18} /> <span className="text-xs hidden sm:inline">分享</span>
                       </button>
                   </div>
              </div>
          </div>
      </header>

      {/* 2. Main Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row w-full max-w-[1800px] mx-auto overflow-hidden p-0 lg:p-4 gap-0 lg:gap-4">
          
          {/* LEFT: Audio Player Area */}
          <div className="flex-1 flex flex-col items-center justify-center bg-[#0a0e17] lg:rounded-2xl lg:shadow-2xl lg:border border-slate-800/80 overflow-hidden relative w-full h-full group/player overflow-hidden">
              
              {/* Full Background Course Cover */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                  <img 
                      src="https://images.unsplash.com/photo-1557063617-640b7194f15d?q=80&w=1000&auto=format&fit=crop" 
                      alt="Course Cover" 
                      className={`w-full h-full object-cover transition-transform duration-[20s] ease-linear ${isPlaying ? 'scale-110' : 'scale-100'}`}
                      referrerPolicy="no-referrer"
                  />
                  {/* Overlay for readability */}
                  <div className={`absolute inset-0 transition-colors duration-700 ${isPlaying ? 'bg-black/60' : 'bg-black/40'} backdrop-blur-sm sm:backdrop-blur-md`}></div>
                  {/* Bottom gradient specifically for the controls */}
                  <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#111827] to-transparent"></div>
              </div>

              {/* Dynamic decorative background elements (Subtle) */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30 z-0">
                  <div className={`absolute top-1/4 left-1/4 w-96 h-96 bg-brand-600/20 rounded-full blur-[120px] mix-blend-screen transition-transform duration-[10s] ease-linear repeat-infinite ${isPlaying ? 'scale-150 animate-pulse' : 'scale-100'}`}></div>
                  <div className={`absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-600/20 rounded-full blur-[150px] mix-blend-screen transition-transform duration-[15s] ease-linear ${isPlaying ? 'scale-125' : 'scale-100'}`}></div>
              </div>

              {/* Audio EQ Animation Overlay */}
              <div className="flex-1 w-full flex items-center justify-center relative z-10">
                  <div className={`flex items-end gap-2 sm:gap-3 h-16 sm:h-24 transition-opacity duration-700 pointer-events-none ${isPlaying ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="w-2 sm:w-3 bg-brand-400/80 rounded-full animate-audio-eq shadow-[0_0_15px_rgba(16,185,129,0.5)]" style={{ animationDuration: '0.6s', animationDelay: '0.1s' }}></div>
                      <div className="w-2 sm:w-3 bg-brand-300/80 rounded-full animate-audio-eq shadow-[0_0_15px_rgba(16,185,129,0.5)]" style={{ animationDuration: '1.0s', animationDelay: '0.3s' }}></div>
                      <div className="w-2 sm:w-3 bg-white/90 rounded-full animate-audio-eq shadow-[0_0_15px_rgba(255,255,255,0.5)]" style={{ animationDuration: '0.8s', animationDelay: '0.0s' }}></div>
                      <div className="w-2 sm:w-3 bg-brand-300/80 rounded-full animate-audio-eq shadow-[0_0_15px_rgba(16,185,129,0.5)]" style={{ animationDuration: '1.2s', animationDelay: '0.4s' }}></div>
                      <div className="w-2 sm:w-3 bg-brand-400/80 rounded-full animate-audio-eq shadow-[0_0_15px_rgba(16,185,129,0.5)]" style={{ animationDuration: '0.7s', animationDelay: '0.2s' }}></div>
                  </div>
              </div>

              {/* Audio Controls Console - Bottom anchored */}
              <div className="w-full bg-[#111827]/80 backdrop-blur-2xl border-t border-white/5 px-6 lg:px-12 py-6 lg:py-8 shrink-0 z-20 flex flex-col gap-6">
                  
                  {/* Progress Bar Area */}
                  <div className="flex items-center gap-4">
                      <span className="text-xs lg:text-sm font-medium text-slate-400 tabular-nums w-12 text-right">00:00</span>
                      
                      <div className="flex-1 group/slider cursor-pointer relative py-2 flex items-center">
                          {/* Track */}
                          <div className="w-full h-1.5 lg:h-2 bg-slate-700/50 rounded-full overflow-hidden relative">
                              {/* Fill */}
                              <div className="absolute left-0 top-0 h-full bg-brand-500 rounded-full" style={{ width: `${progress}%` }}></div>
                          </div>
                          {/* Thumb (Shows on hover or active) */}
                          <div 
                              className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 bg-white rounded-full shadow-lg border border-slate-200 transition-transform ${isPlaying ? 'scale-100' : 'scale-0 group-hover/slider:scale-100'}`}
                              style={{ left: `calc(${progress}% - 8px)` }}
                          ></div>
                      </div>

                      <span className="text-xs lg:text-sm font-medium text-slate-500 tabular-nums w-12">41:18</span>
                  </div>

                  {/* Primary Controls Row */}
                  <div className="flex items-center justify-between">
                      
                      {/* Left: Toggles */}
                      <div className="flex items-center gap-4 lg:gap-6 w-1/3 justify-start">
                          <button className="text-slate-400 hover:text-white transition-colors" title="播放速度">
                              <div className="bg-white/10 px-2 py-1 rounded text-xs font-bold font-mono">1.0x</div>
                          </button>
                      </div>

                      {/* Center: Playback Core */}
                      <div className="flex items-center justify-center gap-6 lg:gap-10 w-1/3">
                          <button className="text-slate-400 hover:text-white transition-colors group relative" title="后退15秒">
                              <RotateCcw size={24} className="lg:w-7 lg:h-7" />
                              <span className="absolute inset-0 flex items-center justify-center text-[9px] lg:text-[10px] font-bold mt-[2px] group-hover:text-white">15</span>
                          </button>
                          
                          <button 
                            onClick={() => setIsPlaying(!isPlaying)} 
                            className="w-14 h-14 lg:w-16 lg:h-16 flex items-center justify-center bg-brand-500 hover:bg-brand-400 text-white rounded-full shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:scale-105 transition-all"
                          >
                              {isPlaying ? <Pause className="w-7 h-7 lg:w-8 lg:h-8" fill="currentColor" /> : <Play className="w-7 h-7 lg:w-8 lg:h-8 ml-1" fill="currentColor" />}
                          </button>

                          <button className="text-slate-400 hover:text-white transition-colors group relative" title="前进30秒">
                              <RotateCw size={24} className="lg:w-7 lg:h-7" />
                              <span className="absolute inset-0 flex items-center justify-center text-[9px] lg:text-[10px] font-bold mt-[2px] group-hover:text-white">30</span>
                          </button>
                      </div>

                      {/* Right: Secondary */}
                      <div className="flex items-center gap-4 lg:gap-6 w-1/3 justify-end group/vol cursor-pointer">
                          <div className="flex items-center gap-2">
                              <Volume2 size={20} className="text-slate-400 group-hover/vol:text-white transition-colors lg:w-6 lg:h-6" />
                              <div className="hidden sm:flex w-0 overflow-hidden lg:w-24 group-hover/vol:w-24 transition-all duration-300 items-center">
                                  <div className="h-1.5 w-full bg-slate-700/50 rounded-full ml-1 relative">
                                      <div className="w-[60%] h-full bg-slate-300 rounded-full"></div>
                                      <div className="absolute left-[60%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white rounded-full shadow scale-0 group-hover/vol:scale-100 transition-transform"></div>
                                  </div>
                              </div>
                          </div>
                      </div>

                  </div>
              </div>
          </div>

          {/* RIGHT: Sidebar - Fixed Width, Independent Scroll */}
          <div 
            className={`
                flex flex-col lg:h-full transition-all duration-300 ease-in-out shrink-0
                ${isSidebarCollapsed ? 'lg:w-0 lg:opacity-0 lg:p-0 lg:border-0 lg:pointer-events-none hidden lg:flex' : 'w-full lg:w-[400px] lg:min-w-[320px] opacity-100'}
            `}
          >
              <div className="bg-[#111827] flex lg:flex-col h-full lg:rounded-2xl lg:shadow-xl lg:border border-slate-800">
                  
                  {/* Tabs Header */}
                  <div className="flex items-center px-6 lg:pt-6 lg:pb-4 border-b border-slate-800 lg:border-none shrink-0 overflow-x-auto no-scrollbar gap-6">
                      <button 
                        onClick={() => setActiveTab('directory')}
                        className={`py-4 lg:py-0 text-sm lg:text-base font-bold whitespace-nowrap border-b-2 lg:border-none transition-colors relative
                          ${activeTab === 'directory' ? 'text-white border-brand-500' : 'text-slate-500 border-transparent hover:text-slate-300'}`}
                      >
                          目录
                          {activeTab === 'directory' && <div className="hidden lg:block absolute -bottom-4 left-1/2 -translate-x-1/2 w-6 h-1 bg-brand-500 rounded-full"></div>}
                      </button>
                      <button 
                        onClick={() => setActiveTab('notes')}
                        className={`py-4 lg:py-0 text-sm lg:text-base font-bold whitespace-nowrap border-b-2 lg:border-none transition-colors relative
                          ${activeTab === 'notes' ? 'text-white border-brand-500' : 'text-slate-500 border-transparent hover:text-slate-300'}`}
                      >
                          笔记
                          {activeTab === 'notes' && <div className="hidden lg:block absolute -bottom-4 left-1/2 -translate-x-1/2 w-6 h-1 bg-brand-500 rounded-full"></div>}
                      </button>
                  </div>

                  {/* Tabs Content */}
                  <div className="flex-1 overflow-y-auto no-scrollbar bg-[#111827] lg:bg-transparent custom-scrollbar">
                      {activeTab === 'directory' && (
                          <div className="p-4 lg:p-6 space-y-6">
                              {chapters.map((chapter) => (
                                  <div key={chapter.id} className="space-y-2">
                                      <button 
                                        onClick={() => toggleChapter(chapter.id)}
                                        className="w-full flex items-center justify-between text-left group"
                                      >
                                          <h3 className="font-bold text-slate-200 text-sm lg:text-base group-hover:text-brand-400 transition-colors">
                                              {chapter.title}
                                          </h3>
                                          <div className="flex items-center gap-2">
                                              <span className="text-xs text-slate-500">{chapter.items.length} 讲</span>
                                              <ChevronDown size={18} className={`text-slate-500 transition-transform duration-300 ${chapter.isOpen ? 'rotate-180' : ''}`} />
                                          </div>
                                      </button>
                                      
                                      <div className={`space-y-1 transition-all overflow-hidden ${chapter.isOpen ? 'block' : 'hidden'}`}>
                                          {chapter.items.map((item) => {
                                              const isActive = item.id === activeLessonId;
                                              const typeConfig = getTypeConfig(item.type);
                                              
                                              return (
                                                  <button 
                                                      key={item.id}
                                                      onClick={() => setActiveLessonId(item.id)}
                                                      className={`w-full relative flex flex-col gap-2 p-3 lg:p-4 rounded-xl text-left transition-all group
                                                          ${isActive 
                                                              ? 'bg-brand-500/10 border border-brand-500/20' 
                                                              : 'hover:bg-slate-800/50 border border-transparent'
                                                          }
                                                      `}
                                                  >
                                                      {isActive && (
                                                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-brand-500 rounded-r-full"></div>
                                                      )}
                                                      
                                                      <div className="flex items-start gap-3 w-full">
                                                          <div className="mt-0.5 shrink-0">
                                                              {isActive 
                                                                  ? <PlayCircle className="w-5 h-5 text-brand-500" fill="currentColor" />
                                                                  : <div className="w-5 h-5 rounded-full border-2 border-slate-700 group-hover:border-slate-500 transition-colors"></div>
                                                              }
                                                          </div>
                                                          <div className="flex-1 min-w-0 pr-6">
                                                              <div className={`text-sm lg:text-base font-medium truncate mb-1.5 transition-colors
                                                                  ${isActive ? 'text-brand-400' : 'text-slate-300 group-hover:text-white'}
                                                              `}>
                                                                  {item.title}
                                                              </div>
                                                              <div className="flex items-center gap-2 flex-wrap">
                                                                  <span className={`text-[10px] px-1.5 py-0.5 rounded text-xs font-medium border ${typeConfig.className}`}>
                                                                      {typeConfig.text}
                                                                  </span>
                                                                  <span className="text-xs text-slate-500 tabular-nums">{item.duration}</span>
                                                              </div>
                                                          </div>
                                                          
                                                          {!item.isFree && !isActive && (
                                                              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                  <Lock size={14} className="text-slate-500" />
                                                              </div>
                                                          )}
                                                      </div>
                                                  </button>
                                              );
                                          })}
                                      </div>
                                  </div>
                              ))}
                          </div>
                      )}

                      {activeTab === 'notes' && (
                          <div className="p-6 text-center text-slate-500">
                              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                  <AlignLeft size={24} className="text-slate-400" />
                              </div>
                              <p className="text-sm">课程笔记功能开发中</p>
                              <p className="text-xs mt-1 opacity-60">记录你的学习心得</p>
                          </div>
                      )}
                  </div>
              </div>
          </div>

      </div>
    </div>
  );
};
