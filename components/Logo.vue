<script setup lang="ts">
defineProps({
  className: {
    type: String,
    default: "w-10 h-10"
  },
  withText: {
    type: Boolean,
    default: false
  },
  light: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <div class="flex items-center gap-2.5 group cursor-pointer select-none">
    <!-- Icon Container -->
    <div :class="[className, 'bg-gradient-to-br from-brand-400 via-brand-500 to-pop-cyan rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20 transform transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105']">
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2.5" 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        class="w-[65%] h-[65%] text-white"
      >
        <path d="M12 21a9 9 0 1 1 0-18c4.97 0 9 4.03 9 9 0 4.97-4.03 9-9 9z" class="opacity-0" />
        <path d="M12 21C7.029 21 3 16.97 3 12 3 7.03 7.029 3 12 3c4.97 0 9 4.03 9 9 0 4.97-4.03 9-9 9" />
        <path d="M12 7v0c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5" />
        <path d="M16.5 7.5c-.5-1.5-2-2.5-3.5-2.5" />
      </svg>
    </div>
    
    <div v-if="withText" class="flex flex-col">
      <span :class="['font-black text-2xl tracking-tight leading-none transition-all duration-300', light ? 'text-white' : 'text-slate-800', 'group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-600 group-hover:to-pop-cyan']">
        魔果云课
      </span>
    </div>
  </div>
</template>
