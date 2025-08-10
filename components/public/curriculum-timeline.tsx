'use client';

import { useState, useEffect, useRef } from 'react';

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
}

export default function CurriculumTimeline({ items }: CurriculumTimelineProps) {
  const [activeWeek, setActiveWeek] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [revealStage, setRevealStage] = useState(0); // 0: hidden, 1: appearing, 2: disappearing, 3: show content
  const sectionRef = useRef<HTMLElement>(null);
  
  // Default curriculum data from your specification
  const defaultCurriculum = [
    { id: 'week-1', weekNumber: 1, title: 'Orientation', description: 'Set the foundation for your entrepreneurial journey.', icon: 'fas fa-flag-checkered', order: 1 },
    { id: 'week-2', weekNumber: 2, title: 'Choosing Partners', description: 'Learn to build a strong, reliable team.', icon: 'fas fa-handshake', order: 2 },
    { id: 'week-3', weekNumber: 3, title: 'Ideation Process', description: 'Develop and refine your business idea.', icon: 'fas fa-lightbulb', order: 3 },
    { id: 'week-4', weekNumber: 4, title: 'Lean Model Canvas', description: 'Master the fundamental framework for a startup.', icon: 'fas fa-drafting-compass', order: 4 },
    { id: 'week-5', weekNumber: 5, title: 'Customer Discovery', description: 'Understand your market and find product-market fit.', icon: 'fas fa-search', order: 5 },
    { id: 'week-6', weekNumber: 6, title: 'Networking', description: 'Build powerful connections with investors, mentors, and peers.', icon: 'fas fa-network-wired', order: 6 },
    { id: 'week-7', weekNumber: 7, title: 'Market Analysis', description: 'Validate your concept with data-driven insights.', icon: 'fas fa-chart-line', order: 7 },
    { id: 'week-8', weekNumber: 8, title: 'Business Plan', description: 'Create a clear, actionable roadmap for growth.', icon: 'fas fa-map', order: 8 },
    { id: 'week-9', weekNumber: 9, title: 'Storytelling & Branding', description: 'Learn to communicate your mission and vision effectively.', icon: 'fas fa-bullhorn', order: 9 },
    { id: 'week-10', weekNumber: 10, title: 'Presentations', description: 'Prepare to pitch your business with confidence.', icon: 'fas fa-presentation', order: 10 }
  ];

  // Use CMS items if available, otherwise use default data
  const displayItems = items.length > 0 ? items : defaultCurriculum;
  const sortedItems = displayItems.sort((a, b) => a.order - b.order);

  // Handle week selection and navigation
  const handleWeekClick = (weekNumber: number) => {
    setActiveWeek(weekNumber);
    setShowPopup(true);
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

  // Intersection Observer for scroll detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && revealStage === 0) {
          setIsVisible(true);
          startRevealAnimation();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [revealStage]);

  // Reveal animation sequence - extended duration
  const startRevealAnimation = () => {
    // Stage 1: Radar sweep and target acquisition (longer)
    setRevealStage(1);
    
    setTimeout(() => {
      // Stage 2: Battle plan decryption (longer)
      setRevealStage(2);
      
      setTimeout(() => {
        // Stage 3: Show military-themed content
        setRevealStage(3);
        setShowContent(true);
      }, 1500); // Increased from 800ms
    }, 2500); // Increased from 1500ms
  };

  return (
    <section ref={sectionRef} className="py-16 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Always show header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-950 mb-6">
            The Alpha-Bet Curriculum
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our 10-week curriculum is a practical MBA for founders, designed to turn your idea into a viable business.
          </p>
        </div>

        {/* Epic Reveal Animation */}
        {isVisible && !showContent && (
          <div className="flex items-center justify-center min-h-[500px] relative">
            {/* Stage 1: Radar Sweep Effect */}
            {revealStage === 1 && (
              <div className="relative">
                {/* Radar circles */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-96 h-96 border-2 border-blue-950 rounded-full animate-ping opacity-30"></div>
                  <div className="w-72 h-72 border-2 border-blue-950 rounded-full animate-ping opacity-50 absolute" style={{animationDelay: '0.3s'}}></div>
                  <div className="w-48 h-48 border-2 border-blue-950 rounded-full animate-ping opacity-70 absolute" style={{animationDelay: '0.6s'}}></div>
                </div>
                
                {/* Sweeping radar line */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="w-48 h-0.5 bg-gradient-to-r from-transparent via-blue-950 to-transparent origin-left animate-spin"
                    style={{animationDuration: '2s', transformOrigin: 'center'}}
                  ></div>
                </div>

                {/* Week targets appearing */}
                <div className="relative grid grid-cols-2 md:grid-cols-5 gap-8">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className="transform transition-all duration-300"
                      style={{ 
                        opacity: 0,
                        animation: `targetLock 0.5s ease-out ${i * 150}ms forwards`
                      }}
                    >
                      <div className="relative">
                        <div className="w-16 h-16 bg-blue-950 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-2xl">
                          {i + 1}
                        </div>
                        {/* Target crosshairs */}
                        <div className="absolute inset-0 border-2 border-blue-950 rounded-full animate-pulse opacity-60"></div>
                        <div className="absolute inset-2 border border-blue-950 rounded-full animate-pulse opacity-40"></div>
                      </div>
                    </div>
                  ))}
                </div>

                <style jsx>{`
                  @keyframes targetLock {
                    0% { 
                      opacity: 0; 
                      transform: scale(0) rotate(180deg); 
                    }
                    50% { 
                      opacity: 1; 
                      transform: scale(1.2) rotate(90deg); 
                    }
                    100% { 
                      opacity: 1; 
                      transform: scale(1) rotate(0deg); 
                    }
                  }
                `}</style>
              </div>
            )}

            {/* Stage 2: Battle Plan Decryption */}
            {revealStage === 2 && (
              <div className="text-center relative">
                {/* Matrix-style background */}
                <div className="absolute inset-0 overflow-hidden opacity-20">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute text-blue-950 text-xs font-mono animate-pulse"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`
                      }}
                    >
                      {Math.random() > 0.5 ? '01010101' : '10101010'}
                    </div>
                  ))}
                </div>

                {/* Decryption progress */}
                <div className="relative z-10">
                  <div className="mb-8">
                    <div className="text-2xl font-bold text-blue-950 mb-4 font-mono">
                      <span className="animate-pulse">DECRYPTING BATTLE PLAN</span>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="w-80 mx-auto h-2 bg-gray-300 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-950 to-blue-700 transition-all duration-1000"
                        style={{width: '100%', animation: 'progress 1.5s ease-out'}}
                      ></div>
                    </div>
                    
                    <div className="mt-4 text-blue-950 font-mono text-sm">
                      <span className="animate-pulse">STATUS: MISSION PARAMETERS LOADED</span>
                    </div>
                  </div>

                  {/* Holographic week display */}
                  <div className="grid grid-cols-5 gap-4 max-w-md mx-auto">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className="relative"
                        style={{
                          animation: `hologram 0.8s ease-out ${i * 80}ms forwards`
                        }}
                      >
                        <div className="w-12 h-12 border-2 border-blue-950 rounded-full flex items-center justify-center font-bold text-sm bg-blue-50">
                          W{i + 1}
                        </div>
                        {/* Holographic lines */}
                        <div className="absolute inset-0 opacity-60">
                          <div className="w-full h-0.5 bg-blue-950 absolute top-1/2 animate-pulse"></div>
                          <div className="h-full w-0.5 bg-blue-950 absolute left-1/2 animate-pulse"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <style jsx>{`
                  @keyframes progress {
                    from { width: 0%; }
                    to { width: 100%; }
                  }
                  @keyframes hologram {
                    0% { 
                      opacity: 0; 
                      transform: translateY(20px) scale(0.8);
                      filter: blur(4px);
                    }
                    100% { 
                      opacity: 1; 
                      transform: translateY(0) scale(1);
                      filter: blur(0px);
                    }
                  }
                `}</style>
              </div>
            )}
          </div>
        )}

        {/* Military-Themed Main Content */}
        {showContent && (
          <div className="animate-fade-in" style={{ animation: 'fadeIn 0.8s ease-in-out' }}>
            <style jsx>{`
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}</style>

            {/* Mission Command Center */}
            <div className="bg-gradient-to-r from-gray-900 via-blue-950 to-gray-900 rounded-2xl shadow-2xl border-2 border-blue-900 p-8 mb-12">
              <div className="text-center text-white mb-8">
                <div className="flex items-center justify-center mb-4">
                  <i className="fas fa-shield-alt text-3xl mr-4"></i>
                  <h3 className="text-2xl font-bold font-mono">MISSION CONTROL CENTER</h3>
                  <i className="fas fa-shield-alt text-3xl ml-4"></i>
                </div>
                <p className="text-blue-200 font-mono">SELECT TRAINING MODULE FOR DETAILED BRIEFING</p>
              </div>

              {/* Mission Status Grid */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {sortedItems.map((item) => (
                  <div
                    key={item.id}
                    className="relative cursor-pointer transition-all duration-300 transform hover:scale-105"
                    onClick={() => handleWeekClick(item.weekNumber)}
                  >
                    {/* Mission Badge */}
                    <div className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                      activeWeek === item.weekNumber 
                        ? 'bg-blue-600 border-blue-400 shadow-2xl' 
                        : 'bg-gray-800 border-gray-600 hover:border-blue-400'
                    }`}>
                      {/* Week Number */}
                      <div className="text-center mb-3">
                        <div className={`w-12 h-12 mx-auto rounded-full border-2 flex items-center justify-center font-bold text-lg ${
                          activeWeek === item.weekNumber
                            ? 'bg-white text-blue-950 border-white'
                            : 'bg-blue-950 text-white border-blue-400'
                        }`}>
                          {item.weekNumber}
                        </div>
                      </div>

                      {/* Mission Icon */}
                      {item.icon && (
                        <div className="text-center mb-2">
                          <i className={`${item.icon} text-xl ${
                            activeWeek === item.weekNumber ? 'text-white' : 'text-blue-400'
                          }`}></i>
                        </div>
                      )}

                      {/* Mission Title */}
                      <div className={`text-center text-xs font-bold font-mono ${
                        activeWeek === item.weekNumber ? 'text-white' : 'text-blue-200'
                      }`}>
                        {item.title.toUpperCase()}
                      </div>

                      {/* Status Indicator */}
                      <div className="absolute -top-2 -right-2">
                        <div className={`w-4 h-4 rounded-full ${
                          activeWeek === item.weekNumber ? 'bg-green-400' : 'bg-yellow-400'
                        } animate-pulse`}></div>
                      </div>

                      {/* Active Mission Overlay */}
                      {activeWeek === item.weekNumber && (
                        <div className="absolute inset-0 border-2 border-white rounded-xl animate-pulse opacity-50"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

        {/* Mobile: Vertical Timeline */}
        <div className="block lg:hidden">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-950"></div>
            
            {sortedItems.map((item, index) => (
              <div 
                key={item.id} 
                className="relative flex items-start mb-8"
                onClick={() => handleWeekClick(item.weekNumber)}
              >
                {/* Week circle */}
                <div className="relative z-10 flex-shrink-0 w-12 h-12 bg-blue-950 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-bold">
                    W{item.weekNumber}
                  </span>
                </div>
                
                {/* Content card */}
                <div 
                  className={`ml-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border-2 ${
                    activeWeek === item.weekNumber ? 'border-blue-950 shadow-2xl scale-105' : 'border-gray-200'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      {item.icon && (
                        <i className={`${item.icon} text-blue-950 text-xl mr-3`}></i>
                      )}
                      <h3 className="text-xl font-bold text-blue-950">{item.title}</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{item.description}</p>
                    
                    {activeWeek === item.weekNumber && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center text-blue-950">
                          <i className="fas fa-clock mr-2"></i>
                          <span className="text-sm font-medium">Week {item.weekNumber} Focus</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center bg-blue-950 text-white px-8 py-4 rounded-full shadow-lg">
            <i className="fas fa-graduation-cap mr-3 text-xl"></i>
            <span className="text-lg font-semibold">10-Week Program</span>
          </div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Rigorous, practical training designed to turn your idea into a viable business
          </p>
        </div>
          </div>
        )}

        {/* Mission Briefing Popup Modal */}
        {showPopup && activeWeek && (
          <div className="fixed inset-0 bg-white bg-opacity-10 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-800 to-blue-950 rounded-xl shadow-2xl border-2 border-blue-700 max-w-lg w-full max-h-[70vh] overflow-y-auto transform transition-all duration-300 scale-100">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-4 border-b border-blue-700">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-400 text-blue-950 rounded-full flex items-center justify-center font-bold text-sm">
                    {activeWeek}
                  </div>
                  <h4 className="text-lg font-bold text-white font-mono truncate">
                    {sortedItems.find(item => item.weekNumber === activeWeek)?.title.toUpperCase()}
                  </h4>
                </div>
                <button
                  onClick={closePopup}
                  className="text-blue-300 hover:text-white transition-colors text-xl"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              {/* Navigation Controls */}
              <div className="flex justify-between items-center p-4 border-b border-blue-700 bg-gradient-to-r from-gray-900 to-blue-900">
                <button
                  onClick={() => navigateWeek('prev')}
                  disabled={sortedItems.findIndex(item => item.weekNumber === activeWeek) === 0}
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-mono text-sm"
                >
                  <i className="fas fa-chevron-left"></i>
                  <span>PREV</span>
                </button>
                
                <div className="flex items-center space-x-2 text-blue-200 font-mono text-sm">
                  <span>WEEK {activeWeek} OF {sortedItems.length}</span>
                </div>
                
                <button
                  onClick={() => navigateWeek('next')}
                  disabled={sortedItems.findIndex(item => item.weekNumber === activeWeek) === sortedItems.length - 1}
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-mono text-sm"
                >
                  <span>NEXT</span>
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {(() => {
                  const selectedWeek = sortedItems.find(item => item.weekNumber === activeWeek);
                  if (!selectedWeek) return null;
                  
                  return (
                    <div className="bg-gradient-to-br from-blue-900 to-gray-800 rounded-lg p-5 border border-blue-400 shadow-xl">
                      {/* Mission Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-blue-400 text-blue-950 rounded-full border border-blue-200 flex items-center justify-center font-bold text-lg">
                          {selectedWeek.weekNumber}
                        </div>
                        {selectedWeek.icon && (
                          <i className={`${selectedWeek.icon} text-3xl text-blue-300`}></i>
                        )}
                      </div>

                      <h3 className="text-xl font-bold mb-3 font-mono text-white">
                        {selectedWeek.title.toUpperCase()}
                      </h3>
                      
                      <p className="leading-relaxed text-blue-100 mb-4 text-sm">
                        {selectedWeek.description}
                      </p>

                      <div className="pt-3 border-t border-blue-400">
                        <div className="flex items-center justify-between text-blue-200">
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
              <div className="p-4 border-t border-blue-700 bg-gradient-to-r from-gray-900 to-blue-900">
                <button
                  onClick={closePopup}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 font-mono text-sm"
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