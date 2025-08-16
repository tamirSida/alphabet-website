'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import WhoShouldApplySection from '@/components/public/who-should-apply-section';
import BottomNavigation from '@/components/public/bottom-navigation';
import DiscreteAdminAccess, { DiscreteAdminDot, useUrlAdminAccess } from '@/components/admin/discrete-access';
import SimpleAdminToggle from '@/components/admin/simple-admin-toggle';
import EditModal from '@/components/admin/edit-modal';
import { CMSServiceFactory } from '@/lib/cms/content-services';
import { Qualification } from '@/lib/types/cms';

export default function QualificationsPage() {
  const [qualifications, setQualifications] = useState<Qualification[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editingType, setEditingType] = useState<'qualification' | 'header'>('qualification');

  // Enable URL-based admin access
  useUrlAdminAccess();

  const loadContent = useCallback(async () => {
    try {
      setLoading(true);
      const qualificationData = await CMSServiceFactory.getQualificationService().getAll();
      setQualifications(qualificationData);
    } catch (error) {
      console.error('Error loading qualifications content:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleEdit = useCallback((item?: Qualification) => {
    setEditingItem(item);
    setEditingType('qualification');
    setEditModalOpen(true);
  }, []);

  const handleEditHeader = useCallback(() => {
    const defaultHeader = {
      type: 'header',
      subtitle: 'QUALIFICATION CRITERIA',
      title: 'Who Should Apply?',
      description: "We're looking for exceptional veterans ready to transform their military experience into entrepreneurial success."
    };
    setEditingItem(defaultHeader);
    setEditingType('header');
    setEditModalOpen(true);
  }, []);

  const handleSave = useCallback(async (data: any) => {
    try {
      if (editingType === 'header') {
        // Save header data (for now, just log - in full implementation would save to CMS)
        console.log('Saving header data:', data);
      } else {
        // Save qualification data
        if (editingItem && editingItem.id && !editingItem.id.startsWith('qual-')) {
          // Update existing CMS qualification
          await CMSServiceFactory.getQualificationService().update(editingItem.id, data);
        } else {
          // Create new qualification
          const qualificationData = {
            ...data,
            isVisible: true,
            order: data.order || qualifications.length + 1
          };
          await CMSServiceFactory.getQualificationService().create(qualificationData);
        }
        await loadContent();
      }
    } catch (error) {
      console.error('Error saving:', error);
      throw error;
    }
  }, [editingItem, editingType, qualifications.length, loadContent]);

  const qualificationFields = useMemo(() => [
    { key: 'title', label: 'Title', type: 'text' as const, required: true, placeholder: 'e.g., Combat Veteran Status' },
    { key: 'description', label: 'Description', type: 'textarea' as const, required: true, placeholder: 'Enter qualification description...' },
    { key: 'icon', label: 'Font Awesome Icon', type: 'text' as const, required: false, placeholder: 'e.g., fas fa-shield-alt' },
    { key: 'order', label: 'Order', type: 'number' as const, required: true, placeholder: '1-5' }
  ], []);

  const headerFields = useMemo(() => [
    { key: 'subtitle', label: 'Badge Text', type: 'text' as const, required: true, placeholder: 'e.g., QUALIFICATION CRITERIA' },
    { key: 'title', label: 'Main Heading', type: 'text' as const, required: true, placeholder: 'e.g., Who Should Apply?' },
    { key: 'description', label: 'Description', type: 'textarea' as const, required: true, placeholder: 'Enter section description...' }
  ], []);

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
      
      {/* Qualifications Section */}
      <WhoShouldApplySection 
        qualifications={qualifications} 
        onEdit={handleEdit}
        onEditHeader={handleEditHeader}
      />

      {/* Bottom Navigation */}
      <BottomNavigation currentPage="qualifications" />

      {/* Edit Modal */}
      <EditModal
        key={editingItem?.id || 'new'}
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSave}
        title={editingType === 'header' ? "Edit Qualifications Section Header" : (editingItem?.title ? `Edit ${editingItem.title}` : "Add New Qualification")}
        fields={editingType === 'header' ? headerFields : qualificationFields}
        initialData={editingItem}
        loading={loading}
      />
    </div>
  );
}