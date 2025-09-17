import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { Artisan } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface ArtisanCardProps {
  artisan: Artisan;
}

export function ArtisanCard({ artisan }: ArtisanCardProps) {
  const image = PlaceHolderImages.find((img) => img.id === artisan.imageId);

  return (
    <Link href={`/artisan/${artisan.id}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="p-0">
          {image && (
             <Image
                src={image.imageUrl}
                alt={image.description}
                data-ai-hint={image.imageHint}
                width={600}
                height={600}
                className="w-full h-64 object-cover"
              />
          )}
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="text-xl font-bold font-headline">{artisan.name}</h3>
          <p className="text-primary">{artisan.craft}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
