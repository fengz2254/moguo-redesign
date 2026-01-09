import React, { useState } from 'react';
import { Search, ChevronRight, BookOpen, Clock, User, Building2 } from 'lucide-react';

interface SearchResultsProps {
  query: string;
}

// Mock Data matching the screenshot
const MOCK_SEARCH_COURSES = [
  {
    id: 1,
    title: '公考资料库',
    image: 'https://picsum.photos/seed/exam1/400/250',
    tag: '公务员考试',
    price: 0,
    institution: '公务员李老师专...',
    lessons: '0课时',
    students: '1人报名'
  },
  {
    id: 2,
    title: '【睿航公考】态度观点类面试进阶课程',
    image: 'https://picsum.photos/seed/exam2/400/250',
    tag: '公务员考试',
    price: 69.9,
    institution: '睿航公考',
    lessons: '4课时',
    students: ''
  },
  {
    id: 3,
    title: '【睿航公考】时政热点专项——2024年9月',
    image: 'https://picsum.photos/seed/exam3/400/250',
    tag: '公务员考试',
    price: 298,
    institution: '睿航公考',
    lessons: '3课时',
    students: ''
  },
  {
    id: 4,
    title: '【睿航公考】时政热点专项——2024年8月',
    image: 'https://picsum.photos/seed/exam4/400/250',
    tag: '公务员考试',
    price: 298,
    institution: '睿航公考',
    lessons: '3课时',
    students: ''
  }
];

const MOCK_SEARCH_INSTITUTIONS = [
  {
    id: 1,
    name: '公考老李的个人机构',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Li&backgroundColor=c0aede',
    desc: '10年+行业名师坐镇领衔，师资清一色985/211高校背景，熟稔国省考命题底层逻...',
    courseCount: 12
  },
  {
    id: 2,
    name: '【公考】小小吨祝你上岸',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Ton&backgroundColor=1e293b',
    desc: '“考公怕走弯路？找‘小小吨’就对了！5年+教研团队，小班定制课，专属督学盯进...',
    courseCount: 8
  },
  {
    id: 3,
    name: '睿航公考',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Rui&backgroundColor=60a5fa',
    desc: '“教育的温度，从心开始”',
    courseCount: 24
  }
];

export const SearchResults: React.FC<SearchResultsProps> = ({ query }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'course' | 'institution'>('all');

  return (
    <div className="min-h-screen bg-[#f5f7fa] pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header with Search Query Display (Optional) */}
        {/* <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-800">
                "{query}" 的搜索结果
            </h1>
        </div> */}

        {/* Filter Tabs */}
        <div className="flex items-center gap-4 mb-8">
            <span className="font-bold text-slate-700 text-sm">内容分类</span>
            <div className="flex bg-white rounded-lg p-1 shadow-sm border border-slate-100/50">
                <button 
                    onClick={() => setActiveTab('all')}
                    className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${activeTab === 'all' ? 'bg-brand-50 text-brand-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    全部
                </button>
                <button 
                    onClick={() => setActiveTab('course')}
                    className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${activeTab === 'course' ? 'bg-brand-50 text-brand-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    课程
                </button>
                <button 
                    onClick={() => setActiveTab('institution')}
                    className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${activeTab === 'institution' ? 'bg-brand-50 text-brand-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    机构
                </button>
            </div>
        </div>

        {/* 1. Courses Section */}
        {(activeTab === 'all' || activeTab === 'course') && (
            <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        课程 <span className="text-slate-400 font-medium text-base">({MOCK_SEARCH_COURSES.length})</span>
                    </h2>
                    <button className="text-xs text-slate-500 hover:text-brand-600 flex items-center gap-1 transition-colors">
                        查看更多 <ChevronRight size={14} />
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {MOCK_SEARCH_COURSES.map(course => (
                        <div key={course.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 group cursor-pointer flex flex-col h-full">
                            {/* Image */}
                            <div className="relative aspect-[16/9] overflow-hidden">
                                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            
                            {/* Content */}
                            <div className="p-4 flex flex-col flex-1">
                                <div className="mb-2">
                                    <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] rounded font-medium">
                                        {course.tag}
                                    </span>
                                </div>
                                <h3 className="font-bold text-slate-800 text-sm mb-3 line-clamp-2 leading-relaxed">
                                    {course.title}
                                </h3>
                                
                                <div className="mt-auto">
                                    <div className="mb-3">
                                        {course.price === 0 ? (
                                            <span className="text-lg font-bold text-rose-500">免费</span>
                                        ) : (
                                            <span className="text-lg font-bold text-rose-500">
                                                <span className="text-xs mr-0.5">¥</span>{course.price}
                                            </span>
                                        )}
                                    </div>
                                    
                                    <div className="flex items-center justify-between pt-3 border-t border-slate-50 text-[11px] text-slate-400">
                                        <div className="flex items-center gap-1.5">
                                            <Building2 size={12} />
                                            <span className="truncate max-w-[80px]" title={course.institution}>{course.institution}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span>{course.lessons}</span>
                                            {course.students && <span>{course.students}</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* 2. Institutions Section */}
        {(activeTab === 'all' || activeTab === 'institution') && (
            <div>
                 <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        机构 <span className="text-slate-400 font-medium text-base">({MOCK_SEARCH_INSTITUTIONS.length})</span>
                    </h2>
                    <button className="text-xs text-slate-500 hover:text-brand-600 flex items-center gap-1 transition-colors">
                        查看更多 <ChevronRight size={14} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MOCK_SEARCH_INSTITUTIONS.map(inst => (
                        <div key={inst.id} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 flex items-start gap-4 cursor-pointer group">
                             <div className="w-16 h-16 rounded-xl border border-slate-100 p-1 shrink-0">
                                <img src={inst.logo} alt={inst.name} className="w-full h-full object-cover rounded-lg" />
                             </div>
                             <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-slate-800 text-base mb-1 group-hover:text-brand-600 transition-colors truncate">
                                    {inst.name}
                                </h3>
                                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-2 h-8">
                                    {inst.desc}
                                </p>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

      </div>
    </div>
  );
};