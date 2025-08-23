import { BaseFirestoreService } from './base-service';
import { where, orderBy } from 'firebase/firestore';
import { 
  HeroSection, 
  ContentSection, 
  TeamMember, 
  TeamHeader,
  Testimonial, 
  CurriculumItem, 
  CurriculumHeader,
  CallToAction,
  Qualification,
  FAQ,
  ProgramIntro,
  ParticipantType,
  CandidateProfile,
  ProgramExclusions
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

export class FounderService extends BaseFirestoreService<TeamMember> {
  constructor() {
    super('founders');
  }

  async getFeaturedFounders(limit: number = 2): Promise<TeamMember[]> {
    return this.getVisible(limit);
  }
}

export class AlphaBetStaffService extends BaseFirestoreService<TeamMember> {
  constructor() {
    super('alphabet-staff');
  }

  async getFeaturedStaff(limit: number = 10): Promise<TeamMember[]> {
    return this.getVisible(limit);
  }
}

export class TeamHeaderService extends BaseFirestoreService<TeamHeader> {
  constructor() {
    super('team-headers');
  }

  async getActiveHeader(): Promise<TeamHeader | null> {
    const headers = await this.getVisible(1);
    return headers.length > 0 ? headers[0] : null;
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

export class CurriculumHeaderService extends BaseFirestoreService<CurriculumHeader> {
  constructor() {
    super('curriculum-headers');
  }

  async getActiveHeader(): Promise<CurriculumHeader | null> {
    const headers = await this.getVisible(1);
    return headers.length > 0 ? headers[0] : null;
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

export class QualificationService extends BaseFirestoreService<Qualification> {
  constructor() {
    super('qualification-items');
  }
}

export class FAQService extends BaseFirestoreService<FAQ> {
  constructor() {
    super('faqs');
  }
}

export class ProgramIntroService extends BaseFirestoreService<ProgramIntro> {
  constructor() {
    super('program-intros');
  }

  async getActiveProgramIntro(): Promise<ProgramIntro | null> {
    const intros = await this.getVisible(1);
    return intros.length > 0 ? intros[0] : null;
  }
}

export class ParticipantTypeService extends BaseFirestoreService<ParticipantType> {
  constructor() {
    super('participant-types');
  }
}

export class CandidateProfileService extends BaseFirestoreService<CandidateProfile> {
  constructor() {
    super('candidate-profiles');
  }

  async getActiveCandidateProfile(): Promise<CandidateProfile | null> {
    const profiles = await this.getVisible(1);
    return profiles.length > 0 ? profiles[0] : null;
  }
}

export class ProgramExclusionsService extends BaseFirestoreService<ProgramExclusions> {
  constructor() {
    super('program-exclusions');
  }

  async getActiveProgramExclusions(): Promise<ProgramExclusions | null> {
    const exclusions = await this.getVisible(1);
    return exclusions.length > 0 ? exclusions[0] : null;
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

  static getFounderService(): FounderService {
    if (!this.instances.has('founder')) {
      this.instances.set('founder', new FounderService());
    }
    return this.instances.get('founder');
  }

  static getAlphaBetStaffService(): AlphaBetStaffService {
    if (!this.instances.has('alphabetStaff')) {
      this.instances.set('alphabetStaff', new AlphaBetStaffService());
    }
    return this.instances.get('alphabetStaff');
  }

  static getTeamHeaderService(): TeamHeaderService {
    if (!this.instances.has('teamHeader')) {
      this.instances.set('teamHeader', new TeamHeaderService());
    }
    return this.instances.get('teamHeader');
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

  static getQualificationService(): QualificationService {
    if (!this.instances.has('qualification')) {
      this.instances.set('qualification', new QualificationService());
    }
    return this.instances.get('qualification');
  }

  static getFAQService(): FAQService {
    if (!this.instances.has('faq')) {
      this.instances.set('faq', new FAQService());
    }
    return this.instances.get('faq');
  }

  static getCurriculumHeaderService(): CurriculumHeaderService {
    if (!this.instances.has('curriculumHeader')) {
      this.instances.set('curriculumHeader', new CurriculumHeaderService());
    }
    return this.instances.get('curriculumHeader');
  }

  static getProgramIntroService(): ProgramIntroService {
    if (!this.instances.has('programIntro')) {
      this.instances.set('programIntro', new ProgramIntroService());
    }
    return this.instances.get('programIntro');
  }

  static getParticipantTypeService(): ParticipantTypeService {
    if (!this.instances.has('participantType')) {
      this.instances.set('participantType', new ParticipantTypeService());
    }
    return this.instances.get('participantType');
  }

  static getCandidateProfileService(): CandidateProfileService {
    if (!this.instances.has('candidateProfile')) {
      this.instances.set('candidateProfile', new CandidateProfileService());
    }
    return this.instances.get('candidateProfile');
  }

  static getProgramExclusionsService(): ProgramExclusionsService {
    if (!this.instances.has('programExclusions')) {
      this.instances.set('programExclusions', new ProgramExclusionsService());
    }
    return this.instances.get('programExclusions');
  }
}