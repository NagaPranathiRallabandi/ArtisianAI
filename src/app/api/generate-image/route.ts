// FILE: src/app/api/generate-image/route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { photoDataUri } = body;

    const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT_ID;
    const ACCESS_TOKEN = process.env.GOOGLE_ACCESS_TOKEN;
    const LOCATION = 'us-central1';

    if (!PROJECT_ID || !ACCESS_TOKEN) {
      throw new Error("Project ID or Access Token is not set in environment variables.");
    }
    if (!photoDataUri) {
      return NextResponse.json({ error: 'photoDataUri is required' }, { status: 400 });
    }

    const url = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/imagegeneration@006:predict`;

    const match = photoDataUri.match(/data:image\/[^;]+;base64,(.+)/);
    if (!match) {
      throw new Error('Invalid photo data URI format.');
    }
    const [, base64Data] = match;

    // THE FINAL FIX IS HERE:
    // The key must be 'baseImage', not 'image'.
    // Inside your route.ts file...

  const requestBody = {
    instances: [
      {
        // Your new prompt for changing colors and patterns
        prompt: `A professional photograph of [the artwork in the provided image] on a seamless background.`,
        
        baseImage: {
          bytesBase64Encoded: base64Data
        }
      }
    ],
    parameters: {
      sampleCount: 1
    }
  };

    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
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