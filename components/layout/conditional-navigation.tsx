'use client';

import { usePathname } from 'next/navigation';
import Navigation from '@/components/public/navigation';

export default function ConditionalNavigation() {
  const pathname = usePathname();
  
  // Don't show navigation on the splash page (root path)
  if (pathname === '/') {
    return null;
  }
  
  return <Navigation />;
}