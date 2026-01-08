import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { RecommendedCourses } from './components/RecommendedCourses';
import { RecommendedInstitutions } from './components/RecommendedInstitutions';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Header */}
      <Navbar />

      <main className="flex-grow">
        {/* Banner / Hero Section */}
        <Hero />

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-12">
          
          {/* Course Categories */}
          <section id="categories">
            <CategorySection />
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
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;