'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/lib/cms/admin-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

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
  const [clicks, setClicks] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleDotClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Dot clicked - opening dialog'); // Debug log
    setShowDialog(true);
  };

  return (
    <>
      <div 
        onClick={handleDotClick}
        className={`w-2 h-2 rounded-full bg-gray-300 cursor-default opacity-20 hover:opacity-40 transition-opacity ${className}`}
        style={{ 
          position: 'fixed', 
          top: '80px', 
          right: '10px', 
          zIndex: 30 
        }}
        title=""
      />
      {showDialog && (
        <AdminLoginDialog 
          onClose={() => setShowDialog(false)}
        />
      )}
    </>
  );
}

// Login/Logout Dialog Component
function AdminLoginDialog({ onClose }: { onClose: () => void }) {
  const { user, isAdmin, signIn, signOut } = useAdmin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await signIn(email, password);
      onClose();
    } catch (error: any) {
      setError(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
      onClose();
    } catch (error: any) {
      setError(error.message || 'Logout failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[10000] p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            {isAdmin ? 'Admin Panel' : 'Admin Login'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={loading}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          {isAdmin ? (
            // Logged in state
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Logged in as: <span className="font-medium">{user?.email}</span>
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? 'Signing out...' : 'Sign Out'}
                </Button>
                <Button
                  onClick={() => window.location.href = '/admin'}
                  disabled={loading}
                  className="flex-1"
                >
                  Admin Panel
                </Button>
              </div>
            </div>
          ) : (
            // Login form
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                  {error}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}