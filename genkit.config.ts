// FILENAME: genkit.config.ts

import { configureGenkit } from '@genkit-ai/core';
import { vertexAI } from '@genkit-ai/vertexai';

export default configureGenkit({
  plugins: [
    vertexAI({
      projectId: 'studio-9847644347-c9627',
      location: 'us-central1',
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
