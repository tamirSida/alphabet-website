'use client';

import { usePathname } from 'next/navigation';
import Footer from '@/components/public/footer';

export default function ConditionalFooter() {
  const pathname = usePathname();
  
  // Don't show footer on the splash page (root path)
  if (pathname === '/') {
    return null;
  }
  
  return <Footer />;
}