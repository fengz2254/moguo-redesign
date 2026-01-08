import React from 'react';
import { RECOMMENDED_COURSES } from '../constants';
import { CourseCard } from './CourseCard';
import { SectionHeader } from './SectionHeader';

export const RecommendedCourses: React.FC = () => {
  return (
    <div>
      <SectionHeader 
        title="精品好课推荐" 
        subtitle="严选优质课程，助力职业成长"
        onAction={() => console.log('查看全部课程')}
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {RECOMMENDED_COURSES.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};