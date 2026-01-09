import { LucideIcon } from 'lucide-react';

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  count: number;
}

export interface CategoryGroup {
  title: string;
  items: string[];
}

export interface Course {
  id: string;
  title: string;
  coverImage: string;
  instructor: string;
  institution: string;
  price: number;
  originalPrice?: number;
  rating: number;
  studentCount: number;
  tags: string[];
}

export interface Institution {
  id: string;
  name: string;
  logo: string;
  description: string;
  courseCount: number;
  studentCount: number;
  rating: number;
  featuredCourse?: {
    image: string;
    title: string;
    price: number;
  };
}

export interface Gift {
  id: string;
  type: 'coupon' | 'material' | 'discount';
  value: string;
  unit: string;
  label: string;
  condition: string;
  color: 'rose' | 'blue' | 'orange';
  action: string;
}