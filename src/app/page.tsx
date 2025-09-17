import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArtisanCard } from '@/components/artisan-card';
import { artisans } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="w-full py-20 md:py-32 lg:py-40 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter mb-4 font-headline">
            Where Craftsmanship Meets AI
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-foreground/80 mb-8">
            ArtisanAI empowers local artisans with AI-powered tools to tell their unique stories, build stunning portfolios, and connect with a global audience.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="#featured-artisans">Discover Artisans</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/narrative-crafter">Create Your Story <ArrowRight /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="featured-artisans" className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline">
            Featured Artisans
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {artisans.map((artisan) => (
              <ArtisanCard key={artisan.id} artisan={artisan} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
