import React, { useState, useEffect } from 'react';
import { Monitor, Smartphone, Apple, Download, ShieldCheck, Zap, Laptop, ArrowRight, CheckCircle2, Tv, Mic2, Settings, Cast, Cpu, HardDrive, Wifi, MonitorPlay, QrCode } from 'lucide-react';

type UserRole = 'student' | 'teacher';
type OSType = 'Windows' | 'macOS';

export const DownloadCenter: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [detectedOS, setDetectedOS] = useState<OSType>('Windows');

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    if (userAgent.indexOf("Mac") !== -1) {
        setDetectedOS('macOS');
    } else {
        setDetectedOS('Windows');
    }
  }, []);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen font-sans pb-24 transition-colors">
      
      {/* 1. Header / Role Switcher Section */}
      <div className="relative bg-slate-900 pt-28 pb-36 overflow-hidden rounded-b-[4rem] transition-all duration-700">
        {/* Dynamic Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
             <div className={`absolute top-[-20%] right-[-5%] w-[800px] h-[800px] rounded-full blur-[100px] transition-colors duration-700 opacity-50 ${userRole === 'student' ? 'bg-brand-500/30' : 'bg-indigo-500/30'}`}></div>
             <div className={`absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full blur-[100px] transition-colors duration-700 opacity-50 ${userRole === 'student' ? 'bg-cyan-500/30' : 'bg-purple-500/30'}`}></div>
             {/* Grid Pattern */}
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        </div>

        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
            
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-10 drop-shadow-xl">
                下载客户端，<span className={userRole === 'student' ? 'text-brand-400' : 'text-indigo-400'}>体验更佳</span>
            </h1>

            {/* Role Switcher (Segmented Control) */}
            <div className="bg-slate-800/60 p-2 rounded-full flex relative backdrop-blur-xl border border-white/10 shadow-2xl mb-10 ring-1 ring-black/20">
                <div 
                    className={`absolute top-2 bottom-2 rounded-full shadow-lg transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) ${userRole === 'student' ? 'bg-brand-500' : 'bg-indigo-500'}`}
                    style={{
                        left: userRole === 'student' ? '8px' : 'calc(50% + 4px)',
                        width: 'calc(50% - 12px)',
                    }}
                ></div>
                <button 
                    onClick={() => setUserRole('student')}
                    className={`relative z-10 px-10 py-4 rounded-full font-bold text-lg transition-colors duration-300 w-48 flex items-center justify-center gap-3 ${userRole === 'student' ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                >
                    <Laptop size={20} /> 我是学生
                </button>
                <button 
                    onClick={() => setUserRole('teacher')}
                    className={`relative z-10 px-10 py-4 rounded-full font-bold text-lg transition-colors duration-300 w-48 flex items-center justify-center gap-3 ${userRole === 'teacher' ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                >
                    <Mic2 size={20} /> 我是老师
                </button>
            </div>

            <p className="text-slate-300 text-lg font-medium max-w-2xl animate-fade-in h-12">
                {userRole === 'student' 
                    ? '支持 Windows、macOS、iOS、Android 多端同步，随时随地开启高效学习之旅。' 
                    : '提供专业的直播教学工具、设备检测助手，助您打造稳定、高清的在线课堂。'}
            </p>
        </div>
      </div>

      {/* 2. Main Content Container */}
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-20">
        
        {userRole === 'student' ? <StudentView detectedOS={detectedOS} /> : <TeacherView detectedOS={detectedOS} />}

      </div>
    </div>
  );
};

// --- Reusable Spec Table Component ---
const SpecTable = ({ 
  title, 
  columns, 
  data,
  icon: Icon
}: { 
  title: string, 
  columns: string[], 
  data: { label: string, values: string[] }[],
  icon?: any
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors h-full">
      <div className="bg-slate-50/50 dark:bg-slate-800/50 px-8 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
         {Icon && <Icon size={20} className="text-slate-400" />}
         <h3 className="font-bold text-slate-800 dark:text-white text-lg">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/30">
              <th className="px-8 py-4 font-bold text-slate-400 w-24 sm:w-32 whitespace-nowrap">硬件项目</th>
              {columns.map((col, i) => (
                <th key={i} className="px-8 py-4 font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-8 py-4 font-bold text-slate-500 dark:text-slate-400 bg-slate-50/20 dark:bg-slate-800/20 whitespace-nowrap">{row.label}</td>
                {row.values.map((val, j) => (
                  <td key={j} className="px-8 py-4 text-slate-600 dark:text-slate-300 leading-relaxed font-medium min-w-[200px]">{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- Sub-components for Views ---

interface ViewProps {
    detectedOS: OSType;
}

const StudentView: React.FC<ViewProps> = ({ detectedOS }) => {
    return (
        <div className="animate-scale-in">
            {/* Wide Screen Grid Layout: 2 Columns (PC World vs Mobile World) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Column 1: PC Experience */}
                <div className="flex flex-col gap-8 h-full">
                    {/* PC Client Card */}
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 p-8 md:p-12 relative overflow-hidden group flex-1 min-h-[520px]">
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 text-xs font-bold mb-6 border border-brand-100 dark:border-brand-900/30">
                                <Monitor size={14} /> 魔果云课 PC 客户端
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white mb-6">桌面大屏，沉浸学习</h2>
                            <div className="space-y-4 mb-10">
                                 <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-2xl bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
                                        <Tv size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 dark:text-white text-lg">4K 超清画质</h4>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">还原真实课堂细节，板书清晰可见。</p>
                                    </div>
                                 </div>
                                 <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-2xl bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
                                        <Zap size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 dark:text-white text-lg">离线缓存播放</h4>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">支持课程批量下载，无网环境也能学。</p>
                                    </div>
                                 </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-4">
                                <DownloadButton 
                                    os="Windows" 
                                    version="v3.5.2 (64位)" 
                                    icon={<img src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Windows_logo_-_2012.svg" className="w-5 h-5 opacity-80" alt="Win" />}
                                    primary={detectedOS === 'Windows'}
                                />
                                <DownloadButton 
                                    os="macOS" 
                                    version="v3.5.2 (Intel/M1)" 
                                    icon={<Apple size={20} className="mb-0.5" />} 
                                    primary={detectedOS === 'macOS'}
                                />
                            </div>
                        </div>

                        {/* Visual Decoration */}
                        <div className="absolute -right-20 bottom-[-50px] w-[500px] h-[400px] opacity-100 hidden lg:block pointer-events-none group-hover:scale-105 transition-transform duration-700">
                             <div className="w-full h-full bg-slate-800 rounded-t-3xl shadow-2xl border-t-4 border-l-4 border-slate-700 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                                    <div className="w-20 h-20 rounded-3xl bg-brand-500 flex items-center justify-center text-white shadow-2xl shadow-brand-500/50">
                                        <Monitor size={40} />
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>

                    {/* PC Specs Table */}
                    <SpecTable 
                        title="电脑端 - 学员配置需求" 
                        icon={Monitor}
                        columns={['Windows', 'Mac']}
                        data={[
                            { label: '处理器', values: ['i5 及以上', 'Intel/M 系列处理器'] },
                            { label: '操作系统', values: ['Windows 7 及更高版本', 'MacOS X10.10 及更高版本'] },
                            { label: '内存', values: ['2GB 及以上', '2GB 及以上'] },
                            { label: '显示', values: ['不低于1280x720分辨率', '不低于1280x720分辨率'] },
                            { label: '网络', values: ['上下行不低于 2Mbps', '上下行不低于 2Mbps'] },
                        ]}
                    />
                </div>

                {/* Column 2: Mobile Experience */}
                <div className="flex flex-col gap-8 h-full">
                    
                    {/* Mobile App Card */}
                    <div className="bg-gradient-to-br from-brand-600 to-emerald-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden flex flex-col justify-between shadow-lg group flex-1 min-h-[520px]">
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold mb-6 border border-white/10">
                                <Smartphone size={14} /> 移动端 App
                            </div>
                            <h2 className="text-3xl font-black mb-4">把名师装进口袋</h2>
                            <p className="text-brand-100 text-sm mb-8 leading-relaxed font-medium max-w-sm">
                                完美适配 iPhone、Android 手机。通勤路上、午休间隙... 利用碎片时间高效提升。
                            </p>
                            
                            <div className="flex gap-3">
                                <button className="px-6 py-3 bg-white text-brand-700 rounded-xl font-bold hover:bg-brand-50 transition-colors shadow-lg text-sm flex items-center gap-2">
                                    <Apple size={18} className="mb-0.5" /> App Store
                                </button>
                                <button className="px-6 py-3 bg-brand-800/40 text-white border border-white/20 rounded-xl font-bold hover:bg-brand-800/60 transition-colors text-sm flex items-center gap-2">
                                    <Download size={18} /> Android
                                </button>
                            </div>
                        </div>
                        
                        <div className="absolute bottom-6 right-6">
                            <div className="bg-white p-3 rounded-2xl shadow-xl transform rotate-3 group-hover:rotate-0 transition-transform duration-300 scale-110 origin-bottom-right">
                                <img 
                                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=MoguoStudentApp" 
                                    alt="Scan to download" 
                                    className="w-28 h-28"
                                />
                                <p className="text-slate-900 text-[10px] font-bold text-center mt-2">扫码下载 App</p>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    </div>

                    {/* Mobile Specs Table */}
                    <SpecTable 
                        title="移动端 - 学员配置需求" 
                        icon={Smartphone}
                        columns={['Android 端', 'iOS 端']}
                        data={[
                            { label: '处理器', values: ['骁龙 845、麒麟 980 同等级及以上', 'A12 及以上芯片/M 系列芯片'] },
                            { label: '操作系统', values: ['Android 8.0 及更高版本', 'iOS 12.0 及更高版本'] },
                            { label: '内存', values: ['RAM 6GB+，ROM 64GB+', 'RAM 3GB+，ROM 64GB+'] },
                            { label: '网络', values: ['上下行不低于 2Mbps', '上下行不低于 2Mbps'] },
                        ]}
                    />
                </div>

            </div>
        </div>
    );
};

const TeacherView: React.FC<ViewProps> = ({ detectedOS }) => {
    return (
        <div className="animate-scale-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Column 1: Live Assistant Main Card */}
                <div className="flex flex-col gap-8">
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 p-10 relative overflow-hidden group flex-1 min-h-[460px]">
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-6 border border-indigo-100 dark:border-indigo-900/30">
                                <Cast size={14} /> 教师专属工具
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white mb-6">魔果直播助手</h2>
                            <p className="text-slate-500 dark:text-slate-400 mb-10 leading-relaxed font-medium text-lg max-w-lg">
                                专为在线教学打造的推流工具。支持 PPT 演示、白板书写、连麦互动。
                                极简操作，让您专注于教学内容，无需担心技术细节。
                            </p>
                            
                            <div className="flex flex-wrap gap-4">
                                <DownloadButton 
                                    os="Windows" 
                                    version="v2.1.0 教师版" 
                                    icon={<img src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Windows_logo_-_2012.svg" className="w-5 h-5 opacity-80" alt="Win" />}
                                    primary={detectedOS === 'Windows'}
                                    color="indigo"
                                />
                                 <DownloadButton 
                                    os="macOS" 
                                    version="v2.1.0 Beta" 
                                    icon={<Apple size={20} className="mb-0.5" />} 
                                    primary={detectedOS === 'macOS'}
                                    color="indigo"
                                />
                            </div>
                        </div>

                         {/* Preview UI Decoration */}
                         <div className="absolute -right-16 bottom-10 w-[400px] h-[280px] bg-slate-800 rounded-xl shadow-2xl p-2 border-4 border-slate-700 transform rotate-3 group-hover:rotate-0 transition-transform duration-500 hidden lg:block">
                             <div className="w-full h-full bg-slate-900 rounded overflow-hidden relative flex">
                                <div className="w-12 border-r border-slate-700/50 h-full flex flex-col items-center py-4 gap-3 bg-slate-800">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white"><Mic2 size={16} /></div>
                                    <div className="w-8 h-8 rounded-lg bg-slate-700/50"></div>
                                    <div className="w-8 h-8 rounded-lg bg-slate-700/50"></div>
                                </div>
                                <div className="flex-1 p-3 grid grid-cols-3 gap-2 bg-slate-800/50">
                                    <div className="col-span-2 bg-slate-700/50 rounded-lg h-full animate-pulse relative overflow-hidden">
                                        <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-[10px] font-mono">LIVE PREVIEW</div>
                                    </div>
                                    <div className="col-span-1 flex flex-col gap-2">
                                        <div className="bg-slate-700/30 rounded-lg flex-1"></div>
                                        <div className="bg-slate-700/30 rounded-lg h-20"></div>
                                    </div>
                                </div>
                             </div>
                             <div className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-lg animate-pulse">LIVE</div>
                        </div>
                    </div>

                    <SpecTable 
                        title="电脑端 - 讲师/助教配置需求" 
                        icon={MonitorPlay}
                        columns={['Windows', 'Mac']}
                        data={[
                            { label: '处理器', values: ['i5处理器，主频2.0GHz以上', 'Intel/M 系列处理器'] },
                            { label: '操作系统', values: ['Windows 7 及更高版本', 'MacOS X10.10 及更高版本'] },
                            { label: '内存', values: ['4GB 及以上', '4GB 及以上'] },
                            { label: '显示', values: ['不低于1280x720分辨率', '不低于1280x720分辨率'] },
                            { label: '网络', values: ['上下行不低于 4Mbps', '上下行不低于 4Mbps'] },
                        ]}
                    />
                </div>

                {/* Column 2: Tools */}
                <div className="flex flex-col gap-8">
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300 flex items-start gap-8 group hover:-translate-y-1">
                        <div className="w-20 h-20 rounded-3xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform border border-blue-100 dark:border-blue-900/30">
                            <Settings size={40} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">设备检测工具</h3>
                            <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                                上课前一键检测摄像头、麦克风、扬声器及网络环境，确保课堂万无一失。
                            </p>
                            <button className="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 px-6 py-3 rounded-xl text-sm font-bold transition-colors flex items-center gap-2">
                                立即下载检测包 <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300 flex items-start gap-8 group hover:-translate-y-1">
                        <div className="w-20 h-20 rounded-3xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform border border-purple-100 dark:border-purple-900/30">
                            <Zap size={40} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-purple-600 transition-colors">远程协助客户端</h3>
                            <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                                遇到技术难题？下载远程协助工具，让技术支持人员直接帮您解决问题。
                            </p>
                            <button className="text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/40 px-6 py-3 rounded-xl text-sm font-bold transition-colors flex items-center gap-2">
                                获取协助工具 <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Reusable Button Component ---

interface DownloadButtonProps {
    os: string;
    version: string;
    icon: React.ReactNode;
    primary?: boolean;
    color?: 'brand' | 'indigo';
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ os, version, icon, primary, color = 'brand' }) => {
    const bgClass = primary 
        ? (color === 'brand' ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-500/20' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20')
        : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-slate-300 shadow-sm';

    return (
        <button className={`flex items-center gap-4 px-6 py-3.5 rounded-2xl transition-all active:scale-95 group ${bgClass}`}>
            <div className={primary ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}>
                {icon}
            </div>
            <div className="text-left">
                <div className="font-bold text-base leading-none mb-1.5">{os} 下载</div>
                <div className={`text-xs font-medium ${primary ? 'opacity-80' : 'text-slate-400 dark:text-slate-500'}`}>{version}</div>
            </div>
        </button>
    );
}
