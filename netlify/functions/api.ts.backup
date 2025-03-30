import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import express from 'express';
import serverless from 'serverless-http';
import { log } from '../../server/vite';

// Avoid top-level await by using a promise
let appPromise: Promise<express.Express> | null = null;

// Async function to create the server without top-level await
async function initializeApp() {
  try {
    // Using dynamic import to avoid top-level await issues
    const { createServer } = await import('../../server');
    const result = await createServer({ serverless: true });
    return result.app;
  } catch (error) {
    log(`Error initializing app: ${error}`);
    throw error;
  }
}

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  try {
    // Initialize the app promise if it doesn't exist
    if (!appPromise) {
      appPromise = initializeApp();
    }
    
    // Await the app promise
    const app = await appPromise;
    
    // Create a serverless handler from the Express app
    const serverlessHandler = serverless(app);
    const response = await serverlessHandler(event, context);
    return response as any; // Type assertion needed due to serverless-http typing
  } catch (error) {
    console.error('Error in Netlify function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
};