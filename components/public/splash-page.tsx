'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/lib/cms/admin-context';
import EditableSection from '@/components/admin/editable-section';
import EditModal from '@/components/admin/edit-modal';
import DiscreteAdminAccess, { DiscreteAdminDot, useUrlAdminAccess } from '@/components/admin/discrete-access';
import SimpleAdminToggle from '@/components/admin/simple-admin-toggle';
import { CMSServiceFactory } from '@/lib/cms/content-services';
import { SplashSection } from '@/lib/types/cms';

export default function SplashPage() {
  const [splashData, setSplashData] = useState<SplashSection | null>(null);
  const [timeLeft, setTimeLeft] = useState(4);
  const [loading, setLoading] = useState(true);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoReady, setVideoReady] = useState(true); // Start true, set false only if video is loading
  const [timerPaused, setTimerPaused] = useState(false);
  const router = useRouter();
  const { isAdminMode } = useAdmin();

  // CMS Modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Default splash data
  const defaultSplash = {
    id: 'default-splash',
    headline: "Version Bravo Alphabet",
    subHeadline: "The only entrepreneurship program for US and Israeli combat veterans.",
    redirectUrl: "/home",
    timerDuration: 4,
    isVisible: true,
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const activeSplash = splashData || defaultSplash;

  // Enable URL-based admin access
  useUrlAdminAccess();

  const loadContent = useCallback(async () => {
    try {
      setLoading(true);
      const splash = await CMSServiceFactory.getSplashService().getActiveSplash();
      setSplashData(splash);
      if (splash?.timerDuration) {
        setTimeLeft(splash.timerDuration);
      }
    } catch (error) {
      console.error('Error loading splash content:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  // Fallback timeout to prevent infinite loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log('Video loading timeout - showing content anyway');
      setVideoLoading(false);
      setVideoReady(true);
    }, 10000); // 10 seconds max wait

    return () => clearTimeout(timeout);
  }, []);

  // Timer countdown - only start when video is ready
  useEffect(() => {
    // Don't run timer if paused, in admin mode, modal is open, or video not ready
    if (timerPaused || isAdminMode || editModalOpen || !videoReady) {
      return;
    }

    if (timeLeft <= 0) {
      router.push(activeSplash.redirectUrl);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, router, activeSplash.redirectUrl, timerPaused, isAdminMode, editModalOpen, videoReady]);

  const handleSkip = () => {
    router.push(activeSplash.redirectUrl);
  };

  const handleEdit = useCallback(() => {
    setTimerPaused(true);
    setEditingItem(activeSplash);
    setEditModalOpen(true);
  }, [activeSplash]);

  const handleSave = useCallback(async (data: any) => {
    try {
      const service = CMSServiceFactory.getSplashService();
      if (editingItem && editingItem.id && !editingItem.id.startsWith('default-')) {
        await service.update(editingItem.id, data);
      } else {
        await service.create(data);
      }
      await loadContent();
    } catch (error) {
      console.error('Error saving splash:', error);
      throw error;
    }
  }, [editingItem, loadContent]);

  const splashFields = [
    { key: 'headline', label: 'Headline', type: 'text' as const, required: true, placeholder: 'Version Bravo Alphabet' },
    { key: 'subHeadline', label: 'Sub-headline', type: 'text' as const, required: true, placeholder: 'The only entrepreneurship program for US and Israeli combat veterans.' },
    { key: 'redirectUrl', label: 'Redirect URL', type: 'text' as const, required: true, placeholder: '/' },
    { key: 'timerDuration', label: 'Timer Duration (seconds)', type: 'number' as const, required: true, placeholder: '4' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Discrete Admin Access Components */}
      <DiscreteAdminAccess />
      <DiscreteAdminDot />
      <SimpleAdminToggle />

      {/* CMS Admin Controls */}
      <EditableSection
        sectionName="Splash Page"
        onEdit={handleEdit}
      >
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Video Background - Black and White */}
          <video
            autoPlay
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover z-10 filter grayscale scale-110 sm:scale-100"
            onLoadStart={() => {
              console.log('Video load started');
              setVideoLoading(true);
              setVideoReady(false);
            }}
            onLoadedData={() => {
              console.log('Video data loaded');
              setVideoLoading(false);
              setVideoReady(true);
            }}
            onCanPlay={() => {
              console.log('Video can play');
              setVideoLoading(false);
              setVideoReady(true);
            }}
            onPlaying={() => {
              console.log('Video is playing');
              setVideoLoading(false);
              setVideoReady(true);
            }}
            onError={(e) => {
              console.error('Video error:', e);
              // If video fails, still show content
              setVideoLoading(false);
              setVideoReady(true);
            }}
            onEnded={(e) => {
              (e.target as HTMLVideoElement).currentTime = (e.target as HTMLVideoElement).duration;
            }}
            style={{
              transformOrigin: 'center center'
            }}
          >
            <source src="/hero-background.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Content */}
          <div className="relative z-40 h-full flex items-center justify-center px-4">
            {/* Semi-transparent background for text readability */}
            <div className="text-center text-white max-w-2xl bg-black/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" style={{ fontFamily: "'Black Ops One', cursive" }}>
                {activeSplash.headline}
              </h1>
              
              {/* Blue divider */}
              <div className="flex justify-center mb-6">
                <div className="w-32 h-1 bg-blue-600 rounded-full"></div>
              </div>
              
              <p className="text-lg sm:text-xl md:text-2xl text-gray-200 font-medium mb-8 leading-relaxed" style={{ fontFamily: "'Black Ops One', cursive" }}>
                {activeSplash.subHeadline}
              </p>
              
              {/* Timer and Skip Button */}
              <div className="flex flex-col items-center gap-4">
                <div className="text-base text-gray-300">
                  Entering in {timeLeft}...
                </div>
                
                <button
                  onClick={handleSkip}
                  className="px-6 py-3 text-sm font-medium text-blue-300 hover:text-white border border-blue-600 hover:border-white rounded-lg transition-all duration-300 hover:bg-blue-600/20"
                >
                  Skip Intro
                </button>
              </div>
            </div>
          </div>
        </section>
      </EditableSection>

      {/* Edit Modal */}
      <EditModal
        key={editingItem?.id || 'new'}
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setEditingItem(null);
          setTimerPaused(false);
        }}
        onSave={handleSave}
        title="Edit Splash Page"
        fields={splashFields}
        initialData={editingItem}
        loading={loading}
      />
    </div>
  );
}