import Link from 'next/link';

interface BottomNavigationProps {
  currentPage: 'home' | 'team' | 'curriculum' | 'qualifications' | 'apply';
}

export default function BottomNavigation({ currentPage }: BottomNavigationProps) {
  const getNavigationFlow = () => {
    switch (currentPage) {
      case 'home':
        return [
          {
            title: 'Meet Our Team',
            description: 'Get to know the experienced veterans and entrepreneurs leading the program.',
            href: '/team',
            icon: 'fas fa-users',
            primary: true
          },
          {
            title: 'View Curriculum',
            description: 'Explore our comprehensive 10-week entrepreneurship program.',
            href: '/curriculum',
            icon: 'fas fa-graduation-cap',
            primary: false
          }
        ];
      
      case 'team':
        return [
          {
            title: 'View Our Curriculum',
            description: 'Discover what you\'ll learn in our 10-week program.',
            href: '/curriculum',
            icon: 'fas fa-graduation-cap',
            primary: true
          },
          {
            title: 'Check Qualifications',
            description: 'See if you meet the requirements to join Alpha-Bet.',
            href: '/qualifications',
            icon: 'fas fa-check-circle',
            primary: false
          }
        ];
      
      case 'curriculum':
        return [
          {
            title: 'Check If You Qualify',
            description: 'Verify you meet our program requirements.',
            href: '/qualifications',
            icon: 'fas fa-check-circle',
            primary: true
          },
          {
            title: 'Meet the Team',
            description: 'Learn about our experienced instructors and mentors.',
            href: '/team',
            icon: 'fas fa-users',
            primary: false
          }
        ];
      
      case 'qualifications':
        return [
          {
            title: 'Apply Now',
            description: 'Ready to join? Start your application today.',
            href: '/apply',
            icon: 'fas fa-rocket',
            primary: true
          },
          {
            title: 'Review Curriculum',
            description: 'Take another look at what you\'ll learn.',
            href: '/curriculum',
            icon: 'fas fa-graduation-cap',
            primary: false
          }
        ];
      
      case 'apply':
        return [
          {
            title: 'Review Program Details',
            description: 'Take another look at our curriculum and requirements.',
            href: '/curriculum',
            icon: 'fas fa-graduation-cap',
            primary: true
          },
          {
            title: 'Meet the Team',
            description: 'Get to know who will be guiding your journey.',
            href: '/team',
            icon: 'fas fa-users',
            primary: false
          }
        ];
      
      default:
        return [];
    }
  };

  const navigationItems = getNavigationFlow();

  if (navigationItems.length === 0) return null;

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready for the Next Step?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Continue exploring the Alpha-Bet program to see how we can help transform your military experience into entrepreneurial success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {navigationItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`group block relative overflow-hidden rounded-xl border transition-all duration-300 hover:scale-105 ${
                item.primary
                  ? 'bg-white text-gray-900 border-white shadow-2xl'
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/15'
              }`}
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    item.primary
                      ? 'bg-gray-900 text-white'
                      : 'bg-white/20 text-white group-hover:bg-white/30'
                  }`}>
                    <i className={`${item.icon} text-lg`}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold leading-tight ${
                      item.primary ? 'text-gray-900' : 'text-white'
                    }`}>
                      {item.title}
                    </h3>
                  </div>
                  <div className={`${
                    item.primary ? 'text-gray-900' : 'text-white/60'
                  }`}>
                    <i className="fas fa-arrow-right text-lg group-hover:translate-x-1 transition-transform"></i>
                  </div>
                </div>
                
                <p className={`leading-relaxed ${
                  item.primary ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Always show Apply button if not on apply page */}
        {currentPage !== 'apply' && (
          <div className="text-center mt-12">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300 shadow-xl"
            >
              <i className="fas fa-rocket"></i>
              <span>Apply to Alpha-Bet</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}