// src/ai/flows/generate-image-variations.ts
'use server';
/**
 * @fileOverview AI-powered image variation generator for artisan products.
 *
 * - generateImageVariations - A function that generates image variations.
 * - GenerateImageVariationsInput - The input type for the generateImageVariations function.
 * - GenerateImageVariationsOutput - The return type for the generateImageVariations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImageVariationsInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a product, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateImageVariationsInput = z.infer<typeof GenerateImageVariationsInputSchema>;

const GenerateImageVariationsOutputSchema = z.object({
  images: z.array(z.string()).describe('An array of generated image data URIs.'),
});
export type GenerateImageVariationsOutput = z.infer<typeof GenerateImageVariationsOutputSchema>;


export async function generateImageVariations(input: GenerateImageVariationsInput): Promise<GenerateImageVariationsOutput> {
  return generateImageVariationsFlow(input);
}


const generateImageVariationsFlow = ai.defineFlow(
  {
    name: 'generateImageVariationsFlow',
    inputSchema: GenerateImageVariationsInputSchema,
    outputSchema: GenerateImageVariationsOutputSchema,
  },
  async (input) => {
    const prompts = [
        'Generate a refined version of this product image with a different color scheme.',
        'Generate a refined version of this product image with a subtle pattern change.',
        'Generate a refined version of this product image in a brighter, studio lighting setting.',
        'Generate a refined version of this product image with a complementary background.',
    ];

    const imageUrls: string[] = [];
    
    // Create an array of promises for each image generation
    const generationPromises = prompts.map(promptText => 
      ai.generate({
        model: 'googleai/gemini-2.5-flash-image-preview',
        prompt: [
          { media: { url: input.photoDataUri } },
          { text: promptText },
        ],
        config: {
            responseModalities: ['TEXT', 'IMAGE'],
        }
      })
    );

    // Wait for all promises to resolve
    const results = await Promise.all(generationPromises);

    results.forEach(({ media }) => {
        if (media?.url) {
            imageUrls.push(media.url);
        }
    });
    
    return {
        images: imageUrls,
    };
  }
);
