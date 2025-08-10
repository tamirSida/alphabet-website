import { BaseFirestoreService } from './base-service';
import { where, orderBy } from 'firebase/firestore';
import { 
  HeroSection, 
  ContentSection, 
  TeamMember, 
  Testimonial, 
  CurriculumItem, 
  CallToAction 
} from '@/lib/types/cms';

export class HeroService extends BaseFirestoreService<HeroSection> {
  constructor() {
    super('hero-sections');
  }

  async getActiveHero(): Promise<HeroSection | null> {
    const heroes = await this.getVisible(1);
    return heroes.length > 0 ? heroes[0] : null;
  }
}

export class ContentSectionService extends BaseFirestoreService<ContentSection> {
  constructor() {
    super('content-sections');
  }

  async getByType(type: ContentSection['type']): Promise<ContentSection[]> {
    const allItems = await this.getAll();
    return allItems
      .filter(item => item.type === type && item.isVisible === true)
      .sort((a, b) => a.order - b.order);
  }
}

export class TeamMemberService extends BaseFirestoreService<TeamMember> {
  constructor() {
    super('team-members');
  }

  async getFeaturedMembers(limit: number = 3): Promise<TeamMember[]> {
    return this.getVisible(limit);
  }
}

export class TestimonialService extends BaseFirestoreService<Testimonial> {
  constructor() {
    super('testimonials');
  }

  async getFeaturedTestimonials(limit: number = 2): Promise<Testimonial[]> {
    return this.getVisible(limit);
  }
}

export class CurriculumService extends BaseFirestoreService<CurriculumItem> {
  constructor() {
    super('curriculum-items');
  }
}

export class CallToActionService extends BaseFirestoreService<CallToAction> {
  constructor() {
    super('call-to-actions');
  }

  async getActiveCallToAction(): Promise<CallToAction | null> {
    const ctas = await this.getVisible(1);
    return ctas.length > 0 ? ctas[0] : null;
  }
}

// Service factory for easy instantiation
export class CMSServiceFactory {
  private static instances: Map<string, any> = new Map();

  static getHeroService(): HeroService {
    if (!this.instances.has('hero')) {
      this.instances.set('hero', new HeroService());
    }
    return this.instances.get('hero');
  }

  static getContentSectionService(): ContentSectionService {
    if (!this.instances.has('content')) {
      this.instances.set('content', new ContentSectionService());
    }
    return this.instances.get('content');
  }

  static getTeamMemberService(): TeamMemberService {
    if (!this.instances.has('team')) {
      this.instances.set('team', new TeamMemberService());
    }
    return this.instances.get('team');
  }

  static getTestimonialService(): TestimonialService {
    if (!this.instances.has('testimonial')) {
      this.instances.set('testimonial', new TestimonialService());
    }
    return this.instances.get('testimonial');
  }

  static getCurriculumService(): CurriculumService {
    if (!this.instances.has('curriculum')) {
      this.instances.set('curriculum', new CurriculumService());
    }
    return this.instances.get('curriculum');
  }

  static getCallToActionService(): CallToActionService {
    if (!this.instances.has('cta')) {
      this.instances.set('cta', new CallToActionService());
    }
    return this.instances.get('cta');
  }
}