// FILENAME: genkit.config.ts
import 'dotenv/config'; // Load environment variables from .env.local

import { configureGenkit } from '@genkit-ai/core';
import { googleAI } from '@genkit-ai/googleai';
import { vertexAI } from '@genkit-ai/vertexai';

export default configureGenkit({
  plugins: [
    googleAI({ apiKey: process.env.GOOGLE_API_KEY }),
    vertexAI({
      projectId: 'studio-9847644347-c9627',
      location: 'us-central1',
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
