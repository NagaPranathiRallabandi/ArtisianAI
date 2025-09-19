'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Brush, LogIn, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { EditProfileDialog } from '@/components/edit-profile-dialog';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';

export function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);


  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

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

        <div className="flex items-center justify-end space-x-2 min-w-[200px]">
          {isLoading ? (
             <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-24" />
             </div>
          ) : user ? (
            <div className="flex items-center gap-2">
               <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
               <EditProfileDialog />
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="mr-2"/>
                Logout
              </Button>
            </div>
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
          )}
        </div>
      </div>
    </header>
  );
}
