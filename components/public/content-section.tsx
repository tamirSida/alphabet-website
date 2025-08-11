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
        return {
          bg: 'bg-gradient-to-br from-gray-900 via-gray-800 to-black',
          textColor: 'text-white',
          cardBg: 'bg-gradient-to-br from-gray-800 to-gray-900',
          borderColor: 'border-gray-600',
          icon: 'fas fa-bullseye'
        };
      case 'why-alpha-bet':
        return {
          bg: 'bg-gradient-to-br from-gray-50 via-white to-gray-100',
          textColor: 'text-gray-900',
          cardBg: 'bg-white',
          borderColor: 'border-gray-200',
          icon: 'fas fa-star'
        };
      case 'who-should-apply':
        return {
          bg: 'bg-gradient-to-br from-gray-900 via-gray-800 to-black',
          textColor: 'text-white',
          cardBg: 'bg-gradient-to-br from-gray-800 to-gray-900',
          borderColor: 'border-gray-600',
          icon: 'fas fa-users'
        };
      case 'what-you-gain':
        return {
          bg: 'bg-gradient-to-br from-gray-50 via-white to-gray-100',
          textColor: 'text-gray-900',
          cardBg: 'bg-white',
          borderColor: 'border-gray-200',
          icon: 'fas fa-trophy'
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-gray-50 via-white to-gray-100',
          textColor: 'text-gray-900',
          cardBg: 'bg-white',
          borderColor: 'border-gray-200',
          icon: 'fas fa-info-circle'
        };
    }
  };

  const styles = getTypeStyles(type);

  return (
    <section className={`py-20 px-4 ${styles.bg} ${className}`}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className={`w-16 h-16 rounded-full ${styles.cardBg} border-2 ${styles.borderColor} flex items-center justify-center mr-4 shadow-lg`}>
              <i className={`${styles.icon} text-2xl ${styles.textColor === 'text-white' ? 'text-white' : 'text-gray-700'}`}></i>
            </div>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${styles.textColor}`}>
              {title}
            </h2>
          </div>
        </div>

        {/* Content Card */}
        <div className={`${styles.cardBg} rounded-2xl shadow-2xl border-2 ${styles.borderColor} p-8 sm:p-12 transform transition-all duration-300 hover:scale-[1.02]`}>
          <div className="max-w-none leading-relaxed">
            {content.split('\n').map((paragraph, index) => {
              if (paragraph.trim() === '') return null;
              
              // Check if it's a list item (starts with bullet point or dash)
              if (paragraph.trim().startsWith('•') || paragraph.trim().startsWith('-')) {
                return (
                  <div key={index} className="flex items-start mb-6">
                    <div className={`w-3 h-3 ${styles.textColor === 'text-white' ? 'bg-white' : 'bg-gray-900'} rounded-full mt-3 mr-6 flex-shrink-0 shadow-sm`}></div>
                    <p className={`text-lg sm:text-xl ${styles.textColor === 'text-white' ? 'text-gray-100' : 'text-gray-700'} leading-relaxed`}>
                      {paragraph.replace(/^[•-]\s*/, '')}
                    </p>
                  </div>
                );
              }
              
              return (
                <p key={index} className={`text-lg sm:text-xl ${styles.textColor === 'text-white' ? 'text-gray-100' : 'text-gray-700'} mb-8 leading-relaxed`}>
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Decorative Bottom Border */}
          <div className={`mt-12 pt-8 border-t ${styles.borderColor}`}>
            <div className="flex justify-center">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${styles.textColor === 'text-white' ? 'bg-gray-400' : 'bg-gray-600'}`}></div>
                <div className={`w-16 h-0.5 ${styles.textColor === 'text-white' ? 'bg-gray-500' : 'bg-gray-400'}`}></div>
                <div className={`w-2 h-2 rounded-full ${styles.textColor === 'text-white' ? 'bg-gray-400' : 'bg-gray-600'}`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}