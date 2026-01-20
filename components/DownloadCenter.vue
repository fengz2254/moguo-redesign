<script setup lang="ts">
import { ref } from 'vue';
import { Monitor, Smartphone, Apple, Download, ShieldCheck, Zap, Laptop, ArrowRight, Tv, Mic2, Settings, Cast, Tablet, Cpu, HardDrive, MonitorPlay } from 'lucide-vue';

const userRole = ref<'student' | 'teacher'>('student');
</script>

<template>
  <div class="bg-slate-50 min-h-screen font-sans pb-20">
    <div class="relative bg-slate-900 pt-24 pb-32 overflow-hidden rounded-b-[3rem] transition-all duration-700">
        <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
             <div :class="['absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full blur-3xl transition-colors duration-700 opacity-60', userRole === 'student' ? 'bg-brand-500/20' : 'bg-indigo-500/20']"></div>
             <div :class="['absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-3xl transition-colors duration-700 opacity-60', userRole === 'student' ? 'bg-cyan-500/20' : 'bg-purple-500/20']"></div>
             <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
            <h1 class="text-3xl md:text-5xl font-black text-white tracking-tight mb-8 drop-shadow-lg">
                下载客户端，<span :class="userRole === 'student' ? 'text-brand-400' : 'text-indigo-400'">体验更佳</span>
            </h1>

            <div class="bg-slate-800/50 p-1.5 rounded-full flex relative backdrop-blur-md border border-white/10 shadow-xl mb-8">
                <div 
                    :class="['absolute top-1.5 bottom-1.5 rounded-full shadow-md transition-all duration-300 ease-out', userRole === 'student' ? 'bg-brand-500' : 'bg-indigo-500']"
                    :style="{ left: userRole === 'student' ? '6px' : 'calc(50% + 3px)', width: 'calc(50% - 9px)' }"
                ></div>
                <button 
                    @click="userRole = 'student'"
                    :class="['relative z-10 px-8 py-3 rounded-full font-bold text-sm md:text-base transition-colors duration-300 w-36 md:w-48 flex items-center justify-center gap-2', userRole === 'student' ? 'text-white' : 'text-slate-400 hover:text-white']"
                >
                    <Laptop :size="18" /> 我是学生
                </button>
                <button 
                    @click="userRole = 'teacher'"
                    :class="['relative z-10 px-8 py-3 rounded-full font-bold text-sm md:text-base transition-colors duration-300 w-36 md:w-48 flex items-center justify-center gap-2', userRole === 'teacher' ? 'text-white' : 'text-slate-400 hover:text-white']"
                >
                    <Mic2 :size="18" /> 我是老师
                </button>
            </div>

            <p class="text-slate-400 text-sm md:text-base font-medium max-w-xl animate-fade-in h-12">
                {{ userRole === 'student' 
                    ? '支持 Windows、macOS、iOS、Android 多端同步，随时随地开启高效学习之旅。' 
                    : '提供专业的直播教学工具、设备检测助手，助您打造稳定、高清的在线课堂。' }}
            </p>
        </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-20">
        <!-- Student View -->
        <div v-if="userRole === 'student'" class="animate-scale-in flex flex-col gap-6">
            <div class="order-1 md:order-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="md:col-span-2 bg-gradient-to-br from-brand-600 to-emerald-900 rounded-[2.5rem] p-8 md:p-10 text-white relative overflow-hidden flex flex-col sm:flex-row items-center justify-between shadow-lg group">
                    <div class="relative z-10 max-w-sm">
                        <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold mb-6 border border-white/10">
                            <Smartphone :size="14" /> 移动端 App
                        </div>
                        <h2 class="text-3xl font-black mb-4">把名师装进口袋</h2>
                        <p class="text-brand-100 text-sm mb-6 leading-relaxed font-medium">
                            完美适配 iPhone、Android 手机。通勤路上、午休间隙... 利用碎片时间高效提升。
                        </p>
                        <div class="flex gap-3 mb-6">
                            <button class="px-5 py-3 bg-white text-brand-700 rounded-xl font-bold hover:bg-brand-50 transition-colors shadow-lg text-sm flex items-center gap-2">
                                <Apple :size="18" class="mb-0.5" /> App Store
                            </button>
                            <button class="px-5 py-3 bg-brand-800/40 text-white border border-white/20 rounded-xl font-bold hover:bg-brand-800/60 transition-colors text-sm flex items-center gap-2">
                                <Download :size="18" /> Android
                            </button>
                        </div>
                    </div>
                    <div class="mt-8 sm:mt-0 sm:ml-8 relative">
                        <div class="bg-white p-3 rounded-2xl shadow-xl transform rotate-3 group-hover:rotate-0 transition-transform duration-300 scale-110">
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=MoguoStudentApp" alt="Scan to download" class="w-32 h-32" />
                            <p class="text-slate-900 text-[10px] font-bold text-center mt-2">扫码下载 App</p>
                        </div>
                    </div>
                    <div class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                </div>
                <div class="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col justify-center relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                    <div class="absolute top-[-20px] right-[-20px] p-6 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity rotate-12">
                        <Tablet :size="160" class="text-slate-900" />
                    </div>
                    <div class="relative z-10">
                        <div class="w-14 h-14 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mb-6 border border-orange-100">
                            <Tablet :size="28" />
                        </div>
                        <h3 class="font-bold text-slate-800 text-xl mb-3">HD 平板适配版</h3>
                        <p class="text-sm text-slate-500 leading-relaxed mb-6">针对 iPad 和安卓平板的大屏优化，支持分屏笔记、画中画模式，学习效率翻倍。</p>
                        <a href="#" class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 text-slate-600 hover:bg-brand-50 hover:text-brand-600 transition-colors">
                            <ArrowRight :size="20" />
                        </a>
                    </div>
                </div>
            </div>

            <div class="order-2 md:order-4">
               <div class="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                   <div class="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex items-center gap-2">
                       <Smartphone :size="18" class="text-slate-400" />
                       <h3 class="font-bold text-slate-800">移动端 - 学员配置需求</h3>
                   </div>
                   <div class="overflow-x-auto">
                        <table class="w-full text-sm text-left">
                            <thead>
                                <tr class="border-b border-slate-100 bg-slate-50/30">
                                    <th class="px-6 py-3 font-medium text-slate-400 w-24 sm:w-32 whitespace-nowrap">硬件项目</th>
                                    <th class="px-6 py-3 font-bold text-slate-700 whitespace-nowrap">Android 端</th>
                                    <th class="px-6 py-3 font-bold text-slate-700 whitespace-nowrap">iOS 端 (iPhone/iPad)</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-50">
                                <tr class="hover:bg-slate-50/50 transition-colors">
                                    <td class="px-6 py-4 font-medium text-slate-500 bg-slate-50/20 whitespace-nowrap">处理器</td>
                                    <td class="px-6 py-4 text-slate-600 leading-relaxed min-w-[200px]">骁龙 845、麒麟 980 同等级及以上芯片</td>
                                    <td class="px-6 py-4 text-slate-600 leading-relaxed min-w-[200px]">A12 及以上芯片/M 系列芯片</td>
                                </tr>
                                <tr class="hover:bg-slate-50/50 transition-colors">
                                    <td class="px-6 py-4 font-medium text-slate-500 bg-slate-50/20 whitespace-nowrap">操作系统</td>
                                    <td class="px-6 py-4 text-slate-600 leading-relaxed min-w-[200px]">Android 8.0 及更高版本</td>
                                    <td class="px-6 py-4 text-slate-600 leading-relaxed min-w-[200px]">iOS 12.0 及更高版本</td>
                                </tr>
                                <tr class="hover:bg-slate-50/50 transition-colors">
                                    <td class="px-6 py-4 font-medium text-slate-500 bg-slate-50/20 whitespace-nowrap">内存</td>
                                    <td class="px-6 py-4 text-slate-600 leading-relaxed min-w-[200px]">RAM 6GB 及以上，ROM 64GB 及以上</td>
                                    <td class="px-6 py-4 text-slate-600 leading-relaxed min-w-[200px]">RAM 3GB 及以上，ROM 64GB 及以上</td>
                                </tr>
                                <tr class="hover:bg-slate-50/50 transition-colors">
                                    <td class="px-6 py-4 font-medium text-slate-500 bg-slate-50/20 whitespace-nowrap">网络</td>
                                    <td class="px-6 py-4 text-slate-600 leading-relaxed min-w-[200px]">上下行不低于 2Mbps</td>
                                    <td class="px-6 py-4 text-slate-600 leading-relaxed min-w-[200px]">上下行不低于 2Mbps</td>
                                </tr>
                            </tbody>
                        </table>
                   </div>
               </div>
            </div>

            <div class="order-3 md:order-1 bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-8 md:p-12 relative overflow-hidden group">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
                    <div>
                        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-brand-50 text-brand-600 text-xs font-bold mb-4 border border-brand-100">
                            <Monitor :size="14" /> 魔果云课 PC 客户端
                        </div>
                        <h2 class="text-3xl md:text-4xl font-black text-slate-800 mb-6">桌面大屏，沉浸学习</h2>
                        <div class="space-y-4 mb-8">
                             <div class="flex items-start gap-3">
                                <div class="w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center shrink-0 mt-1">
                                    <Tv :size="16" />
                                </div>
                                <div>
                                    <h4 class="font-bold text-slate-800">4K 超清画质</h4>
                                    <p class="text-sm text-slate-500">还原真实课堂细节，板书清晰可见。</p>
                                </div>
                             </div>
                             <div class="flex items-start gap-3">
                                <div class="w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center shrink-0 mt-1">
                                    <Zap :size="16" />
                                </div>
                                <div>
                                    <h4 class="font-bold text-slate-800">离线缓存播放</h4>
                                    <p class="text-sm text-slate-500">支持课程批量下载，无网环境也能学。</p>
                                </div>
                             </div>
                        </div>
                        <div class="flex flex-wrap gap-4 mb-8">
                            <button class="flex items-center gap-3 px-5 py-3 rounded-xl transition-all active:scale-95 group bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-500/20">
                                <div><img src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Windows_logo_-_2012.svg" class="w-5 h-5 opacity-80" alt="Win" /></div>
                                <div class="text-left"><div class="font-bold text-sm leading-none mb-1.5">Windows 下载</div><div class="text-[10px] font-medium opacity-80">v3.5.2 (64位)</div></div>
                            </button>
                            <button class="flex items-center gap-3 px-5 py-3 rounded-xl transition-all active:scale-95 group bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 shadow-sm">
                                <div class="opacity-70 group-hover:opacity-100"><Apple :size="20" class="mb-0.5" /></div>
                                <div class="text-left"><div class="font-bold text-sm leading-none mb-1.5">macOS 下载</div><div class="text-[10px] font-medium text-slate-400">v3.5.2 (Intel/M1)</div></div>
                            </button>
                        </div>
                        <div class="md:hidden text-center p-2 bg-slate-50 rounded-lg text-xs text-slate-400">推荐在电脑端访问下载以获取最佳体验</div>
                    </div>
                    <div class="hidden md:flex relative justify-center items-center">
                        <div class="w-full max-w-md aspect-[16/10] bg-slate-900 rounded-t-2xl shadow-2xl p-2 border-t border-x border-slate-700 relative z-10 transform group-hover:-translate-y-2 transition-transform duration-500">
                             <div class="w-full h-full bg-slate-800 rounded-lg overflow-hidden relative">
                                <div class="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center justify-center border border-slate-700/50">
                                     <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-lg shadow-brand-500/30 flex items-center justify-center text-white mb-4">
                                         <Monitor :size="32" />
                                     </div>
                                     <div class="space-y-2 w-1/2">
                                         <div class="h-2 bg-slate-700 rounded-full w-full"></div>
                                         <div class="h-2 bg-slate-700 rounded-full w-2/3 mx-auto"></div>
                                     </div>
                                </div>
                             </div>
                        </div>
                        <div class="absolute -bottom-3 w-[110%] h-4 bg-slate-800 rounded-b-xl shadow-xl z-20"></div>
                        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-500/20 blur-3xl rounded-full"></div>
                    </div>
                </div>
            </div>

            <div class="order-4 md:order-2">
                 <div class="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                   <div class="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex items-center gap-2">
                       <Monitor :size="18" class="text-slate-400" />
                       <h3 class="font-bold text-slate-800">电脑端 - 学员配置需求</h3>
                   </div>
                   <div class="overflow-x-auto">
                        <table class="w-full text-sm text-left">
                            <thead>
                                <tr class="border-b border-slate-100 bg-slate-50/30">
                                    <th class="px-6 py-3 font-medium text-slate-400 w-24 sm:w-32 whitespace-nowrap">硬件项目</th>
                                    <th class="px-6 py-3 font-bold text-slate-700 whitespace-nowrap">Windows</th>
                                    <th class="px-6 py-3 font-bold text-slate-700 whitespace-nowrap">Mac</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-50">
                                <tr class="hover:bg-slate-50/50 transition-colors">
                                    <td class="px-6 py-4 font-medium text-slate-500 bg-slate-50/20 whitespace-nowrap">处理器</td>
                                    <td class="px-6 py-4 text-slate-600 leading-relaxed min-w-[200px]">i5 及以上</td>
                                    <td class="px-6 py-4 text-slate-600 leading-relaxed min-w-[200px]">Intel/M 系列处理器</td>
                                </tr>
                                <tr class="hover:bg-slate-50/50 transition-colors">
                                    <td class="px-6 py-4 font-medium text-slate-500 bg-slate-50/20 whitespace-nowrap">操作系统</td>
                                    <td class="px-6 py-4 text-slate-600 leading-relaxed min-w-[200px]">Windows 7 及更高版本</td>
                                    <td class="px-6 py-4 text-slate-600 leading-relaxed min-w-[200px]">MacOS X10.10 及更高版本</td>
                                </tr>
                                <tr class="hover:bg-slate-50/50 transition-colors">
                                    <td class="px-6 py-4 font-medium text-slate-500 bg-slate-50/20 whitespace-nowrap">内存</td>
                                    <td class="px-6 py-4 text-slate-600 leading-relaxed min-w-[200px]">2GB 及以上</td>
                                    <td class="px-6 py-4 text-slate-600 leading-relaxed min-w-[200px]">2GB 及以上</td>
                                </tr>
                                <tr class="hover:bg-slate-50/50 transition-colors">
                                    <td class="px-6 py-4 font-medium text-slate-500 bg-slate-50/20 whitespace-nowrap">显示</td>
                                    <td class="px-6 py-4 text-slate-600 leading-relaxed min-w-[200px]">不低于1280x720分辨率</td>
                                    <td class="px-6 py-4 text-slate-600 leading-relaxed min-w-[200px]">不低于1280x720分辨率</td>
                                </tr>
                                <tr class="hover:bg-slate-50/50 transition-colors">
                                    <td class="px-6 py-4 font-medium text-slate-500 bg-slate-50/20 whitespace-nowrap">网络</td>
                                    <td class="px-6 py-4 text-slate-600 leading-relaxed min-w-[200px]">上下行不低于 2Mbps</td>
                                    <td class="px-6 py-4 text-slate-600 leading-relaxed min-w-[200px]">上下行不低于 2Mbps</td>
                                </tr>
                            </tbody>
                        </table>
                   </div>
               </div>
            </div>
        </div>

        <!-- Teacher View -->
        <div v-if="userRole === 'teacher'" class="animate-scale-in space-y-6">
            <div class="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-8 md:p-12 relative overflow-hidden group">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div class="hidden md:flex order-2 md:order-1 relative justify-center items-center">
                         <div class="w-full max-w-md aspect-[16/10] bg-slate-900 rounded-xl shadow-2xl p-1.5 border border-slate-700 relative z-10 transform group-hover:scale-[1.02] transition-transform duration-500 ring-4 ring-slate-100">
                             <div class="w-full h-full bg-slate-800 rounded overflow-hidden relative flex">
                                <div class="w-14 border-r border-slate-700/50 h-full flex flex-col items-center py-4 gap-4 bg-slate-800">
                                    <div class="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white"><Mic2 :size="16" /></div>
                                    <div class="w-8 h-8 rounded-lg bg-slate-700/50"></div>
                                    <div class="w-8 h-8 rounded-lg bg-slate-700/50"></div>
                                </div>
                                <div class="flex-1 p-4 grid grid-cols-3 gap-3 bg-slate-800/50">
                                    <div class="col-span-2 bg-slate-700/50 rounded-lg h-32 animate-pulse relative overflow-hidden">
                                        <div class="absolute inset-0 flex items-center justify-center text-slate-500 text-xs font-mono">LIVE PREVIEW</div>
                                    </div>
                                    <div class="col-span-1 bg-slate-700/30 rounded-lg h-32 flex flex-col gap-2 p-2">
                                        <div class="bg-slate-600/50 h-2 w-full rounded"></div>
                                        <div class="bg-slate-600/50 h-2 w-2/3 rounded"></div>
                                        <div class="bg-slate-600/50 h-2 w-full rounded"></div>
                                    </div>
                                    <div class="col-span-3 bg-slate-900 rounded-lg h-16 mt-auto border-t border-slate-700 flex items-center px-4 gap-4">
                                        <div class="w-8 h-8 rounded-full bg-red-500 border-2 border-slate-800"></div>
                                        <div class="h-2 bg-slate-700 rounded-full flex-1"></div>
                                    </div>
                                </div>
                             </div>
                             <div class="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-lg animate-pulse">LIVE</div>
                        </div>
                        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-500/20 blur-[80px] rounded-full"></div>
                    </div>
                    <div class="order-1 md:order-2">
                        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-50 text-indigo-600 text-xs font-bold mb-4 border border-indigo-100">
                            <Cast :size="14" /> 教师专属工具
                        </div>
                        <h2 class="text-3xl md:text-4xl font-black text-slate-800 mb-6">魔果直播助手</h2>
                        <p class="text-slate-500 mb-8 leading-relaxed font-medium">专为在线教学打造的推流工具。支持 PPT 演示、白板书写、连麦互动。极简操作，让您专注于教学内容，无需担心技术细节。</p>
                        <div class="flex flex-wrap gap-4 mb-8">
                             <button class="flex items-center gap-3 px-5 py-3 rounded-xl transition-all active:scale-95 group bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20">
                                <div><img src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Windows_logo_-_2012.svg" class="w-5 h-5 opacity-80" alt="Win" /></div>
                                <div class="text-left"><div class="font-bold text-sm leading-none mb-1.5">Windows 下载</div><div class="text-[10px] font-medium opacity-80">v2.1.0 教师版</div></div>
                            </button>
                            <button class="flex items-center gap-3 px-5 py-3 rounded-xl transition-all active:scale-95 group bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20">
                                <div class="opacity-100"><Apple :size="20" class="mb-0.5" /></div>
                                <div class="text-left"><div class="font-bold text-sm leading-none mb-1.5">macOS 下载</div><div class="text-[10px] font-medium opacity-80">v2.1.0 Beta</div></div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                   <div class="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex items-center gap-2">
                       <MonitorPlay :size="18" class="text-slate-400" />
                       <h3 class="font-bold text-slate-800">电脑端 - 讲师/助教配置需求</h3>
                   </div>
                   <div class="overflow-x-auto">
                        <table class="w-full text-sm text-left">
                            <thead>
                                <tr class="border-b border-slate-100 bg-slate-50/30">
                                    <th class="px-6 py-3 font-medium text-slate-400 w-24 sm:w-32 whitespace-nowrap">硬件项目</th>
                                    <th class="px-6 py-3 font-bold text-slate-700 whitespace-nowrap">Windows</th>
                                    <th class="px-6 py-3 font-bold text-slate-700 whitespace-nowrap">Mac</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-50">
                                <tr class="hover:bg-slate-50/50 transition-colors">
                                    <td class="px-6 py-4 font-medium text-slate-500 bg-slate-50/20 whitespace-nowrap">处理器</td>
                                    <td class="px-6 py-4 text-slate-600 leading-relaxed min-w-[200px]">i5处理器，主频2.0GHz以上</td>
                                    <td class="px-6 py-4 text-slate-600 leading-relaxed min-w-[200px]">Intel/M 系列处理器</td>
                                </tr>
                                <tr class="hover:bg-slate-50/50 transition-colors">
                                    <td class="px-6 py-4 font-medium text-slate-500 bg-slate-50/20 whitespace-nowrap">操作系统</td>
                                    <td class="px-6 py-4 text-slate-600 leading-relaxed min-w-[200px]">Windows 7 及更高版本</td>
                                    <td class="px-6 py-4 text-slate-600 leading-relaxed min-w-[200px]">MacOS X10.10 及更高版本</td>
                                </tr>
                                <tr class="hover:bg-slate-50/50 transition-colors">
                                    <td class="px-6 py-4 font-medium text-slate-500 bg-slate-50/20 whitespace-nowrap">内存</td>
                                    <td class="px-6 py-4 text-slate-600 leading-relaxed min-w-[200px]">4GB 及以上</td>
                                    <td class="px-6 py-4 text-slate-600 leading-relaxed min-w-[200px]">4GB 及以上</td>
                                </tr>
                                <tr class="hover:bg-slate-50/50 transition-colors">
                                    <td class="px-6 py-4 font-medium text-slate-500 bg-slate-50/20 whitespace-nowrap">显示</td>
                                    <td class="px-6 py-4 text-slate-600 leading-relaxed min-w-[200px]">不低于1280x720分辨率</td>
                                    <td class="px-6 py-4 text-slate-600 leading-relaxed min-w-[200px]">不低于1280x720分辨率</td>
                                </tr>
                                <tr class="hover:bg-slate-50/50 transition-colors">
                                    <td class="px-6 py-4 font-medium text-slate-500 bg-slate-50/20 whitespace-nowrap">网络</td>
                                    <td class="px-6 py-4 text-slate-600 leading-relaxed min-w-[200px]">上下行不低于 4Mbps</td>
                                    <td class="px-6 py-4 text-slate-600 leading-relaxed min-w-[200px]">上下行不低于 4Mbps</td>
                                </tr>
                            </tbody>
                        </table>
                   </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 flex items-start gap-6 group hover:-translate-y-1">
                    <div class="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform border border-blue-100">
                        <Settings :size="32" />
                    </div>
                    <div class="flex-1">
                        <h3 class="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">设备检测工具</h3>
                        <p class="text-sm text-slate-500 mb-6 leading-relaxed">上课前一键检测摄像头、麦克风、扬声器及网络环境，确保课堂万无一失。</p>
                        <button class="text-blue-600 bg-blue-50 hover:bg-blue-100 px-5 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-2">
                            立即下载检测包 <ArrowRight :size="14" />
                        </button>
                    </div>
                </div>
                <div class="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 flex items-start gap-6 group hover:-translate-y-1">
                    <div class="w-16 h-16 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform border border-purple-100">
                        <Zap :size="32" />
                    </div>
                    <div class="flex-1">
                        <h3 class="text-xl font-bold text-slate-800 mb-2 group-hover:text-purple-600 transition-colors">远程协助客户端</h3>
                        <p class="text-sm text-slate-500 mb-6 leading-relaxed">遇到技术难题？下载远程协助工具，让技术支持人员直接帮您解决问题。</p>
                        <button class="text-purple-600 bg-purple-50 hover:bg-purple-100 px-5 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-2">
                            获取协助工具 <ArrowRight :size="14" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
