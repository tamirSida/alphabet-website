'use client';

import { useState, useEffect } from 'react';
import { useAdmin } from '@/lib/cms/admin-context';
import { Qualification } from '@/lib/types/cms';

interface WhoShouldApplySectionProps {
  qualifications: Qualification[];
  onEdit?: (qualification?: Qualification) => void;
  onEditHeader?: () => void;
}

export default function WhoShouldApplySection({ qualifications, onEdit, onEditHeader }: WhoShouldApplySectionProps) {
  const { isAdminMode } = useAdmin();
  const [animatedItems, setAnimatedItems] = useState<Set<string>>(new Set());
  const [showItems, setShowItems] = useState(false);

  // Trigger animations on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowItems(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Default qualifications if no CMS data
  const defaultQualifications: Qualification[] = [
    {
      id: 'qual-1',
      title: 'Combat Veteran Status',
      description: 'A combat veteran of the US or Israel.',
      icon: 'fas fa-shield-alt',
      order: 1,
      isVisible: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'qual-2', 
      title: 'Ready for Transition',
      description: 'Post-service and ready to transition your skills into the business world.',
      icon: 'fas fa-exchange-alt',
      order: 2,
      isVisible: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'qual-3',
      title: 'Entrepreneurship Interest',
      description: 'Interested in entrepreneurship and seeking the foundational knowledge to get started.',
      icon: 'fas fa-lightbulb',
      order: 3,
      isVisible: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'qual-4',
      title: 'Ideation Phase',
      description: 'In the ideation phase, whether you have a business idea or are looking to find a partner and develop one.',
      icon: 'fas fa-brain',
      order: 4,
      isVisible: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'qual-5',
      title: 'Program Commitment',
      description: 'Committed to a rigorous, 10-week online program of training and practical workshops.',
      icon: 'fas fa-calendar-check',
      order: 5,
      isVisible: true,
      createdAt: new Date(),
      updatedAt: new Date()
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


  return (
    <section className="py-16 sm:py-24 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.15),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05),transparent_50%)]"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 relative group">
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
            <span className="text-white/80 text-sm font-medium tracking-wide">QUALIFICATION CRITERIA</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Who Should Apply?
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're looking for exceptional veterans ready to transform their military experience into entrepreneurial success.
          </p>
        </div>

        {/* Qualifications - Checklist Layout */}
        <div className="max-w-4xl mx-auto">
          <div className={`bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/20 shadow-2xl transition-all duration-1000 ${
            showItems ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}>
            <div className="space-y-4 sm:space-y-6">
              {displayQualifications.map((qualification, index) => (
                <div 
                  key={qualification.id} 
                  className={`relative group flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl transition-all duration-200 ${
                    showItems 
                      ? 'opacity-100 transform translate-x-0' 
                      : 'opacity-0 transform -translate-x-12'
                  }`}
                  style={{ 
                    transitionDelay: showItems ? '0ms' : `${index * 150 + 400}ms`,
                    '--hover-bg': 'rgba(255, 255, 255, 0.05)'
                  } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    if (showItems) {
                      (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                  }}
                >
                  {/* Admin Edit Button */}
                  {isAdminMode && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Edit button clicked for:', qualification.title);
                        if (onEdit) {
                          onEdit(qualification);
                        }
                      }}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 hover:bg-green-400 text-white rounded-full flex items-center justify-center text-xs transition-all shadow-lg hover:shadow-xl hover:scale-110 z-[100]"
                      title="Edit this qualification"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                  )}
                  
                  {/* Checkbox with animation */}
                  <div className="flex-shrink-0 mt-1">
                    <div className={`w-5 h-5 sm:w-6 sm:h-6 border-2 border-white rounded-md flex items-center justify-center bg-white/10 group-hover:bg-white/20 transition-all duration-500 ${
                      showItems ? 'scale-100 rotate-0' : 'scale-0 rotate-45'
                    }`}
                    style={{ 
                      transitionDelay: `${index * 150 + 600}ms`
                    }}>
                      <i className={`fas fa-check text-white text-xs sm:text-sm transition-all duration-300 ${
                        showItems ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                      }`}
                      style={{ 
                        transitionDelay: `${index * 150 + 800}ms`
                      }}></i>
                    </div>
                  </div>
                  
                  {/* Icon with bounce effect */}
                  <div className="flex-shrink-0 mt-0.5">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-105 transition-all duration-600 ${
                      showItems ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                    }`}
                    style={{ 
                      transitionDelay: `${index * 150 + 700}ms`
                    }}>
                      <i className={`${qualification.icon} text-white text-base sm:text-lg transition-all duration-300 ${
                        showItems ? 'scale-100' : 'scale-0'
                      }`}
                      style={{ 
                        transitionDelay: `${index * 150 + 900}ms`
                      }}></i>
                    </div>
                  </div>
                  
                  {/* Content with typewriter effect */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-blue-100 transition-all duration-500 leading-tight ${
                      showItems ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
                    }`}
                    style={{ 
                      transitionDelay: `${index * 150 + 800}ms`
                    }}>
                      {qualification.title}
                    </h3>
                    <p className={`text-sm sm:text-base text-gray-200 leading-relaxed group-hover:text-gray-100 transition-all duration-500 ${
                      showItems ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
                    }`}
                    style={{ 
                      transitionDelay: `${index * 150 + 900}ms`
                    }}>
                      {qualification.description}
                    </p>
                  </div>

                  {/* Shimmer effect on load */}
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent transform transition-all duration-1000 pointer-events-none z-10 ${
                    showItems ? 'translate-x-[200%] opacity-0' : '-translate-x-full opacity-100'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 150 + 1000}ms`
                  }}></div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready for Your Next Mission?
            </h3>
            <p className="text-lg text-gray-200 leading-relaxed mb-6">
              If you meet these qualifications, you're prepared to transform your military leadership into entrepreneurial excellence.
            </p>
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 text-gray-900 font-semibold hover:scale-105 transition-transform duration-300 cursor-pointer">
              <span>Begin Application</span>
              <i className="fas fa-arrow-right text-sm"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}