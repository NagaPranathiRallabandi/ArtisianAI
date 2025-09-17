'use server';

import { generateCraftNarrative, type GenerateCraftNarrativeInput } from '@/ai/flows/generate-craft-narrative';
import { z } from 'zod';

const inputSchema = z.object({
  craftName: z.string().min(1, { message: 'Craft name is required.' }),
  artisanName: z.string().min(1, { message: 'Artisan name is required.' }),
  materials: z.string().min(1, { message: 'Materials are required.' }),
  techniques: z.string().min(1, { message: 'Techniques are required.' }),
  history: z.string().min(1, { message: 'History is required.' }),
});

export type FormState = {
  success: boolean;
  message: string;
  narrative?: string;
};

export async function generateNarrativeAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawFormData = Object.fromEntries(formData.entries());
  const validatedFields = inputSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: validatedFields.error.errors.map((e) => e.message).join(', '),
    };
  }
  
  try {
    const result = await generateCraftNarrative(validatedFields.data as GenerateCraftNarrativeInput);
    if (result && result.narrative) {
      return {
        success: true,
        message: 'Narrative generated successfully.',
        narrative: result.narrative,
      };
    } else {
      return {
        success: false,
        message: 'Failed to generate narrative from AI.',
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}
