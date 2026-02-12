
<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { Search, ChevronRight, ChevronLeft, Sparkles, User, ArrowRight } from 'lucide-vue';
import { RECOMMENDED_COURSES } from '../constants';

const emit = defineEmits(['search']);

const currentSlide = ref(0);
const searchValue = ref('');
const isAnimating = ref(false);

const slides = RECOMMENDED_COURSES.slice(0, 5);
const hotSearchTags = ['Java', 'Python', '考研', '雅思', '公务员'];

let timer: number;

onMounted(() => {
  timer = window.setInterval(() => {
    handleNext();
  }, 6000);
});

onUnmounted(() => {
  clearInterval(timer);
});

const handleNext = () => {
  isAnimating.value = true;
  setTimeout(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length;
    isAnimating.value = false;
  }, 500);
};

const handlePrev = () => {
  isAnimating.value = true;
  setTimeout(() => {
    currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length;
    isAnimating.value = false;
  }, 500);
};

const handleSearchSubmit = () => {
  if (!searchValue.value.trim()) return;
  emit('search', searchValue.value);
};

const currentCourse = computed(() => slides[currentSlide.value]);
</script>

<template>
  <div class="relative pb-16 pt-4"> <!-- Reduced padding -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- Banner Container - Reduced Height -->
      <div class="relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl h-[360px] md:h-[500px] group bg-slate-900 ring-1 ring-slate-900/5 select-none transition-all duration-500">
          
           <!-- Dynamic Background Image Layer -->
           <div 
              v-for="(slide, index) in slides"
              :key="slide.id"
              :class="['absolute inset-0 transition-opacity duration-700 ease-in-out', index === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10']"
           >
              <img 
                  :src="slide.coverImage" 
                  :alt="slide.title" 
                  class="w-full h-full object-cover"
              />
              
              <!-- Gradient Overlay -->
              <div v-if="!slide.hideTextOverlay" class="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
              
              <!-- Minimal Overlay for Poster Images -->
              <div v-if="slide.hideTextOverlay" class="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
           </div>

           <!-- Content Layer -->
           <div v-if="!currentCourse.hideTextOverlay" class="absolute inset-0 z-10 flex flex-col justify-center px-6 md:px-20 max-w-4xl">
              
              <div :class="['transition-all duration-500 transform', isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0']">
                  
                  <!-- Badge -->
                  <div class="flex items-center gap-3 mb-4 md:mb-6">
                      <span class="bg-brand-500 text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-brand-500/30 tracking-wide uppercase">
                          <Sparkles :size="12" fill="currentColor" /> 
                          {{ currentCourse.tags[0] || 'Editor\'s Choice' }}
                      </span>
                      <div class="h-4 w-px bg-white/20"></div>
                      <span class="text-brand-200 text-xs md:text-sm font-bold tracking-wide">
                          {{ currentCourse.institution }}
                      </span>
                  </div>

                  <!-- Main Title - Scaled Down -->
                  <h1 class="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-[1.15] mb-4 md:mb-6 drop-shadow-md tracking-tight line-clamp-2">
                      {{ currentCourse.title }}
                  </h1>
                  
                  <!-- Meta Info -->
                  <div class="flex flex-wrap items-center gap-4 md:gap-6 text-slate-300 mb-6 md:mb-8 font-medium text-xs md:text-sm">
                      <div class="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/5 backdrop-blur-sm">
                          <div class="w-5 h-5 rounded-full bg-white/20 p-0.5">
                              <img :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentCourse.instructor}`" class="w-full h-full rounded-full" />
                          </div>
                          <span class="text-white">{{ currentCourse.instructor }}</span>
                      </div>
                      <div class="flex items-center gap-1.5">
                          <User :size="14" />
                          <span>{{ currentCourse.studentCount }} 人在学</span>
                      </div>
                  </div>

                  <!-- Action Area -->
                  <div class="flex items-center gap-6 md:gap-8">
                      <button class="h-10 md:h-14 px-8 md:px-10 rounded-full bg-white text-slate-900 font-bold text-sm md:text-base flex items-center gap-2 transition-all hover:bg-brand-50 hover:text-brand-600 hover:scale-105 active:scale-95 shadow-xl group/btn">
                          开始学习
                          <ArrowRight :size="18" class="group-hover/btn:translate-x-1 transition-transform" />
                      </button>

                      <div class="flex flex-col">
                          <div class="flex items-baseline gap-1.5">
                              <span v-if="currentCourse.price === 0" class="text-2xl md:text-3xl font-black text-brand-400">免费</span>
                              <template v-else>
                                  <span class="text-xs md:text-sm font-bold text-white/60">¥</span>
                                  <span class="text-2xl md:text-3xl font-black text-white tracking-tighter">{{ currentCourse.price }}</span>
                              </template>
                          </div>
                      </div>
                  </div>

              </div>
           </div>

           <!-- Minimal CTA for Poster -->
           <div v-if="currentCourse.hideTextOverlay" :class="['absolute bottom-8 left-8 md:left-12 z-20 transition-all duration-500', isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0']">
                <button class="h-10 md:h-14 px-8 rounded-full bg-white/90 backdrop-blur-md text-slate-900 font-bold text-sm md:text-base flex items-center gap-2 transition-all hover:bg-brand-500 hover:text-white shadow-lg hover:shadow-brand-500/30 group/btn">
                    查看详情
                    <ArrowRight :size="18" class="group-hover/btn:translate-x-1 transition-transform" />
                </button>
           </div>

           <!-- Arrows -->
           <div class="hidden md:flex absolute bottom-8 right-8 gap-3 z-20">
              <button 
                  @click="handlePrev"
                  class="w-10 h-10 rounded-full border border-white/10 bg-black/20 hover:bg-white hover:text-slate-900 backdrop-blur-md text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95"
              >
                  <ChevronLeft :size="20" />
              </button>
              <button 
                  @click="handleNext"
                  class="w-10 h-10 rounded-full border border-white/10 bg-black/20 hover:bg-white hover:text-slate-900 backdrop-blur-md text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95"
              >
                  <ChevronRight :size="20" />
              </button>
           </div>

           <!-- Indicators -->
           <div :class="['absolute bottom-6 flex gap-1.5 z-20 transition-all duration-500', currentCourse.hideTextOverlay ? 'left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-40' : 'left-1/2 -translate-x-1/2 md:translate-x-0 md:left-20']">
              <button
                  v-for="(slide, idx) in slides"
                  :key="idx"
                  @click="currentSlide = idx"
                  :class="['h-1 rounded-full transition-all duration-300 shadow-sm', idx === currentSlide ? 'bg-brand-500 w-8' : 'bg-white/40 w-2 hover:bg-white/80']"
              />
           </div>
      </div>
    </div>

    <!-- Search Dock -->
    <div class="absolute bottom-0 left-0 right-0 z-30 px-4 translate-y-1/2 pointer-events-none">
       <div class="max-w-3xl mx-auto pointer-events-auto">
          <div class="bg-white/90 backdrop-blur-xl rounded-2xl p-2 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] border border-white/50 flex items-center gap-2 relative ring-1 ring-white/40 transition-colors duration-300">
              
              <!-- Input -->
              <div class="flex-1 flex items-center h-12 md:h-14 bg-slate-50 rounded-xl px-4 border border-transparent focus-within:bg-white focus-within:border-brand-200 focus-within:ring-2 focus-within:ring-brand-50 transition-all group">
                  <Search class="text-slate-400 group-focus-within:text-brand-500 mr-3 transition-colors" :size="20" />
                  <input 
                      type="text" 
                      v-model="searchValue"
                      @keydown.enter="handleSearchSubmit"
                      placeholder="搜索你感兴趣的课程、导师..." 
                      class="flex-1 bg-transparent outline-none text-slate-800 font-bold placeholder:text-slate-400/80 placeholder:font-medium h-full w-full text-sm md:text-base"
                  />
              </div>

              <!-- Button -->
              <button 
                  @click="handleSearchSubmit"
                  class="h-12 md:h-14 px-6 md:px-8 bg-slate-900 hover:bg-brand-600 text-white rounded-xl font-bold text-sm md:text-base transition-all shadow-lg hover:shadow-xl active:scale-95 shrink-0 flex items-center gap-2"
              >
                  搜索
              </button>
          </div>
          
          <!-- Tags -->
          <div class="flex justify-center mt-3 gap-2 sm:gap-4 text-xs font-medium text-slate-400 flex-wrap">
               <button v-for="tag in hotSearchTags" :key="tag" @click="emit('search', tag)" class="hover:text-brand-600 transition-colors bg-white/60 backdrop-blur-sm border border-white/20 px-2.5 py-1 rounded-lg hover:bg-white shadow-sm">
                  #{{ tag }}
               </button>
          </div>
       </div>
    </div>

  </div>
</template>
