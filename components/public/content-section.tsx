'use client';

interface ContentSectionProps {
  title: string;
  content: string;
  type?: string;
  className?: string;
}

export default function ContentSection({ 
  title, 
  content, 
  type,
  className = '' 
}: ContentSectionProps) {
  const getTypeStyles = (sectionType?: string) => {
    switch (sectionType) {
      case 'mission':
        return 'bg-gray-50';
      case 'why-alpha-bet':
        return 'bg-white';
      case 'who-should-apply':
        return 'bg-gray-50';
      case 'curriculum':
        return 'bg-white';
      case 'what-you-gain':
        return 'bg-gray-50';
      default:
        return 'bg-white';
    }
  };

  return (
    <section className={`py-16 px-4 ${getTypeStyles(type)} ${className}`}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-950 mb-8 text-center">
          {title}
        </h2>
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          {content.split('\n').map((paragraph, index) => {
            if (paragraph.trim() === '') return null;
            
            // Check if it's a list item (starts with bullet point or dash)
            if (paragraph.trim().startsWith('•') || paragraph.trim().startsWith('-')) {
              return (
                <div key={index} className="flex items-start mb-4">
                  <div className="w-2 h-2 bg-black rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <p className="text-base sm:text-lg">
                    {paragraph.replace(/^[•-]\s*/, '')}
                  </p>
                </div>
              );
            }
            
            return (
              <p key={index} className="text-base sm:text-lg mb-6">
                {paragraph}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
}