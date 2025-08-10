'use client';

import { useAdmin } from '@/lib/cms/admin-context';
import { Button } from '@/components/ui/button';
import { Settings, Lock } from 'lucide-react';

export default function SimpleAdminToggle() {
  const { isAdmin, isAdminMode, toggleAdminMode } = useAdmin();

  if (!isAdmin) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        onClick={toggleAdminMode}
        variant={isAdminMode ? "destructive" : "outline"}
        size="sm"
        className="shadow-lg"
      >
        {isAdminMode ? (
          <>
            <Lock className="h-4 w-4 mr-2" />
            Exit Edit Mode
          </>
        ) : (
          <>
            <Settings className="h-4 w-4 mr-2" />
            Edit Mode
          </>
        )}
      </Button>
    </div>
  );
}