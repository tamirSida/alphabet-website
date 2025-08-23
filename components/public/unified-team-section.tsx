'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAdmin } from '@/lib/cms/admin-context';
import { TeamMember } from '@/lib/types/cms';

interface UnifiedTeamSectionProps {
  teamMembers: TeamMember[];
  onEdit?: (member?: TeamMember) => void;
  onDelete?: (memberId: string) => void;
  onEditHeader?: () => void;
}

export default function UnifiedTeamSection({ teamMembers, onEdit, onDelete, onEditHeader }: UnifiedTeamSectionProps) {
  const { isAdminMode } = useAdmin();
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  // Use only the provided team members from database
  const displayMembers = teamMembers;

  const formatTitles = (titles: any[]) => {
    if (!titles || titles.length === 0) return '';
    return titles.map(titleObj => {
      if (typeof titleObj === 'string') return titleObj;
      return titleObj.organization 
        ? `${titleObj.title}, ${titleObj.organization}`
        : titleObj.title;
    }).join(' • ');
  };

  return (
    <section className="py-16 sm:py-24 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.15),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05),transparent_50%)]"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 relative group">
          {/* Header Edit Button */}
          {isAdminMode && onEditHeader && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onEditHeader();
              }}
              className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 hover:bg-blue-400 text-white rounded-full flex items-center justify-center text-xs transition-all shadow-lg hover:shadow-xl hover:scale-110 z-[100] opacity-0 group-hover:opacity-100"
              title="Edit header section"
            >
              <i className="fas fa-edit"></i>
            </button>
          )}

          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span className="text-white/80 text-sm font-medium tracking-wide">LEADERSHIP TEAM</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Alpha-Bet Team
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Battle-tested leaders and mentors who understand your journey and are committed to your success
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {displayMembers.map((member, index) => (
            <div
              key={member.id}
              className="relative group"
              onMouseEnter={() => setHoveredMember(member.id)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              {/* Admin Controls */}
              {isAdminMode && (
                <div className="absolute -top-2 -right-2 flex gap-2 z-[100] opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (onEdit) onEdit(member);
                    }}
                    className="w-8 h-8 bg-green-500 hover:bg-green-400 text-white rounded-full flex items-center justify-center text-xs transition-all shadow-lg hover:shadow-xl hover:scale-110"
                    title="Edit team member"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (onDelete) onDelete(member.id);
                    }}
                    className="w-8 h-8 bg-red-500 hover:bg-red-400 text-white rounded-full flex items-center justify-center text-xs transition-all shadow-lg hover:shadow-xl hover:scale-110"
                    title="Delete team member"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              )}

              <div className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl h-full transition-all duration-300 ${
                hoveredMember === member.id ? 'bg-white/15 scale-105' : 'hover:bg-white/12'
              }`}>
                {/* Profile Image */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-xl">
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/team/placeholder.jpg';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <i className="fas fa-user text-white text-2xl"></i>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Member Info */}
                <div className="text-center">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                    {member.name}
                  </h3>

                  {/* Multiple Titles */}
                  <div className="space-y-2 mb-4">
                    {Array.isArray(member.titles) && member.titles.length > 0 ? (
                      member.titles.map((titleObj, titleIndex) => (
                        <div key={titleObj.id || titleIndex} className="inline-flex items-center justify-center">
                          <span className="bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/15 transition-colors">
                            {titleObj.organization 
                              ? `${titleObj.title}, ${titleObj.organization}`
                              : titleObj.title}
                          </span>
                        </div>
                      ))
                    ) : member.role ? (
                      <div className="inline-flex items-center justify-center">
                        <span className="bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm font-medium text-gray-200">
                          {member.role}
                        </span>
                      </div>
                    ) : null}
                  </div>

                  {/* Military Background */}
                  {member.military && (
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <i className="fas fa-medal text-yellow-400 text-sm"></i>
                      <span className="text-sm text-gray-300">{member.military}</span>
                    </div>
                  )}

                  {/* LinkedIn Link */}
                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                    >
                      <i className="fab fa-linkedin text-lg"></i>
                      <span>Connect on LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Add New Member Button */}
          {isAdminMode && (
            <div className="relative group">
              <button
                onClick={() => onEdit && onEdit()}
                className="w-full h-full min-h-[400px] bg-white/5 backdrop-blur-md rounded-2xl border-2 border-dashed border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300 flex flex-col items-center justify-center gap-4 text-white/60 hover:text-white/80"
              >
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-current flex items-center justify-center">
                  <i className="fas fa-plus text-2xl"></i>
                </div>
                <span className="text-lg font-medium">Add Team Member</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}