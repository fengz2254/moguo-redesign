import { 
  Code, 
  Palette, 
  Globe, 
  BarChart3, 
  Music, 
  Camera, 
  Cpu, 
  BookOpen,
  Pencil,
  GraduationCap,
  Landmark,
  Code2,
  Briefcase,
  TrendingUp,
  MessageCircle
} from 'lucide-react';
import { Category, Course, Institution, CategoryGroup, Gift } from './types';

export const CATEGORIES: Category[] = [
  { id: '1', name: '公考', icon: Pencil, count: 520 },
  { id: '2', name: '教资教招', icon: GraduationCap, count: 340 },
  { id: '3', name: '考研', icon: BookOpen, count: 210 },
  { id: '4', name: '财会金融', icon: Landmark, count: 180 },
  { id: '5', name: '设计制作', icon: Palette, count: 150 },
  { id: '6', name: 'IT互联网', icon: Code2, count: 430 },
  { id: '7', name: '求职面试', icon: Briefcase, count: 90 },
  { id: '8', name: '个人提升', icon: TrendingUp, count: 120 },
];

export const INITIAL_MY_CATEGORIES = [
  '留学考试', '考研', '公务员考试', '英语', '其他文化艺术', 
  '摄影修图', '初中', '日语', '法语', '西班牙语'
];

export const ALL_CATEGORY_GROUPS: CategoryGroup[] = [
  {
    title: '语言学习',
    items: ['英语', '日语', '韩语', '法语', '德语', '俄语', '西班牙语', '其他语言']
  },
  {
    title: '出国留学',
    items: ['留学服务', '托福', '雅思', 'GRE', 'GMAT', '作品集', '其他留学']
  },
  {
    title: '考试考证',
    items: ['教资教招', '法律考试', '财会金融', '医疗健康', '建筑工程', '其他考证', '公务员考试', '考研']
  },
  {
    title: '职场发展',
    items: ['游戏美术·CG', '办公技能', '求职面试', '设计制作', 'IT互联网', '投资理财', '个人提升']
  },
  {
    title: '文化艺术',
    items: ['音乐', '舞蹈', '声乐/表演', '文学国学', '绘画', '书法', '其他文化艺术']
  },
  {
    title: '兴趣生活',
    items: ['手工', '情感', '形象', '健康养生', '美食烹饪', '萌宠', '其他兴趣生活', '摄影修图']
  },
  {
    title: '素质教育',
    items: ['备孕胎教', '幼儿启蒙', '少儿兴趣', '小学', '初中', '高中']
  }
];

export const RECOMMENDED_COURSES: Course[] = [
  {
    id: '101',
    title: 'React 18 全栈开发实战课程：从入门到精通',
    coverImage: 'https://picsum.photos/seed/react/800/600',
    instructor: '张伟老师',
    institution: '极客技术学院',
    price: 199,
    originalPrice: 499,
    rating: 4.9,
    studentCount: 3420,
    tags: ['直播课', '就业班']
  },
  {
    id: '102',
    title: '零基础商业插画设计：IP角色与场景绘制',
    coverImage: 'https://picsum.photos/seed/art/800/600',
    instructor: 'Lisa Chen',
    institution: '创意视觉工坊',
    price: 299,
    originalPrice: 699,
    rating: 4.8,
    studentCount: 1250,
    tags: ['名师指导']
  },
  {
    id: '103',
    title: 'Python 数据分析与机器学习实战',
    coverImage: 'https://picsum.photos/seed/python/800/600',
    instructor: '王强博士',
    institution: '数据科学研习社',
    price: 0,
    rating: 4.7,
    studentCount: 8900,
    tags: ['免费公开课']
  },
  {
    id: '104',
    title: '商务英语口语速成：职场沟通无障碍',
    coverImage: 'https://picsum.photos/seed/english/800/600',
    instructor: 'Sarah Jenkins',
    institution: '全球通语言中心',
    price: 99,
    originalPrice: 199,
    rating: 4.6,
    studentCount: 5600,
    tags: ['热门']
  },
  {
    id: '105',
    title: '短视频运营与剪辑全攻略',
    coverImage: 'https://picsum.photos/seed/video/800/600',
    instructor: '李小龙',
    institution: '新媒体大学',
    price: 159,
    originalPrice: 399,
    rating: 4.8,
    studentCount: 2100,
    tags: ['实战']
  },
  {
    id: '106',
    title: 'PMP 项目管理认证冲刺班',
    coverImage: 'https://picsum.photos/seed/pmp/800/600',
    instructor: '陈思思',
    institution: '精英管理学院',
    price: 899,
    originalPrice: 1299,
    rating: 4.9,
    studentCount: 890,
    tags: ['考证']
  },
  {
    id: '107',
    title: '少儿编程 Scratch 趣味入门',
    coverImage: 'https://picsum.photos/seed/scratch/800/600',
    instructor: '乐乐老师',
    institution: '未来童星教育',
    price: 299,
    rating: 4.9,
    studentCount: 4500,
    tags: ['亲子']
  },
  {
    id: '108',
    title: 'UI/UX 设计师进阶：构建设计体系',
    coverImage: 'https://picsum.photos/seed/uiux/800/600',
    instructor: 'Mike Wang',
    institution: 'DesignPro Labs',
    price: 399,
    originalPrice: 599,
    rating: 4.7,
    studentCount: 1800,
    tags: ['进阶']
  }
];

export const INSTITUTIONS: Institution[] = [
  {
    id: '201',
    name: '极客技术学院',
    logo: 'https://picsum.photos/seed/logo1/200/200',
    description: '专注前沿互联网技术培训，输送高质量技术人才。',
    courseCount: 45,
    studentCount: 50000,
    rating: 4.9,
    featuredCourse: {
        title: '2024前端架构师实战营',
        image: 'https://picsum.photos/seed/react/800/600',
        price: 2499
    }
  },
  {
    id: '202',
    name: '创意视觉工坊',
    logo: 'https://picsum.photos/seed/logo2/200/200',
    description: '汇聚全球顶尖设计师，打造最具创意的设计课程。',
    courseCount: 32,
    studentCount: 28000,
    rating: 4.8,
    featuredCourse: {
        title: '商业插画与IP设计全能班',
        image: 'https://picsum.photos/seed/art/800/600',
        price: 1899
    }
  },
  {
    id: '203',
    name: '全球通语言',
    logo: 'https://picsum.photos/seed/logo3/200/200',
    description: '不仅是语言学习，更是文化交流的桥梁。',
    courseCount: 120,
    studentCount: 150000,
    rating: 4.7,
    featuredCourse: {
        title: '零基础直达雅思7.0分',
        image: 'https://picsum.photos/seed/english/800/600',
        price: 3200
    }
  },
  {
    id: '204',
    name: '未来童星教育',
    logo: 'https://picsum.photos/seed/logo4/200/200',
    description: '致力于青少年素质教育与潜能开发。',
    courseCount: 88,
    studentCount: 89000,
    rating: 4.9,
    featuredCourse: {
        title: '乐高机器人编程启蒙',
        image: 'https://picsum.photos/seed/scratch/800/600',
        price: 599
    }
  },
];

export const SIDEBAR_GIFTS: Gift[] = [
  {
    id: 'g1',
    type: 'coupon',
    value: '100',
    unit: '¥',
    label: '新人券',
    condition: '满 500 可用',
    color: 'rose',
    action: '领'
  },
  {
    id: 'g2',
    type: 'discount',
    value: '8.5',
    unit: '折',
    label: '课程通用',
    condition: '最高抵 200',
    color: 'orange',
    action: '抢'
  },
  {
    id: 'g3',
    type: 'material',
    value: '免费',
    unit: '',
    label: '独家资料',
    condition: 'React 面试宝典',
    color: 'blue',
    action: '下'
  }
];