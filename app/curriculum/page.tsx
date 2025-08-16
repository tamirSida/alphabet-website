'use client';

import { useState, useEffect, useCallback } from 'react';
import CurriculumTimeline from '@/components/public/curriculum-timeline';
import SEOHead from '@/components/seo/SEOHead';
import BottomNavigation from '@/components/public/bottom-navigation';
import DiscreteAdminAccess, { DiscreteAdminDot, useUrlAdminAccess } from '@/components/admin/discrete-access';
import EditableSection from '@/components/admin/editable-section';
import SimpleAdminToggle from '@/components/admin/simple-admin-toggle';
import EditModal from '@/components/admin/edit-modal';
import { CMSServiceFactory } from '@/lib/cms/content-services';
import { CurriculumItem } from '@/lib/types/cms';

export default function CurriculumPage() {
  const [curriculum, setCurriculum] = useState<CurriculumItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editingType, setEditingType] = useState<'curriculum' | 'header' | 'cta'>('curriculum');

  // Enable URL-based admin access
  useUrlAdminAccess();

  const loadContent = useCallback(async () => {
    try {
      setLoading(true);
      const curriculumData = await CMSServiceFactory.getCurriculumService().getVisible();
      setCurriculum(curriculumData);
    } catch (error) {
      console.error('Error loading curriculum content:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleEdit = useCallback((item?: CurriculumItem) => {
    setEditingItem(item);
    setEditingType('curriculum');
    setEditModalOpen(true);
  }, []);

  const handleEditHeader = useCallback(() => {
    const defaultHeader = {
      type: 'header',
      badge: '10-WEEK CURRICULUM',
      title: 'The Alpha-Bet Program',
      description: 'A practical MBA for founders, designed to turn your idea into a viable business.'
    };
    setEditingItem(defaultHeader);
    setEditingType('header');
    setEditModalOpen(true);
  }, []);

  const handleEditCTA = useCallback(() => {
    const defaultCTA = {
      type: 'cta',
      title: 'Your Entrepreneurial Journey Awaits',
      description: 'Transform 10 weeks of intensive learning into a lifetime of entrepreneurial success. Each week builds on the last, creating a comprehensive foundation for your startup journey.',
      primaryButtonText: 'Start Your Journey',
      secondaryButtonText: '10-Week Program'
    };
    setEditingItem(defaultCTA);
    setEditingType('cta');
    setEditModalOpen(true);
  }, []);

  const handleSave = useCallback(async (data: any) => {
    try {
      if (editingType === 'header') {
        // Save header data (for now, just log - in full implementation would save to CMS)
        console.log('Saving curriculum header data:', data);
      } else if (editingType === 'cta') {
        // Save CTA data (for now, just log - in full implementation would save to CMS)
        console.log('Saving curriculum CTA data:', data);
      } else {
        // Save curriculum week data
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
        await loadContent();
      }
    } catch (error) {
      console.error('Error saving:', error);
      throw error;
    }
  }, [editingItem, editingType, loadContent]);

  const getEditFields = () => {
    if (editingType === 'header') {
      return [
        { key: 'badge', label: 'Badge Text', type: 'text' as const, required: true, placeholder: 'e.g., 10-WEEK CURRICULUM' },
        { key: 'title', label: 'Main Title', type: 'text' as const, required: true, placeholder: 'e.g., The Alpha-Bet Program' },
        { key: 'description', label: 'Description', type: 'textarea' as const, required: true, placeholder: 'Enter section description...' }
      ];
    } else if (editingType === 'cta') {
      return [
        { key: 'title', label: 'CTA Title', type: 'text' as const, required: true, placeholder: 'e.g., Your Entrepreneurial Journey Awaits' },
        { key: 'description', label: 'CTA Description', type: 'textarea' as const, required: true, placeholder: 'Enter CTA description...' },
        { key: 'primaryButtonText', label: 'Primary Button Text', type: 'text' as const, required: true, placeholder: 'e.g., Start Your Journey' },
        { key: 'secondaryButtonText', label: 'Secondary Button Text', type: 'text' as const, required: true, placeholder: 'e.g., 10-Week Program' }
      ];
    }
    return [
      { key: 'weekNumber', label: 'Week Number', type: 'number' as const, required: true, placeholder: '1-10' },
      { key: 'title', label: 'Title', type: 'text' as const, required: true, placeholder: 'Enter week title' },
      { key: 'description', label: 'Description', type: 'textarea' as const, required: true, placeholder: 'Enter week description...' },
      { key: 'icon', label: 'Font Awesome Icon', type: 'text' as const, required: false, placeholder: 'e.g., fas fa-rocket' }
    ];
  };

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="10-Week Curriculum - Alpha-Bet Entrepreneurship Program"
        description="Explore Alpha-Bet's comprehensive 10-week curriculum: From idea to business plan. Learn lean methodology, customer discovery, networking, market analysis, and presentation skills designed for combat veterans."
        keywords={[
          '10-week entrepreneurship curriculum',
          'startup curriculum veterans',
          'business training program',
          'lean methodology training',
          'customer discovery course',
          'business plan development',
          'startup accelerator curriculum',
          'entrepreneur training syllabus',
          'military entrepreneur education',
          'veteran business course'
        ]}
        canonical="/curriculum"
      />
      <div className="relative">
        {/* Discrete Admin Access Components */}
        <DiscreteAdminAccess />
        <DiscreteAdminDot />
        <SimpleAdminToggle />
        

        {/* Curriculum Timeline */}
        <CurriculumTimeline 
          items={curriculum} 
          onEdit={(item) => handleEdit(item)}
          onEditHeader={handleEditHeader}
          onEditCTA={handleEditCTA}
        />

        {/* Bottom Navigation */}
        <BottomNavigation currentPage="curriculum" />

        {/* Edit Modal */}
        <EditModal
          key={editingItem?.id || 'new'}
          isOpen={editModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setEditingItem(null);
          }}
          onSave={handleSave}
          title={editingType === 'header' ? "Edit Curriculum Header" : editingType === 'cta' ? "Edit Curriculum CTA" : "Edit Curriculum Week"}
          fields={getEditFields()}
          initialData={editingItem}
          loading={loading}
        />
      </div>
    </>
  );
}