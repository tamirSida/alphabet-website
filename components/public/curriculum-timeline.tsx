'use client';

import { useState, useEffect, useRef } from 'react';
import { useAdmin } from '@/lib/cms/admin-context';

interface CurriculumItem {
  id: string;
  weekNumber: number;
  title: string;
  description: string;
  icon?: string;
  order: number;
}

interface CurriculumTimelineProps {
  items: CurriculumItem[];
  onEdit?: (item?: CurriculumItem) => void;
}

export default function CurriculumTimeline({ items, onEdit }: CurriculumTimelineProps) {
  const { isAdminMode } = useAdmin();
  const [activeWeek, setActiveWeek] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const mobileCardRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  
  // Default curriculum data from your specification
  const defaultCurriculum = [
    { id: 'week-1', weekNumber: 1, title: 'Orientation', description: 'Set the foundation for your entrepreneurial journey.', icon: 'fas fa-compass', order: 1 },
    { id: 'week-2', weekNumber: 2, title: 'Choosing Partners', description: 'Learn to build a strong, reliable team.', icon: 'fas fa-handshake', order: 2 },
    { id: 'week-3', weekNumber: 3, title: 'Ideation Process', description: 'Develop and refine your business idea.', icon: 'fas fa-lightbulb', order: 3 },
    { id: 'week-4', weekNumber: 4, title: 'Lean Model Canvas', description: 'Master the fundamental framework for a startup.', icon: 'fas fa-drafting-compass', order: 4 },
    { id: 'week-5', weekNumber: 5, title: 'Customer Discovery', description: 'Understand your market and find product-market fit.', icon: 'fas fa-search', order: 5 },
    { id: 'week-6', weekNumber: 6, title: 'Networking', description: 'Build powerful connections with investors, mentors, and peers.', icon: 'fas fa-network-wired', order: 6 },
    { id: 'week-7', weekNumber: 7, title: 'Market Analysis', description: 'Validate your concept with data-driven insights.', icon: 'fas fa-chart-line', order: 7 },
    { id: 'week-8', weekNumber: 8, title: 'Business Plan', description: 'Create a clear, actionable roadmap for growth.', icon: 'fas fa-map', order: 8 },
    { id: 'week-9', weekNumber: 9, title: 'Storytelling & Branding', description: 'Learn to communicate your mission and vision effectively.', icon: 'fas fa-bullhorn', order: 9 },
    { id: 'week-10', weekNumber: 10, title: 'Presentations', description: 'Prepare to pitch your business with confidence.', icon: 'fas fa-flag-checkered', order: 10 }
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
        merged[defaultIndex] = cmsItem;
      } else {
        // If CMS item has a week number not in defaults, add it
        merged.push(cmsItem);
      }
    });
    
    return merged;
  };
  
  const displayItems = mergeItemsWithDefaults();
  const sortedItems = displayItems.sort((a, b) => a.order - b.order);

  // Handle week selection and navigation
  const handleWeekClick = (weekNumber: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveWeek(weekNumber);
    setShowPopup(true);
  };

  // Handle pill navigation with scroll detection
  const handlePillClick = (weekNumber: number, e: React.MouseEvent) => {
    e?.stopPropagation();
    if (!isScrolling) {
      setActiveWeek(weekNumber);
    }
  };

  // Touch handlers for navigation pills scroll detection
  const handlePillTouchStart = (e: React.TouchEvent) => {
    setIsScrolling(false);
    const touch = e.touches[0];
    const target = e.currentTarget as HTMLElement;
    target.dataset.startX = touch.clientX.toString();
    target.dataset.startY = touch.clientY.toString();
    target.dataset.startTime = Date.now().toString();
  };

  const handlePillTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const target = e.currentTarget as HTMLElement;
    const startX = target.dataset.startX;
    const startY = target.dataset.startY;
    
    if (startX && startY) {
      const deltaX = Math.abs(touch.clientX - parseInt(startX));
      const deltaY = Math.abs(touch.clientY - parseInt(startY));
      
      // If we've moved more than 10px in any direction, consider it scrolling
      if (deltaX > 10 || deltaY > 10) {
        setIsScrolling(true);
      }
    }
  };

  const handlePillTouchEnd = (weekNumber: number) => {
    // Small delay to allow scroll detection to complete
    setTimeout(() => {
      if (!isScrolling) {
        setActiveWeek(weekNumber);
      }
      setIsScrolling(false);
    }, 50);
  };

  // Handle edit click
  const handleEditClick = (item: CurriculumItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(item);
    }
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    if (!activeWeek) return;
    
    const currentIndex = sortedItems.findIndex(item => item.weekNumber === activeWeek);
    if (direction === 'prev' && currentIndex > 0) {
      setActiveWeek(sortedItems[currentIndex - 1].weekNumber);
    } else if (direction === 'next' && currentIndex < sortedItems.length - 1) {
      setActiveWeek(sortedItems[currentIndex + 1].weekNumber);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setActiveWeek(null);
  };

  // Touch/swipe handlers for mobile
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (mobileCardRef.current) {
        mobileCardRef.current.dataset.startX = touch.clientX.toString();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      const startX = mobileCardRef.current?.dataset.startX;
      
      if (startX && activeWeek) {
        const diff = touch.clientX - parseInt(startX);
        const threshold = 50;

        if (diff > threshold) {
          // Swipe right - previous
          navigateWeek('prev');
        } else if (diff < -threshold) {
          // Swipe left - next
          navigateWeek('next');
        }
      }
    };

    const cardRef = mobileCardRef.current;
    if (cardRef) {
      cardRef.addEventListener('touchstart', handleTouchStart);
      cardRef.addEventListener('touchend', handleTouchEnd);

      return () => {
        cardRef.removeEventListener('touchstart', handleTouchStart);
        cardRef.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [activeWeek]);

  // Intersection Observer for scroll detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          startLoadingAnimation();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Loading animation sequence
  const startLoadingAnimation = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setShowContent(true);
      // Only auto-select on mobile
      if (window.innerWidth < 1024) {
        setActiveWeek(1);
      }
    }, 2500); // Show loading for 2.5 seconds
  };

  return (
    <section ref={sectionRef} className="py-16 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Always show header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            The Alpha-Bet Curriculum
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our 10-week curriculum is a practical MBA for founders, designed to turn your idea into a viable business.
          </p>
        </div>

        {/* Loading Overlay with Blurred Mission Control */}
        {isVisible && isLoading && (
          <div className="relative min-h-[600px]">
            {/* Blurred Mission Control Center Background */}
            <div className="absolute inset-0 filter blur-sm opacity-50">
              <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl border-2 border-gray-600 p-8">
                <div className="text-center text-white mb-8">
                  <div className="flex items-center justify-center mb-4">
                    <i className="fas fa-shield-alt text-3xl mr-4"></i>
                    <h3 className="text-2xl font-bold font-mono">MISSION CONTROL CENTER</h3>
                    <i className="fas fa-shield-alt text-3xl ml-4"></i>
                  </div>
                  <p className="text-gray-300 font-mono">SELECT TRAINING MODULE FOR DETAILED BRIEFING</p>
                </div>

                {/* Blurred Mission Status Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={`loading-${i}`} className="relative">
                      <div className="relative p-4 rounded-xl border-2 bg-gray-800 border-gray-600">
                        <div className="text-center mb-3">
                          <div className="w-12 h-12 mx-auto rounded-full border-2 flex items-center justify-center font-bold text-lg bg-gray-900 text-white border-gray-400">
                            {i + 1}
                          </div>
                        </div>
                        <div className="text-center mb-2">
                          <i className="fas fa-cog text-xl text-gray-400"></i>
                        </div>
                        <div className="text-center text-xs font-bold font-mono text-gray-300">
                          LOADING...
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Loading Status Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
              <div className="text-center bg-gradient-to-br from-gray-900 via-gray-800 to-black bg-opacity-95 p-4 sm:p-8 rounded border-2 border-white max-w-sm sm:max-w-none w-full sm:w-auto" style={{fontFamily: 'monospace'}}>
                {/* Retro Header */}
                <div className="text-white text-lg sm:text-xl font-bold mb-4 sm:mb-6">
                  <span className="animate-pulse">DECRYPTING FILES...</span>
                </div>
                
                {/* 32-bit Style Loading Bar */}
                <div className="w-full sm:w-96 mx-auto mb-4 sm:mb-6">
                  <div className="bg-gray-900 border-2 border-white p-1 rounded">
                    <div className="h-6 sm:h-8 bg-gray-900 flex items-center relative overflow-hidden">
                      {/* Animated loading blocks - responsive */}
                      <div className="flex w-full h-full">
                        {/* Mobile: 12 blocks */}
                        <div className="flex w-full h-full sm:hidden">
                          {Array.from({ length: 12 }).map((_, i) => (
                            <div
                              key={`mobile-block-${i}`}
                              className="flex-1 h-full bg-white opacity-70 border-r border-gray-600"
                              style={{
                                animation: `loadBlock 2s ease-in-out infinite`,
                                animationDelay: `${i * 100}ms`
                              }}
                            ></div>
                          ))}
                        </div>
                        
                        {/* Desktop: 20 blocks */}
                        <div className="hidden sm:flex w-full h-full">
                          {Array.from({ length: 20 }).map((_, i) => (
                            <div
                              key={`desktop-block-${i}`}
                              className="flex-1 h-full bg-white opacity-70 border-r border-gray-600"
                              style={{
                                animation: `loadBlock 2s ease-in-out infinite`,
                                animationDelay: `${i * 100}ms`
                              }}
                            ></div>
                          ))}
                        </div>
                      </div>
                      {/* Loading text overlay */}
                      <div className="absolute inset-0 flex items-center justify-center text-gray-900 text-xs sm:text-sm font-bold">
                        <span className="animate-pulse">LOADING...</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="bg-white text-gray-900 px-3 sm:px-4 py-2 rounded font-bold text-sm sm:text-lg mb-3 sm:mb-4">
                  <span className="animate-pulse">STATUS: MISSION PARAMETERS LOADED</span>
                </div>

                {/* Simple file list - fewer items on mobile */}
                <div className="text-white text-xs sm:text-sm space-y-1">
                  <div className="animate-pulse">► curriculum_week_01.dat</div>
                  <div className="animate-pulse hidden sm:block">► curriculum_week_02.dat</div>
                  <div className="animate-pulse">► mission_briefing.enc</div>
                </div>

                <style jsx>{`
                  @keyframes loadBlock {
                    0%, 100% { 
                      background-color: #ffffff;
                      opacity: 0.3;
                    }
                    50% { 
                      background-color: #ffffff;
                      opacity: 1;
                    }
                  }
                  .scrollbar-hide {
                    -webkit-overflow-scrolling: touch;
                  }
                  .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
              </div>
            </div>
          </div>
        )}

        {/* Desktop: Mission Control Center */}
        {showContent && (
          <>
            {/* Desktop View */}
            <div className="hidden lg:block">
              <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl border-2 border-gray-600 p-8 mb-12">
                <div className="text-center text-white mb-8">
                  <div className="flex items-center justify-center mb-4">
                    <i className="fas fa-shield-alt text-3xl mr-4"></i>
                    <h3 className="text-2xl font-bold font-mono">MISSION CONTROL CENTER</h3>
                    <i className="fas fa-shield-alt text-3xl ml-4"></i>
                  </div>
                  <p className="text-gray-300 font-mono">SELECT TRAINING MODULE FOR DETAILED BRIEFING</p>
                </div>

                {/* Mission Status Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  {sortedItems.map((item) => (
                    <div
                      key={item.id}
                      className="relative cursor-pointer transition-all duration-300 transform hover:scale-105"
                      onClick={(e) => handleWeekClick(item.weekNumber, e)}
                    >
                      {/* Mission Badge */}
                      <div className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                        activeWeek === item.weekNumber 
                          ? 'bg-gray-700 border-gray-400 shadow-2xl' 
                          : 'bg-gray-800 border-gray-600 hover:border-gray-400'
                      }`}>
                        {/* Week Number */}
                        <div className="text-center mb-3">
                          <div className={`w-12 h-12 mx-auto rounded-full border-2 flex items-center justify-center font-bold text-lg ${
                            activeWeek === item.weekNumber
                              ? 'bg-white text-gray-900 border-white'
                              : 'bg-gray-900 text-white border-gray-400'
                          }`}>
                            {item.weekNumber}
                          </div>
                        </div>

                        {/* Mission Icon */}
                        {item.icon && (
                          <div className="text-center mb-2">
                            <i className={`${item.icon} text-xl ${
                              activeWeek === item.weekNumber ? 'text-white' : 'text-gray-300'
                            }`}></i>
                          </div>
                        )}

                        {/* Mission Title */}
                        <div className={`text-center text-xs font-bold font-mono whitespace-nowrap ${
                          activeWeek === item.weekNumber ? 'text-white' : 'text-gray-200'
                        }`}>
                          {item.title.toUpperCase()}
                        </div>

                        {/* Edit Button - Admin Only */}
                        {isAdminMode && (
                          <button
                            onClick={(e) => handleEditClick(item, e)}
                            className="absolute -top-2 -left-2 w-6 h-6 bg-green-500 hover:bg-green-400 text-white rounded-full flex items-center justify-center text-xs transition-colors shadow-lg z-10"
                            title="Edit this week"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                        )}

                        {/* Active Mission Overlay */}
                        {activeWeek === item.weekNumber && (
                          <div className="absolute inset-0 border-2 border-white rounded-xl animate-pulse opacity-50"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop CTA */}
              <div className="text-center">
                <div className="inline-flex items-center bg-gray-900 text-white px-8 py-4 rounded-full shadow-lg border border-gray-600">
                  <i className="fas fa-graduation-cap mr-3 text-xl"></i>
                  <span className="text-lg font-semibold">10-Week Program</span>
                </div>
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                  Rigorous, practical training designed to turn your idea into a viable business
                </p>
              </div>
            </div>

            {/* Mobile: Slide Interface */}
            <div className="block lg:hidden">
              {activeWeek && (
                <div 
                  ref={mobileCardRef}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl border-2 border-gray-600 max-w-lg mx-auto transform transition-all duration-300"
                >
                  {/* Mobile Header */}
                  <div className="flex justify-between items-center p-4 border-b border-gray-600">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-white text-gray-900 rounded-full flex items-center justify-center font-bold text-sm">
                        {activeWeek}
                      </div>
                      <h4 className="text-lg font-bold text-white font-mono truncate">
                        {sortedItems.find(item => item.weekNumber === activeWeek)?.title.toUpperCase()}
                      </h4>
                    </div>
                    {isAdminMode && (
                      <button
                        onClick={(e) => handleEditClick(sortedItems.find(item => item.weekNumber === activeWeek)!, e)}
                        className="w-8 h-8 bg-green-500 hover:bg-green-400 text-white rounded-full flex items-center justify-center text-sm transition-colors shadow-lg"
                        title="Edit this week"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                    )}
                  </div>

                  {/* Navigation Pills */}
                  <div className="p-4 border-b border-gray-600 bg-gradient-to-r from-gray-900 to-black">
                    <div className="flex overflow-x-auto gap-2 mb-4 pb-2 scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
                      {sortedItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={(e) => handlePillClick(item.weekNumber, e)}
                          onTouchStart={handlePillTouchStart}
                          onTouchMove={handlePillTouchMove}
                          onTouchEnd={() => handlePillTouchEnd(item.weekNumber)}
                          className={`w-8 h-8 flex-shrink-0 rounded-full border-2 flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                            activeWeek === item.weekNumber
                              ? 'bg-white text-gray-900 border-white shadow-lg'
                              : 'bg-transparent text-white border-gray-400 hover:bg-gray-400 hover:text-gray-900'
                          }`}
                        >
                          {item.weekNumber}
                        </button>
                      ))}
                    </div>
                    
                    {/* Arrow Navigation */}
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => navigateWeek('prev')}
                        disabled={sortedItems.findIndex(item => item.weekNumber === activeWeek) === 0}
                        className="flex items-center space-x-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-mono text-sm"
                      >
                        <i className="fas fa-chevron-left"></i>
                        <span>PREV</span>
                      </button>
                      
                      <div className="flex items-center space-x-2 text-gray-300 font-mono text-sm">
                        <span>WEEK {activeWeek} OF {sortedItems.length}</span>
                      </div>
                      
                      <button
                        onClick={() => navigateWeek('next')}
                        disabled={sortedItems.findIndex(item => item.weekNumber === activeWeek) === sortedItems.length - 1}
                        className="flex items-center space-x-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-mono text-sm"
                      >
                        <span>NEXT</span>
                        <i className="fas fa-chevron-right"></i>
                      </button>
                    </div>
                  </div>

                  {/* Mobile Content */}
                  <div className="p-6">
                    {(() => {
                      const currentWeek = sortedItems.find(item => item.weekNumber === activeWeek);
                      if (!currentWeek) return null;
                      
                      return (
                        <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-5 border border-gray-500 shadow-xl">
                          {/* Week Header */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-white text-gray-900 rounded-full border border-gray-300 flex items-center justify-center font-bold text-lg">
                              {currentWeek.weekNumber}
                            </div>
                            {currentWeek.icon && (
                              <i className={`${currentWeek.icon} text-3xl text-gray-300`}></i>
                            )}
                          </div>

                          <h3 className="text-xl font-bold mb-3 font-mono text-white">
                            {currentWeek.title.toUpperCase()}
                          </h3>
                          
                          <p className="leading-relaxed text-gray-200 mb-4 text-sm">
                            {currentWeek.description}
                          </p>

                          <div className="pt-3 border-t border-gray-500">
                            <div className="flex items-center justify-between text-gray-300">
                              <div className="flex items-center">
                                <i className="fas fa-clock mr-2 text-xs"></i>
                                <span className="text-xs font-medium font-mono">WEEK {currentWeek.weekNumber} OBJECTIVE</span>
                              </div>
                              <div className="flex items-center">
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                                <span className="text-xs font-mono">READY</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Mobile Footer */}
                  <div className="p-4 border-t border-gray-600 bg-gradient-to-r from-gray-900 to-black">
                    <div className="text-center">
                      <div className="text-gray-300 font-mono text-xs">
                        <i className="fas fa-hand-paper mr-2"></i>
                        SWIPE LEFT/RIGHT TO NAVIGATE
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Mission Briefing Popup Modal */}
        {showPopup && activeWeek && (
          <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl border-2 border-gray-600 max-w-lg w-full max-h-[80vh] overflow-y-auto transform transition-all duration-300 scale-100">
              {/* Modal Header with Close */}
              <div className="flex justify-between items-center p-4 border-b border-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white text-gray-900 rounded-full flex items-center justify-center font-bold text-sm">
                    {activeWeek}
                  </div>
                  <h4 className="text-lg font-bold text-white font-mono truncate">
                    {sortedItems.find(item => item.weekNumber === activeWeek)?.title.toUpperCase()}
                  </h4>
                </div>
                <button
                  onClick={closePopup}
                  className="text-gray-300 hover:text-white transition-colors text-xl"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              {/* Week Navigation Pills */}
              <div className="p-4 border-b border-gray-600 bg-gradient-to-r from-gray-900 to-black">
                <div className="flex overflow-x-auto gap-2 mb-4 pb-2 scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
                  {sortedItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={(e) => handlePillClick(item.weekNumber, e)}
                      onTouchStart={handlePillTouchStart}
                      onTouchMove={handlePillTouchMove}
                      onTouchEnd={() => handlePillTouchEnd(item.weekNumber)}
                      className={`w-8 h-8 flex-shrink-0 rounded-full border-2 flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                        activeWeek === item.weekNumber
                          ? 'bg-white text-gray-900 border-white shadow-lg'
                          : 'bg-transparent text-white border-gray-400 hover:bg-gray-400 hover:text-gray-900'
                      }`}
                    >
                      {item.weekNumber}
                    </button>
                  ))}
                </div>
                
                {/* Arrow Navigation */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => navigateWeek('prev')}
                    disabled={sortedItems.findIndex(item => item.weekNumber === activeWeek) === 0}
                    className="flex items-center space-x-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-mono text-sm"
                  >
                    <i className="fas fa-chevron-left"></i>
                    <span>PREV</span>
                  </button>
                  
                  <div className="flex items-center space-x-2 text-gray-300 font-mono text-sm">
                    <span>WEEK {activeWeek} OF {sortedItems.length}</span>
                  </div>
                  
                  <button
                    onClick={() => navigateWeek('next')}
                    disabled={sortedItems.findIndex(item => item.weekNumber === activeWeek) === sortedItems.length - 1}
                    className="flex items-center space-x-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-mono text-sm"
                  >
                    <span>NEXT</span>
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {(() => {
                  const selectedWeek = sortedItems.find(item => item.weekNumber === activeWeek);
                  if (!selectedWeek) return null;
                  
                  return (
                    <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-5 border border-gray-500 shadow-xl">
                      {/* Mission Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-white text-gray-900 rounded-full border border-gray-300 flex items-center justify-center font-bold text-lg">
                          {selectedWeek.weekNumber}
                        </div>
                        {selectedWeek.icon && (
                          <i className={`${selectedWeek.icon} text-3xl text-gray-300`}></i>
                        )}
                      </div>

                      <h3 className="text-xl font-bold mb-3 font-mono text-white">
                        {selectedWeek.title.toUpperCase()}
                      </h3>
                      
                      <p className="leading-relaxed text-gray-200 mb-4 text-sm">
                        {selectedWeek.description}
                      </p>

                      <div className="pt-3 border-t border-gray-500">
                        <div className="flex items-center justify-between text-gray-300">
                          <div className="flex items-center">
                            <i className="fas fa-clock mr-2 text-xs"></i>
                            <span className="text-xs font-medium font-mono">WEEK {selectedWeek.weekNumber} OBJECTIVE</span>
                          </div>
                          <div className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                            <span className="text-xs font-mono">READY</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-gray-600 bg-gradient-to-r from-gray-900 to-black">
                <button
                  onClick={closePopup}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 font-mono text-sm"
                >
                  <i className="fas fa-check mr-2"></i>
                  ACKNOWLEDGED
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}