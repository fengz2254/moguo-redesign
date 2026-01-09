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
import { AuthProvider } from './context/AuthContext';

type View = 'home' | 'learning-center' | 'search-results';

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentView('search-results');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Sticky Header */}
      <Navbar 
        onNavigate={setCurrentView} 
        currentView={currentView} 
        onSearch={handleSearch}
      />

      <main className="flex-grow">
        {currentView === 'home' ? (
          <>
            {/* Banner / Hero Section */}
            <Hero />

            {/* Content Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-12">
              
              {/* Course Categories */}
              <section id="categories">
                <CategorySection onCategoryClick={handleSearch} />
              </section>

              {/* Premium/Recommended Courses */}
              <section id="courses">
                <RecommendedCourses />
              </section>

              {/* Recommended Institutions */}
              <section id="institutions">
                <RecommendedInstitutions />
              </section>
            </div>
          </>
        ) : currentView === 'search-results' ? (
          <SearchResults query={searchQuery} />
        ) : (
          <LearningCenter />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Fixed Right Sidebar */}
      <FloatingSidebar />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;