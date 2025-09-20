'use server';
/**
 * @fileOverview AI-powered image variation generator.
 *
 * - generateImageVariations - A function that generates image variations from a given photo.
 * - GenerateImageVariationsInput - The input type for the generateImageVariations function.
 * - GenerateImageVariationsOutput - The return type for the generateImageVariations function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateImageVariationsInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a product, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateImageVariationsInput = z.infer<typeof GenerateImageVariationsInputSchema>;

const GenerateImageVariationsOutputSchema = z.object({
  images: z.array(z.string()).describe('An array of data URIs for the generated image variations.'),
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
        `Generate a realistic variation of the product in this image from a slightly different angle. Maintain a clean, professional, well-lit studio setting with a neutral background.`,
        `Create a version of the product in this image with slightly brighter, more dramatic lighting. Keep the background neutral and the setting professional.`,
        `Generate a close-up shot of the product in this image, highlighting its texture and key features. The setting should be a simple, well-lit studio.`,
        `Produce a variation of the product in this image as if it were featured in a high-end product catalog. Adjust lighting and angle for a premium feel, but keep the background simple.`
    ];

    const imageUrls: string[] = [];

    try {
        // Process requests sequentially to avoid rate limiting
        for (const promptText of prompts) {
        const { media } = await ai.generate({
            model: 'googleai/gemini-2.5-flash-image-preview',
            prompt: [
            { media: { url: input.photoDataUri } },
            { text: promptText },
            ],
            config: {
            responseModalities: ['IMAGE'],
            },
        });

        if (media?.url) {
            imageUrls.push(media.url);
        }
        // Add a delay to avoid hitting rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));
        }
    } catch (error) {
        console.error('Error generating image variations, likely due to rate limiting:', error);
        // Return empty array to prevent crashing the client
        return { images: [] };
    }
    
    return {
      images: imageUrls,
    };
  }
);
