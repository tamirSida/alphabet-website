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

  // State to store the current content for each section
  const [sectionContent, setSectionContent] = useState({
    mission: "You've demonstrated courage, discipline, and leadership in the most challenging environments. Now, we're here to help you apply those same traits to the world of entrepreneurship.\n\n• Bridge military experience with entrepreneurial skills\n• Get practical MBA-level education designed for founders  \n• Join a community of battle-tested veteran entrepreneurs\n• Create lasting impact through veteran-led innovation",
    'why-alpha-bet': "This isn't a traditional classroom. This is a community of like-minded individuals who share your unique experiences and understand the 'battle-tested' approach to problem-solving.\n\n• Proven Network: Access to Version Bravo ecosystem with US and Israeli operators\n• Veteran-to-Veteran Mentorship: Learn from successful entrepreneur combat veterans\n• Fast-Track to Success: Priority application to Version Bravo accelerator with investment",
    'what-you-gain': "Transform your military experience into entrepreneurial success through our comprehensive 10-week program.\n\n• Build a Strong Team: Connect and develop startups with mission-driven veteran peers\n• Gain Confidence & Knowledge: Master the entrepreneurial process from ideation to venture creation\n• Experience Real-World Pitching: Present your startup to actual investors\n• Receive Priority for Acceleration: Direct path to Version Bravo accelerator with investment opportunity"
  });

  // Enable URL-based admin access
  useUrlAdminAccess();

  const updateContentSection = useCallback((sectionType: string, newContent: string) => {
    console.log(`Updating ${sectionType} content:`, newContent);
    setSectionContent(prev => ({
      ...prev,
      [sectionType]: newContent
    }));
  }, []);

  const saveContentToDatabase = useCallback(async (sectionType: string, newContent: string) => {
    try {
      // Check if content section already exists in CMS
      const existingContent = contentSections.find(section => section.type === sectionType);
      
      const contentData = {
        title: sectionType === 'mission' ? 'Our Mission' :
               sectionType === 'why-alpha-bet' ? 'Why Alpha-Bet?' :
               sectionType === 'what-you-gain' ? 'What You\'ll Gain' : 'Content Section',
        content: newContent,
        type: sectionType as 'mission' | 'why-alpha-bet' | 'what-you-gain',
        isVisible: true,
        order: existingContent?.order || (contentSections.length + 1)
      };

      if (existingContent && existingContent.id) {
        // Update existing content section
        await CMSServiceFactory.getContentSectionService().update(existingContent.id, contentData);
        console.log(`Updated existing ${sectionType} content in database`);
      } else {
        // Create new content section
        await CMSServiceFactory.getContentSectionService().create(contentData);
        console.log(`Created new ${sectionType} content in database`);
      }
    } catch (error) {
      console.error(`Error saving ${sectionType} content to database:`, error);
      throw error;
    }
  }, [contentSections]);

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
      
      // Load CMS content into local state for sections that exist
      setSectionContent(prev => {
        const newSectionContent = { ...prev };
        contentData.forEach(section => {
          if (section.type && section.content && ['mission', 'why-alpha-bet', 'what-you-gain'].includes(section.type)) {
            newSectionContent[section.type as keyof typeof prev] = section.content;
          }
        });
        return newSectionContent;
      });
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

  // Granular content section handlers
  const handleEditBrief = useCallback((sectionType: string) => {
    const currentContent = sectionContent[sectionType as keyof typeof sectionContent];
    const intro = currentContent.split('\n\n')[0] || currentContent.split('\n')[0] || '';
    setEditingType('brief');
    setEditingItem({
      type: sectionType,
      text: intro.trim()
    });
    setEditModalOpen(true);
  }, [sectionContent]);

  const handleEditHighlight = useCallback((sectionType: string, highlight?: any, index?: number) => {
    setEditingType('highlight');
    setEditingItem({
      type: sectionType,
      highlight,
      index,
      text: highlight?.text || ''
    });
    setEditModalOpen(true);
  }, []);

  const handleDeleteHighlight = useCallback(async (sectionType: string, highlight: any, index: number) => {
    if (confirm('Are you sure you want to delete this highlight?')) {
      try {
        const currentContent = sectionContent[sectionType as keyof typeof sectionContent];
        // Parse current content and remove the highlight
        const sections = currentContent.split('\n\n');
        const bullets = sections.flatMap(section => 
          section.split('\n').filter(line => 
            line.trim().startsWith('•') || line.trim().startsWith('-')
          )
        );
        
        // Remove the highlight at the specified index
        bullets.splice(index, 1);
        
        // Reconstruct content
        const intro = sections.find(section => 
          !section.includes('•') && !section.includes('-')
        ) || '';
        
        const newContent = intro.trim() + '\n\n' + bullets.join('\n');
        
        // Save to database
        await saveContentToDatabase(sectionType, newContent);
        
        // Update local state
        updateContentSection(sectionType, newContent);
      } catch (error) {
        console.error('Error deleting highlight:', error);
        alert('Failed to delete highlight. Please try again.');
      }
    }
  }, [sectionContent, updateContentSection, saveContentToDatabase]);

  const handleAddHighlight = useCallback((sectionType: string) => {
    setEditingType('highlight');
    setEditingItem({
      type: sectionType,
      isNew: true,
      text: ''
    });
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
        if (editingItem && editingItem.id) {
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
      } else if (editingType === 'brief') {
        // Handle mission brief editing
        const sectionType = editingItem.type;
        const currentContent = sectionContent[sectionType as keyof typeof sectionContent];
        const sections = currentContent.split('\n\n');
        const bullets = sections.filter(section => section.includes('•') || section.includes('-'));
        
        // Update with new brief + existing bullets
        const newContent = data.text.trim() + (bullets.length > 0 ? '\n\n' + bullets.join('\n\n') : '');
        
        // Save to database
        await saveContentToDatabase(sectionType, newContent);
        
        // Update local state
        updateContentSection(sectionType, newContent);
      } else if (editingType === 'highlight') {
        // Handle individual highlight editing
        const { type: sectionType, isNew, index } = editingItem;
        const currentContent = sectionContent[sectionType as keyof typeof sectionContent];
        const sections = currentContent.split('\n\n');
        const intro = sections.find(section => !section.includes('•') && !section.includes('-')) || '';
        const bullets = sections.flatMap(section => 
          section.split('\n').filter(line => 
            line.trim().startsWith('•') || line.trim().startsWith('-')
          )
        );
        
        if (isNew) {
          // Add new highlight
          bullets.push('• ' + data.text.trim());
        } else if (typeof index === 'number') {
          // Edit existing highlight
          bullets[index] = '• ' + data.text.trim();
        }
        
        // Reconstruct content
        const newContent = intro.trim() + '\n\n' + bullets.join('\n');
        
        // Save to database
        await saveContentToDatabase(sectionType, newContent);
        
        // Update local state
        updateContentSection(sectionType, newContent);
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
  }, [editingType, editingItem, contentSections.length, faqs.length, loadContent]);

  const getEditFields = useCallback((type: string) => {
    switch (type) {
      case 'hero':
        return [
          { key: 'headline', label: 'Headline', type: 'text' as const, required: true, placeholder: 'Enter the main headline' },
          { key: 'subHeadline', label: 'Sub-headline', type: 'textarea' as const, required: true, placeholder: 'Enter the sub-headline description' },
          { key: 'ctaText', label: 'Call-to-Action Text', type: 'text' as const, required: true, placeholder: 'e.g., Apply Now' },
          { key: 'ctaLink', label: 'Call-to-Action Link', type: 'text' as const, required: true, placeholder: '/curriculum or https://...' },
          { key: 'backgroundImage', label: 'Background Image URL', type: 'url' as const, required: false, placeholder: 'https://...' }
        ];
      case 'content':
        return [
          { key: 'title', label: 'Title', type: 'text' as const, required: true, placeholder: 'Enter section title' },
          { key: 'content', label: 'Content', type: 'textarea' as const, required: true, placeholder: 'Enter section content...' },
          { key: 'type', label: 'Section Type', type: 'text' as const, required: true, placeholder: 'e.g., mission, why-alpha-bet, what-you-gain' }
        ];
      case 'brief':
        return [
          { key: 'text', label: 'Mission Brief', type: 'textarea' as const, required: true, placeholder: 'Enter the mission brief description...' }
        ];
      case 'highlight':
        return [
          { key: 'text', label: 'Highlight Text', type: 'textarea' as const, required: true, placeholder: 'Enter the key highlight...' }
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
    subHeadline: "Alpha-Bet is an entrepreneurship program for US and Israeli combat veterans, designed to equip you with the skills, network, and battle-tested mindset to build a successful startup. It's time to channel your experience into innovation.",
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
          onEdit={() => handleEdit('hero', activeHero)}
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
            content={sectionContent.mission}
            type="mission"
            onEditBrief={() => handleEditBrief('mission')}
            onEditHighlight={(highlight, index) => handleEditHighlight('mission', highlight, index)}
            onDeleteHighlight={(highlight, index) => handleDeleteHighlight('mission', highlight, index)}
            onAddHighlight={() => handleAddHighlight('mission')}
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
            content={sectionContent['why-alpha-bet']}
            type="why-alpha-bet"
            onEditBrief={() => handleEditBrief('why-alpha-bet')}
            onEditHighlight={(highlight, index) => handleEditHighlight('why-alpha-bet', highlight, index)}
            onDeleteHighlight={(highlight, index) => handleDeleteHighlight('why-alpha-bet', highlight, index)}
            onAddHighlight={() => handleAddHighlight('why-alpha-bet')}
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
            content={sectionContent['what-you-gain']}
            type="what-you-gain"
            onEditBrief={() => handleEditBrief('what-you-gain')}
            onEditHighlight={(highlight, index) => handleEditHighlight('what-you-gain', highlight, index)}
            onDeleteHighlight={(highlight, index) => handleDeleteHighlight('what-you-gain', highlight, index)}
            onAddHighlight={() => handleAddHighlight('what-you-gain')}
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