'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface HeroSectionProps {
  headline: string;
  subHeadline: string;
  subHeadline2?: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
  applicationWindowOpens?: string;
  applicationWindowCloses?: string;
  programStartDate?: string;
  programEndDate?: string;
}

export default function HeroSection({
  headline,
  subHeadline,
  subHeadline2,
  ctaText,
  ctaLink,
  backgroundImage,
  applicationWindowOpens,
  applicationWindowCloses,
  programStartDate,
  programEndDate
}: HeroSectionProps) {
  const [dividerWidth, setDividerWidth] = useState(200);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  useEffect(() => {
    const updateDividerWidth = () => {
      if (subtitleRef.current) {
        const textWidth = subtitleRef.current.scrollWidth;
        const maxWidth = window.innerWidth * 0.9;
        setDividerWidth(Math.min(textWidth, maxWidth));
      }
    };

    // Update width on mount and resize
    updateDividerWidth();
    window.addEventListener('resize', updateDividerWidth);
    
    return () => window.removeEventListener('resize', updateDividerWidth);
  }, [subHeadline]);

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center px-4 py-16"
      style={backgroundImage ? {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } : undefined}
    >
      <div className="max-w-4xl mx-auto text-center text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          {headline}
        </h1>
        {/* First subtitle line */}
        <p 
          ref={subtitleRef}
          className="text-lg sm:text-xl md:text-2xl text-gray-200 font-bold mb-4 max-w-3xl mx-auto leading-relaxed"
        >
          {subHeadline}
        </p>
        
        {/* Gradient divider that matches first subtitle width */}
        <div className="flex justify-center mb-4">
          <div 
            className="h-1 bg-gradient-to-r from-purple-500 to-red-500 rounded-full transition-all duration-300"
            style={{ width: `${dividerWidth}px` }}
          ></div>
        </div>
        
        {/* Second subtitle line */}
        {subHeadline2 && (
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            {subHeadline2}
          </p>
        )}
        
        {/* Application Window Section */}
        {(applicationWindowOpens || applicationWindowCloses || programStartDate || programEndDate) && (
          <div className="bg-gradient-to-r from-purple-500/10 to-red-500/10 backdrop-blur-md rounded-xl border border-white/30 px-4 sm:px-6 py-3 sm:py-4 mb-6 max-w-md mx-auto shadow-lg">
            <div className="text-center space-y-1 sm:space-y-3">
              {(applicationWindowOpens || applicationWindowCloses) && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center text-xs sm:text-lg text-gray-100">
                  <span className="font-bold text-white mb-1 sm:mb-0 sm:mr-3 flex items-center justify-center">
                    <i className="fas fa-calendar-alt mr-1 text-purple-400"></i>
                    Application Window
                  </span>
                  <div className="text-center sm:text-left">
                    {applicationWindowOpens && applicationWindowCloses ? (
                      <span className="block sm:inline">
                        <span className="text-purple-300">Opens:</span> <span className="font-medium">{formatDate(applicationWindowOpens)}</span>
                        <span className="hidden sm:inline mx-2">•</span>
                        <span className="block sm:inline mt-1 sm:mt-0">
                          <span className="text-red-300">Closes:</span> <span className="font-medium">{formatDate(applicationWindowCloses)}</span>
                        </span>
                      </span>
                    ) : applicationWindowOpens ? (
                      <span><span className="text-purple-300">Opens:</span> <span className="font-medium">{formatDate(applicationWindowOpens)}</span></span>
                    ) : applicationWindowCloses ? (
                      <span><span className="text-red-300">Closes:</span> <span className="font-medium">{formatDate(applicationWindowCloses)}</span></span>
                    ) : null}
                  </div>
                </div>
              )}
              {(programStartDate || programEndDate) && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center text-xs sm:text-lg text-gray-100 pt-1 sm:pt-3 border-t border-white/20">
                  <span className="font-bold text-white mb-1 sm:mb-0 sm:mr-3 flex items-center justify-center">
                    <i className="fas fa-graduation-cap mr-1 text-yellow-400"></i>
                    Program Dates
                  </span>
                  <div className="text-center sm:text-left">
                    {programStartDate && programEndDate ? (
                      <span className="font-medium">{formatDate(programStartDate)} - {formatDate(programEndDate)}</span>
                    ) : programStartDate ? (
                      <span className="font-medium">{formatDate(programStartDate)}</span>
                    ) : programEndDate ? (
                      <span className="font-medium">{formatDate(programEndDate)}</span>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href={ctaLink}>
            <Button 
              size="lg"
              className="w-full sm:w-auto px-8 py-4 text-lg font-semibold bg-white text-black hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              {ctaText}
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Scroll indicator - hidden on mobile */}
      <div className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
}