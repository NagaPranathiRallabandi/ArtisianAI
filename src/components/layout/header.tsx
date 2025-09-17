
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Brush, LogIn, LogOut } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Simulate checking auth state on page load/navigation
    const authenticatedRoutes = ['/dashboard', '/portfolio', '/narrative-crafter'];
    if (authenticatedRoutes.includes(pathname)) {
        setIsLoggedIn(true);
    } else {
        setIsLoggedIn(false);
    }
    setIsLoading(false);
  }, [pathname]);


  const handleLogout = () => {
    setIsLoggedIn(false);
    router.push('/');
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
        <nav className="flex flex-1 items-center justify-center space-x-4">
          {!isLoading && isLoggedIn && (
            <>
              <Link href="/dashboard" className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground">
                Dashboard
              </Link>
              <Link href="/narrative-crafter" className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground">
                AI Narrative Crafter
              </Link>
            </>
          )}
        </nav>
        <div className="flex items-center justify-end space-x-2 min-w-[200px]">
          {isLoading ? (
             <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-24" />
             </div>
          ) : isLoggedIn ? (
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="mr-2"/>
              Logout
            </Button>
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
