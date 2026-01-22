
import React, { useState, useEffect } from 'react';
import { X, User, Lock, Smartphone, ShieldCheck, QrCode, Monitor, ChevronRight, AlertCircle } from 'lucide-react';
import { Logo } from './Logo';
import { useAuth } from '../context/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

type LoginMethod = 'password' | 'sms';

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [method, setMethod] = useState<LoginMethod>('password');
  const [isQrMode, setIsQrMode] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Login State
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Animation State
  const [shakeAgreement, setShakeAgreement] = useState(false);
  
  const { login } = useAuth();

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setError('');
      setAccount('');
      setPassword('');
      setShakeAgreement(false);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLogin = () => {
      if (!account) {
          setError('请输入账号');
          return;
      }
      if (!agreed) {
          setError('请先阅读并同意用户协议');
          setShakeAgreement(true);
          setTimeout(() => setShakeAgreement(false), 600);
          return;
      }

      setIsLoading(true);
      setError('');

      // Simulate network request - No longer verifying specific credentials for testing purposes
      setTimeout(() => {
          login(account); // Call context login with whatever account was entered
          setIsLoading(false);
          onClose();
          if (onSuccess) onSuccess();
      }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop with higher blur for better focus */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Card */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl w-full max-w-[440px] relative overflow-hidden animate-scale-in transition-colors border border-transparent dark:border-slate-800">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 left-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors z-30"
        >
          <X size={22} />
        </button>

        {/* QR / PC Switcher (Corner Ribbon) */}
        <div 
            className="absolute top-0 right-0 cursor-pointer z-30 group"
            onClick={() => setIsQrMode(!isQrMode)}
        >
            {/* The triangular background */}
            <div className="w-20 h-20 bg-gradient-to-bl from-brand-50 via-slate-50 to-white dark:from-brand-900/50 dark:via-slate-800 dark:to-slate-800 absolute top-0 right-0 clip-triangle shadow-sm border-b border-l border-slate-100 dark:border-slate-700 group-hover:from-brand-100 dark:group-hover:from-brand-800 transition-colors"></div>
            {/* The Icon */}
            <div className="absolute top-3 right-3 text-brand-500">
                {isQrMode ? <Monitor size={28} /> : <QrCode size={28} />}
            </div>
            {/* Tooltip */}
            <div className="absolute top-4 right-14 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {isQrMode ? '账号登录' : '扫码登录'}
            </div>
        </div>

        {/* Content Area */}
        <div className="p-8 pt-12 pb-10">
            
            {/* Header Logo */}
            <div className="flex justify-center mb-10">
                <Logo withText className="w-12 h-12" />
            </div>

            {isQrMode ? (
                // QR Code View
                <div className="flex flex-col items-center py-4 animate-fade-in">
                    <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2 tracking-tight">微信扫码登录</h3>
                    <p className="text-slate-400 text-sm mb-8 font-medium">安全快捷 · 无需输入</p>
                    
                    <div className="w-52 h-52 border-2 border-slate-100 dark:border-slate-700 rounded-3xl p-3 mb-8 shadow-inner bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center relative group cursor-pointer transition-colors">
                        {/* Mock QR Code */}
                        <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center overflow-hidden">
                             <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=MoguoYunkeLogin" alt="QR Code" className="opacity-90 group-hover:opacity-100 transition-opacity" />
                        </div>
                        {/* Scan Overlay */}
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl">
                            <div className="bg-brand-500 text-white p-3.5 rounded-full shadow-xl transform scale-110">
                                <QrCode size={28} />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                        <span className="w-8 h-8 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 flex items-center justify-center">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M8.5,13.5A2.5,2.5 0 0,0 11,11A2.5,2.5 0 0,0 8.5,8.5A2.5,2.5 0 0,0 6,11A2.5,2.5 0 0,0 8.5,13.5M15.5,13.5A2.5,2.5 0 0,0 18,11A2.5,2.5 0 0,0 15.5,8.5A2.5,2.5 0 0,0 13,11A2.5,2.5 0 0,0 15.5,13.5M12,21C14,21 15.8,20.4 17.2,19.2C19.5,19.7 21.6,20.3 21.6,20.3C21.6,20.3 21.2,18.8 20.7,17.4C21.5,16.2 22,14.7 22,13C22,8.6 17.5,5 12,5C6.5,5 2,8.6 2,13C2,17.4 6.5,21 12,21Z" /></svg>
                        </span>
                        请使用微信扫描二维码
                    </div>
                </div>
            ) : (
                // Form View
                <div className="animate-fade-in">
                    {/* Tabs - Enhanced Visibility */}
                    <div className="flex border-b border-slate-100 dark:border-slate-800 mb-8 relative">
                        <button 
                            className={`flex-1 pb-4 text-base font-bold border-b-2 transition-all duration-300 ${method === 'password' ? 'text-brand-600 dark:text-brand-400 border-brand-500' : 'text-slate-400 dark:text-slate-500 border-transparent hover:text-slate-600 dark:hover:text-slate-300'}`}
                            onClick={() => setMethod('password')}
                        >
                            密码登录
                        </button>
                        <button 
                            className={`flex-1 pb-4 text-base font-bold border-b-2 transition-all duration-300 ${method === 'sms' ? 'text-brand-600 dark:text-brand-400 border-brand-500' : 'text-slate-400 dark:text-slate-500 border-transparent hover:text-slate-600 dark:hover:text-slate-300'}`}
                            onClick={() => setMethod('sms')}
                        >
                            验证码登录
                        </button>
                    </div>
                    
                    {error && (
                        <div className="mb-5 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 text-red-500 dark:text-red-400 text-xs font-bold p-3 rounded-xl flex items-center gap-2 animate-pulse">
                            <AlertCircle size={16} /> {error}
                        </div>
                    )}

                    {/* Form Inputs */}
                    <div className="space-y-5 mb-5">
                        {method === 'password' ? (
                            <>
                                <div className="relative group">
                                    <div className="absolute left-4 top-3.5 text-slate-400 dark:text-slate-500 group-focus-within:text-brand-500 dark:group-focus-within:text-brand-400 transition-colors">
                                        <User size={20} />
                                    </div>
                                    <input 
                                        type="text" 
                                        value={account}
                                        onChange={(e) => setAccount(e.target.value)}
                                        placeholder="请输入手机号/邮箱/用户名" 
                                        className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-brand-500/10 dark:focus:ring-brand-500/20 transition-all font-medium text-slate-700 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 placeholder:font-normal"
                                    />
                                </div>
                                <div className="relative group">
                                    <div className="absolute left-4 top-3.5 text-slate-400 dark:text-slate-500 group-focus-within:text-brand-500 dark:group-focus-within:text-brand-400 transition-colors">
                                        <Lock size={20} />
                                    </div>
                                    <input 
                                        type="password" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="请输入登录密码（测试环境不验证）" 
                                        className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-brand-500/10 dark:focus:ring-brand-500/20 transition-all font-medium text-slate-700 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 placeholder:font-normal"
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="relative group">
                                    <div className="absolute left-4 top-3.5 text-slate-400 dark:text-slate-500 group-focus-within:text-brand-500 dark:group-focus-within:text-brand-400 transition-colors">
                                        <Smartphone size={20} />
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="请输入手机号" 
                                        className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-brand-500/10 dark:focus:ring-brand-500/20 transition-all font-medium text-slate-700 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 placeholder:font-normal"
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <div className="relative group flex-1">
                                        <div className="absolute left-4 top-3.5 text-slate-400 dark:text-slate-500 group-focus-within:text-brand-500 dark:group-focus-within:text-brand-400 transition-colors">
                                            <ShieldCheck size={20} />
                                        </div>
                                        <input 
                                            type="text" 
                                            placeholder="验证码" 
                                            className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-brand-500/10 dark:focus:ring-brand-500/20 transition-all font-medium text-slate-700 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 placeholder:font-normal"
                                        />
                                    </div>
                                    <button className="px-5 bg-white dark:bg-slate-800 border border-brand-200 dark:border-slate-700 text-brand-600 dark:text-brand-400 font-bold rounded-xl hover:bg-brand-50 dark:hover:bg-slate-700 hover:border-brand-300 dark:hover:border-slate-600 transition-all text-sm whitespace-nowrap shadow-sm active:scale-95">
                                        获取验证码
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Options Row: Auto Login, Forgot Password, and Terms */}
                    <div className="mb-8 space-y-4">
                        {/* Top: Auto Login & Forgot Password */}
                        <div className="flex items-center justify-between px-1">
                            <label className="flex items-center gap-2 cursor-pointer group select-none">
                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${rememberMe ? 'bg-brand-500 border-brand-500' : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 group-hover:border-brand-400'}`}>
                                    {rememberMe && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="w-3 h-3 text-white"><path d="M20 6L9 17l-5-5" /></svg>}
                                </div>
                                <input type="checkbox" className="hidden" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">30天内自动登录</span>
                            </label>
                            
                            <a href="#" className="text-xs font-bold text-slate-400 hover:text-brand-500 transition-colors">
                                忘记密码？
                            </a>
                        </div>
                        
                        {/* Bottom: Terms Agreement (Animated Shake) */}
                        <div className={`flex items-center px-1 py-1 -mx-1 rounded-lg transition-colors duration-300 ${shakeAgreement ? 'animate-shake bg-rose-50 dark:bg-rose-900/20' : ''}`}>
                            <label className="flex items-start gap-2 cursor-pointer group">
                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0 mt-0.5 ${agreed ? 'bg-brand-500 border-brand-500' : (shakeAgreement ? 'border-rose-400 bg-rose-50' : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 group-hover:border-brand-400')}`}>
                                    {agreed && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="w-3 h-3 text-white"><path d="M20 6L9 17l-5-5" /></svg>}
                                </div>
                                <input type="checkbox" className="hidden" checked={agreed} onChange={() => setAgreed(!agreed)} />
                                <span className={`text-xs select-none leading-normal transition-colors ${shakeAgreement ? 'text-rose-500 font-medium' : 'text-slate-400'}`}>
                                    已阅读并同意 <a href="#" className={`underline underline-offset-2 transition-colors ${shakeAgreement ? 'text-rose-600 decoration-rose-200' : 'text-slate-600 dark:text-slate-300 hover:text-brand-500 decoration-slate-200 dark:decoration-slate-600'}`}>用户协议</a> 与 <a href="#" className={`underline underline-offset-2 transition-colors ${shakeAgreement ? 'text-rose-600 decoration-rose-200' : 'text-slate-600 dark:text-slate-300 hover:text-brand-500 decoration-slate-200 dark:decoration-slate-600'}`}>隐私政策</a>
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button 
                        onClick={handleLogin}
                        disabled={isLoading}
                        className="w-full bg-slate-900 dark:bg-brand-600 hover:bg-brand-600 dark:hover:bg-brand-500 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-xl shadow-slate-900/20 dark:shadow-brand-500/20 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group relative text-base tracking-wide"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>
                                {method === 'password' ? '立即登录' : '登录 / 注册'}
                                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform opacity-70" />
                            </>
                        )}
                    </button>
                    
                    {/* Social Login Divider */}
                    <div className="mt-8 relative flex justify-center text-xs text-slate-400 font-medium">
                        <div className="absolute top-1/2 left-0 w-full h-px bg-slate-100 dark:bg-slate-800"></div>
                        <span className="relative z-10 bg-white dark:bg-slate-900 px-3 text-slate-300 dark:text-slate-600">第三方登录</span>
                    </div>
                    
                    <div className="flex justify-center gap-6 mt-6">
                        <button className="w-11 h-11 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:bg-[#00c800] hover:text-white hover:border-[#00c800] transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1">
                             <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M8.5,13.5A2.5,2.5 0 0,0 11,11A2.5,2.5 0 0,0 8.5,8.5A2.5,2.5 0 0,0 6,11A2.5,2.5 0 0,0 8.5,13.5M15.5,13.5A2.5,2.5 0 0,0 18,11A2.5,2.5 0 0,0 15.5,8.5A2.5,2.5 0 0,0 13,11A2.5,2.5 0 0,0 15.5,13.5M12,21C14,21 15.8,20.4 17.2,19.2C19.5,19.7 21.6,20.3 21.6,20.3C21.6,20.3 21.2,18.8 20.7,17.4C21.5,16.2 22,14.7 22,13C22,8.6 17.5,5 12,5C6.5,5 2,8.6 2,13C2,17.4 6.5,21 12,21Z" /></svg>
                        </button>
                        <button className="w-11 h-11 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:bg-[#12B7F5] hover:text-white hover:border-[#12B7F5] transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1">
                             <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.8,11.3C21.4,10.6,21.8,9.7,21.8,8.8C21.8,6.2,18.8,4,15.2,4C11.6,4,8.6,6.2,8.6,8.8C8.6,9.5,8.9,10.2,9.3,10.8C9.3,10.8,9.1,12.3,8.7,13.2C10.5,12.9,11.8,12,11.8,12C12.8,12.3,14,12.5,15.2,12.5C18.8,12.5,21.8,10.3,21.8,7.7V11.3H20.8z M4.7,11.5C3.3,12.4,2.5,13.8,2.5,15.3C2.5,18.5,6.3,21.2,11,21.2C12.5,21.2,13.9,21,15.1,20.5C15.1,20.5,17,21.7,19.4,22C18.9,20.8,18.6,18.7,18.6,18.7C19.2,17.8,19.5,16.6,19.5,15.3C19.5,15.2,19.5,15.1,19.5,15C18.2,15.8,16.5,16.3,14.7,16.3C9.4,16.3,5.1,14.2,5.1,11.5C5.1,11.5,4.7,11.5,4.7,11.5z" /></svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
      </div>

      <style>{`
        .clip-triangle {
            clip-path: polygon(100% 0, 0 0, 100% 100%);
        }
        @keyframes scale-in {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            15% { transform: translateX(-4px); }
            30% { transform: translateX(4px); }
            45% { transform: translateX(-4px); }
            60% { transform: translateX(4px); }
            75% { transform: translateX(-4px); }
        }
        .animate-scale-in {
            animation: scale-in 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-shake {
            animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
    </div>
  );
};
