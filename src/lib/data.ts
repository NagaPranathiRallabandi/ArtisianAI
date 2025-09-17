import type { Artisan } from '@/lib/types';

export const artisans: Artisan[] = [
  {
    id: 'elena-vargas',
    name: 'Elena Vargas',
    craft: 'Ceramics',
    bio: 'Elena finds inspiration in the rugged landscapes of her homeland, translating the earth\'s textures and colors into functional and sculptural ceramic pieces. Each item is a dialogue between clay, hand, and fire.',
    imageId: 'artisan-elena',
    products: [
      {
        id: 'p1',
        name: 'Terracotta Vase',
        price: 75.0,
        description: 'A rustic vase with a raw, unglazed finish, perfect for dried botanicals.',
        imageId: 'product-vase',
      },
      {
        id: 'p2',
        name: 'Stoneware Mug Set',
        price: 80.0,
        description: 'Set of four hand-thrown mugs with a speckled glaze, ideal for your morning coffee.',
        imageId: 'product-mug',
      },
      {
        id: 'p3',
        name: 'Large Serving Bowl',
        price: 120.0,
        description: 'A statement piece for any dining table, featuring an intricate hand-painted design.',
        imageId: 'product-bowl',
      },
    ],
  },
  {
    id: 'liam-chen',
    name: 'Liam Chen',
    craft: 'Woodworking',
    bio: 'A third-generation woodworker, Liam Chen combines traditional joinery with modern aesthetics. He sources local, sustainable timber to create furniture that is built to last for generations.',
    imageId: 'artisan-liam',
    products: [
      {
        id: 'p4',
        name: 'Oak & Leather Stool',
        price: 250.0,
        description: 'A hand-carved oak stool with a woven leather seat, showcasing timeless craftsmanship.',
        imageId: 'product-chair',
      },
      {
        id: 'p5',
        name: 'Walnut Coffee Table',
        price: 850.0,
        description: 'A minimalist coffee table with a live-edge top and sleek, tapered legs.',
        imageId: 'product-table',
      },
    ],
  },
  {
    id: 'aisha-khan',
    name: 'Aisha Khan',
    craft: 'Textile Art',
    bio: 'Aisha Khan weaves stories into her textiles using natural dyes and fibers. Her work explores themes of identity and heritage, creating vibrant tapestries and wearable art that are rich with meaning.',
    imageId: 'artisan-aisha',
    products: [
      {
        id: 'p6',
        name: 'Silk & Merino Scarf',
        price: 180.0,
        description: 'A luxuriously soft scarf, hand-dyed with indigo and cochineal for a unique pattern.',
        imageId: 'product-scarf',
      },
      {
        id: 'p7',
        name: 'Botanical Wall Hanging',
        price: 450.0,
        description: 'A large, woven tapestry featuring abstract botanical forms, made with hand-spun wool.',
        imageId: 'product-tapestry',
      },
    ],
  },
];
