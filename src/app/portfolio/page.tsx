import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, PlusCircle, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';

// Mock data - replace with actual data fetching
const artisanProducts = [
  {
    id: 'p1',
    name: 'Terracotta Vase',
    price: 75.0,
    imageUrl: 'https://picsum.photos/seed/vase/500/500',
    imageHint: 'ceramic vase'
  },
  {
    id: 'p2',
    name: 'Stoneware Mug Set',
    price: 80.0,
    imageUrl: 'https://picsum.photos/seed/mug/500/500',
    imageHint: 'ceramic mug'
  },
  {
    id: 'p3',
    name: 'Large Serving Bowl',
    price: 120.0,
    imageUrl: 'https://picsum.photos/seed/bowl/500/500',
    imageHint: 'ceramic bowl'
  },
];

function ProductCard({ product }: { product: typeof artisanProducts[0] }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="aspect-square relative mb-4">
            <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="rounded-md object-cover"
            data-ai-hint={product.imageHint}
            />
        </div>
        <div className="flex items-start justify-between">
            <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
            </div>
            <ProductActions />
        </div>
      </CardContent>
    </Card>
  );
}

function ProductActions() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-haspopup="true" size="icon" variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

export default function PortfolioPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold font-headline">My Portfolio</h1>
        <AddProductDialog />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {artisanProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

function AddProductDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2"/>
                    Add Product
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>
                        Fill out the details below to add a new product to your portfolio.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="picture">Product Image</Label>
                        <Input id="picture" type="file" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Product Name</Label>
                        <Input id="name" placeholder="e.g., Terracotta Vase"/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="price">Price</Label>
                        <Input id="price" type="number" placeholder="e.g., 75.00"/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" placeholder="Describe your product..."/>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save Product</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
