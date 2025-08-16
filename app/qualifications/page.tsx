'use client';

import { useState, useEffect, useCallback } from 'react';
import WhoShouldApplySection from '@/components/public/who-should-apply-section';
import BottomNavigation from '@/components/public/bottom-navigation';
import DiscreteAdminAccess, { DiscreteAdminDot, useUrlAdminAccess } from '@/components/admin/discrete-access';
import EditableSection from '@/components/admin/editable-section';
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

  // Enable URL-based admin access
  useUrlAdminAccess();

  const loadContent = useCallback(async () => {
    try {
      setLoading(true);
      const qualificationData = await CMSServiceFactory.getQualificationService().getVisible();
      setQualifications(qualificationData);
    } catch (error) {
      console.error('Error loading qualifications content:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleEdit = useCallback((item?: Qualification) => {
    setEditingItem(item);
    setEditModalOpen(true);
  }, []);

  const handleSave = useCallback(async (data: any) => {
    try {
      if (editingItem && editingItem.id && !editingItem.id.startsWith('qual-')) {
        await CMSServiceFactory.getQualificationService().update(editingItem.id, data);
      } else {
        const qualificationData = {
          ...data,
          isVisible: true,
          order: data.order || qualifications.length + 1
        };
        await CMSServiceFactory.getQualificationService().create(qualificationData);
      }
      
      await loadContent();
    } catch (error) {
      console.error('Error saving:', error);
      throw error;
    }
  }, [editingItem, qualifications.length, loadContent]);

  const getEditFields = () => [
    { key: 'title', label: 'Title', type: 'text' as const, required: true, placeholder: 'e.g., Combat Veteran Status' },
    { key: 'description', label: 'Description', type: 'textarea' as const, required: true, placeholder: 'Enter qualification description...' },
    { key: 'icon', label: 'Font Awesome Icon', type: 'text' as const, required: false, placeholder: 'e.g., fas fa-shield-alt' },
    { key: 'order', label: 'Order', type: 'number' as const, required: true, placeholder: '1-5' }
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
      
      {/* Page Header */}
      <section className="py-16 sm:py-24 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span className="text-white/80 text-sm font-medium tracking-wide">ELIGIBILITY REQUIREMENTS</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Who Should Apply?
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're looking for exceptional combat veterans ready to transform their military experience into entrepreneurial success.
          </p>
        </div>
      </section>

      {/* Qualifications Section */}
      <EditableSection
        sectionName="Qualifications"
        onEdit={() => handleEdit()}
      >
        <WhoShouldApplySection 
          qualifications={qualifications} 
          onEdit={(qualification) => handleEdit(qualification)}
        />
      </EditableSection>

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
        title="Edit Qualification"
        fields={getEditFields()}
        initialData={editingItem}
        loading={loading}
      />
    </div>
  );
}