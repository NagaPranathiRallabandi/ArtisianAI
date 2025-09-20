import { nextHandler } from '@genkit-ai/next';
import { generateImageVariations } from '@/ai/flows/generate-image-variations';

export const POST = nextHandler({ flows: [generateImageVariations] });
