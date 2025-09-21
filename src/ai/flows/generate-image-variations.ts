'use server';
/**
 * @fileOverview AI-powered image variation generator.
 *
 * - generateImageVariations - A function that generates image variations from a given photo.
 * - GenerateImageVariationsInput - The input type for the generateImageVariations function.
 * - GenerateImageVariationsOutput - The return type for the generateImageVariations function.
 */

import { runFlow } from '@genkit-ai/flow';
import { z } from 'genkit';
import { ai } from '@/ai/genkit';

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
    return runFlow(generateImageVariationsFlow, input);
}


const generateImageVariationsFlow = ai.flow(
  {
    name: 'generateImageVariationsFlow',
    inputSchema: GenerateImageVariationsInputSchema,
    outputSchema: GenerateImageVariationsOutputSchema,
  },
  async (input) => {
    // To avoid free tier rate limits, we will only generate one variation.
    const prompts = [
        `Generate a realistic variation of the product in this image from a slightly different angle. Maintain a clean, professional, well-lit studio setting with a neutral background.`,
    ];

    const imageUrls: string[] = [];

    try {
        // DEBUG: Print the API key to the console to verify it's being loaded correctly.
        console.log('Using API Key:', process.env.GOOGLE_API_KEY ? `...${process.env.GOOGLE_API_KEY.slice(-4)}` : 'Not Found');

        const match = input.photoDataUri.match(/data:(image\/[^;]+);base64,(.+)/);
        if (!match) {
          throw new Error('Invalid photo data URI format. Expected format: data:<mimetype>;base64,<encoded_data>.');
        }

        const [, mimeType] = match;

        const media = {
            media: {
              url: input.photoDataUri,
              contentType: mimeType,
            },
          };
      
          // Revert to the original, correct model for image-to-image tasks.
          const model = 'googleai/gemini-2.5-flash-image-preview';
      
          // Process requests sequentially to avoid rate limiting
          for (const promptText of prompts) {
            const response = await ai.generate({
              model,
              prompt: [media, { text: promptText }],
              config: {
                responseModalities: ['IMAGE'],
              },
            });
      
            if (response.media?.url) {
              imageUrls.push(response.media.url);
            }
        // Add a delay to avoid hitting rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));
        }
    } catch (error) {
        console.error('Error generating image variations:', error);
        // Return empty array to prevent crashing the client
        return { images: [] };
    }
    
    return {
      images: imageUrls,
    };
  }
);
