<script setup lang="ts">
import { ref } from 'vue';
import Navbar from './components/Navbar.vue';
import Hero from './components/Hero.vue';
import CategorySection from './components/CategorySection.vue';
import RecommendedCourses from './components/RecommendedCourses.vue';
import RecommendedInstitutions from './components/RecommendedInstitutions.vue';
import Footer from './components/Footer.vue';
import FloatingSidebar from './components/FloatingSidebar.vue';
import LearningCenter from './components/LearningCenter.vue';
import SearchResults from './components/SearchResults.vue';
import DownloadCenter from './components/DownloadCenter.vue';
import MobileTabBar from './components/MobileTabBar.vue';
import LoginModal from './components/LoginModal.vue';

type View = 'home' | 'learning-center' | 'search-results' | 'download';

const currentView = ref<View>('home');
const searchQuery = ref('');
const isLoginOpen = ref(false);

const setCurrentView = (view: View) => {
  currentView.value = view;
};

const handleSearch = (query: string) => {
  searchQuery.value = query;
  currentView.value = 'search-results';
  window.scrollTo({ top: 0, behavior: 'auto' });
};

const handleLoginClick = () => {
  isLoginOpen.value = true;
};

const handleLoginSuccess = () => {
  isLoginOpen.value = false;
  currentView.value = 'learning-center';
};
</script>

<template>
  <div class="min-h-screen flex flex-col relative bg-slate-50 pb-24 md:pb-0">
    <!-- Sticky Header -->
    <Navbar 
      :current-view="currentView" 
      @navigate="setCurrentView"
      @search="handleSearch"
      @login-click="handleLoginClick"
    />

    <main class="flex-grow">
      <template v-if="currentView === 'home'">
        <!-- Banner / Hero Section -->
        <Hero @search="handleSearch" />

        <!-- Course Categories -->
        <section id="categories" class="py-8 md:py-12">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CategorySection @category-click="handleSearch" />
          </div>
        </section>

        <!-- Premium/Recommended Courses -->
        <section id="courses" class="bg-white py-12 md:py-20 relative border-y border-slate-50 shadow-sm">
           <div class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent"></div>
           <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <RecommendedCourses />
           </div>
        </section>

        <!-- Recommended Institutions -->
        <section id="institutions" class="py-12 md:py-20 relative overflow-hidden">
           <div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-50/60 via-transparent to-transparent pointer-events-none"></div>
           <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
             <RecommendedInstitutions />
           </div>
        </section>
      </template>

      <SearchResults v-else-if="currentView === 'search-results'" :query="searchQuery" />
      <DownloadCenter v-else-if="currentView === 'download'" />
      <LearningCenter v-else />
    </main>

    <!-- Footer -->
    <Footer />

    <!-- Fixed Right Sidebar -->
    <FloatingSidebar />

    <!-- Mobile Tab Bar -->
    <MobileTabBar 
      :current-view="currentView"
      @navigate="setCurrentView"
      @login="handleLoginClick"
    />

    <!-- Global Login Modal -->
    <LoginModal 
      :is-open="isLoginOpen" 
      @close="isLoginOpen = false" 
      @success="handleLoginSuccess" 
    />
  </div>
</template>
