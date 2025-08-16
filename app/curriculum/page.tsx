'use client';

import { useState, useEffect, useCallback } from 'react';
import CurriculumTimeline from '@/components/public/curriculum-timeline';
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
    setEditModalOpen(true);
  }, []);

  const handleSave = useCallback(async (data: any) => {
    try {
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
    } catch (error) {
      console.error('Error saving:', error);
      throw error;
    }
  }, [editingItem, loadContent]);

  const getEditFields = () => [
    { key: 'weekNumber', label: 'Week Number', type: 'number' as const, required: true, placeholder: '1-10' },
    { key: 'title', label: 'Title', type: 'text' as const, required: true, placeholder: 'Enter week title' },
    { key: 'description', label: 'Description', type: 'textarea' as const, required: true, placeholder: 'Enter week description...' },
    { key: 'icon', label: 'Font Awesome Icon', type: 'text' as const, required: false, placeholder: 'e.g., fas fa-rocket' }
  ];

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
    <div className="relative">
      {/* Discrete Admin Access Components */}
      <DiscreteAdminAccess />
      <DiscreteAdminDot />
      <SimpleAdminToggle />
      

      {/* Curriculum Timeline */}
      <EditableSection
        sectionName="Curriculum Timeline"
        onEdit={() => handleEdit()}
      >
        <CurriculumTimeline 
          items={curriculum} 
          onEdit={(item) => handleEdit(item)}
        />
      </EditableSection>

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
        title="Edit Curriculum Week"
        fields={getEditFields()}
        initialData={editingItem}
        loading={loading}
      />
    </div>
  );
}