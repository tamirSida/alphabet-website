'use client';

import { useState, useEffect, useCallback } from 'react';
import TeamSection from '@/components/public/team-section';
import BottomNavigation from '@/components/public/bottom-navigation';
import DiscreteAdminAccess, { DiscreteAdminDot, useUrlAdminAccess } from '@/components/admin/discrete-access';
import EditableSection from '@/components/admin/editable-section';
import SimpleAdminToggle from '@/components/admin/simple-admin-toggle';
import EditModal from '@/components/admin/edit-modal';
import { CMSServiceFactory } from '@/lib/cms/content-services';
import { TeamMember } from '@/lib/types/cms';

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Enable URL-based admin access
  useUrlAdminAccess();

  const loadContent = useCallback(async () => {
    try {
      setLoading(true);
      const teamData = await CMSServiceFactory.getTeamMemberService().getFeaturedMembers();
      setTeamMembers(teamData);
    } catch (error) {
      console.error('Error loading team content:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleEdit = useCallback((item?: TeamMember) => {
    setEditingItem(item);
    setEditModalOpen(true);
  }, []);

  const handleSave = useCallback(async (data: any) => {
    try {
      if (editingItem) {
        await CMSServiceFactory.getTeamMemberService().update(editingItem.id, data);
      } else {
        const teamData = {
          ...data,
          isVisible: true,
          order: teamMembers.length + 1
        };
        await CMSServiceFactory.getTeamMemberService().create(teamData);
      }
      
      await loadContent();
    } catch (error) {
      console.error('Error saving:', error);
      throw error;
    }
  }, [editingItem, teamMembers.length, loadContent]);

  const getEditFields = () => [
    { key: 'name', label: 'Name', type: 'text' as const, required: true, placeholder: 'Enter full name' },
    { key: 'role', label: 'Role', type: 'text' as const, required: true, placeholder: 'e.g., Founder, Mentor, Advisor' },
    { key: 'bio', label: 'Biography', type: 'textarea' as const, required: true, placeholder: 'Enter biography...' },
    { key: 'image', label: 'Profile Image URL', type: 'url' as const, required: false, placeholder: 'https://...' },
    { key: 'linkedinUrl', label: 'LinkedIn Profile URL', type: 'url' as const, required: false, placeholder: 'https://linkedin.com/in/...' }
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
      
      {/* Team Section */}
      <EditableSection
        sectionName="Team"
        onEdit={() => handleEdit()}
      >
        <TeamSection members={teamMembers} />
      </EditableSection>

      {/* Bottom Navigation */}
      <BottomNavigation currentPage="team" />

      {/* Edit Modal */}
      <EditModal
        key={editingItem?.id || 'new'}
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSave}
        title="Edit Team Member"
        fields={getEditFields()}
        initialData={editingItem}
        loading={loading}
      />
    </div>
  );
}