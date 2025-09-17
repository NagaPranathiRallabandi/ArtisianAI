import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { Product } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const image = PlaceHolderImages.find((img) => img.id === product.imageId);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        {image && (
          <div className="aspect-square relative">
            <Image
              src={image.imageUrl}
              alt={image.description}
              data-ai-hint={image.imageHint}
              fill
              className="object-cover"
            />
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <h4 className="font-bold text-lg">{product.name}</h4>
        <p className="text-muted-foreground">${product.price.toFixed(2)}</p>
      </CardContent>
    </Card>
  );
}
