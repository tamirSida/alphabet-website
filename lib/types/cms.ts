export interface HeroSection {
  id: string;
  headline: string;
  subHeadline: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
  isVisible: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContentSection {
  id: string;
  title: string;
  content: string;
  type: 'mission' | 'why-alpha-bet' | 'who-should-apply' | 'curriculum' | 'what-you-gain';
  isVisible: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMember {
  id: string;
  name: string;
  title?: string; // Job title/role
  role: string; // For backwards compatibility
  bio?: string;
  image?: string;
  military?: string; // Military background
  linkedinUrl?: string;
  isFounder?: boolean; // Whether they're a founder
  order: number;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  company: string;
  image?: string;
  isVisible: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CurriculumItem {
  id: string;
  weekNumber: number;
  title: string;
  description: string;
  icon?: string; // Font Awesome icon class (e.g., "fas fa-rocket")
  order: number;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CallToAction {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  isVisible: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamHeader {
  id: string;
  label: string; // "LEADERSHIP TEAM"
  title: string; // "Meet the Team"
  description: string; // "Battle-tested leaders..."
  isVisible: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Qualification {
  id: string;
  title: string;
  description: string;
  icon: string; // Font Awesome icon class (e.g., "fas fa-shield-alt")
  order: number;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type ContentType = 
  | 'hero'
  | 'content-section'
  | 'team-member'
  | 'team-header'
  | 'testimonial'
  | 'curriculum-item'
  | 'call-to-action'
  | 'qualification';

export interface CMSUser {
  id: string;
  email: string;
  role: 'admin' | 'editor';
  isActive: boolean;
  createdAt: Date;
  lastLogin?: Date;
}

export interface ContentBase {
  id: string;
  isVisible: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}