
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Brush, LogIn } from 'lucide-react';

export function Header() {
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
        </div>
      </div>
    </header>
  );
}
