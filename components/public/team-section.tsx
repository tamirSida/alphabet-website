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
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-950 mb-4">
            Meet the Team
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Mentors and Educators who are in-the-trenches with you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayMembers.map((member) => (
            <div key={member.id} className="bg-gray-50 rounded-xl p-6 text-center">
              {member.image && (
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {!member.image && (
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-600">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              )}
              <h3 className="text-xl font-semibold text-blue-950 mb-1">
                {member.name}
              </h3>
              <p className="text-sm font-medium text-gray-600 mb-3">
                {member.role}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {member.bio}
              </p>
              {member.linkedinUrl && (
                <div className="mt-4">
                  <Link
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                  >
                    LinkedIn Profile
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>

        {!showAll && members.length > 3 && (
          <div className="text-center">
            <Link href="/team">
              <Button variant="outline" size="lg">
                Meet the Mentors
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}