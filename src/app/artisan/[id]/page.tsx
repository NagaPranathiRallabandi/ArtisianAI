import { notFound } from 'next/navigation';
import Image from 'next/image';
import { artisans } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ProductCard } from '@/components/product-card';
import { ArtisanCard } from '@/components/artisan-card';
import { ContactArtisanDialog } from '@/components/contact-artisan-dialog';

interface ArtisanPageProps {
  params: {
    id: string;
  };
}

export default function ArtisanPage({ params }: ArtisanPageProps) {
  const artisan = artisans.find((a) => a.id === params.id);

  if (!artisan) {
    notFound();
  }

  const image = PlaceHolderImages.find((img) => img.id === artisan.imageId);
  const otherArtisans = artisans.filter(a => a.id !== artisan.id).slice(0, 2);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="grid md:grid-cols-3 gap-8 md:gap-12">
        <div className="md:col-span-1">
          {image && (
            <Image
              src={image.imageUrl}
              alt={image.description}
              data-ai-hint={image.imageHint}
              width={600}
              height={600}
              className="rounded-lg shadow-lg w-full aspect-square object-cover"
            />
          )}
          <ContactArtisanDialog artisanName={artisan.name} />
        </div>
        <div className="md:col-span-2">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">{artisan.name}</h1>
          <h2 className="text-2xl text-primary font-headline mt-1">{artisan.craft}</h2>
          <p className="mt-4 text-lg text-foreground/80">{artisan.bio}</p>
        </div>
      </div>

      <div className="mt-16 md:mt-24">
        <h3 className="text-3xl font-bold text-center mb-8 font-headline">Storefront</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {artisan.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {otherArtisans.length > 0 && (
        <div className="mt-16 md:mt-24">
          <h3 className="text-3xl font-bold text-center mb-8 font-headline">You Might Also Like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {otherArtisans.map((other) => (
              <ArtisanCard key={other.id} artisan={other} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
