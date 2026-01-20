<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { Menu, X, Search, LogOut, Store, Sparkles } from 'lucide-vue';
import Logo from './Logo.vue';
import { authStore, authActions } from '../stores/auth';

const props = defineProps<{
  currentView: string;
}>();

const emit = defineEmits(['navigate', 'search', 'login-click']);

const isOpen = ref(false);
const isScrolled = ref(false);
const showUserMenu = ref(false);
const searchValue = ref('');
const isSearchFocused = ref(false);
const searchHistory = ref<string[]>(['公考', '机械', '小', '3月5日测试']);

const user = computed(() => authStore.user);
const isAuthenticated = computed(() => authStore.isAuthenticated);

const navLinks = [
  { name: '首页', href: '#', view: 'home' },
  { name: '学习中心', href: '#learning-center', view: 'learning-center' },
  { name: '机构入驻', href: '#institutions', highlight: true, view: 'home' },
  { name: '下载中心', href: '#download', view: 'download' },
  { name: '帮助中心', href: '#', view: 'home' },
];

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const handleNavClick = (e: Event, link: any) => {
  e.preventDefault();
  if (link.name === '学习中心') {
    if (!isAuthenticated.value) {
      emit('login-click');
      return;
    }
    emit('navigate', 'learning-center');
  } else if (link.name === '下载中心') {
    emit('navigate', 'download');
  } else {
    emit('navigate', 'home');
    if (link.view === 'home' && link.name !== '首页') {
        // Simple hash scroll logic if needed
    }
  }
};

const handleSearchSubmit = () => {
  if (!searchValue.value.trim()) return;
  emit('search', searchValue.value);
  isSearchFocused.value = false;
  if (!searchHistory.value.includes(searchValue.value)) {
    searchHistory.value = [searchValue.value, ...searchHistory.value].slice(0, 8);
  }
};

const handleSearchHistoryClick = (item: string) => {
  searchValue.value = item;
  handleSearchSubmit();
};

const clearHistory = () => {
  searchHistory.value = [];
};

const removeHistoryItem = (itemToRemove: string) => {
  searchHistory.value = searchHistory.value.filter(item => item !== itemToRemove);
};

const handleLogout = () => {
  authActions.logout();
  showUserMenu.value = false;
  emit('navigate', 'home');
};
</script>

<template>
  <header 
    :class="['sticky top-0 z-50 transition-all duration-300', isScrolled ? 'bg-white/90 backdrop-blur-md shadow-soft py-2' : 'bg-transparent py-4']"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex-shrink-0" @click="$emit('navigate', 'home')">
          <Logo with-text />
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex space-x-1 items-center bg-slate-100/50 p-1 rounded-full px-4">
          <a
            v-for="link in navLinks"
            :key="link.name"
            :href="link.href"
            @click="handleNavClick($event, link)"
            :class="[
              'font-medium px-4 py-1.5 rounded-full transition-all duration-200 flex items-center',
              (link.view === currentView && currentView !== 'home') || (link.name === '首页' && currentView === 'home')
                ? 'text-brand-600 bg-white shadow-sm'
                : 'text-slate-600 hover:text-brand-600 hover:bg-white',
              link.highlight ? 'relative gap-2 font-bold group' : ''
            ]"
          >
             <span v-if="link.highlight" class="p-1 rounded-full bg-brand-100 text-brand-600 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                <Store :size="14" />
             </span>
             {{ link.name }}
             <span v-if="link.highlight" class="absolute top-0 right-0 -mt-1 -mr-2 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white shadow-sm transform scale-90 group-hover:scale-105 transition-transform animate-pulse">
               免费
             </span>
          </a>
        </div>

        <!-- Search Bar -->
        <div class="hidden lg:block flex-1 max-w-xs ml-4 relative">
          <div class="relative group">
            <input
              type="text"
              v-model="searchValue"
              @keydown.enter="handleSearchSubmit"
              @focus="isSearchFocused = true"
              @blur="setTimeout(() => isSearchFocused = false, 200)"
              placeholder="请输入课程名称"
              :class="[
                'w-full pl-4 pr-10 py-2 rounded-lg border-2 outline-none transition-all text-sm',
                isSearchFocused 
                    ? 'border-brand-400 bg-white shadow-sm' 
                    : 'border-slate-100 bg-slate-50 focus:bg-white focus:border-brand-400'
              ]"
            />
            <Search 
                :class="['w-4 h-4 absolute right-3 top-3 cursor-pointer transition-colors', isSearchFocused ? 'text-brand-500' : 'text-slate-400']"
                @click="handleSearchSubmit"
            />
          </div>

          <!-- History Dropdown -->
          <div v-if="isSearchFocused" class="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-xl border border-slate-100 p-4 z-50 animate-fade-in origin-top" @mousedown.prevent>
             <div class="flex justify-between items-center mb-3 text-xs text-slate-400 px-1">
                <span>搜索历史</span>
                <button v-if="searchHistory.length > 0" @click="clearHistory" class="hover:text-slate-600 transition-colors">清空</button>
             </div>
             <div v-if="searchHistory.length > 0" class="space-y-2">
                <div 
                    v-for="item in searchHistory" 
                    :key="item"
                    class="flex items-center justify-between bg-slate-50 hover:bg-slate-100 rounded-lg px-3 py-2 cursor-pointer group/item transition-colors"
                    @click="handleSearchHistoryClick(item)"
                >
                    <span class="text-sm text-slate-600">{{ item }}</span>
                    <button @click.stop="removeHistoryItem(item)" class="text-slate-300 hover:text-slate-500 p-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                        <X :size="14" />
                    </button>
                </div>
             </div>
             <div v-else class="text-center py-4 text-xs text-slate-300">暂无搜索历史</div>
          </div>
        </div>

        <!-- User Actions -->
        <div class="hidden md:flex items-center space-x-3 ml-4">
            <div v-if="isAuthenticated" class="relative">
                <button @click="showUserMenu = !showUserMenu" class="flex items-center gap-2 pl-1 pr-3 py-1 bg-white border border-slate-200 rounded-full hover:shadow-md transition-shadow">
                    <div class="w-8 h-8 rounded-full bg-brand-100 overflow-hidden border border-brand-200">
                         <img :src="user?.avatar" alt="User" />
                    </div>
                    <span class="text-sm font-bold text-slate-700 max-w-[80px] truncate">{{ user?.username }}</span>
                </button>

                <div v-if="showUserMenu" class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 animate-scale-in origin-top-right">
                     <div class="px-4 py-2 border-b border-slate-50 mb-1">
                         <p class="text-xs text-slate-400">已登录账号</p>
                         <p class="font-bold text-slate-800 truncate">{{ user?.username }}</p>
                     </div>
                     <button @click="$emit('navigate', 'learning-center'); showUserMenu = false" class="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-brand-50 hover:text-brand-600 font-medium">我的学习</button>
                     <div class="border-t border-slate-50 mt-1 pt-1">
                        <button @click="handleLogout" class="w-full text-left px-4 py-2 text-sm text-rose-500 hover:bg-rose-50 font-medium flex items-center gap-2">
                            <LogOut :size="14" /> 退出登录
                        </button>
                     </div>
                </div>
            </div>
            <template v-else>
                <button @click="$emit('login-click')" class="text-slate-600 hover:text-brand-600 font-bold text-sm">登录</button>
                <button @click="$emit('login-click')" class="bg-slate-900 hover:bg-brand-600 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2">
                    免费注册 <Sparkles class="w-3 h-3 text-accent-400" />
                </button>
            </template>
        </div>

        <!-- Mobile Menu Btn -->
        <div class="md:hidden flex items-center">
            <button @click="isOpen = !isOpen" class="text-slate-600 hover:text-brand-600 p-2 bg-slate-100 rounded-full">
                <X v-if="isOpen" class="w-6 h-6" />
                <Menu v-else class="w-6 h-6" />
            </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isOpen" class="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-xl rounded-b-3xl">
      <div class="px-6 pt-4 pb-8 space-y-2">
        <a 
            v-for="link in navLinks" 
            :key="link.name" 
            :href="link.href"
            @click="isOpen = false; handleNavClick($event, link)"
            :class="['block px-4 py-3 rounded-2xl text-base font-medium transition-colors', link.highlight ? 'text-brand-600 bg-brand-50 font-bold' : 'text-slate-700 hover:text-brand-600 hover:bg-brand-50']"
        >
             <span v-if="link.highlight" class="inline-block mr-2 text-xs bg-rose-500 text-white px-1.5 rounded">免费</span>
             {{ link.name }}
        </a>
        <div v-if="!isAuthenticated" class="mt-4 pt-4 border-t border-slate-100 flex flex-col space-y-3">
            <button @click="isOpen = false; $emit('login-click')" class="w-full text-center py-3 border-2 border-slate-200 rounded-xl text-slate-600 font-bold">登录</button>
            <button @click="isOpen = false; $emit('login-click')" class="w-full text-center py-3 bg-slate-900 text-white rounded-xl font-bold shadow-lg">立即注册</button>
        </div>
        <button v-else @click="handleLogout" class="w-full text-center py-3 bg-slate-100 text-slate-600 rounded-xl font-bold mt-4">退出登录</button>
      </div>
    </div>
  </header>
</template>
