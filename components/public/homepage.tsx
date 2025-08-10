'use client';

import { useState, useEffect, useCallback } from 'react';
import HeroSection from './hero-section';
import ContentSection from './content-section';
import TeamSection from './team-section';
import TestimonialsSection from './testimonials-section';
import CurriculumTimeline from './curriculum-timeline';
import CTASection from './cta-section';
import DiscreteAdminAccess, { DiscreteAdminDot, useUrlAdminAccess } from '@/components/admin/discrete-access';
import EditableSection from '@/components/admin/editable-section';
import SimpleAdminToggle from '@/components/admin/simple-admin-toggle';
import EditModal from '@/components/admin/edit-modal';
// AdminProvider is now in root layout

import { CMSServiceFactory } from '@/lib/cms/content-services';
import { 
  HeroSection as HeroType, 
  ContentSection as ContentType,
  TeamMember,
  Testimonial,
  CurriculumItem,
  CallToAction
} from '@/lib/types/cms';

function AlphaBetHomepageContent() {
  const [hero, setHero] = useState<HeroType | null>(null);
  const [contentSections, setContentSections] = useState<ContentType[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [curriculum, setCurriculum] = useState<CurriculumItem[]>([]);
  const [cta, setCTA] = useState<CallToAction | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editingType, setEditingType] = useState<string>('');

  // Enable URL-based admin access
  useUrlAdminAccess();

  const loadContent = useCallback(async () => {
    try {
      setLoading(true);
      
      // Load all content in parallel
      const [
        heroData,
        contentData,
        teamData,
        testimonialData,
        curriculumData,
        ctaData
      ] = await Promise.all([
        CMSServiceFactory.getHeroService().getActiveHero(),
        CMSServiceFactory.getContentSectionService().getVisible(),
        CMSServiceFactory.getTeamMemberService().getFeaturedMembers(),
        CMSServiceFactory.getTestimonialService().getFeaturedTestimonials(),
        CMSServiceFactory.getCurriculumService().getVisible(),
        CMSServiceFactory.getCallToActionService().getActiveCallToAction()
      ]);

      setHero(heroData);
      setContentSections(contentData);
      setTeamMembers(teamData);
      setTestimonials(testimonialData);
      setCurriculum(curriculumData);
      setCTA(ctaData);
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Edit handlers
  const handleEdit = useCallback((type: string, item?: any) => {
    console.log('Opening edit modal for:', type, 'with item:', item); // Debug log
    setEditingType(type);
    setEditingItem(item);
    setEditModalOpen(true);
  }, []);

  const handleSave = useCallback(async (data: any) => {
    try {
      if (editingType === 'hero') {
        if (editingItem) {
          await CMSServiceFactory.getHeroService().update(editingItem.id, data);
        } else {
          await CMSServiceFactory.getHeroService().create(data);
        }
      } else if (editingType === 'content') {
        if (editingItem) {
          await CMSServiceFactory.getContentSectionService().update(editingItem.id, data);
        } else {
          await CMSServiceFactory.getContentSectionService().create(data);
        }
      } else if (editingType === 'curriculum') {
        if (editingItem && editingItem.id && !editingItem.id.startsWith('week-')) {
          // Existing Firestore document - update it
          await CMSServiceFactory.getCurriculumService().update(editingItem.id, data);
        } else {
          // New document or default data - create it
          const curriculumData = {
            ...data,
            isVisible: true,
            order: data.weekNumber || 1
          };
          await CMSServiceFactory.getCurriculumService().create(curriculumData);
        }
      }
      
      await loadContent();
    } catch (error) {
      console.error('Error saving:', error);
      throw error;
    }
  }, [editingType, editingItem, loadContent]);

  const getEditFields = useCallback((type: string) => {
    switch (type) {
      case 'hero':
        return [
          { key: 'headline', label: 'Headline', type: 'text' as const, required: true, placeholder: 'Enter the main headline' },
          { key: 'subHeadline', label: 'Sub-headline', type: 'textarea' as const, required: true, placeholder: 'Enter the sub-headline description' },
          { key: 'ctaText', label: 'Call-to-Action Text', type: 'text' as const, required: true, placeholder: 'e.g., Apply Now' },
          { key: 'ctaLink', label: 'Call-to-Action Link', type: 'url' as const, required: true, placeholder: 'https://...' },
          { key: 'backgroundImage', label: 'Background Image URL', type: 'url' as const, required: false, placeholder: 'https://...' }
        ];
      case 'content':
        return [
          { key: 'title', label: 'Title', type: 'text' as const, required: true, placeholder: 'Enter section title' },
          { key: 'content', label: 'Content', type: 'textarea' as const, required: true, placeholder: 'Enter section content...' },
          { key: 'type', label: 'Section Type', type: 'text' as const, required: true, placeholder: 'e.g., mission, why-alpha-bet, who-should-apply' }
        ];
      case 'curriculum':
        return [
          { key: 'weekNumber', label: 'Week Number', type: 'number' as const, required: true, placeholder: '1-10' },
          { key: 'title', label: 'Title', type: 'text' as const, required: true, placeholder: 'Enter week title' },
          { key: 'description', label: 'Description', type: 'textarea' as const, required: true, placeholder: 'Enter week description...' },
          { key: 'icon', label: 'Font Awesome Icon', type: 'text' as const, required: false, placeholder: 'e.g., fas fa-rocket' }
        ];
      default:
        return [];
    }
  }, []);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black"></div>
      </div>
    );
  }

  // Fallback hero if no content is found
  const defaultHero = {
    headline: "From Battlefield to Business: Your Next Mission Starts Here.",
    subHeadline: "Alpha-Bet is a free entrepreneurship program for US and Israeli combat veterans, designed to equip you with the skills, network, and battle-tested mindset to build a successful startup. It's time to channel your experience into innovation.",
    ctaText: "Apply Now",
    ctaLink: "#apply"
  };

  const activeHero = hero || defaultHero;

  return (
    <main className="min-h-screen relative">
      {/* Discrete Admin Access Components */}
      <DiscreteAdminAccess />
      <DiscreteAdminDot />
      <SimpleAdminToggle />
      
      {/* Hero Section */}
      <EditableSection
        sectionName="Hero"
        onEdit={() => handleEdit('hero', hero)}
      >
        <HeroSection
          headline={activeHero.headline}
          subHeadline={activeHero.subHeadline}
          ctaText={activeHero.ctaText}
          ctaLink={activeHero.ctaLink}
          backgroundImage={hero?.backgroundImage}
        />
      </EditableSection>

      {/* Content Sections */}
      {contentSections.map((section) => (
        <EditableSection
          key={section.id}
          sectionName="Content"
          onEdit={() => handleEdit('content', section)}
        >
          <ContentSection
            title={section.title}
            content={section.content}
            type={section.type}
          />
        </EditableSection>
      ))}

      {/* Default content if no CMS content exists */}
      {contentSections.length === 0 && (
        <>
          <EditableSection
            sectionName="Mission"
            onEdit={() => handleEdit('content', {
              title: "Our Mission",
              content: "You've demonstrated courage, discipline, and leadership in the most challenging environments. Now, we're here to help you apply those same traits to the world of entrepreneurship.\n\nThe Version Bravo Alpha-Bet program is a non-profit initiative dedicated to empowering combat veterans. We provide a practical, hands-on education in entrepreneurship, giving you the foundation of a top-tier MBA, but with a curriculum built for founders. Our goal is to bridge the gap between military service and the startup ecosystem, creating a new generation of veteran-led companies that drive innovation and create a lasting impact.",
              type: "mission"
            })}
          >
            <ContentSection
              title="Our Mission"
              content="You've demonstrated courage, discipline, and leadership in the most challenging environments. Now, we're here to help you apply those same traits to the world of entrepreneurship.

The Version Bravo Alpha-Bet program is a non-profit initiative dedicated to empowering combat veterans. We provide a practical, hands-on education in entrepreneurship, giving you the foundation of a top-tier MBA, but with a curriculum built for founders. Our goal is to bridge the gap between military service and the startup ecosystem, creating a new generation of veteran-led companies that drive innovation and create a lasting impact."
              type="mission"
            />
          </EditableSection>

          <EditableSection
            sectionName="Why Alpha-Bet"
            onEdit={() => handleEdit('content', {
              title: "Why Alpha-Bet?",
              content: "This isn't a traditional classroom. This is a community of like-minded individuals who share your unique experiences and understand the 'battle-tested' approach to problem-solving. We bring together the best of both worlds:\n\n• A Proven Network: Gain direct access to the Version Bravo ecosystem—a powerful network of successful founders, academic leaders, and investors from both the US and Israel. This is the only platform uniting elite US and Israeli operators.\n\n• Veteran-to-Veteran Mentorship: Learn from successful entrepreneurs and combat veterans who have walked a similar path. Our team of instructors and mentors are not just academics; they are successful founders with a proven track record.\n\n• Your Fast-Track to Success: As an Alpha-Bet graduate, you'll receive a priority application to the Version Bravo accelerator, which includes an investment. Version Bravo is a dedicated venture fund and accelerator run by combat veterans for combat veterans.",
              type: "why-alpha-bet"
            })}
          >
            <ContentSection
              title="Why Alpha-Bet?"
              content="This isn't a traditional classroom. This is a community of like-minded individuals who share your unique experiences and understand the 'battle-tested' approach to problem-solving. We bring together the best of both worlds:

• A Proven Network: Gain direct access to the Version Bravo ecosystem—a powerful network of successful founders, academic leaders, and investors from both the US and Israel. This is the only platform uniting elite US and Israeli operators.

• Veteran-to-Veteran Mentorship: Learn from successful entrepreneurs and combat veterans who have walked a similar path. Our team of instructors and mentors are not just academics; they are successful founders with a proven track record.

• Your Fast-Track to Success: As an Alpha-Bet graduate, you'll receive a priority application to the Version Bravo accelerator, which includes an investment. Version Bravo is a dedicated venture fund and accelerator run by combat veterans for combat veterans."
              type="why-alpha-bet"
            />
          </EditableSection>

          <EditableSection
            sectionName="Who Should Apply"
            onEdit={() => handleEdit('content', {
              title: "Who Should Apply?",
              content: "The Alpha-Bet program is for a select group of mission-driven veterans ready for their next challenge. This program is for you if you are:\n\n• A combat veteran of the US or Israel.\n• Post-service and ready to transition your skills into the business world.\n• Interested in entrepreneurship and seeking the foundational knowledge to get started.\n• In the ideation phase, whether you have a business idea or are looking to find a partner and develop one.\n• Committed to a rigorous, 10-week online program of training and practical workshops.",
              type: "who-should-apply"
            })}
          >
            <ContentSection
              title="Who Should Apply?"
              content="The Alpha-Bet program is for a select group of mission-driven veterans ready for their next challenge. This program is for you if you are:

• A combat veteran of the US or Israel.
• Post-service and ready to transition your skills into the business world.
• Interested in entrepreneurship and seeking the foundational knowledge to get started.
• In the ideation phase, whether you have a business idea or are looking to find a partner and develop one.
• Committed to a rigorous, 10-week online program of training and practical workshops."
              type="who-should-apply"
            />
          </EditableSection>

          <EditableSection
            sectionName="What You'll Gain"
            onEdit={() => handleEdit('content', {
              title: "What You'll Gain",
              content: "The Alpha-Bet program is designed to transform your ideas and military experience into a solid foundation for entrepreneurial success. By the end of the program, you will:\n\n• Build a Strong Team: Develop a startup with a strong team of peers. The program provides an opportunity to meet and work with other mission-driven veterans.\n\n• Gain Confidence & Knowledge: Gain the confidence and foundational knowledge for a career in entrepreneurship. You will leave with a practical understanding of the entrepreneurial process, from ideation to venture creation.\n\n• Experience Real-World Pitching: Get experience presenting a startup to real investors.\n\n• Receive Priority for Acceleration & Funding: Receive a priority application to the Version Bravo accelerator, which includes investment. This gives you a direct path to the next level of funding and mentorship.",
              type: "what-you-gain"
            })}
          >
            <ContentSection
              title="What You'll Gain"
              content="The Alpha-Bet program is designed to transform your ideas and military experience into a solid foundation for entrepreneurial success. By the end of the program, you will:

• Build a Strong Team: Develop a startup with a strong team of peers. The program provides an opportunity to meet and work with other mission-driven veterans.

• Gain Confidence & Knowledge: Gain the confidence and foundational knowledge for a career in entrepreneurship. You will leave with a practical understanding of the entrepreneurial process, from ideation to venture creation.

• Experience Real-World Pitching: Get experience presenting a startup to real investors.

• Receive Priority for Acceleration & Funding: Receive a priority application to the Version Bravo accelerator, which includes investment. This gives you a direct path to the next level of funding and mentorship."
              type="what-you-gain"
            />
          </EditableSection>
        </>
      )}

      {/* Team Section */}
      <TeamSection members={teamMembers} />

      {/* Curriculum Timeline */}
      <EditableSection
        sectionName="Curriculum Timeline"
        onEdit={() => handleEdit('curriculum')}
      >
        <CurriculumTimeline 
          items={curriculum} 
          onEdit={(item) => handleEdit('curriculum', item)}
        />
      </EditableSection>

      {/* Testimonials Section */}
      <TestimonialsSection testimonials={testimonials} />

      {/* Call to Action */}
      {cta ? (
        <CTASection
          title={cta.title}
          description={cta.description}
          buttonText={cta.buttonText}
          buttonLink={cta.buttonLink}
        />
      ) : (
        <CTASection
          title="Ready to Begin Your Next Mission?"
          description="The Alpha-Bet program is a free, selective program open to combat veterans of the US and Israel. The application process is competitive, and we're looking for individuals with a passion for innovation and the discipline to execute. Start your journey today."
          buttonText="Apply Now"
          buttonLink="#apply"
        />
      )}

      {/* Edit Modal */}
      <EditModal
        key={editingItem?.id || 'new'} // Force re-render when editing different items
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setEditingItem(null);
          setEditingType('');
        }}
        onSave={handleSave}
        title={`Edit ${editingType}`}
        fields={editingType ? getEditFields(editingType) : []}
        initialData={editingItem}
        loading={loading}
      />
    </main>
  );
}

// Export directly - AdminProvider is already in the app layout
export default function AlphaBetHomepage() {
  return <AlphaBetHomepageContent />;
}