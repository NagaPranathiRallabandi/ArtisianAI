// src/ai/flows/generate-craft-narrative.ts
'use server';
/**
 * @fileOverview AI-powered narrative generator for artisans, creating compelling stories about their craft.
 *
 * - generateCraftNarrative - A function that generates a craft narrative.
 * - GenerateCraftNarrativeInput - The input type for the generateCraftNarrative function.
 * - GenerateCraftNarrativeOutput - The return type for the generateCraftNarrative function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCraftNarrativeInputSchema = z.object({
  craftName: z.string().describe('The name of the craft.'),
  artisanName: z.string().describe('The name of the artisan.'),
  materials: z.string().describe('The materials used in the craft.'),
  techniques: z.string().describe('The unique techniques used in the craft.'),
  history: z.string().describe('The history or origin of the craft.'),
});
export type GenerateCraftNarrativeInput = z.infer<typeof GenerateCraftNarrativeInputSchema>;

const GenerateCraftNarrativeOutputSchema = z.object({
  narrative: z.string().describe('A compelling narrative about the craft.'),
});
export type GenerateCraftNarrativeOutput = z.infer<typeof GenerateCraftNarrativeOutputSchema>;

export async function generateCraftNarrative(input: GenerateCraftNarrativeInput): Promise<GenerateCraftNarrativeOutput> {
  return generateCraftNarrativeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCraftNarrativePrompt',
  input: {schema: GenerateCraftNarrativeInputSchema},
  output: {schema: GenerateCraftNarrativeOutputSchema},
  prompt: `You are a skilled storyteller helping artisans connect with their customers.
  Craft a compelling narrative about the artisan's craft, including its history, materials, and unique techniques.
  The narrative should be engaging and showcase the story behind their work.

  Craft Name: {{{craftName}}}
  Artisan Name: {{{artisanName}}}
  Materials: {{{materials}}}
  Techniques: {{{techniques}}}
  History: {{{history}}}

  Narrative:`,
});

const generateCraftNarrativeFlow = ai.defineFlow(
  {
    name: 'generateCraftNarrativeFlow',
    inputSchema: GenerateCraftNarrativeInputSchema,
    outputSchema: GenerateCraftNarrativeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
