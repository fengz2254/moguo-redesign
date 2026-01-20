import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
    Play, Calendar as CalendarIcon, Clock, MoreVertical, 
    CheckCircle2, ChevronRight, ChevronLeft, Flame, Target, BookOpen,
    Video, Trophy
} from 'lucide-react';

// --- Mock Data ---

const MY_COURSES = [
  {
    id: 1,
    title: '2024 公务员省考笔试系统班',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop',
    progress: 35,
    totalLessons: 120,
    learnedLessons: 42,
    lastLearnTime: '10分钟前',
    nextLesson: '言语理解与表达 - 逻辑填空实战',
    status: 'learning'
  },
  {
    id: 2,
    title: '零基础直达雅思 7.0 分全程班',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop',
    progress: 12,
    totalLessons: 80,
    learnedLessons: 10,
    lastLearnTime: '2天前',
    nextLesson: 'Listening - Section 2 场景词汇',
    status: 'learning'
  },
  {
    id: 3,
    title: 'Python 数据分析实战营',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
    progress: 100,
    totalLessons: 45,
    learnedLessons: 45,
    lastLearnTime: '1个月前',
    nextLesson: '已结课',
    status: 'completed'
  },
  {
    id: 4,
    title: 'SaaS产品经理实战训练营',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop',
    progress: 5,
    totalLessons: 30,
    learnedLessons: 2,
    lastLearnTime: '3天前',
    nextLesson: '用户需求分析方法论',
    status: 'learning'
  }
];

// Mock Event Database (Key: 'YYYY-MM-DD')
const EVENT_DATABASE: Record<string, { type: 'live' | 'exam' | 'deadline', title: string, time: string }[]> = {
    '2024-05-15': [{ type: 'live', title: '雅思口语直播陪练', time: '19:30' }],
    '2024-05-18': [{ type: 'exam', title: '公考申论模拟考试', time: '09:00' }],
    '2024-05-20': [{ type: 'deadline', title: 'Python 作业截止', time: '23:59' }],
    '2024-05-24': [{ type: 'live', title: '前端架构师公开课', time: '20:00' }],
    '2024-06-01': [{ type: 'live', title: '六一儿童节活动', time: '10:00' }],
};

export const LearningCenter: React.FC = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<'learning' | 'completed' | 'expired'>('learning');
    
    // Calendar State
    const [currentDate, setCurrentDate] = useState(new Date()); // Tracks the month we are viewing
    const [selectedDate, setSelectedDate] = useState(new Date()); // Tracks the selected day

    // --- Calendar Logic ---
    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay(); // 0 = Sun

    const generateCalendarGrid = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month); // 0 (Sun) - 6 (Sat)
        
        // Adjust for Mon-start week (optional, sticking to Sun-start for simplicity or standard)
        // Let's do Sun start for standard calendar look
        
        const days = [];
        // Empty slots for previous month
        for (let i = 0; i < firstDay; i++) {
            days.push(null);
        }
        // Actual days
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i));
        }
        return days;
    };

    const formatDateKey = (date: Date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    };

    const isSameDay = (d1: Date, d2: Date) => {
        return d1.getFullYear() === d2.getFullYear() &&
               d1.getMonth() === d2.getMonth() &&
               d1.getDate() === d2.getDate();
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const calendarGrid = generateCalendarGrid();
    const selectedDateKey = formatDateKey(selectedDate);
    const selectedDateEvents = EVENT_DATABASE[selectedDateKey] || [];

    const filteredCourses = MY_COURSES.filter(course => {
        if (activeTab === 'learning') return course.status === 'learning';
        if (activeTab === 'completed') return course.status === 'completed';
        return true;
    });

    return (
        <div className="bg-[#f8fafc] dark:bg-slate-950 min-h-screen py-8 font-sans transition-colors">
            <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                            你好，{user?.username || '同学'}
                            <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-bold rounded-full flex items-center gap-1">
                                <Flame size={12} className="fill-current" /> Lv.12 学霸
                            </span>
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-base mt-2 font-medium">
                            今天是你加入魔果云课的第 <span className="text-brand-600 dark:text-brand-400 font-bold">128</span> 天，继续保持！
                        </p>
                    </div>
                    <div className="flex gap-3">
                         <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors shadow-sm">
                            <Clock size={16} /> 学习记录
                         </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left: Course List (Span 9) */}
                    <div className="lg:col-span-9">
                        
                        {/* Tabs */}
                        <div className="flex items-center gap-8 border-b border-slate-200 dark:border-slate-800 mb-6">
                            {[
                                { id: 'learning', label: '最近学习' }, 
                                { id: 'completed', label: '已学完' }, 
                                { id: 'expired', label: '已过期' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`pb-4 text-base font-bold border-b-[3px] transition-all rounded-t-sm ${
                                        activeTab === tab.id 
                                        ? 'border-brand-500 text-brand-600 dark:text-brand-400' 
                                        : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Course List */}
                        <div className="space-y-4">
                            {filteredCourses.length > 0 ? filteredCourses.map(course => (
                                <div key={course.id} className="group bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-5 hover:shadow-lg hover:border-brand-200 dark:hover:border-brand-900 transition-all duration-300 cursor-pointer">
                                    {/* Image */}
                                    <div className="w-full sm:w-56 aspect-video shrink-0 rounded-xl overflow-hidden relative bg-slate-200 dark:bg-slate-800">
                                        <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center shadow-xl">
                                                <Play size={24} className="text-white ml-1" fill="currentColor" />
                                            </div>
                                        </div>
                                        <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur-sm rounded text-[10px] text-white font-bold">
                                            {course.status === 'completed' ? '已完成' : '学习中'}
                                        </div>
                                    </div>
                                    
                                    {/* Info */}
                                    <div className="flex-1 flex flex-col py-1 min-w-0">
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-lg font-bold text-slate-800 dark:text-white line-clamp-1 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                                                    {course.title}
                                                </h3>
                                                <button className="text-slate-300 hover:text-slate-500 dark:hover:text-slate-200">
                                                    <MoreVertical size={20} />
                                                </button>
                                            </div>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2 mb-4">
                                                <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-xs font-bold text-slate-600 dark:text-slate-300">
                                                    {course.status === 'completed' ? '复习' : '上次学至'}
                                                </span>
                                                <span className="truncate font-medium">{course.nextLesson}</span>
                                            </p>
                                        </div>
                                        
                                        <div className="mt-auto flex items-end gap-4">
                                            <div className="flex-1">
                                                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5 font-medium">
                                                    <span>已学 {course.learnedLessons}/{course.totalLessons} 课时</span>
                                                    <span>{course.progress}%</span>
                                                </div>
                                                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                    <div 
                                                        className={`h-full rounded-full ${course.status === 'completed' ? 'bg-emerald-500' : 'bg-brand-500'}`} 
                                                        style={{ width: `${course.progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <button className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md active:scale-95 ${
                                                course.status === 'completed' 
                                                ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200' 
                                                : 'bg-slate-900 dark:bg-brand-600 text-white hover:bg-brand-600 dark:hover:bg-brand-500'
                                            }`}>
                                                {course.status === 'completed' ? '查看证书' : '继续学习'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="py-20 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                                    <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <BookOpen size={32} className="text-slate-300" />
                                    </div>
                                    <p className="text-slate-500 font-medium">暂无相关课程</p>
                                    <button className="mt-4 text-brand-600 font-bold hover:underline">去选课中心逛逛</button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Sidebar & Improved Calendar (Span 3) */}
                    <div className="lg:col-span-3 space-y-6">
                        
                        {/* --- NEW CALENDAR WIDGET --- */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-5">
                            {/* Calendar Header */}
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                    <CalendarIcon size={18} className="text-brand-500" /> 
                                    {currentDate.getFullYear()}年 {currentDate.getMonth() + 1}月
                                </h3>
                                <div className="flex gap-1">
                                    <button onClick={handlePrevMonth} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                                        <ChevronLeft size={16} />
                                    </button>
                                    <button onClick={handleNextMonth} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                            
                            {/* Days Grid */}
                            <div className="grid grid-cols-7 gap-1 mb-2 text-center">
                                {['日','一','二','三','四','五','六'].map(d => (
                                    <div key={d} className="text-[10px] font-bold text-slate-400 py-2">{d}</div>
                                ))}
                                
                                {calendarGrid.map((date, idx) => {
                                    if (!date) return <div key={`empty-${idx}`}></div>;
                                    
                                    const dateKey = formatDateKey(date);
                                    const hasEvents = !!EVENT_DATABASE[dateKey];
                                    const isSelected = isSameDay(date, selectedDate);
                                    const isToday = isSameDay(date, new Date());
                                    
                                    return (
                                        <button 
                                            key={dateKey}
                                            onClick={() => setSelectedDate(date)}
                                            className={`
                                                aspect-square rounded-full flex flex-col items-center justify-center text-xs font-medium relative transition-all duration-200
                                                ${isSelected 
                                                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg scale-105' 
                                                    : isToday
                                                        ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 font-bold'
                                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                                                }
                                            `}
                                        >
                                            {date.getDate()}
                                            {/* Event Dot */}
                                            {hasEvents && !isSelected && (
                                                <span className="absolute bottom-1.5 w-1 h-1 rounded-full bg-rose-500"></span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-slate-100 dark:bg-slate-800 my-4"></div>

                            {/* Selected Date Events */}
                            <div className="space-y-3">
                                <p className="text-xs font-bold text-slate-400 flex justify-between">
                                    <span>{selectedDate.getMonth() + 1}月{selectedDate.getDate()}日 安排</span>
                                    {selectedDateEvents.length > 0 && <span className="text-brand-500">{selectedDateEvents.length} 个日程</span>}
                                </p>
                                
                                {selectedDateEvents.length > 0 ? (
                                    selectedDateEvents.map((ev, i) => (
                                        <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 hover:border-brand-200 dark:hover:border-brand-900 transition-colors group cursor-pointer">
                                            <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${ev.type === 'live' ? 'bg-rose-500 animate-pulse' : ev.type === 'exam' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{ev.title}</h4>
                                                <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                                                    <Clock size={10} /> {ev.time}
                                                </p>
                                            </div>
                                            {ev.type === 'live' && <Video size={14} className="text-rose-500" />}
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-4 text-center">
                                        <p className="text-xs text-slate-400">今日暂无课程安排</p>
                                        <button className="text-xs font-bold text-brand-600 mt-2 hover:underline">去选课</button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Goals Widget */}
                        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden group">
                             <div className="relative z-10">
                                <h3 className="font-bold mb-4 flex items-center gap-2">
                                    <Target size={20} className="text-yellow-300" /> 本周目标
                                </h3>
                                <div className="flex justify-between items-end mb-3">
                                    <span className="text-indigo-100 text-sm font-medium">坚持学习打卡</span>
                                    <span className="font-black text-3xl">4 <span className="text-sm font-bold text-indigo-300 opacity-70">/ 5天</span></span>
                                </div>
                                <div className="h-2 bg-black/20 rounded-full overflow-hidden mb-4">
                                    <div className="h-full bg-yellow-400 w-[80%] rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
                                </div>
                                <p className="text-xs text-indigo-100 font-medium flex items-center gap-1.5 bg-white/10 w-fit px-2 py-1 rounded-lg">
                                    <Trophy size={12} className="text-yellow-300" />
                                    击败了全站 85% 的学员
                                </p>
                             </div>
                             {/* Decorative Circles */}
                             <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                             <div className="absolute bottom-[-10px] left-[-10px] w-24 h-24 bg-blue-500/20 rounded-full blur-2xl"></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};