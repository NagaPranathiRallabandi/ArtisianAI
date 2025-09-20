
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Brush, LogIn, LogOut } from 'lucide-react';
import { EditProfileDialog } from '../edit-profile-dialog';
import { LoadingSpinner } from '../ui/loading-spinner';

export function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  const isDashboardPage = pathname.startsWith('/dashboard') || pathname.startsWith('/narrative-crafter');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center gap-2 font-bold font-headline text-lg">
            <Brush className="h-6 w-6 text-primary" />
            <span>ArtisanAI</span>
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-center space-x-4" />

        <div className="flex items-center justify-end space-x-2">
            {loading ? <LoadingSpinner className="h-6 w-6"/> : (
              user && isDashboardPage ? (
                <>
                  <EditProfileDialog />
                  <Button variant="outline" onClick={handleLogout}>
                    <LogOut className="mr-2"/>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="ghost">
                      <Link href="/login">
                          <LogIn className="mr-2"/>
                          Login
                      </Link>
                  </Button>
                  <Button asChild>
                      <Link href="/signup">Sign Up</Link>
                  </Button>
                </>
              )
            )}
        </div>
      </div>
    </header>
  );
}
