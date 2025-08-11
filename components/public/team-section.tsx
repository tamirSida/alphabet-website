'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  linkedinUrl?: string;
}

interface TeamSectionProps {
  members: TeamMember[];
  showAll?: boolean;
}

export default function TeamSection({ members, showAll = false }: TeamSectionProps) {
  const displayMembers = showAll ? members : members.slice(0, 3);

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 flex items-center justify-center mr-4 shadow-lg">
              <i className="fas fa-shield-alt text-2xl text-white"></i>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
              Meet the Team
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Mentors and Educators who are in-the-trenches with you
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {displayMembers.map((member, index) => (
            <div 
              key={member.id} 
              className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-3xl group"
            >
              {/* Profile Image */}
              <div className="relative mb-6">
                {member.image ? (
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-gray-200 shadow-xl border-4 border-white group-hover:border-gray-300 transition-colors">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center shadow-xl border-4 border-white group-hover:border-gray-300 transition-colors">
                    <span className="text-3xl font-bold text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                )}
                
                {/* Military Badge */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full border-2 border-white flex items-center justify-center shadow-lg">
                  <i className="fas fa-star text-white text-sm"></i>
                </div>
              </div>

              {/* Member Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                    {member.name}
                  </h3>
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-full text-sm font-semibold shadow-lg">
                    <i className="fas fa-medal mr-2"></i>
                    {member.role}
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed text-base px-2">
                  {member.bio}
                </p>

                {/* LinkedIn Button */}
                {member.linkedinUrl && (
                  <div className="pt-4 border-t border-gray-200">
                    <Link
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <i className="fab fa-linkedin mr-2"></i>
                      Connect
                    </Link>
                  </div>
                )}
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 left-4 w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="absolute top-4 right-4 w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>
          ))}
        </div>

        {/* Show All Button */}
        {!showAll && members.length > 3 && (
          <div className="text-center">
            <Link href="/team">
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-4 text-lg font-semibold bg-white border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg rounded-full"
              >
                <i className="fas fa-users mr-2"></i>
                Meet All Mentors
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}