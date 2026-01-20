import React from 'react';
import { 
    TrendingUp, ShieldCheck, Zap, Globe, 
    Smartphone, PieChart, ArrowRight, Check,
    Sparkles
} from 'lucide-react';

export const InstitutionSettlement: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-sans pb-20 transition-colors duration-300">
      
      {/* 1. Hero Section: Adaptive Background */}
      <div className="relative pt-24 pb-40 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        {/* Abstract Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
             {/* Light Mode Gradients */}
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-slate-100 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 opacity-100 transition-colors duration-300"></div>
             
             {/* Shared Glow Effects */}
             <div className="absolute top-[-20%] right-[5%] w-[800px] h-[800px] bg-brand-500/10 dark:bg-brand-500/10 rounded-full blur-[120px] animate-pulse"></div>
             <div className="absolute bottom-[0%] left-[0%] w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[100px]"></div>
             
             {/* Texture Pattern */}
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] dark:opacity-10"></div>
        </div>

        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-brand-500/20 bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 text-sm font-bold mb-10 backdrop-blur-md shadow-sm">
                <Sparkles size={16} /> 行业领先的在线教育解决方案
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tight leading-[1.1]">
                赋能教育机构<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-blue-600 dark:from-brand-400 dark:to-blue-500">连接千万求知学员</span>
            </h1>
            
            <p className="text-slate-600 dark:text-slate-400 text-lg md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
                魔果云课提供从招生引流、在线教学到教务管理的一站式 SaaS 服务。<br className="hidden md:block"/>
                加入我们，共享平台千万级流量红利，让教育没有边界。
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <button className="w-full sm:w-auto px-10 py-5 bg-brand-600 hover:bg-brand-500 text-white rounded-full font-bold text-xl shadow-xl shadow-brand-500/30 transition-all hover:-translate-y-1 hover:shadow-brand-500/50">
                    立即免费入驻
                </button>
                <button className="w-full sm:w-auto px-10 py-5 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white rounded-full font-bold text-xl backdrop-blur-sm transition-all flex items-center justify-center gap-2 shadow-lg dark:shadow-none hover:-translate-y-1">
                    联系商务顾问 <ArrowRight size={20} />
                </button>
            </div>
        </div>
      </div>

      {/* 2. Stats Section: High Contrast Strip */}
      <div className="border-y border-slate-100 dark:border-white/5 bg-white dark:bg-white/[0.02]">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-16">
                {[
                    { label: '注册学员', value: '500万+' },
                    { label: '入驻机构', value: '3000+' },
                    { label: '日均学习时长', value: '45分钟' },
                    { label: '平台年交易额', value: '10亿+' },
                ].map((stat, i) => (
                    <div key={i} className="text-center group relative">
                        {i !== 0 && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-slate-100 dark:bg-slate-800 hidden md:block"></div>}
                        <div className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-2 font-mono tracking-tighter group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{stat.value}</div>
                        <div className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* 3. Core Benefits (Grid) */}
      <div className="py-32 relative bg-slate-50/50 dark:bg-transparent transition-colors duration-300">
         <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">为什么选择魔果云课？</h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium text-lg">不仅仅是工具，更是您业务增长的合作伙伴。</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                <BenefitCard 
                    icon={<TrendingUp size={36} className="text-brand-500 dark:text-brand-400" />}
                    title="千万级流量扶持"
                    desc="基于大数据的精准推荐算法，将您的课程推送给最匹配的潜在学员，获客成本降低 40%。"
                />
                <BenefitCard 
                    icon={<Zap size={36} className="text-blue-500 dark:text-blue-400" />}
                    title="极致教学体验"
                    desc="自研低延迟直播技术，支持万人在线无卡顿。高清画质、互动白板，还原真实线下课堂。"
                />
                <BenefitCard 
                    icon={<PieChart size={36} className="text-purple-500 dark:text-purple-400" />}
                    title="全链路数据洞察"
                    desc="提供从流量、转化到完课率的全维度数据报表，助您科学决策，优化课程产品。"
                />
                <BenefitCard 
                    icon={<Smartphone size={36} className="text-rose-500 dark:text-rose-400" />}
                    title="多端覆盖，随时学习"
                    desc="PC、Web、App、小程序全端打通，学员学习记录实时同步，留存率提升 30%。"
                />
                <BenefitCard 
                    icon={<ShieldCheck size={36} className="text-emerald-500 dark:text-emerald-400" />}
                    title="版权安全保护"
                    desc="采用 DRM 数字加密技术，防录屏、防盗链，全方位保护您的知识产权资产。"
                />
                <BenefitCard 
                    icon={<Globe size={36} className="text-orange-500 dark:text-orange-400" />}
                    title="私域运营工具"
                    desc="内置拼团、分销、优惠券等 10+ 种营销工具，帮您轻松搭建私域流量池，提升复购。"
                />
            </div>
         </div>
      </div>

      {/* 4. Process Timeline */}
      <div className="py-24 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-white/5 relative overflow-hidden transition-colors duration-300">
         <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">极速入驻流程</h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">最快 1 小时开启您的线上网校</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative px-4 md:px-20">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-14 left-20 right-20 h-0.5 bg-slate-100 dark:bg-slate-800 -z-0"></div>

                {[
                    { step: '01', title: '提交申请', desc: '填写机构基本信息与联系人' },
                    { step: '02', title: '资质审核', desc: '平台审核营业执照等资质材料' },
                    { step: '03', title: '签署协议', desc: '线上确认合作协议与费率' },
                    { step: '04', title: '开通后台', desc: '入驻成功，上传课程开始售卖' },
                ].map((item, i) => (
                    <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                        <div className="w-28 h-28 rounded-[2rem] bg-white dark:bg-slate-900 border-4 border-slate-100 dark:border-slate-800 flex items-center justify-center mb-8 group-hover:border-brand-500 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-brand-500/20 transition-all duration-300 shadow-lg">
                            <span className="text-3xl font-black text-slate-300 dark:text-slate-700 group-hover:text-brand-500 transition-colors">{item.step}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">{item.title}</h3>
                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-[200px]">{item.desc}</p>
                    </div>
                ))}
            </div>
         </div>
      </div>

      {/* 5. Lead Capture Form (Bottom CTA) */}
      <div className="py-32 bg-slate-50 dark:bg-transparent">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gradient-to-br dark:from-brand-950 dark:to-slate-950 rounded-[3rem] p-12 md:p-20 border border-slate-200 dark:border-white/10 shadow-2xl relative overflow-hidden group">
                {/* Decor (Adaptive) */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-500/10 dark:bg-brand-500/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3"></div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-8">准备好开始了吗？</h2>
                        <p className="text-slate-500 dark:text-slate-300 mb-10 leading-relaxed font-medium text-lg">
                            立即填写表单，我们的商务顾问将在 24 小时内与您联系，为您定制专属入驻方案。
                        </p>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 text-slate-700 dark:text-slate-200 text-lg font-bold">
                                <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900/50 flex items-center justify-center text-brand-600 dark:text-brand-400">
                                    <Check size={18} strokeWidth={3} />
                                </div>
                                <span>免入驻费，仅收少量技术服务费</span>
                            </div>
                            <div className="flex items-center gap-4 text-slate-700 dark:text-slate-200 text-lg font-bold">
                                <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900/50 flex items-center justify-center text-brand-600 dark:text-brand-400">
                                    <Check size={18} strokeWidth={3} />
                                </div>
                                <span>1对1 专属运营指导</span>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-slate-50 dark:bg-white/5 backdrop-blur-sm p-8 md:p-10 rounded-[2.5rem] border border-slate-100 dark:border-white/10 shadow-inner dark:shadow-2xl">
                        <div className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <input 
                                    type="text" 
                                    placeholder="机构名称" 
                                    className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 text-slate-800 dark:text-white placeholder:text-slate-400 focus:border-brand-500 focus:outline-none transition-colors"
                                />
                                <input 
                                    type="text" 
                                    placeholder="联系人姓名" 
                                    className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 text-slate-800 dark:text-white placeholder:text-slate-400 focus:border-brand-500 focus:outline-none transition-colors"
                                />
                            </div>
                            <div className="flex gap-4">
                                <input 
                                    type="text" 
                                    placeholder="手机号码" 
                                    className="flex-1 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 text-slate-800 dark:text-white placeholder:text-slate-400 focus:border-brand-500 focus:outline-none transition-colors"
                                />
                                <button className="px-6 py-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl text-sm font-bold whitespace-nowrap border border-slate-200 dark:border-slate-700 transition-colors">
                                    获取验证码
                                </button>
                            </div>
                            <button className="w-full py-5 bg-slate-900 dark:bg-brand-600 hover:bg-brand-600 dark:hover:bg-brand-500 text-white font-bold rounded-2xl shadow-xl shadow-brand-500/20 transition-all hover:scale-[1.01] text-lg">
                                提交申请
                            </button>
                        </div>
                        <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-6 font-medium">
                            点击提交即代表同意 <a href="#" className="text-slate-600 dark:text-slate-400 underline hover:text-brand-500">《魔果云课入驻协议》</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </div>

    </div>
  );
};

const BenefitCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
    <div className="bg-white dark:bg-white/[0.03] hover:bg-white dark:hover:bg-white/[0.06] border border-slate-100 dark:border-white/5 hover:border-brand-200 dark:hover:border-white/10 p-10 rounded-[2.5rem] transition-all duration-300 group shadow-sm hover:shadow-2xl dark:shadow-none hover:-translate-y-2 h-full flex flex-col items-start">
        <div className="w-16 h-16 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm group-hover:bg-brand-50 dark:group-hover:bg-slate-800">
            {icon}
        </div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{title}</h3>
        <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-base">
            {desc}
        </p>
    </div>
);
