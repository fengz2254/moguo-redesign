
<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { X, User, Lock, Smartphone, ShieldCheck, QrCode, Monitor, ChevronRight, AlertCircle } from 'lucide-vue';
import Logo from './Logo.vue';
import { authActions } from '../stores/auth';

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(['close', 'success']);

type LoginMethod = 'password' | 'sms';

const method = ref<LoginMethod>('password');
const isQrMode = ref(false);
const agreed = ref(false);
const rememberMe = ref(false);

// Login State
const account = ref('');
const password = ref('');
const error = ref('');
const isLoading = ref(false);

// Animation State
const shakeAgreement = ref(false);

// Prevent scrolling when modal is open
watch(() => props.isOpen, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden';
    error.value = '';
    account.value = '';
    password.value = '';
    shakeAgreement.value = false;
  } else {
    document.body.style.overflow = 'unset';
  }
});

const handleLogin = () => {
  if (!account.value) {
    error.value = '请输入账号';
    return;
  }
  if (!agreed.value) {
    error.value = '请先阅读并同意用户协议';
    shakeAgreement.value = true;
    setTimeout(() => { shakeAgreement.value = false }, 600);
    return;
  }

  isLoading.value = true;
  error.value = '';

  // Simulate network request
  setTimeout(() => {
    authActions.login(account.value);
    isLoading.value = false;
    emit('success');
  }, 800);
};

const setLoginMethod = (m: LoginMethod) => {
    method.value = m;
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center px-4">
    <!-- Backdrop -->
    <div 
      class="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
      @click="$emit('close')"
    ></div>

    <!-- Modal Card -->
    <div class="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-[440px] relative overflow-hidden animate-scale-in transition-colors border border-transparent">
      
      <!-- Close Button -->
      <button 
        @click="$emit('close')"
        class="absolute top-5 left-5 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors z-30"
      >
        <X :size="22" />
      </button>

      <!-- QR / PC Switcher (Corner Ribbon) -->
      <div 
          class="absolute top-0 right-0 cursor-pointer z-30 group"
          @click="isQrMode = !isQrMode"
      >
          <!-- The triangular background -->
          <div class="w-20 h-20 bg-gradient-to-bl from-brand-50 via-slate-50 to-white absolute top-0 right-0 clip-triangle shadow-sm border-b border-l border-slate-100 group-hover:from-brand-100 transition-colors"></div>
          <!-- The Icon -->
          <div class="absolute top-3 right-3 text-brand-500">
              <Monitor v-if="isQrMode" :size="28" />
              <QrCode v-else :size="28" />
          </div>
          <!-- Tooltip -->
          <div class="absolute top-4 right-14 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {{ isQrMode ? '账号登录' : '扫码登录' }}
          </div>
      </div>

      <!-- Content Area -->
      <div class="p-8 pt-12 pb-10">
          
          <!-- Header Logo -->
          <div class="flex justify-center mb-10">
              <Logo with-text className="w-12 h-12" />
          </div>

          <div v-if="isQrMode" class="flex flex-col items-center py-4 animate-fade-in">
                <!-- QR Code View Content -->
                <h3 class="text-xl font-black text-slate-800 mb-2 tracking-tight">微信扫码登录</h3>
                <p class="text-slate-400 text-sm mb-8 font-medium">安全快捷 · 无需输入</p>
                
                <div class="w-52 h-52 border-2 border-slate-100 rounded-3xl p-3 mb-8 shadow-inner bg-slate-50 flex items-center justify-center relative group cursor-pointer transition-colors">
                    <div class="w-full h-full bg-white rounded-2xl flex items-center justify-center overflow-hidden">
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=MoguoYunkeLogin" alt="QR Code" class="opacity-90 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div class="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl">
                        <div class="bg-brand-500 text-white p-3.5 rounded-full shadow-xl transform scale-110">
                            <QrCode :size="28" />
                        </div>
                    </div>
                </div>

                <div class="flex items-center gap-3 text-sm text-slate-500 font-medium">
                    <span class="w-8 h-8 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M8.5,13.5A2.5,2.5 0 0,0 11,11A2.5,2.5 0 0,0 8.5,8.5A2.5,2.5 0 0,0 6,11A2.5,2.5 0 0,0 8.5,13.5M15.5,13.5A2.5,2.5 0 0,0 18,11A2.5,2.5 0 0,0 15.5,8.5A2.5,2.5 0 0,0 13,11A2.5,2.5 0 0,0 15.5,13.5M12,21C14,21 15.8,20.4 17.2,19.2C19.5,19.7 21.6,20.3 21.6,20.3C21.6,20.3 21.2,18.8 20.7,17.4C21.5,16.2 22,14.7 22,13C22,8.6 17.5,5 12,5C6.5,5 2,8.6 2,13C2,17.4 6.5,21 12,21Z" /></svg>
                    </span>
                    请使用微信扫描二维码
                </div>
          </div>
          
          <div v-else class="animate-fade-in">
              <!-- Form View -->
                <div class="flex border-b border-slate-100 mb-8 relative">
                    <button 
                        @click="setLoginMethod('password')"
                        :class="['flex-1 pb-4 text-base font-bold border-b-2 transition-all duration-300', method === 'password' ? 'text-brand-600 border-brand-500' : 'text-slate-400 border-transparent hover:text-slate-600']"
                    >
                        密码登录
                    </button>
                    <button 
                        @click="setLoginMethod('sms')"
                        :class="['flex-1 pb-4 text-base font-bold border-b-2 transition-all duration-300', method === 'sms' ? 'text-brand-600 border-brand-500' : 'text-slate-400 border-transparent hover:text-slate-600']"
                    >
                        验证码登录
                    </button>
                </div>
                
                <div v-if="error" class="mb-5 bg-red-50 border border-red-100 text-red-500 text-xs font-bold p-3 rounded-xl flex items-center gap-2 animate-pulse">
                    <AlertCircle :size="16" /> {{ error }}
                </div>

                <div class="space-y-5 mb-5">
                    <template v-if="method === 'password'">
                        <div class="relative group">
                            <div class="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-brand-500 transition-colors">
                                <User :size="20" />
                            </div>
                            <input 
                                type="text" 
                                v-model="account"
                                placeholder="请输入手机号/邮箱/用户名" 
                                class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10 transition-all font-medium text-slate-700 placeholder:text-slate-400 placeholder:font-normal"
                            />
                        </div>
                        <div class="relative group">
                            <div class="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-brand-500 transition-colors">
                                <Lock :size="20" />
                            </div>
                            <input 
                                type="password" 
                                v-model="password"
                                placeholder="请输入登录密码（测试环境不验证）" 
                                class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10 transition-all font-medium text-slate-700 placeholder:text-slate-400 placeholder:font-normal"
                            />
                        </div>
                    </template>
                    <template v-else>
                        <div class="relative group">
                            <div class="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-brand-500 transition-colors">
                                <Smartphone :size="20" />
                            </div>
                            <input 
                                type="text" 
                                placeholder="请输入手机号" 
                                class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10 transition-all font-medium text-slate-700 placeholder:text-slate-400 placeholder:font-normal"
                            />
                        </div>
                        <div class="flex gap-3">
                            <div class="relative group flex-1">
                                <div class="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-brand-500 transition-colors">
                                    <ShieldCheck :size="20" />
                                </div>
                                <input 
                                    type="text" 
                                    placeholder="验证码" 
                                    class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10 transition-all font-medium text-slate-700 placeholder:text-slate-400 placeholder:font-normal"
                                />
                            </div>
                            <button class="px-5 bg-white border border-brand-200 text-brand-600 font-bold rounded-xl hover:bg-brand-50 hover:border-brand-300 transition-all text-sm whitespace-nowrap shadow-sm active:scale-95">
                                获取验证码
                            </button>
                        </div>
                    </template>
                </div>

                <div class="mb-8 space-y-4">
                    <div class="flex items-center justify-between px-1">
                        <label class="flex items-center gap-2 cursor-pointer group select-none">
                            <div :class="['w-4 h-4 rounded border flex items-center justify-center transition-colors', rememberMe ? 'bg-brand-500 border-brand-500' : 'border-slate-300 bg-white group-hover:border-brand-400']">
                                <svg v-if="rememberMe" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" class="w-3 h-3 text-white"><path d="M20 6L9 17l-5-5" /></svg>
                            </div>
                            <input type="checkbox" class="hidden" v-model="rememberMe" />
                            <span class="text-xs font-medium text-slate-500 group-hover:text-brand-600 transition-colors">30天内自动登录</span>
                        </label>
                        
                        <a href="#" class="text-xs font-bold text-slate-400 hover:text-brand-500 transition-colors">
                            忘记密码？
                        </a>
                    </div>
                    
                    <div :class="['flex items-center px-1 py-1 -mx-1 rounded-lg transition-colors duration-300', shakeAgreement ? 'animate-shake bg-rose-50' : '']">
                        <label class="flex items-start gap-2 cursor-pointer group">
                            <div :class="['w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0 mt-0.5', agreed ? 'bg-brand-500 border-brand-500' : (shakeAgreement ? 'border-rose-400 bg-rose-50' : 'border-slate-300 bg-white group-hover:border-brand-400')]">
                                <svg v-if="agreed" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" class="w-3 h-3 text-white"><path d="M20 6L9 17l-5-5" /></svg>
                            </div>
                            <input type="checkbox" class="hidden" v-model="agreed" />
                            <span :class="['text-xs select-none leading-normal transition-colors', shakeAgreement ? 'text-rose-500 font-medium' : 'text-slate-400']">
                                已阅读并同意 <a href="#" :class="['underline underline-offset-2 transition-colors', shakeAgreement ? 'text-rose-600 decoration-rose-200' : 'text-slate-600 hover:text-brand-500 decoration-slate-200']">用户协议</a> 与 <a href="#" :class="['underline underline-offset-2 transition-colors', shakeAgreement ? 'text-rose-600 decoration-rose-200' : 'text-slate-600 hover:text-brand-500 decoration-slate-200']">隐私政策</a>
                            </span>
                        </label>
                    </div>
                </div>

                <button 
                    @click="handleLogin"
                    :disabled="isLoading"
                    class="w-full bg-slate-900 hover:bg-brand-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-xl shadow-slate-900/20 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group relative text-base tracking-wide"
                >
                    <div v-if="isLoading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <template v-else>
                        {{ method === 'password' ? '立即登录' : '登录 / 注册' }}
                        <ChevronRight :size="18" class="group-hover:translate-x-1 transition-transform opacity-70" />
                    </template>
                </button>
                
                <div class="mt-8 relative flex justify-center text-xs text-slate-400 font-medium">
                    <div class="absolute top-1/2 left-0 w-full h-px bg-slate-100"></div>
                    <span class="relative z-10 bg-white px-3 text-slate-300">第三方登录</span>
                </div>
                
                <div class="flex justify-center gap-6 mt-6">
                    <button class="w-11 h-11 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#00c800] hover:text-white hover:border-[#00c800] transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1">
                            <svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M8.5,13.5A2.5,2.5 0 0,0 11,11A2.5,2.5 0 0,0 8.5,8.5A2.5,2.5 0 0,0 6,11A2.5,2.5 0 0,0 8.5,13.5M15.5,13.5A2.5,2.5 0 0,0 18,11A2.5,2.5 0 0,0 15.5,8.5A2.5,2.5 0 0,0 13,11A2.5,2.5 0 0,0 15.5,13.5M12,21C14,21 15.8,20.4 17.2,19.2C19.5,19.7 21.6,20.3 21.6,20.3C21.6,20.3 21.2,18.8 20.7,17.4C21.5,16.2 22,14.7 22,13C22,8.6 17.5,5 12,5C6.5,5 2,8.6 2,13C2,17.4 6.5,21 12,21Z" /></svg>
                    </button>
                    <button class="w-11 h-11 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#12B7F5] hover:text-white hover:border-[#12B7F5] transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1">
                            <svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M20.8,11.3C21.4,10.6,21.8,9.7,21.8,8.8C21.8,6.2,18.8,4,15.2,4C11.6,4,8.6,6.2,8.6,8.8C8.6,9.5,8.9,10.2,9.3,10.8C9.3,10.8,9.1,12.3,8.7,13.2C10.5,12.9,11.8,12,11.8,12C12.8,12.3,14,12.5,15.2,12.5C18.8,12.5,21.8,10.3,21.8,7.7V11.3H20.8z M4.7,11.5C3.3,12.4,2.5,13.8,2.5,15.3C2.5,18.5,6.3,21.2,11,21.2C12.5,21.2,13.9,21,15.1,20.5C15.1,20.5,17,21.7,19.4,22C18.9,20.8,18.6,18.7,18.6,18.7C19.2,17.8,19.5,16.6,19.5,15.3C19.5,15.2,19.5,15.1,19.5,15C18.2,15.8,16.5,16.3,14.7,16.3C9.4,16.3,5.1,14.2,5.1,11.5C5.1,11.5,4.7,11.5,4.7,11.5z" /></svg>
                    </button>
                </div>
          </div>
      </div>
    </div>
  </div>

  <component :is="'style'">
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
  </component>
</template>
