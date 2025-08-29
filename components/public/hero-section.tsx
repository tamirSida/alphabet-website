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

  // Get program start month name
  const getProgramStartMonth = (dateString: string) => {
    if (!dateString) return 'Winter';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long' });
  };

  // Check if we're currently in the application window
  const isInApplicationWindow = () => {
    if (!applicationWindowOpens || !applicationWindowCloses) return false;
    const now = new Date();
    const opensDate = new Date(applicationWindowOpens);
    const closesDate = new Date(applicationWindowCloses);
    return now >= opensDate && now <= closesDate;
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
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-black" style={{ fontFamily: "'Black Ops One', cursive" }}>
          {headline.includes('By Version Bravo') ? (
            <>
              {headline.replace(' By Version Bravo', '')}<br />
              By Version Bravo
            </>
          ) : (
            headline
          )}
        </h1>
        {/* First subtitle line */}
        <p 
          ref={subtitleRef}
          className="text-lg sm:text-xl md:text-2xl text-black font-bold mb-4 max-w-3xl mx-auto leading-relaxed"
          style={{ fontFamily: "'Black Ops One', cursive" }}
        >
          {subHeadline}
        </p>
        
        {/* Gradient divider that matches first subtitle width */}
        <div className="flex justify-center mb-4">
          <div 
            className="h-1 bg-blue-700 rounded-full transition-all duration-300"
            style={{ width: `${dividerWidth}px` }}
          ></div>
        </div>
        
        {/* Second subtitle line */}
        {subHeadline2 && (
          <p className="text-lg sm:text-xl md:text-2xl text-black mb-8 max-w-3xl mx-auto leading-relaxed">
            {subHeadline2}
          </p>
        )}
        
        {/* Application Status Message */}
        {(applicationWindowOpens || applicationWindowCloses || programStartDate) && (
          <div className="bg-gradient-to-r from-blue-500/10 to-gray-500/10 backdrop-blur-md rounded-xl border border-gray-400/30 px-4 sm:px-8 py-3 sm:py-5 mb-6 max-w-3xl mx-auto shadow-lg">
            <div className="text-center">
              <div className="text-sm sm:text-lg text-black font-medium leading-relaxed">
                {isInApplicationWindow() ? (
                  // Currently accepting applications
                  <>
                    Applications for {getProgramStartMonth(programStartDate || '')} Semester Currently Being Accepted Through {formatDate(applicationWindowCloses || '')}
                  </>
                ) : (
                  // Applications not yet open
                  <>
                    Applications for {getProgramStartMonth(programStartDate || '')} Semester will open on {formatDate(applicationWindowOpens || '')}
                  </>
                )}
              </div>
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
      
    </section>
  );
}