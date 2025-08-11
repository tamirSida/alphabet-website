'use client';

import { useAdmin } from '@/lib/cms/admin-context';

interface Qualification {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  isVisible?: boolean;
}

interface WhoShouldApplySectionProps {
  qualifications: Qualification[];
  onEdit?: (qualification?: Qualification) => void;
}

export default function WhoShouldApplySection({ qualifications, onEdit }: WhoShouldApplySectionProps) {
  const { isAdminMode } = useAdmin();

  // Default qualifications if no CMS data
  const defaultQualifications: Qualification[] = [
    {
      id: 'qual-1',
      title: 'Combat Veteran Status',
      description: 'A combat veteran of the US or Israel.',
      icon: 'fas fa-shield-alt',
      order: 1,
      isVisible: true
    },
    {
      id: 'qual-2', 
      title: 'Ready for Transition',
      description: 'Post-service and ready to transition your skills into the business world.',
      icon: 'fas fa-exchange-alt',
      order: 2,
      isVisible: true
    },
    {
      id: 'qual-3',
      title: 'Entrepreneurship Interest',
      description: 'Interested in entrepreneurship and seeking the foundational knowledge to get started.',
      icon: 'fas fa-lightbulb',
      order: 3,
      isVisible: true
    },
    {
      id: 'qual-4',
      title: 'Ideation Phase',
      description: 'In the ideation phase, whether you have a business idea or are looking to find a partner and develop one.',
      icon: 'fas fa-brain',
      order: 4,
      isVisible: true
    },
    {
      id: 'qual-5',
      title: 'Program Commitment',
      description: 'Committed to a rigorous, 10-week online program of training and practical workshops.',
      icon: 'fas fa-calendar-check',
      order: 5,
      isVisible: true
    }
  ];

  // Merge CMS qualifications with defaults
  const mergeQualificationsWithDefaults = () => {
    const merged = [...defaultQualifications];
    
    qualifications.forEach(cmsQual => {
      const defaultIndex = merged.findIndex(defaultQual => 
        defaultQual.order === cmsQual.order
      );
      if (defaultIndex !== -1) {
        merged[defaultIndex] = cmsQual;
      } else {
        merged.push(cmsQual);
      }
    });
    
    return merged.filter(qual => qual.isVisible !== false).sort((a, b) => a.order - b.order);
  };

  const displayQualifications = mergeQualificationsWithDefaults();

  const handleEditClick = (qualification: Qualification, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(qualification);
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center mr-4 shadow-lg">
              <i className="fas fa-crosshairs text-2xl text-gray-700"></i>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Who Should Apply?
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            The Alpha-Bet program is for a select group of mission-driven veterans ready for their next challenge.
          </p>
        </div>

        {/* Qualifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayQualifications.map((qualification, index) => (
            <div
              key={qualification.id}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border-2 border-gray-600 p-6 sm:p-8 transform transition-all duration-300 hover:scale-105 hover:border-gray-400 group relative"
            >
              {/* Admin Edit Button */}
              {isAdminMode && (
                <button
                  onClick={(e) => handleEditClick(qualification, e)}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 hover:bg-green-400 text-white rounded-full flex items-center justify-center text-sm transition-colors shadow-lg z-10"
                  title="Edit this qualification"
                >
                  <i className="fas fa-edit"></i>
                </button>
              )}

              {/* Qualification Number Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-white text-gray-900 rounded-full flex items-center justify-center font-bold text-lg border-2 border-gray-300 shadow-lg">
                  {qualification.order}
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full border-2 border-gray-500 flex items-center justify-center group-hover:border-gray-400 transition-colors shadow-lg">
                  <i className={`${qualification.icon} text-2xl text-white`}></i>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white group-hover:text-gray-200 transition-colors leading-tight">
                  {qualification.title}
                </h3>
                
                <p className="text-gray-200 leading-relaxed">
                  {qualification.description}
                </p>
              </div>

              {/* Status Indicator */}
              <div className="mt-6 pt-6 border-t border-gray-600">
                <div className="flex items-center justify-between text-gray-400">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                    <span className="text-xs font-mono">REQUIRED</span>
                  </div>
                  <div className="text-xs font-mono">
                    QUALIFICATION #{qualification.order}
                  </div>
                </div>
              </div>

              {/* Decorative Corner Elements */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-gray-500 opacity-20"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-gray-500 opacity-20"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl border-2 border-gray-600 p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Think You're Ready?
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              If you meet all five qualifications above, you're ready to begin your transformation from combat veteran to successful entrepreneur.
            </p>
            <div className="flex justify-center items-center space-x-4">
              <div className="flex items-center space-x-2">
                <i className="fas fa-check-circle text-green-400 text-lg"></i>
                <span className="text-sm font-mono text-gray-300">ALL QUALIFICATIONS MET</span>
              </div>
              <div className="w-0.5 h-6 bg-gray-600"></div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-arrow-right text-white text-lg"></i>
                <span className="text-sm font-mono text-gray-300">PROCEED TO APPLICATION</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}