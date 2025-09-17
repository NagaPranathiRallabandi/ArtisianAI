'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Brush, LogIn, LogOut } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    setIsLoggedIn(false);
    router.push('/');
  };

  // A simple way to simulate login when visiting the login page
  // In a real app, this would be handled by an auth provider
  if (pathname === '/login' && !isLoggedIn) {
      setIsLoggedIn(true);
  }


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center gap-2 font-bold font-headline text-lg">
            <Brush className="h-6 w-6 text-primary" />
            <span>ArtisanAI</span>
          </Link>
        </div>
        <nav className="flex flex-1 items-center space-x-4">
          {isLoggedIn && (
            <>
              <Link href="/narrative-crafter" className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground">
                AI Narrative Crafter
              </Link>
              <Link href="/portfolio" className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground">
                My Portfolio
              </Link>
            </>
          )}
        </nav>
        <div className="flex items-center justify-end space-x-2">
          {isLoggedIn ? (
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
