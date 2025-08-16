'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import TeamSection from '@/components/public/team-section';
import SEOHead from '@/components/seo/SEOHead';
import BottomNavigation from '@/components/public/bottom-navigation';
import DiscreteAdminAccess, { DiscreteAdminDot, useUrlAdminAccess } from '@/components/admin/discrete-access';
import EditableSection from '@/components/admin/editable-section';
import SimpleAdminToggle from '@/components/admin/simple-admin-toggle';
import EditModal from '@/components/admin/edit-modal';
import { CMSServiceFactory } from '@/lib/cms/content-services';
import { TeamMember, TeamHeader } from '@/lib/types/cms';

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editingType, setEditingType] = useState<'member' | 'header'>('member');

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
    setEditingType('member');
    setEditModalOpen(true);
  }, []);

  const handleEditHeader = useCallback(() => {
    // For now, use default header data. In a full implementation, load from CMS
    const defaultHeader = {
      id: 'team-header-1',
      label: "LEADERSHIP TEAM",
      title: "Meet the Team",
      description: "Battle-tested leaders and mentors who understand your journey and are committed to your success",
      isVisible: true,
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date()
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
        // await CMSServiceFactory.getTeamHeaderService().update('team-header-1', data);
      } else {
        // Save team member data
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
      }
    } catch (error) {
      console.error('Error saving:', error);
      throw error;
    }
  }, [editingItem, editingType, teamMembers.length, loadContent]);

  const handleDelete = useCallback(async (memberId: string) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      try {
        await CMSServiceFactory.getTeamMemberService().delete(memberId);
        await loadContent();
      } catch (error) {
        console.error('Error deleting:', error);
        throw error;
      }
    }
  }, [loadContent]);

  const memberFields = useMemo(() => [
    { key: 'name', label: 'Name', type: 'text' as const, required: true, placeholder: 'Enter full name' },
    { key: 'title', label: 'Title/Position', type: 'text' as const, required: false, placeholder: 'e.g., Co-Founder, Director, Lead' },
    { key: 'role', label: 'Role (for compatibility)', type: 'text' as const, required: true, placeholder: 'e.g., Founder, Mentor, Advisor' },
    { key: 'military', label: 'Military Background', type: 'text' as const, required: false, placeholder: 'e.g., Navy SEALs, IDF Paratrooper, or N/A' },
    { key: 'bio', label: 'Biography', type: 'textarea' as const, required: false, placeholder: 'Enter biography...' },
    { key: 'image', label: 'Profile Image (URL or path)', type: 'text' as const, required: false, placeholder: '/team/image.jpg or https://...' },
    { key: 'linkedinUrl', label: 'LinkedIn Profile URL', type: 'url' as const, required: false, placeholder: 'https://linkedin.com/in/...' },
    { key: 'isFounder', label: 'Is Founder? (true/false)', type: 'text' as const, required: false, placeholder: 'true or false' }
  ], []);

  const headerFields = useMemo(() => [
    { key: 'label', label: 'Section Label', type: 'text' as const, required: true, placeholder: 'e.g., LEADERSHIP TEAM' },
    { key: 'title', label: 'Section Title', type: 'text' as const, required: true, placeholder: 'e.g., Meet the Team' },
    { key: 'description', label: 'Section Description', type: 'textarea' as const, required: true, placeholder: 'Enter section description...' }
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
    <>
      <SEOHead
        title="Meet Our Team - Alpha-Bet Leadership & Mentors"
        description="Meet the Alpha-Bet team: Combat veterans, successful entrepreneurs, and business leaders who mentor participants in our veteran entrepreneurship program. Learn from battle-tested leaders."
        keywords={[
          'Alpha-Bet team',
          'veteran mentors',
          'military entrepreneur mentors',
          'veteran business leaders',
          'combat veteran entrepreneurs',
          'startup mentors veterans',
          'military leadership team',
          'veteran advisor network',
          'entrepreneur mentorship',
          'business mentor veterans'
        ]}
        canonical="/team"
      />
      <div className="relative">
        {/* Discrete Admin Access Components */}
        <DiscreteAdminAccess />
        <DiscreteAdminDot />
        <SimpleAdminToggle />
        
        {/* Team Section */}
        <TeamSection members={teamMembers} onEdit={handleEdit} onDelete={handleDelete} onEditHeader={handleEditHeader} />

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
          title={editingType === 'header' ? "Edit Team Section Header" : (editingItem?.name ? `Edit ${editingItem.name}` : "Add New Team Member")}
          fields={editingType === 'header' ? headerFields : memberFields}
          initialData={editingItem}
          loading={loading}
        />
      </div>
    </>
  );
}