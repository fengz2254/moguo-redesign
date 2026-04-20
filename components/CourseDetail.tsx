import React, { useState, useMemo } from 'react';
import { 
    ArrowLeft, 
    Play, Pause, Volume2, Camera, Flag, RotateCcw, RotateCw, Maximize, Subtitles,
    ChevronDown, ChevronUp, ChevronRight, FileText, Store,
    MoreVertical, CheckCircle2, Lock, Radio, PlayCircle, Clock,
    ArrowRight, MessageSquare, Share2, Settings, Sidebar,
    Sigma, Bold, Italic, Underline
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
            { id: 'l1', title: '宇宙大爆炸理论概述', type: 'video', time: '15:30', status: 'completed' },
            { id: 'l2', title: '科技与未来', type: 'audio', time: '40:20', status: 'in_progress' }
        ]
    },
    {
        id: 'c2',
        title: '第二章：进阶与实践',
        count: 7,
        isOpen: true,
        items: [
            { id: 'l3', title: '基础理论深化', type: 'video', time: '45:00', status: 'not_started' }, 
            { id: 'l4', title: '课后练习：第一周', type: 'homework', time: '', status: 'not_started' },
            { id: 'l5', title: '进阶：相对论入门', type: 'video', time: '21:35', status: 'locked', isTrial: true },
            { id: 'l8', title: '在线答疑：黑洞专题', type: 'live', time: '04.24 21:30', status: 'not_started' },
            { id: 'l9', title: '期中测试解析', type: 'live', time: '04.27 15:35', status: 'not_started', isLiveStreaming: true },
            { id: 'l10', title: '期末复习重点', type: 'video', time: '30:00', status: 'locked' },
            { id: 'l11', title: '模拟考试一', type: 'homework', time: '', status: 'locked' },
        ]
    }
];

const getTypeLabel = (item: any) => {
    if (item.type === 'video') return { text: '视频', className: 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700' };
    if (item.type === 'audio') return { text: '音频', className: 'bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-900/30' };
    if (item.type === 'live') {
        if (item.isLiveStreaming) {
            return { text: '直播中', className: 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/30', isLiveStreaming: true };
        }
        return { text: '直播', className: 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/30' };
    }
    if (item.type === 'homework') return { text: '作业', className: 'bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-900/30' };
    return { text: '未知', className: 'bg-slate-100 text-slate-500 border-slate-200' };
};

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
    <div className="bg-[#0f172a] h-full w-full flex flex-col font-sans overflow-x-hidden lg:overflow-hidden">
      
      {/* 1. Header - Fixed Height */}
      <header className={`h-14 lg:h-16 border-b flex items-center justify-between px-4 lg:px-6 shrink-0 z-20 transition-colors duration-500 w-full ${isSidebarCollapsed ? 'bg-[#080b12] border-white/5' : 'bg-[#0f172a] border-white/10'}`}>
          <div className="w-full max-w-[1800px] mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3 lg:gap-4 min-w-0">
                  <button 
                    onClick={onBack} 
                    className={`w-8 h-8 lg:w-9 lg:h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors shrink-0 ${isSidebarCollapsed ? 'text-slate-500 hover:text-slate-300' : 'text-slate-300 hover:text-white'}`}
                    title="返回课程主页"
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
                       <div className="w-px h-4 bg-white/20 mx-1 hidden lg:block"></div>
                       <button className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 px-2 lg:px-3 py-1.5 rounded-lg transition-colors">
                           <Share2 size={18} /> <span className="text-xs hidden sm:inline">分享</span>
                       </button>
                   </div>
              </div>
          </div>
      </header>

      {/* 2. Main Workspace - App Layout (Flex Grow) */}
      <div className="flex-1 flex flex-col lg:flex-row w-full max-w-[1800px] mx-auto overflow-hidden p-0 lg:p-4 gap-0 lg:gap-4">
          
          {/* LEFT: Content Column (Scrollable or Full Height) */}
          <div className="flex-1 flex flex-col items-center justify-center bg-black lg:rounded-2xl lg:shadow-xl lg:border border-slate-200 dark:border-slate-800 overflow-hidden relative w-full h-full">
              
              {/* Video Container (Centers the strict 16:9 box in the flexible area) */}
              <div 
                className="w-full h-full aspect-video md:aspect-auto relative group flex items-center justify-center"
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => isPlaying && setShowControls(false)}
              >
                  {/* Video Area - Centered & Contained */}
                  <div className="relative flex items-center justify-center bg-black w-full h-full">
                  <img 
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
                    className="w-full h-full object-contain opacity-90"
                    alt="Video Content"
                  />
                  
                  {/* Big Center Play Button */}
                  {!isPlaying && (
                      <button 
                        onClick={() => setIsPlaying(true)}
                        className="absolute inset-0 m-auto w-16 h-16 lg:w-20 lg:h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-brand-500 hover:scale-110 transition-all duration-300 border border-white/20 shadow-2xl group/play"
                      >
                          <Play className="w-8 h-8 lg:w-9 lg:h-9 ml-1 group-hover/play:fill-white" fill="currentColor" />
                      </button>
                  )}

                  {/* Top Gradient Overlay */}
                  <div className={`absolute top-0 left-0 right-0 h-24 lg:h-32 bg-gradient-to-b from-black/80 to-transparent p-4 lg:p-6 transition-opacity duration-300 pointer-events-none z-10 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
                      <h2 className="text-white font-bold text-base lg:text-lg drop-shadow-md line-clamp-1">{currentLessonTitle}</h2>
                  </div>
                  </div>

                  {/* Bottom Gradient Control Bar */}
                  <div className={`absolute bottom-0 left-0 right-0 pt-20 pb-4 lg:pb-6 px-5 lg:px-8 bg-gradient-to-t from-black/95 via-black/50 to-transparent transition-opacity duration-300 z-10 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                      
                      {/* Top Row: Progress Bar with Timers */}
                      <div className="flex items-center gap-4 mb-3 lg:mb-4">
                          <span className="text-white text-sm lg:text-base font-medium tabular-nums drop-shadow-md tracking-wide">00:00:00</span>
                          <div className="flex-1 px-1 group/slider cursor-pointer relative py-2">
                              {/* The track */}
                              <div className="w-full h-[5px] lg:h-1.5 bg-white/30 rounded-full relative">
                                  {/* The filled progress */}
                                  <div className="absolute left-0 top-0 h-full w-[30%] bg-white/70 rounded-full"></div>
                                  {/* The thumb */}
                                  <div className="absolute left-[30%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 lg:w-4 lg:h-4 bg-white rounded-full shadow-md scale-100 transition-transform group-hover/slider:scale-125"></div>
                              </div>
                          </div>
                          <span className="text-white text-sm lg:text-base font-medium tabular-nums drop-shadow-md tracking-wide">01:23:15</span>
                      </div>

                      {/* Bottom Row: Controls */}
                      <div className="flex items-center justify-between">
                          <div className="flex items-center gap-5 lg:gap-7">
                              <button onClick={() => setIsPlaying(!isPlaying)} className="text-white hover:text-white/80 transition-opacity drop-shadow-md">
                                  {isPlaying ? <Pause className="w-6 h-6 lg:w-7 lg:h-7" fill="currentColor" /> : <Play className="w-6 h-6 lg:w-7 lg:h-7" fill="currentColor" />}
                              </button>
                              
                              <div className="flex items-center gap-2 group/vol cursor-pointer">
                                  <Volume2 size={24} className="text-white drop-shadow-md lg:w-7 lg:h-7" />
                                  <div className="hidden sm:flex w-0 overflow-hidden group-hover/vol:w-20 transition-all duration-300">
                                      <div className="h-1 lg:h-1.5 w-16 bg-white/30 rounded-full ml-2">
                                          <div className="w-[70%] h-full bg-white rounded-full"></div>
                                      </div>
                                  </div>
                              </div>
                          </div>

                          <div className="flex items-center gap-5 lg:gap-7">
                              <button className="text-white drop-shadow-md hover:text-white/80 transition-opacity" title="截图">
                                  <Camera size={22} className="lg:w-6 lg:h-6" />
                              </button>
                              
                              <button className="text-white drop-shadow-md hover:text-white/80 transition-opacity" title="标记">
                                  <Flag size={22} className="lg:w-6 lg:h-6" />
                              </button>
                              
                              <button className="relative text-white drop-shadow-md hover:text-white/80 transition-opacity" title="后退5秒">
                                  <RotateCcw size={22} className="lg:w-6 lg:h-6" />
                                  <span className="absolute inset-0 flex items-center justify-center text-[10px] lg:text-[11px] font-bold mt-[2px]">5</span>
                              </button>

                              <button className="relative text-white drop-shadow-md hover:text-white/80 transition-opacity" title="快进5秒">
                                  <RotateCw size={22} className="lg:w-6 lg:h-6" />
                                  <span className="absolute inset-0 flex items-center justify-center text-[10px] lg:text-[11px] font-bold mt-[2px]">5</span>
                              </button>

                              <button className="text-white font-medium text-base lg:text-lg drop-shadow-md hover:text-white/80 transition-opacity">
                                  1.0X
                              </button>

                              <button className="text-[#10b981] drop-shadow-md hover:text-[#10b981]/80 transition-opacity" title="字幕">
                                  <div className="border-2 border-[#10b981] rounded px-1.5 py-0.5 text-[10px] lg:text-xs font-bold leading-none">
                                      CC
                                  </div>
                              </button>

                              <button className="text-white drop-shadow-md hover:text-white/80 transition-opacity" title="全屏">
                                  <Maximize size={22} className="lg:w-6 lg:h-6" />
                              </button>
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
              
              {/* Card Container aligned top with Video Container */}
              <div className="flex-1 overflow-hidden bg-white dark:bg-slate-900 lg:rounded-2xl shadow-xl border-t lg:border border-slate-200 dark:border-slate-800 flex flex-col">
                  
                  {/* Tabs Moved Inside */}
                  <div className="flex items-center gap-6 px-5 pt-5 pb-3 border-b border-slate-100 dark:border-slate-800 shrink-0 bg-white dark:bg-slate-900">
                      <button 
                        onClick={() => setActiveTab('directory')}
                        className={`text-base font-bold relative transition-all ${activeTab === 'directory' ? 'text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
                      >
                          目录
                          {activeTab === 'directory' && <div className="absolute -bottom-[13px] left-1/2 -translate-x-1/2 w-4 h-1 bg-brand-500 rounded-full"></div>}
                      </button>
                      <button 
                        onClick={() => setActiveTab('notes')}
                        className={`text-base font-bold relative transition-all ${activeTab === 'notes' ? 'text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
                      >
                          笔记
                          {activeTab === 'notes' && <div className="absolute -bottom-[13px] left-1/2 -translate-x-1/2 w-4 h-1 bg-brand-500 rounded-full"></div>}
                      </button>
                  </div>

                  {/* Scrollable Content Area */}
                  {activeTab === 'directory' ? (
                      <div key="directory" className="flex-1 overflow-y-auto custom-scrollbar pb-4 tab-content-enter flex flex-col">
                          {chapters.map((chapter, idx) => (
                              <div key={chapter.id} className="relative">
                                  {/* Chapter Header - Sticky within the scroll container */}
                                  <div 
                                    onClick={() => toggleChapter(chapter.id)}
                                    className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors select-none sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm z-[5] border-b border-slate-100 dark:border-slate-800"
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
                                          const typeInfo = getTypeLabel(item);
                                          
                                          let IconContent;
                                          if (isLocked) {
                                              IconContent = (
                                                  <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                                    <Lock size={12} className="text-slate-400" />
                                                  </div>
                                              );
                                          } else if (isActive) {
                                              IconContent = (
                                                  <div className="relative">
                                                      <div className="absolute inset-0 bg-brand-500 rounded-full animate-ping opacity-20"></div>
                                                      <div className="w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/30">
                                                        <div className="w-0 h-0 border-t-[3px] border-t-transparent border-l-[6px] border-l-white border-b-[3px] border-b-transparent ml-0.5"></div>
                                                      </div>
                                                  </div>
                                              );
                                          } else if (item.status === 'completed') {
                                              IconContent = (
                                                  <div className="w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
                                                    <CheckCircle2 size={14} className="text-brand-600 dark:text-brand-400" />
                                                  </div>
                                              );
                                          } else if (item.status === 'in_progress') {
                                              IconContent = (
                                                  <svg width="20" height="20" viewBox="0 0 20 20" className="text-brand-500">
                                                      <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
                                                      <path d="M10 2 A8 8 0 0 1 10 18 Z" fill="currentColor" />
                                                  </svg>
                                              );
                                          } else {
                                              IconContent = (
                                                  <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600"></div>
                                              );
                                          }
                                          
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
                                                      {IconContent}
                                                      
                                                      {i !== chapter.items.length - 1 && (
                                                          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-px h-full bg-slate-200 dark:bg-slate-800 -z-10"></div>
                                                      )}
                                                  </div>

                                                  <div className="flex-1 min-w-0">
                                                      <h5 className={`text-sm font-medium leading-relaxed mb-1.5 ${isActive ? 'text-brand-700 dark:text-brand-400 font-bold' : 'text-slate-700 dark:text-slate-300'}`}>
                                                          {item.title}
                                                      </h5>
                                                      <div className="flex items-center gap-2 flex-wrap">
                                                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold border flex items-center gap-1 ${typeInfo.className}`}>
                                                            {typeInfo.isLiveStreaming && (
                                                                <span className="relative flex h-1.5 w-1.5">
                                                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                                                                </span>
                                                            )}
                                                            {typeInfo.text}
                                                        </span>
                                                        
                                                        {item.isTrial && (
                                                            <span className="text-[10px] px-1.5 py-0.5 rounded font-bold border border-brand-500 text-brand-500 bg-brand-50 dark:bg-brand-500/10">
                                                                试听
                                                            </span>
                                                        )}

                                                        {item.time && (
                                                            <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                                                                <Clock size={10} />
                                                                {item.time}
                                                            </span>
                                                        )}
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
                      <div key="notes" className="flex-1 flex flex-col bg-white dark:bg-slate-900 h-full tab-content-enter">
                          {/* Note Title - More prominent, cleaner */}
                          <div className="px-6 pt-6 pb-4">
                              <input 
                                  type="text" 
                                  placeholder="无标题笔记..." 
                                  defaultValue="新时代中国特色社会主义市场经..."
                                  className="w-full bg-transparent text-slate-900 dark:text-white text-xl font-bold outline-none placeholder:text-slate-300 dark:placeholder:text-slate-600 transition-colors"
                              />
                          </div>
                          
                          {/* Toolbar - Modern, airy, better button hierarchy */}
                          <div className="flex items-center justify-between px-2 lg:px-4 py-2 mx-2 bg-slate-50/70 dark:bg-slate-800/70 backdrop-blur-md rounded-xl border border-slate-200/50 dark:border-slate-700/50 border-t-white/80 dark:border-t-white/10 shadow-sm mb-2 overflow-x-auto custom-scrollbar">
                              <div className="flex items-center gap-0.5 shrink-0">
                                  <button className="p-1.5 lg:p-2 text-slate-500 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-500/10 rounded-lg transition-all" title="插入公式"><Sigma size={16} strokeWidth={2.5} /></button>
                                  <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 mx-1"></div>
                                  <button className="p-1.5 lg:p-2 text-slate-500 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-500/10 rounded-lg transition-all" title="加粗"><Bold size={16} strokeWidth={2.5} /></button>
                                  <button className="p-1.5 lg:p-2 text-slate-500 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-500/10 rounded-lg transition-all" title="斜体"><Italic size={16} strokeWidth={2.5} /></button>
                                  <button className="p-1.5 lg:p-2 text-slate-500 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-500/10 rounded-lg transition-all" title="下划线"><Underline size={16} strokeWidth={2.5} /></button>
                                  <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 mx-1"></div>
                                  <button className="p-1.5 lg:p-2 text-slate-500 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-500/10 rounded-lg transition-all" title="插入图片"><Camera size={16} strokeWidth={2.5} /></button>
                                  <button className="p-1.5 lg:p-2 text-slate-500 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-500/10 rounded-lg transition-all" title="标记重点"><Flag size={16} strokeWidth={2.5} /></button>
                              </div>
                              <div className="flex items-center gap-2 shrink-0 ml-2">
                                  <button className="px-2 lg:px-3 py-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700 rounded-lg transition-all">
                                      导出
                                  </button>
                                  <button className="px-3 lg:px-4 py-1.5 text-xs font-bold text-white bg-brand-500 hover:bg-brand-600 shadow-sm shadow-brand-500/20 rounded-lg transition-all active:scale-95">
                                      保存
                                  </button>
                              </div>
                          </div>

                          {/* Editor Area - Better typography & paper texture */}
                          <div className="flex-1 px-6 pb-6 pt-2 relative">
                              <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.02] bg-[linear-gradient(transparent_27px,#000_28px)] bg-[size:100%_28px] mt-3"></div>
                              <textarea 
                                  className="w-full h-full bg-transparent resize-none outline-none text-base leading-[28px] text-slate-700 dark:text-slate-300 placeholder:text-slate-300 dark:placeholder:text-slate-600 relative z-10 custom-scrollbar"
                                  placeholder="在这里记录你的学习心得、重点难点..."
                              ></textarea>
                          </div>
                      </div>
                  )}
              </div>
          </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
            from { opacity: 0; transform: translateX(8px); }
            to { opacity: 1; transform: translateX(0); }
        }
        .tab-content-enter {
            animation: fadeSlideIn 0.25s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
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
