'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface CTASectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export default function CTASection({ 
  title, 
  description, 
  buttonText, 
  buttonLink 
}: CTASectionProps) {
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10">
          <i className="fas fa-shield-alt text-6xl text-white"></i>
        </div>
        <div className="absolute top-20 right-16">
          <i className="fas fa-star text-4xl text-white"></i>
        </div>
        <div className="absolute bottom-16 left-1/4">
          <i className="fas fa-medal text-5xl text-white"></i>
        </div>
        <div className="absolute bottom-10 right-10">
          <i className="fas fa-flag text-4xl text-white"></i>
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Mission Control Style Container */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border-2 border-gray-600 p-12 text-center">
          {/* Header Section */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <i className="fas fa-shield-alt text-3xl text-white"></i>
              <div className="text-center">
                <div className="text-sm font-mono text-gray-300 mb-1">FINAL MISSION BRIEFING</div>
                <div className="w-32 h-0.5 bg-gray-500"></div>
              </div>
              <i className="fas fa-shield-alt text-3xl text-white"></i>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 font-mono">
              {title}
            </h2>
            
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl p-8 mb-10 border border-gray-600">
              <p className="text-xl sm:text-2xl text-gray-100 leading-relaxed font-medium">
                {description}
              </p>
            </div>

            {/* Action Button */}
            <div className="space-y-6">
              <Link href={buttonLink}>
                <Button 
                  size="lg"
                  className="px-12 py-6 text-xl font-bold bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl rounded-full border-4 border-gray-300 hover:border-white"
                >
                  <i className="fas fa-rocket mr-3"></i>
                  {buttonText}
                  <i className="fas fa-arrow-right ml-3"></i>
                </Button>
              </Link>
              
              {/* Status Indicator */}
              <div className="flex items-center justify-center space-x-3 pt-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-mono text-gray-300">STATUS: MISSION READY</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Decorative Elements */}
          <div className="mt-12 pt-8 border-t border-gray-600">
            <div className="flex justify-center items-center space-x-8 text-gray-400">
              <div className="flex items-center space-x-2">
                <i className="fas fa-users text-lg"></i>
                <span className="text-sm font-mono">ELITE COMMUNITY</span>
              </div>
              <div className="w-0.5 h-6 bg-gray-600"></div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-graduation-cap text-lg"></i>
                <span className="text-sm font-mono">PROVEN CURRICULUM</span>
              </div>
              <div className="w-0.5 h-6 bg-gray-600"></div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-handshake text-lg"></i>
                <span className="text-sm font-mono">VETERAN NETWORK</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}