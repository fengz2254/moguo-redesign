import React from 'react';
import { Mail, Phone, MapPin, Github, Twitter, Linkedin, Heart } from 'lucide-react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-20 pb-10 rounded-t-[3rem] mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Logo withText light />
            <p className="text-sm leading-relaxed text-slate-400">
              魔果云课致力于通过技术赋能教育，连接全球优质教育资源，为学习者提供高效、便捷的在线学习体验。
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-500 hover:text-white transition-all duration-300 hover:-translate-y-1"><Twitter size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 hover:text-white transition-all duration-300 hover:-translate-y-1"><Github size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 hover:-translate-y-1"><Linkedin size={18} /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">平台服务</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-brand-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span> 课程中心</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span> 名师专栏</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span> 机构入驻</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span> 企业培训</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-lg">关于我们</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-brand-400 transition-colors">公司简介</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">新闻动态</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">加入我们</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">联系方式</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">联系我们</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                    <Phone size={16} />
                </div>
                <span className="mt-1.5">400-123-4567</span>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                    <Mail size={16} />
                </div>
                <span className="mt-1.5">support@moguoyunke.com</span>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                    <MapPin size={16} />
                </div>
                <span className="mt-1.5">北京市海淀区中关村软件园</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="flex items-center gap-1">
            &copy; {new Date().getFullYear()} 魔果云课. Made with <Heart size={14} className="text-red-500 fill-red-500" /> in Beijing.
          </p>
          <div className="flex gap-8 mt-4 md:mt-0 font-medium">
            <a href="#" className="hover:text-white transition-colors">隐私政策</a>
            <a href="#" className="hover:text-white transition-colors">服务条款</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};