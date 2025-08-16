'use client';

import { useState, useEffect, useCallback } from 'react';
import HeroSection from './hero-section';
import ContentSection from './content-section';
import FAQSection from './faq-section';
import BottomNavigation from './bottom-navigation';
import DiscreteAdminAccess, { DiscreteAdminDot, useUrlAdminAccess } from '@/components/admin/discrete-access';
import EditableSection from '@/components/admin/editable-section';
import SimpleAdminToggle from '@/components/admin/simple-admin-toggle';
import EditModal from '@/components/admin/edit-modal';
// AdminProvider is now in root layout

import { CMSServiceFactory } from '@/lib/cms/content-services';
import { 
  HeroSection as HeroType, 
  ContentSection as ContentType,
  FAQ
} from '@/lib/types/cms';

function AlphaBetHomepageContent() {
  const [hero, setHero] = useState<HeroType | null>(null);
  const [contentSections, setContentSections] = useState<ContentType[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
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
      
      // Load content for homepage
      const [
        heroData,
        contentData,
        faqData
      ] = await Promise.all([
        CMSServiceFactory.getHeroService().getActiveHero(),
        CMSServiceFactory.getContentSectionService().getVisible(),
        CMSServiceFactory.getFAQService().getVisible()
      ]);

      setHero(heroData);
      setContentSections(contentData);
      setFaqs(faqData);
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

  const handleDelete = useCallback(async (type: string, item: any) => {
    try {
      if (type === 'faq' && item.id && !item.id.startsWith('faq-')) {
        await CMSServiceFactory.getFAQService().delete(item.id);
        await loadContent();
      }
    } catch (error) {
      console.error('Error deleting:', error);
    }
  }, [loadContent]);

  const handleSave = useCallback(async (data: any) => {
    try {
      if (editingType === 'hero') {
        if (editingItem) {
          await CMSServiceFactory.getHeroService().update(editingItem.id, data);
        } else {
          await CMSServiceFactory.getHeroService().create(data);
        }
      } else if (editingType === 'content') {
        if (editingItem && editingItem.id && !editingItem.id.startsWith('default-')) {
          await CMSServiceFactory.getContentSectionService().update(editingItem.id, data);
        } else {
          const contentData = {
            ...data,
            isVisible: true,
            order: contentSections.length + 1
          };
          await CMSServiceFactory.getContentSectionService().create(contentData);
        }
      } else if (editingType === 'faq') {
        if (editingItem && editingItem.id && !editingItem.id.startsWith('faq-')) {
          await CMSServiceFactory.getFAQService().update(editingItem.id, data);
        } else {
          const faqData = {
            ...data,
            isVisible: true,
            order: data.order || faqs.length + 1
          };
          await CMSServiceFactory.getFAQService().create(faqData);
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
          { key: 'type', label: 'Section Type', type: 'text' as const, required: true, placeholder: 'e.g., mission, why-alpha-bet, what-you-gain' }
        ];
      case 'faq':
        return [
          { key: 'question', label: 'Question', type: 'text' as const, required: true, placeholder: 'Enter the FAQ question' },
          { key: 'answer', label: 'Answer', type: 'textarea' as const, required: true, placeholder: 'Enter the FAQ answer...' },
          { key: 'order', label: 'Order', type: 'number' as const, required: true, placeholder: '1-10' }
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
    ctaText: "Explore Program",
    ctaLink: "/curriculum"
  };

  const activeHero = hero || defaultHero;

  return (
    <div className="relative">
      {/* Discrete Admin Access Components */}
      <DiscreteAdminAccess />
      <DiscreteAdminDot />
      <SimpleAdminToggle />
      
      {/* Hero and Content Sections with Seamless Background */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black">
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
        {/* Default homepage content sections */}
        <EditableSection
          sectionName="Mission"
          onEdit={() => handleEdit('content', {
            id: "default-mission",
            title: "Our Mission",
            content: "You've demonstrated courage, discipline, and leadership in the most challenging environments. Now, we're here to help you apply those same traits to the world of entrepreneurship.\n\n• Bridge military experience with entrepreneurial skills\n• Get practical MBA-level education designed for founders\n• Join a community of battle-tested veteran entrepreneurs\n• Create lasting impact through veteran-led innovation",
            type: "mission"
          })}
        >
          <ContentSection
            title="Our Mission"
            content="You've demonstrated courage, discipline, and leadership in the most challenging environments. Now, we're here to help you apply those same traits to the world of entrepreneurship.

• Bridge military experience with entrepreneurial skills
• Get practical MBA-level education designed for founders  
• Join a community of battle-tested veteran entrepreneurs
• Create lasting impact through veteran-led innovation"
            type="mission"
          />
        </EditableSection>

        <EditableSection
          sectionName="Why Alpha-Bet"
          onEdit={() => handleEdit('content', {
            id: "default-why-alpha-bet",
            title: "Why Alpha-Bet?",
            content: "This isn't a traditional classroom. This is a community of like-minded individuals who share your unique experiences and understand the 'battle-tested' approach to problem-solving.\n\n• Proven Network: Access to Version Bravo ecosystem with US and Israeli operators\n• Veteran-to-Veteran Mentorship: Learn from successful entrepreneur combat veterans\n• Fast-Track to Success: Priority application to Version Bravo accelerator with investment",
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
          sectionName="What You'll Gain"
          onEdit={() => handleEdit('content', {
            id: "default-what-you-gain",
            title: "What You'll Gain",
            content: "Transform your military experience into entrepreneurial success through our comprehensive 10-week program.\n\n• Build a Strong Team: Connect and develop startups with mission-driven veteran peers\n• Gain Confidence & Knowledge: Master the entrepreneurial process from ideation to venture creation\n• Experience Real-World Pitching: Present your startup to actual investors\n• Receive Priority for Acceleration: Direct path to Version Bravo accelerator with investment opportunity",
            type: "what-you-gain"
          })}
        >
          <ContentSection
            title="What You'll Gain"
            content="Transform your military experience into entrepreneurial success through our comprehensive 10-week program.

• Build a Strong Team: Connect and develop startups with mission-driven veteran peers
• Gain Confidence & Knowledge: Master the entrepreneurial process from ideation to venture creation
• Experience Real-World Pitching: Present your startup to actual investors
• Receive Priority for Acceleration: Direct path to Version Bravo accelerator with investment opportunity"
            type="what-you-gain"
          />
        </EditableSection>
      </div>

      {/* FAQ Section */}
      <EditableSection
        sectionName="FAQ"
        onEdit={() => handleEdit('faq')}
      >
        <FAQSection 
          faqs={faqs} 
          onEdit={(faq) => handleEdit('faq', faq)}
          onDelete={(faq) => handleDelete('faq', faq)}
        />
      </EditableSection>

      {/* Bottom Navigation */}
      <BottomNavigation currentPage="home" />

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
    </div>
  );
}

// Export directly - AdminProvider is already in the app layout
export default function AlphaBetHomepage() {
  return <AlphaBetHomepageContent />;
}