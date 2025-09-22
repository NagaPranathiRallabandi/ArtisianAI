import 'dotenv/config'; // Load environment variables

import { configureGenkit } from 'genkit'; // Correct import from 'genkit'
import { googleAI } from '@genkit-ai/googleai';

export default configureGenkit({
  plugins: [
    googleAI(),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});