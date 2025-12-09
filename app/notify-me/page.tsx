'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NotificationSignupForm from '@/components/public/notification-signup-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotifyMePage() {
  const [showForm, setShowForm] = useState(true);
  const router = useRouter();

  const handleClose = () => {
    setShowForm(false);
    // Redirect to home after closing
    setTimeout(() => {
      router.push('/home');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Header Section */}
        <div className="mb-8">
          <h1 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Gunplay', 'Black Ops One', cursive" }}
          >
            Get Notified
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Be the first to know when applications open for the next Alpha-Bet cohort.
            Join our notification list and never miss your chance to apply.
          </p>
        </div>

        {/* Back Navigation */}
        <div className="mb-6">
          <Link href="/home">
            <Button 
              variant="outline" 
              className="text-white border-white/30 hover:bg-white/10"
            >
              ← Back to Home
            </Button>
          </Link>
        </div>
      </div>

      {/* Reuse the existing notification form component */}
      <NotificationSignupForm 
        isOpen={showForm}
        onClose={handleClose}
      />
    </div>
  );
}