export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageId: string;
}

export interface Artisan {
  id: string;
  name: string;
  craft: string;
  bio: string;
  imageId: string;
  products: Product[];
}
