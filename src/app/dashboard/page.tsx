
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, MoreHorizontal, Wand2, UploadCloud, Sparkles, ArrowLeft } from 'lucide-react';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { cn } from '@/lib/utils';

// Mock data - replace with actual data fetching
const initialArtisanProducts = [
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

type Product = typeof initialArtisanProducts[0];

function ProductCard({ product, onDelete }: { product: Product, onDelete: (id: string) => void }) {
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
            <ProductActions product={product} onDelete={onDelete}/>
        </div>
      </CardContent>
    </Card>
  );
}

function ProductActions({ product, onDelete }: { product: Product, onDelete: (id: string) => void }) {
    const { toast } = useToast();

    const handleDelete = () => {
        onDelete(product.id);
        toast({
            title: "Product Deleted",
            description: `"${product.name}" has been removed from your portfolio.`,
        });
    }
    return (
      <AlertDialog>
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
            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the product "{product.name}".
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>(initialArtisanProducts);

  const handleDeleteProduct = (productId: string) => {
    setProducts((currentProducts) => currentProducts.filter((p) => p.id !== productId));
  };


  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
            <h1 className="text-4xl font-bold font-headline">Welcome, Artisan!</h1>
            <p className="text-muted-foreground mt-1">Manage your craft and story from here.</p>
        </div>
        <Button asChild size="lg">
            <Link href="/narrative-crafter"><Wand2 className="mr-2"/> AI Narrative Crafter</Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>My Portfolio</CardTitle>
                <CardDescription>A collection of your finest work.</CardDescription>
            </div>
            <AddProductDialog />
        </CardHeader>
        <CardContent>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} onDelete={handleDeleteProduct}/>
                ))}
            </div>
            {products.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    <p>Your portfolio is empty.</p>
                    <p>Click "Add Product" to start building your collection.</p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}

type DialogStep = 'UPLOAD' | 'CHOOSE' | 'GENERATE' | 'FINALIZE';

function AddProductDialog() {
    const [step, setStep] = useState<DialogStep>('UPLOAD');
    const [originalImage, setOriginalImage] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [generatedImages, setGeneratedImages] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const { toast } = useToast();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const dataUri = reader.result as string;
                setOriginalImage(dataUri);
                setSelectedImage(dataUri);
                setStep('CHOOSE');
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleGenerate = async () => {
        if (!originalImage) return;
        setIsGenerating(true);
        setStep('GENERATE');
        
        // MOCK AI call
        await new Promise(resolve => setTimeout(resolve, 3000));
        const mockImages = [
            'https://picsum.photos/seed/gen1/500/500',
            'https://picsum.photos/seed/gen2/500/500',
            'https://picsum.photos/seed/gen3/500/500',
            'https://picsum.photos/seed/gen4/500/500',
        ]
        setGeneratedImages(mockImages);
        setIsGenerating(false);
    }
    
    const selectGeneratedImage = (imageUrl: string) => {
        setSelectedImage(imageUrl);
        setStep('FINALIZE');
    }

    const startFinalize = (useOriginal: boolean) => {
        setSelectedImage(useOriginal ? originalImage : null);
        setStep('FINALIZE');
    }

    const reset = () => {
        setStep('UPLOAD');
        setOriginalImage(null);
        setSelectedImage(null);
        setGeneratedImages([]);
        setIsGenerating(false);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic
        toast({ title: 'Product Added!', description: 'Your new product has been saved.' });
        reset();
    }
    
    return (
        <Dialog onOpenChange={(open) => !open && reset()}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2"/>
                    Add Product
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    {step !== 'UPLOAD' && (
                        <Button variant="ghost" size="sm" className="absolute left-4 top-4" onClick={() => setStep('UPLOAD')}>
                            <ArrowLeft className="mr-2" /> Back
                        </Button>
                    )}
                    <DialogTitle className="text-center pt-8 md:pt-0">
                        {step === 'UPLOAD' && 'Upload Product Image'}
                        {step === 'CHOOSE' && 'Choose Your Next Step'}
                        {step === 'GENERATE' && 'Generating Variations'}
                        {step === 'FINALIZE' && 'Add Product Details'}
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        {step === 'UPLOAD' && 'Start by uploading a high-quality photo of your product.'}
                        {step === 'CHOOSE' && 'Would you like to use this image or generate AI variations?'}
                        {step === 'GENERATE' && (isGenerating ? 'Our AI is crafting new versions of your product...' : 'Select your favorite generated image.')}
                        {step === 'FINALIZE' && 'Fill out the details for your new product.'}
                    </DialogDescription>
                </DialogHeader>

                {step === 'UPLOAD' && (
                    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-border rounded-lg">
                        <UploadCloud className="w-12 h-12 text-muted-foreground mb-4" />
                        <Label htmlFor="picture-upload" className={cn(buttonVariants(), "cursor-pointer")}>
                            Choose an Image
                        </Label>
                        <Input id="picture-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*"/>
                    </div>
                )}
                
                {step === 'CHOOSE' && originalImage && (
                    <div className="p-4 space-y-4">
                        <Image src={originalImage} alt="Uploaded product" width={500} height={500} className="rounded-lg aspect-square object-cover" />
                        <div className="grid grid-cols-2 gap-4">
                            <Button size="lg" onClick={() => startFinalize(true)}>
                                <UploadCloud className="mr-2"/> Use Original
                            </Button>
                            <Button size="lg" onClick={handleGenerate}>
                                <Sparkles className="mr-2"/> Generate
                            </Button>
                        </div>
                    </div>
                )}

                {step === 'GENERATE' && (
                    <div className="p-4">
                        {isGenerating ? (
                            <div className="flex flex-col items-center justify-center min-h-[300px]">
                                <LoadingSpinner className="w-16 h-16 text-primary"/>
                                <p className="mt-4 text-muted-foreground">Please wait...</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                {generatedImages.map((img, i) => (
                                    <button key={i} className="relative aspect-square group rounded-lg overflow-hidden" onClick={() => selectGeneratedImage(img)}>
                                        <Image src={img} alt={`Generated image ${i+1}`} fill className="object-cover"/>
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <p className="text-white font-bold">Select</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {step === 'FINALIZE' && selectedImage && (
                     <form onSubmit={handleSubmit} className="px-4 pb-4 space-y-4">
                        <Image src={selectedImage} alt="Selected product" width={500} height={500} className="rounded-lg aspect-square object-cover" />
                        <div className="grid gap-2">
                            <Label htmlFor="name">Product Name</Label>
                            <Input id="name" placeholder="e.g., Terracotta Vase" required/>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="price">Price</Label>
                            <Input id="price" type="number" placeholder="e.g., 75.00" required/>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" placeholder="Describe your product..." required/>
                        </div>
                        <DialogFooter>
                            <Button type="submit" className="w-full">Save Product</Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    )
}

    
