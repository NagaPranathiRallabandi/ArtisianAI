// FILE: src/app/api/generate-image/route.ts

import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// ==================================================================
//  NEW: An array of different final prompt templates
//  Feel free to change, add, or remove any of these!
// ==================================================================
const finalPromptTemplates = [
  `A professional, minimalist product shot of {{description}} on a clean, seamless white background with soft, even studio lighting.`,
  `An artistic, moody photograph of {{description}} sitting on a dark oak surface. The scene is lit with dramatic, low-key lighting, creating deep shadows.`,
  `A photorealistic image of {{description}} placed on a weathered wooden ledge outdoors, with a soft, blurred background of green foliage and morning sunlight.`,
  `A cozy, rustic living room scene with {{description}} placed on a wooden coffee table next to a steaming mug and an open book.`
];


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { photoDataUri } = body;

    // --- Environment Variable Setup ---
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const VERTEX_PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT_ID;
    const VERTEX_ACCESS_TOKEN = process.env.GOOGLE_ACCESS_TOKEN;
    const LOCATION = 'us-central1';

    if (!GEMINI_API_KEY || !VERTEX_PROJECT_ID || !VERTEX_ACCESS_TOKEN) {
      throw new Error("One or more required environment variables are not set.");
    }
    if (!photoDataUri) {
      return NextResponse.json({ error: 'photoDataUri is required' }, { status: 400 });
    }

    const match = photoDataUri.match(/data:(image\/[^;]+);base64,(.+)/);
    if (!match) {
      throw new Error('Invalid photo data URI format.');
    }
    const [, mimeType, base64Data] = match;

    // STEP 1: Describe the Artwork
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const geminiModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
    
    const descriptionPrompt = "Describe the artwork in this image in a short, descriptive phrase (e.g., 'a hand-painted blue ceramic vase').";
    const imagePart = { inlineData: { data: base64Data, mimeType } };

    const descriptionResult = await geminiModel.generateContent([descriptionPrompt, imagePart]);
    const artworkDescription = descriptionResult.response.text();
    
    // STEP 2: Generate a New Scene
    // ==================================================================
    //  NEW: Randomly pick one of the templates from the array
    // ==================================================================
    const randomTemplate = finalPromptTemplates[Math.floor(Math.random() * finalPromptTemplates.length)];
    const finalPrompt = randomTemplate.replace('{{description}}', artworkDescription);
    console.log(`Using Template: "${finalPrompt}"`);

    const url = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${VERTEX_PROJECT_ID}/locations/${LOCATION}/publishers/google/models/imagegeneration@006:predict`;

    const requestBody = {
      instances: [{ prompt: finalPrompt, baseImage: { bytesBase64Encoded: base64Data } }],
      parameters: { sampleCount: 1 }
    };

    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VERTEX_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!apiResponse.ok) {
        const errorText = await apiResponse.text();
        throw new Error(`API request failed with status ${apiResponse.status}: ${errorText}`);
    }

    const data = await apiResponse.json();
    const base64EncodedImage = data.predictions?.[0]?.bytesBase64Encoded;
    if (!base64EncodedImage) {
        throw new Error("API response did not contain image data.");
    }

    const generatedDataUri = `data:image/png;base64,${base64EncodedImage}`;
    return NextResponse.json({ images: [generatedDataUri] });

  } catch (error) {
    console.error('Error in /api/generate-image:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Failed to generate image', details: errorMessage }, { status: 500 });
  }
}