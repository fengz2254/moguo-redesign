
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { RecommendedCourses } from './components/RecommendedCourses';
import { RecommendedInstitutions } from './components/RecommendedInstitutions';
import { Footer } from './components/Footer';
import { FloatingSidebar } from './components/FloatingSidebar';
import { LearningCenter } from './components/LearningCenter';
import { SearchResults } from './components/SearchResults';
import { DownloadCenter } from './components/DownloadCenter';
import { CourseDetail } from './components/CourseDetail';
import { InstitutionSettlement } from './components/InstitutionSettlement';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { MobileTabBar } from './components/MobileTabBar';
import { LoginModal } from './components/LoginModal';
import { CategoryDrawer } from './components/CategoryDrawer';
import { INITIAL_MY_CATEGORIES } from './constants';

type View = 'home' | 'learning-center' | 'search-results' | 'download' | 'course-detail' | 'institution-settlement';

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  
  // Lifted state for categories
  const [myCategories, setMyCategories] = useState<string[]>(INITIAL_MY_CATEGORIES);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentView('search-results');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleNavigate = (view: View) => {
      setCurrentView(view);
      window.scrollTo({ top: 0, behavior: 'auto' });
  }

  // Effect to hijack hash links for demo purposes
  React.useEffect(() => {
    const handleHashChange = () => {
        const hash = window.location.hash;
        if (hash.startsWith('#course/')) {
            const id = hash.split('/')[1];
            setSelectedCourseId(id);
            setCurrentView('course-detail');
        } else if (hash === '#institution-settlement') {
            setCurrentView('institution-settlement');
        }
    };
    
    // Check hash on initial load
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    // Added padding-bottom to accommodate the mobile tab bar
    <div className="min-h-screen flex flex-col relative bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 pb-24 md:pb-0">
      
      {/* Hide Navbar on Course Detail for immersion, or keep it? Keeping it for consistency but maybe simpler style */}
      <Navbar 
        onNavigate={(v) => handleNavigate(v as View)} 
        currentView={currentView} 
        onSearch={handleSearch}
        onLoginClick={() => setIsLoginOpen(true)}
      />

      <main className="flex-grow">
        {currentView === 'home' ? (
          <>
            {/* Banner / Hero Section - Now accepts onSearch */}
            <Hero onSearch={handleSearch} />

            {/* Course Categories - Default Gray Background */}
            <section id="categories" className="py-8 md:py-12">
              <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
                <CategorySection 
                    onCategoryClick={handleSearch} 
                    onOpenDrawer={() => setIsCategoryDrawerOpen(true)}
                />
              </div>
            </section>

            {/* Premium/Recommended Courses - White Background Section */}
            <section id="courses" className="bg-white dark:bg-slate-900 py-12 md:py-20 relative border-y border-slate-50 dark:border-slate-800 shadow-sm transition-colors duration-300">
               {/* Subtle gradient decoration */}
               <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-100 dark:via-slate-800 to-transparent"></div>
               <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
                 <RecommendedCourses />
               </div>
            </section>

            {/* Recommended Institutions - Gray Background with Gradient Accent */}
            <section id="institutions" className="py-12 md:py-20 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-50/60 via-transparent to-transparent dark:from-brand-900/10 pointer-events-none"></div>
               <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                 <RecommendedInstitutions />
               </div>
            </section>
          </>
        ) : currentView === 'search-results' ? (
          <SearchResults query={searchQuery} />
        ) : currentView === 'download' ? (
          <DownloadCenter />
        ) : currentView === 'institution-settlement' ? (
          <InstitutionSettlement />
        ) : currentView === 'course-detail' ? (
          <CourseDetail 
            courseId={selectedCourseId} 
            onBack={() => handleNavigate('home')} 
          />
        ) : (
          <LearningCenter />
        )}
      </main>

      {/* Footer (Hide on course detail mobile maybe? keeping for now) */}
      <Footer />

      {/* Fixed Right Sidebar (Desktop mostly) */}
      <FloatingSidebar />

      {/* Mobile Tab Bar - Hide on Course Detail to allow bottom dock */}
      {currentView !== 'course-detail' && (
        <MobileTabBar 
            currentView={currentView}
            onNavigate={(view) => handleNavigate(view)}
            onLogin={() => setIsLoginOpen(true)}
        />
      )}

      {/* Global Login Modal */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onSuccess={() => {
            setIsLoginOpen(false);
            setCurrentView('learning-center');
        }} 
      />

      {/* Category Selection Drawer */}
      <CategoryDrawer 
        isOpen={isCategoryDrawerOpen} 
        onClose={() => setIsCategoryDrawerOpen(false)}
        categories={myCategories}
        onUpdateCategories={setMyCategories}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
