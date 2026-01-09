import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ChevronLeft, ChevronRight, PlayCircle, Search, Calendar as CalendarIcon } from 'lucide-react';

// --- Mock Data ---

const COURSES_LIST = [
  {
    id: 1,
    title: '韵儿老师的绘画课',
    image: 'https://picsum.photos/seed/art1/600/400',
    lessons: 0,
    validity: '永久有效',
    showReview: false
  },
  {
    id: 2,
    title: 'SaaS晨会-新版直播间晨会',
    image: 'https://picsum.photos/seed/owl/600/400',
    lessons: 191,
    validity: '至2027年09月18日',
    showReview: true
  },
  {
    id: 3,
    title: 'SAAS晨会-新直播间',
    image: 'https://picsum.photos/seed/cartoon/600/400',
    lessons: 47,
    validity: '至2026年08月21日',
    showReview: false
  },
  {
    id: 4,
    title: '质心学院',
    image: 'https://picsum.photos/seed/robot/600/400',
    lessons: 34,
    validity: '永久有效',
    showReview: true
  },
  {
    id: 5,
    title: '测试课程',
    image: 'https://picsum.photos/seed/robot2/600/400',
    lessons: 18,
    validity: '永久有效',
    showReview: true
  },
  {
    id: 6,
    title: '春季物理',
    image: 'https://picsum.photos/seed/cat/600/400',
    lessons: 13,
    validity: '永久有效',
    showReview: true
  },
];

const SCHEDULE_EVENTS = [
  {
    id: 1,
    time: '16:20',
    title: '111',
    courseName: '质心学院',
    unitName: '未分类课程-系统为您自动命名',
    image: 'https://picsum.photos/seed/robot/200/120'
  },
  {
    id: 2,
    time: '19:55',
    title: 'ttt',
    courseName: '1208测试-尔果专用',
    unitName: '1',
    image: 'https://picsum.photos/seed/test1/200/120'
  },
  {
    id: 3,
    time: '20:00',
    title: 'aaa',
    courseName: '1208测试-尔果专用',
    unitName: '1',
    image: 'https://picsum.photos/seed/test1/200/120'
  }
];

// --- Components ---

export const LearningCenter: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'courses' | 'calendar'>('courses');
  const [courseFilter, setCourseFilter] = useState<'all' | 'paid' | 'free'>('all');

  return (
    <div className="min-h-screen bg-[#f5f7fa] py-8 font-sans text-slate-700">
      <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Sidebar (Col 3) */}
        <div className="md:col-span-3 flex flex-col gap-4">
          
          {/* User Info Card */}
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center shadow-sm">
            <div className="w-20 h-20 rounded-full bg-slate-100 p-1 mb-3 overflow-hidden">
                <img 
                    src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=ZhaoFeng"} 
                    alt="avatar" 
                    className="w-full h-full object-cover rounded-full"
                />
            </div>
            <h3 className="font-bold text-lg text-slate-800">{user?.username || '赵峰'}</h3>
          </div>

          {/* Navigation Menu */}
          <div className="bg-white rounded-2xl py-6 shadow-sm overflow-hidden">
             <div 
                onClick={() => setActiveTab('courses')}
                className={`
                    relative px-8 py-3.5 cursor-pointer font-bold flex items-center gap-3 transition-colors
                    ${activeTab === 'courses' ? 'text-brand-600 bg-brand-50/10' : 'text-slate-600 hover:text-brand-600 hover:bg-slate-50'}
                `}
             >
                {activeTab === 'courses' && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-500 rounded-r-md"></div>
                )}
                我的课程
             </div>

             <div 
                onClick={() => setActiveTab('calendar')}
                className={`
                    relative px-8 py-3.5 cursor-pointer font-bold flex items-center gap-3 transition-colors
                    ${activeTab === 'calendar' ? 'text-brand-600 bg-brand-50/10' : 'text-slate-600 hover:text-brand-600 hover:bg-slate-50'}
                `}
             >
                {activeTab === 'calendar' && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-500 rounded-r-md"></div>
                )}
                我的日历
             </div>
          </div>
        </div>

        {/* Main Content (Col 9) */}
        <div className="md:col-span-9">
            {activeTab === 'courses' ? (
                <MyCoursesView filter={courseFilter} onFilterChange={setCourseFilter} />
            ) : (
                <MyCalendarView />
            )}
        </div>

      </div>
    </div>
  );
};

// --- Sub-components for Views ---

const MyCoursesView = ({ filter, onFilterChange }: { filter: string, onFilterChange: (v: any) => void }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm min-h-[600px] p-6">
            
            {/* Tabs Header */}
            <div className="flex items-center gap-8 border-b border-slate-100 pb-2 mb-6 relative">
                <button 
                    onClick={() => onFilterChange('all')}
                    className={`font-bold text-sm pb-2 relative transition-colors ${filter === 'all' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    全部课程 38
                    {filter === 'all' && <div className="absolute bottom-[-9px] left-1/2 -translate-x-1/2 w-6 h-1 bg-brand-500 rounded-full"></div>}
                </button>
                <button 
                    onClick={() => onFilterChange('paid')}
                    className={`font-bold text-sm pb-2 relative transition-colors ${filter === 'paid' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    付费课程
                    {filter === 'paid' && <div className="absolute bottom-[-9px] left-1/2 -translate-x-1/2 w-6 h-1 bg-brand-500 rounded-full"></div>}
                </button>
                <button 
                    onClick={() => onFilterChange('free')}
                    className={`font-bold text-sm pb-2 relative transition-colors ${filter === 'free' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    免费课程
                    {filter === 'free' && <div className="absolute bottom-[-9px] left-1/2 -translate-x-1/2 w-6 h-1 bg-brand-500 rounded-full"></div>}
                </button>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {COURSES_LIST.map((course) => (
                    <div key={course.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-slate-100/50">
                        {/* Image Area */}
                        <div className="relative aspect-[16/9] overflow-hidden">
                            <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            {course.showReview && (
                                <div className="absolute bottom-2 right-2">
                                    <button className="bg-white/90 backdrop-blur text-brand-600 text-[10px] font-bold px-2 py-1 rounded shadow-sm hover:bg-brand-500 hover:text-white transition-colors">
                                        去评价
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Content Area */}
                        <div className="p-4 flex-1 flex flex-col">
                            <h4 className="font-bold text-slate-800 text-sm mb-4 line-clamp-1" title={course.title}>
                                {course.title}
                            </h4>
                            
                            <div className="mt-auto space-y-1">
                                <p className="text-[11px] text-slate-400">
                                    课时数：{course.lessons}课时
                                </p>
                                <p className="text-[11px] text-slate-400">
                                    课程有效期：{course.validity}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const MyCalendarView = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
            
            {/* Calendar Widget (Left) */}
            <div className="lg:col-span-5 bg-white rounded-2xl shadow-sm p-6 h-fit">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 px-2">
                    <button className="p-1 text-slate-400 hover:text-brand-600 hover:bg-slate-50 rounded"><ChevronLeft size={16}/></button>
                    <div className="flex items-center gap-2 font-bold text-slate-800">
                        <span>2026年1月</span>
                        <div className="w-5 h-5 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center text-xs">今</div>
                    </div>
                    <button className="p-1 text-slate-400 hover:text-brand-600 hover:bg-slate-50 rounded"><ChevronRight size={16}/></button>
                </div>

                {/* Calendar Grid Header */}
                <div className="grid grid-cols-7 text-center mb-4">
                    {['一', '二', '三', '四', '五', '六', '日'].map(d => (
                        <div key={d} className="text-xs text-slate-400 font-medium">{d}</div>
                    ))}
                </div>

                {/* Calendar Dates (Mock for Jan 2026 - starting roughly correct for demo) */}
                <div className="grid grid-cols-7 text-center gap-y-4">
                    {/* Previous month days */}
                    {[29, 30, 31].map(d => (
                         <div key={`prev-${d}`} className="text-sm text-slate-300">{d}</div>
                    ))}
                    {/* Current month days */}
                    {Array.from({length: 31}, (_, i) => i + 1).map(d => {
                        const isSelected = d === 7; // Mock selected date
                        const hasEvent = d === 6 || d === 7 || d === 9;
                        return (
                            <div key={d} className="flex flex-col items-center justify-center gap-1 cursor-pointer group relative">
                                <div className={`
                                    w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-all
                                    ${isSelected ? 'bg-brand-500 text-white shadow-md shadow-brand-200' : 'text-slate-700 hover:bg-slate-100'}
                                `}>
                                    {d}
                                </div>
                                {hasEvent && !isSelected && (
                                    <div className="w-1 h-1 rounded-full bg-brand-400"></div>
                                )}
                            </div>
                        )
                    })}
                     {/* Next month days */}
                     {[1].map(d => (
                         <div key={`next-${d}`} className="text-sm text-slate-300">{d}</div>
                    ))}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-50">
                     <button className="w-full py-2.5 border border-brand-200 text-brand-600 rounded-xl text-sm font-bold hover:bg-brand-50 transition-colors">
                        全部课程
                     </button>
                </div>
            </div>

            {/* Timeline (Right) */}
            <div className="lg:col-span-7 space-y-0 h-full">
                {SCHEDULE_EVENTS.map((event, index) => (
                    <div key={event.id} className="flex gap-4 relative pb-8 last:pb-0">
                        {/* Timeline Line */}
                        {index !== SCHEDULE_EVENTS.length - 1 && (
                            <div className="absolute left-[2.85rem] top-8 bottom-0 w-px bg-slate-200/50"></div>
                        )}
                        
                        {/* Time Node */}
                        <div className="flex flex-col items-end w-12 shrink-0 pt-1">
                            <span className="text-slate-500 font-bold text-sm">{event.time}</span>
                            <div className="w-2 h-2 rounded-full bg-slate-300 mt-2 translate-x-[1.3rem] ring-4 ring-[#f5f7fa]"></div>
                        </div>

                        {/* Content Card */}
                        <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm ml-6 flex gap-4 items-center group cursor-pointer hover:shadow-md transition-all">
                            <div className="w-32 h-20 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <h4 className="text-base font-bold text-slate-800 mb-1">{event.title}</h4>
                                <div className="text-xs text-slate-500 space-y-0.5">
                                    <p>所属课程：{event.courseName}</p>
                                    <p className="truncate">所属单元：{event.unitName}</p>
                                </div>
                            </div>
                            
                            <div className="text-right">
                                <span className="text-sm font-medium text-slate-600 group-hover:text-brand-600 transition-colors">观看视频</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}