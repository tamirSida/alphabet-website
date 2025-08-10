'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DiscreteAdminAccess() {
  const router = useRouter();
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const [dotClicks, setDotClicks] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Secret key combination: Ctrl+Shift+A (for admin)
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        event.preventDefault();
        router.push('/admin');
        return;
      }

      // Alpha-Bet sequence: A-L-P-H-A-B-E-T
      const sequence = ['KeyA', 'KeyL', 'KeyP', 'KeyH', 'KeyA', 'KeyB', 'KeyE', 'KeyT'];
      
      const newSequence = [...keySequence, event.code].slice(-sequence.length);
      setKeySequence(newSequence);

      if (newSequence.length === sequence.length && 
          newSequence.every((key, index) => key === sequence[index])) {
        router.push('/admin');
        setKeySequence([]);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [keySequence]); // Remove router from dependencies

  return null; // This component doesn't render anything
}

export function useUrlAdminAccess() {
  const router = useRouter();
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Secret URL parameter: ?alpha=bet
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('alpha') === 'bet') {
        router.push('/admin');
        return;
      }
      
      // Secret hash: #admin2024
      if (window.location.hash === '#admin2024') {
        router.push('/admin');
      }
    }
  }, []); // Remove router dependency to prevent infinite loops
}

// Discrete dot access component that can be embedded anywhere
export function DiscreteAdminDot({ className = '' }: { className?: string }) {
  const router = useRouter();
  const [clicks, setClicks] = useState(0);

  const handleDotClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const newCount = clicks + 1;
    setClicks(newCount);
    
    // 5 clicks on the dot = admin access
    if (newCount >= 5) {
      router.push('/admin');
      setClicks(0);
      return;
    }
    
    // Reset counter after 3 seconds
    setTimeout(() => {
      setClicks(0);
    }, 3000);
  };

  return (
    <div 
      onClick={handleDotClick}
      className={`w-2 h-2 rounded-full bg-gray-300 cursor-default opacity-20 hover:opacity-40 transition-opacity ${className}`}
      style={{ 
        position: 'absolute', 
        top: '10px', 
        right: '10px', 
        zIndex: 9999 
      }}
      title=""
    />
  );
}