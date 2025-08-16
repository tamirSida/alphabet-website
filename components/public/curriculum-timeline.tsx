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
  const [isDecrypting, setIsDecrypting] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredWeek, setHoveredWeek] = useState<number | null>(null);
  
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

  // Trigger decrypting animation on component mount (page load)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDecrypting(false);
      setIsLoaded(true);
    }, 2000); // 2 second decrypting animation

    return () => clearTimeout(timer);
  }, []);

  // Handle week click to expand/collapse (no decrypting after initial load)
  const handleWeekClick = (weekNumber: number) => {
    if (!isLoaded) return; // Don't allow clicks during decrypting
    
    if (expandedWeek === weekNumber) {
      setExpandedWeek(null);
    } else {
      setExpandedWeek(weekNumber);
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

        {/* Curriculum Timeline - Side-to-Side Layout */}
        <div className={`space-y-8 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-30'}`}>
          {sortedItems.map((item, index) => (
            <div
              key={item.id}
              className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
              onMouseEnter={() => isLoaded && setHoveredWeek(item.weekNumber)}
              onMouseLeave={() => isLoaded && setHoveredWeek(null)}
            >
              {/* Week Number Circle */}
              <div className="flex-shrink-0 relative">
                <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shadow-xl transition-all duration-500 ${
                  isLoaded ? 'cursor-pointer' : 'cursor-not-allowed'
                } ${
                  hoveredWeek === item.weekNumber && isLoaded
                    ? 'bg-gradient-to-br from-white via-blue-50 to-blue-100 scale-110' 
                    : 'bg-white'
                }`}
                onClick={() => handleWeekClick(item.weekNumber)}>
                  <div className="text-center">
                    <div className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">Week</div>
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">{item.weekNumber}</div>
                  </div>
                </div>
                <div className={`absolute -inset-3 rounded-full blur-xl transition-all duration-500 ${
                  hoveredWeek === item.weekNumber ? 'bg-blue-200/40' : 'bg-white/20'
                }`}></div>
                
                {/* Progress indicator */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                </div>
              </div>

              {/* Content Card */}
              <div className="flex-1 relative group">
                {/* Admin Edit Button */}
                {isAdminMode && (
                  <button
                    onClick={(e) => handleEditClick(item, e)}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 hover:bg-green-400 text-white rounded-full flex items-center justify-center text-sm transition-colors shadow-lg z-20"
                    title="Edit this week"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                )}
                
                <div className={`relative overflow-hidden rounded-2xl border shadow-xl transition-all duration-500 ${
                  isLoaded ? 'cursor-pointer' : 'cursor-not-allowed'
                } ${
                  (hoveredWeek === item.weekNumber || expandedWeek === item.weekNumber) && isLoaded
                    ? 'bg-gradient-to-br from-white/15 via-white/10 to-white/5 border-white/30 shadow-2xl scale-105'
                    : 'bg-white/10 border-white/20 hover:bg-white/15'
                } backdrop-blur-md`}
                onClick={() => handleWeekClick(item.weekNumber)}>
                  
                  {/* Gradient overlay for extra visual interest */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative p-6 sm:p-8">
                    {/* Icon and Week Indicator */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        hoveredWeek === item.weekNumber 
                          ? 'bg-white/30 scale-110' 
                          : 'bg-white/20 group-hover:scale-105'
                      }`}>
                        <i className={`${item.icon} text-xl text-white`}></i>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-white/70 font-medium uppercase tracking-wider mb-1">
                          Week {item.weekNumber} of 10
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight group-hover:text-blue-100 transition-colors">
                          {item.title}
                        </h3>
                      </div>
                      <div className="text-white/60">
                        {expandedWeek === item.weekNumber ? (
                          <i className="fas fa-chevron-up text-lg transform transition-transform duration-300"></i>
                        ) : (
                          <i className="fas fa-chevron-down text-lg transform transition-transform duration-300"></i>
                        )}
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-base sm:text-lg text-gray-200 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Quick preview badges */}
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/80 border border-white/20">
                        <i className="fas fa-clock mr-1"></i>
                        Interactive Sessions
                      </span>
                      <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/80 border border-white/20">
                        <i className="fas fa-users mr-1"></i>
                        Peer Collaboration
                      </span>
                      <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/80 border border-white/20">
                        <i className="fas fa-lightbulb mr-1"></i>
                        Practical Application
                      </span>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedWeek === item.weekNumber && (
                    <div className="border-t border-white/20 bg-white/5 backdrop-blur-sm">
                      <div className="p-6 sm:p-8">
                        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                          <i className="fas fa-info-circle text-blue-300"></i>
                          What You'll Learn
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                              <i className="fas fa-book text-blue-300 text-sm"></i>
                            </div>
                            <div>
                              <div className="text-white font-medium text-sm">Core Concepts</div>
                              <div className="text-gray-300 text-sm">Essential frameworks and methodologies</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                              <i className="fas fa-hammer text-green-300 text-sm"></i>
                            </div>
                            <div>
                              <div className="text-white font-medium text-sm">Hands-On Practice</div>
                              <div className="text-gray-300 text-sm">Real-world application exercises</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                              <i className="fas fa-comments text-purple-300 text-sm"></i>
                            </div>
                            <div>
                              <div className="text-white font-medium text-sm">Peer Review</div>
                              <div className="text-gray-300 text-sm">Collaborative feedback sessions</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                              <i className="fas fa-trophy text-orange-300 text-sm"></i>
                            </div>
                            <div>
                              <div className="text-white font-medium text-sm">Milestone Achievement</div>
                              <div className="text-gray-300 text-sm">Track your progress and wins</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Connecting Line (except for last item) */}
                {index < sortedItems.length - 1 && (
                  <div className="hidden lg:block absolute top-full left-1/2 transform -translate-x-1/2 mt-6">
                    <div className="w-px h-16 bg-gradient-to-b from-white/30 via-white/20 to-transparent"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Summary */}
        <div className="mt-16 text-center">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                <i className="fas fa-rocket text-white text-lg"></i>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Your Entrepreneurial Journey Awaits
              </h3>
            </div>
            
            <p className="text-lg text-gray-200 leading-relaxed mb-8 max-w-2xl mx-auto">
              Transform 10 weeks of intensive learning into a lifetime of entrepreneurial success. 
              Each week builds on the last, creating a comprehensive foundation for your startup journey.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <div className="text-3xl font-bold text-blue-300 mb-2">10</div>
                <div className="text-white font-medium">Intensive Weeks</div>
                <div className="text-gray-300 text-sm">Structured Learning Path</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <div className="text-3xl font-bold text-green-300 mb-2">100+</div>
                <div className="text-white font-medium">Practical Hours</div>
                <div className="text-gray-300 text-sm">Hands-On Experience</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <div className="text-3xl font-bold text-purple-300 mb-2">∞</div>
                <div className="text-white font-medium">Network Value</div>
                <div className="text-gray-300 text-sm">Lifelong Connections</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 text-gray-900 font-semibold hover:scale-105 transition-transform duration-300 cursor-pointer">
                <i className="fas fa-graduation-cap"></i>
                <span>Start Your Journey</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-6 py-3 text-white font-semibold hover:bg-white/15 transition-all duration-300 cursor-pointer">
                <i className="fas fa-calendar-alt"></i>
                <span>10-Week Program</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}