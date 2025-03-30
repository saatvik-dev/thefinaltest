// Serverless function entry point for Vercel

import { createServer } from '../server/index';
import type { IncomingMessage, ServerResponse } from 'node:http';

// Initialize server
const serverPromise = createServer();

// Export serverless handler
export default async function handler(
  req: IncomingMessage, 
  res: ServerResponse
) {
  const { app } = await serverPromise;
  
  // Forward the request to Express app
  return new Promise<void>((resolve, reject) => {
    app(req, res, (err?: any) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}