'use client';

import { useState, useEffect } from 'react';
import { useAdmin } from '@/lib/cms/admin-context';
import { CurriculumItem } from '@/lib/types/cms';

interface CurriculumTimelineProps {
  items: CurriculumItem[];
  onEdit?: (item?: CurriculumItem) => void;
}

export default function CurriculumTimeline({ items, onEdit }: CurriculumTimelineProps) {
  const { isAdminMode } = useAdmin();
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [hasStartedDecryption, setHasStartedDecryption] = useState(false);
  
  // Default curriculum data from your specification
  const defaultCurriculum = [
    { id: 'week-1', weekNumber: 1, title: 'Orientation', description: 'Set the foundation for your entrepreneurial journey.', icon: 'fas fa-compass', order: 1, isVisible: true, createdAt: new Date(), updatedAt: new Date() },
    { id: 'week-2', weekNumber: 2, title: 'Choosing Partners', description: 'Learn to build a strong, reliable team.', icon: 'fas fa-handshake', order: 2, isVisible: true, createdAt: new Date(), updatedAt: new Date() },
    { id: 'week-3', weekNumber: 3, title: 'Ideation Process', description: 'Develop and refine your business idea.', icon: 'fas fa-lightbulb', order: 3, isVisible: true, createdAt: new Date(), updatedAt: new Date() },
    { id: 'week-4', weekNumber: 4, title: 'Lean Model Canvas', description: 'Master the fundamental framework for a startup.', icon: 'fas fa-drafting-compass', order: 4, isVisible: true, createdAt: new Date(), updatedAt: new Date() },
    { id: 'week-5', weekNumber: 5, title: 'Customer Discovery', description: 'Understand your market and find product-market fit.', icon: 'fas fa-search', order: 5, isVisible: true, createdAt: new Date(), updatedAt: new Date() },
    { id: 'week-6', weekNumber: 6, title: 'Networking', description: 'Build powerful connections with investors, mentors, and peers.', icon: 'fas fa-network-wired', order: 6, isVisible: true, createdAt: new Date(), updatedAt: new Date() },
    { id: 'week-7', weekNumber: 7, title: 'Market Analysis', description: 'Validate your concept with data-driven insights.', icon: 'fas fa-chart-line', order: 7, isVisible: true, createdAt: new Date(), updatedAt: new Date() },
    { id: 'week-8', weekNumber: 8, title: 'Business Plan', description: 'Create a clear, actionable roadmap for growth.', icon: 'fas fa-map', order: 8, isVisible: true, createdAt: new Date(), updatedAt: new Date() },
    { id: 'week-9', weekNumber: 9, title: 'Storytelling & Branding', description: 'Learn to communicate your mission and vision effectively.', icon: 'fas fa-bullhorn', order: 9, isVisible: true, createdAt: new Date(), updatedAt: new Date() },
    { id: 'week-10', weekNumber: 10, title: 'Presentations', description: 'Prepare to pitch your business with confidence.', icon: 'fas fa-flag-checkered', order: 10, isVisible: true, createdAt: new Date(), updatedAt: new Date() }
  ];

  // Merge CMS items with default data - show database items where they exist, default items elsewhere
  const mergeItemsWithDefaults = () => {
    const merged = [...defaultCurriculum];
    
    // Replace default items with CMS items where they exist
    items.forEach(cmsItem => {
      const defaultIndex = merged.findIndex(defaultItem => 
        defaultItem.weekNumber === cmsItem.weekNumber
      );
      if (defaultIndex !== -1) {
        merged[defaultIndex] = {
          ...cmsItem,
          icon: cmsItem.icon || defaultCurriculum[defaultIndex].icon
        };
      } else {
        // If CMS item has a week number not in defaults, add it
        merged.push({
          ...cmsItem,
          icon: cmsItem.icon || 'fas fa-star'
        });
      }
    });
    
    return merged;
  };
  
  const displayItems = mergeItemsWithDefaults();
  const sortedItems = displayItems.sort((a, b) => a.order - b.order);

  // Handle week click to expand/collapse
  const handleWeekClick = (weekNumber: number) => {
    if (expandedWeek === weekNumber) {
      setExpandedWeek(null);
    } else {
      if (!hasStartedDecryption) {
        setIsDecrypting(true);
        setHasStartedDecryption(true);
        setTimeout(() => {
          setIsDecrypting(false);
          setExpandedWeek(weekNumber);
        }, 1500);
      } else {
        setExpandedWeek(weekNumber);
      }
    }
  };

  // Handle edit click
  const handleEditClick = (item: CurriculumItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(item);
    }
  };

  return (
    <section className="py-12 sm:py-16 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.15),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05),transparent_50%)]"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 mb-4">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            <span className="text-white/80 text-xs font-medium tracking-wide">10-WEEK CURRICULUM</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
            The Alpha-Bet Program
          </h2>
          
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            A practical MBA for founders, designed to turn your idea into a viable business.
          </p>
        </div>

        {/* Decrypting Animation */}
        {isDecrypting && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-900 border border-white rounded-lg p-8 text-center font-mono">
              <div className="text-white text-xl font-bold mb-4">
                <span className="animate-pulse">DECRYPTING...</span>
              </div>
              <div className="flex justify-center space-x-1 mb-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-8 bg-white animate-pulse"
                    style={{ animationDelay: `${i * 100}ms` }}
                  ></div>
                ))}
              </div>
              <div className="text-white text-sm">
                ► curriculum_data.enc
              </div>
            </div>
          </div>
        )}

        {/* Curriculum Timeline - Linear Layout */}
        <div className="space-y-3">
          {sortedItems.map((item, index) => (
            <div
              key={item.id}
              className={`flex flex-col lg:flex-row items-start gap-3 lg:gap-8 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Mobile: Integrated Number */}
              <div className="flex lg:hidden w-full">
                <div className="flex-1 relative">
                  {/* Admin Edit Button - Mobile */}
                  {isAdminMode && (
                    <button
                      onClick={(e) => handleEditClick(item, e)}
                      className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 hover:bg-green-400 text-white rounded-full flex items-center justify-center text-xs transition-colors shadow-lg z-20"
                      title="Edit this week"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                  )}
                  
                  <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 shadow-lg hover:bg-white/15 transition-all duration-300 cursor-pointer"
                       onClick={() => handleWeekClick(item.weekNumber)}>
                    
                    {/* Mobile Collapsed View */}
                    <div className="p-3">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                          <span className="text-sm font-bold text-gray-900">{item.weekNumber}</span>
                        </div>
                        <div className="w-8 h-8 bg-white/20 rounded-md flex items-center justify-center">
                          <i className={`${item.icon} text-sm text-white`}></i>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-base font-bold text-white leading-tight">
                            {item.title}
                          </h3>
                        </div>
                        <div className="text-white/60">
                          {expandedWeek === item.weekNumber ? (
                            <i className="fas fa-chevron-up text-xs"></i>
                          ) : (
                            <i className="fas fa-chevron-down text-xs"></i>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-gray-200 text-xs leading-relaxed ml-11">
                        {item.description}
                      </p>
                    </div>

                    {/* Mobile Expanded Details */}
                    {expandedWeek === item.weekNumber && (
                      <div className="border-t border-white/20 p-3 bg-white/5">
                        <div className="space-y-2 ml-11">
                          <div className="flex items-center gap-2">
                            <i className="fas fa-calendar-alt text-white/60 text-xs"></i>
                            <span className="text-gray-200 text-xs">Week {item.weekNumber} of 10-week program</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <i className="fas fa-clock text-white/60 text-xs"></i>
                            <span className="text-gray-200 text-xs">Intensive practical workshops</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <i className="fas fa-target text-white/60 text-xs"></i>
                            <span className="text-gray-200 text-xs">Hands-on application with real business scenarios</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Desktop: Separate Number and Card */}
              <div className="hidden lg:flex lg:flex-row lg:items-start lg:gap-8 w-full">
                {/* Week Number Circle - Desktop */}
                <div className="flex-shrink-0 relative">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform"
                       onClick={() => handleWeekClick(item.weekNumber)}>
                    <span className="text-xl font-bold text-gray-900">{item.weekNumber}</span>
                  </div>
                  <div className="absolute -inset-1 bg-white/20 rounded-full blur-md"></div>
                </div>

                {/* Content Card - Desktop */}
                <div className="flex-1 relative">
                  {/* Admin Edit Button - Desktop */}
                  {isAdminMode && (
                    <button
                      onClick={(e) => handleEditClick(item, e)}
                      className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 hover:bg-green-400 text-white rounded-full flex items-center justify-center text-xs transition-colors shadow-lg z-20"
                      title="Edit this week"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                  )}
                  
                  <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg hover:bg-white/15 transition-all duration-300 cursor-pointer"
                       onClick={() => handleWeekClick(item.weekNumber)}>
                    
                    {/* Desktop Collapsed View */}
                    <div className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                          <i className={`${item.icon} text-base text-white`}></i>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white leading-tight">
                            Week {item.weekNumber}: {item.title}
                          </h3>
                        </div>
                        <div className="text-white/60">
                          {expandedWeek === item.weekNumber ? (
                            <i className="fas fa-chevron-up"></i>
                          ) : (
                            <i className="fas fa-chevron-down"></i>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-gray-200 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Desktop Expanded Details */}
                    {expandedWeek === item.weekNumber && (
                      <div className="border-t border-white/20 p-5 bg-white/5">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <i className="fas fa-calendar-alt text-white/60 text-sm"></i>
                            <span className="text-gray-200 text-sm">Week {item.weekNumber} of 10-week program</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <i className="fas fa-clock text-white/60 text-sm"></i>
                            <span className="text-gray-200 text-sm">Intensive practical workshops</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <i className="fas fa-target text-white/60 text-sm"></i>
                            <span className="text-gray-200 text-sm">Hands-on application with real business scenarios</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Connecting Line (except for last item) */}
                  {index < sortedItems.length - 1 && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3">
                      <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Summary */}
        <div className="mt-8 text-center">
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-lg p-4 sm:p-5 border border-white/20 shadow-lg">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
              Transform Your Military Experience
            </h3>
            <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-3">
              Our 10-week program bridges the gap between military leadership and entrepreneurial success.
            </p>
            <div className="inline-flex items-center gap-1.5 bg-white rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-gray-900 font-semibold hover:scale-105 transition-transform duration-300 cursor-pointer text-xs sm:text-sm">
              <i className="fas fa-graduation-cap text-xs"></i>
              <span>10-Week Program</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}