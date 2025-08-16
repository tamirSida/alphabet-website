import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { name: 'Home', href: '/' },
    { name: 'Team', href: '/team' },
    { name: 'Curriculum', href: '/curriculum' },
    { name: 'Qualifications', href: '/qualifications' },
    { name: 'Apply', href: '/apply' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ];

  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-gray-900 font-bold text-lg">α</span>
              </div>
              <span className="text-white font-bold text-xl">Alpha-Bet</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              A free entrepreneurship program for US and Israeli combat veterans, 
              designed to equip them with the skills, network, and battle-tested mindset 
              to build successful startups.
            </p>
            <div className="mt-6 flex space-x-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <i className="fab fa-twitter text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>
                <i className="fas fa-envelope mr-2"></i>
                info@alphabetprogram.com
              </p>
              <p>
                <i className="fas fa-phone mr-2"></i>
                +1 (555) 123-4567
              </p>
            </div>
            
            <h3 className="text-white font-semibold mt-6 mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Alpha-Bet Program. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2 sm:mt-0">
              Empowering veterans to become entrepreneurs.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}