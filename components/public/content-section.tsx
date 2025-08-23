'use client';

import { useState } from 'react';
import { useAdmin } from '@/lib/cms/admin-context';

interface Highlight {
  id: string;
  text: string;
  order: number;
}

interface ContentSectionProps {
  title: string;
  content: string;
  type?: string;
  description?: string; // Override the default description
  className?: string;
  onEditBrief?: () => void;
  onEditHighlight?: (highlight?: Highlight, index?: number) => void;
  onDeleteHighlight?: (highlight: Highlight, index: number) => void;
  onAddHighlight?: () => void;
  onEditDescription?: () => void;
}

export default function ContentSection({ 
  title, 
  content, 
  type,
  description,
  className = '',
  onEditBrief,
  onEditHighlight,
  onDeleteHighlight,
  onAddHighlight,
  onEditDescription
}: ContentSectionProps) {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const { isAdminMode } = useAdmin();

  const getTypeConfig = (sectionType?: string) => {
    switch (sectionType) {
      case 'mission':
        return {
          icon: 'fas fa-bullseye',
          accentColor: 'from-blue-500 to-blue-600',
          glowColor: 'shadow-blue-500/20',
          description: 'Our foundation and purpose'
        };
      case 'why-alpha-bet':
        return {
          icon: 'fas fa-star',
          accentColor: 'from-purple-500 to-purple-600', 
          glowColor: 'shadow-purple-500/20',
          description: 'What makes us unique'
        };
      case 'what-you-gain':
        return {
          icon: 'fas fa-trophy',
          accentColor: 'from-yellow-500 to-yellow-600',
          glowColor: 'shadow-yellow-500/20',
          description: 'Your transformation journey'
        };
      default:
        return {
          icon: 'fas fa-info-circle',
          accentColor: 'from-gray-500 to-gray-600',
          glowColor: 'shadow-gray-500/20',
          description: 'Learn more'
        };
    }
  };

  const config = getTypeConfig(type);
  // Use custom description if provided, otherwise use default from config
  const displayDescription = description || config.description;

  // Parse content into structured format
  const parseContent = (text: string) => {
    const sections = text.split('\n\n');
    const result: { intro?: string; bullets: string[] } = { bullets: [] };
    
    sections.forEach(section => {
      if (section.includes('•') || section.includes('-')) {
        // Extract bullet points
        const bullets = section.split('\n').filter(line => 
          line.trim().startsWith('•') || line.trim().startsWith('-')
        ).map(line => line.replace(/^[•-]\s*/, '').trim());
        result.bullets.push(...bullets);
      } else if (section.trim() && !result.intro) {
        // First non-bullet section is intro
        result.intro = section.trim();
      }
    });
    
    // If no bullets found but we have content, create key points from sentences
    if (result.bullets.length === 0 && text.trim()) {
      const sentences = text.split('.').filter(s => s.trim().length > 20);
      if (sentences.length > 1) {
        // Take intro as first sentence, rest as bullets
        result.intro = sentences[0].trim() + '.';
        result.bullets = sentences.slice(1, 4).map(s => s.trim()).filter(s => s.length > 0);
      } else {
        result.intro = text.trim();
      }
    }
    
    return result;
  };

  const { intro, bullets } = parseContent(content);

  return (
    <section className={`py-16 sm:py-24 px-4 bg-transparent ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${config.accentColor} p-0.5 ${config.glowColor} shadow-2xl animate-pulse`}>
              <div className="w-full h-full bg-black/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <i className={`${config.icon} text-3xl text-white`}></i>
              </div>
            </div>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            {title}
          </h2>
          
          <div 
            className={`relative inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 ${isAdminMode && onEditDescription ? 'cursor-pointer hover:bg-white/20 transition-colors' : ''}`}
            onClick={isAdminMode && onEditDescription ? onEditDescription : undefined}
            title={isAdminMode && onEditDescription ? 'Click to edit description' : undefined}
          >
            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${config.accentColor}`}></div>
            <span className="text-white/80 text-sm font-medium tracking-wide uppercase">
              {displayDescription}
            </span>
          </div>
        </div>

        {/* Enhanced Content Layout */}
        <div className={`${bullets.length > 0 ? 'space-y-12' : 'grid lg:grid-cols-2 gap-8 lg:gap-12 items-start'}`}>
          {/* Intro Section */}
          {intro && (
            <div className="space-y-6">
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 sm:p-10 hover:bg-white/10 transition-all duration-500 group">
                
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.accentColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <i className="fas fa-quote-left text-white text-lg"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Mission Brief</h3>
                    <div className={`w-16 h-1 bg-gradient-to-r ${config.accentColor} rounded-full`}></div>
                  </div>
                </div>
                <p className="text-gray-200 leading-relaxed text-lg">
                  {intro}
                </p>
              </div>
            </div>
          )}

          {/* Enhanced Bullet Points */}
          {bullets.length > 0 && (
            <div className="space-y-6">
              
              {/* Stacked Layout for Highlights */}
              <div className="space-y-4">
                {bullets.map((bullet, index) => {
                const highlight: Highlight = {
                  id: `highlight-${index}`,
                  text: bullet,
                  order: index
                };
                
                return (
                  <div
                    key={index}
                    className="group relative bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 cursor-default"
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    
                    <div className="flex items-start gap-4">
                      <div className={`relative w-10 h-10 rounded-lg bg-gradient-to-br ${config.accentColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300 ${hoveredItem === index ? config.glowColor + ' shadow-lg' : ''}`}>
                        <i className="fas fa-check text-white text-sm font-bold"></i>
                        {hoveredItem === index && (
                          <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${config.accentColor} opacity-30 animate-ping`}></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-200 leading-relaxed group-hover:text-white transition-colors duration-300">
                          {bullet}
                        </p>
                      </div>
                    </div>
                    
                    {/* Hover effect border */}
                    <div className={`absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-gradient-to-r ${config.accentColor} opacity-0 group-hover:opacity-30 transition-opacity duration-300`}></div>
                  </div>
                );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Decorative Footer */}
        <div className="mt-16 sm:mt-20 pt-12 border-t border-white/10">
          <div className="flex justify-center">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${config.accentColor} animate-pulse`}></div>
              <div className={`w-24 h-0.5 bg-gradient-to-r ${config.accentColor} opacity-50`}></div>
              <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${config.accentColor}`}>
                <div className={`w-full h-full rounded-full bg-gradient-to-r ${config.accentColor} animate-ping opacity-30`}></div>
              </div>
              <div className={`w-24 h-0.5 bg-gradient-to-r ${config.accentColor} opacity-50`}></div>
              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${config.accentColor} animate-pulse`}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}