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
    <section className="py-16 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
          {title}
        </h2>
        <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
        <Link href={buttonLink}>
          <Button 
            size="lg"
            className="px-8 py-4 text-lg font-semibold bg-white text-black hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            {buttonText}
          </Button>
        </Link>
      </div>
    </section>
  );
}