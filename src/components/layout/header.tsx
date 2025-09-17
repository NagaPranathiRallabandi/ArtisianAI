import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Brush } from 'lucide-react';

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
        <nav className="flex flex-1 items-center space-x-4">
          <Link href="/narrative-crafter" className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground">
            AI Narrative Crafter
          </Link>
        </nav>
        <div className="flex items-center justify-end space-x-4">
            <Button>For Artisans</Button>
        </div>
      </div>
    </header>
  );
}
