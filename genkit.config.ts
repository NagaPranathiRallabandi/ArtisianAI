// FILENAME: genkit.config.ts

import { configureGenkit } from '@genkit-ai/core';
import { vertexAI } from '@genkit-ai/vertexai';

export default configureGenkit({
  plugins: [
    // This line tells Genkit to use the Vertex AI platform.
    // The Imagen model you need lives on Vertex AI.
    vertexAI({ location: 'us-central1' }),
  ],
  // These settings are recommended for easier debugging.
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});