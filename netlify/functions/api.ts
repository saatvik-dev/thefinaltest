import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { createServer } from '../../server';
import express from 'express';
import serverless from 'serverless-http';

// Keep the app instance between function calls
let app: express.Express | null = null;

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  try {
    // Initialize the server if it hasn't been initialized yet
    if (!app) {
      const result = await createServer({ serverless: true });
      app = result.app;
    }

    // Create a serverless handler from the Express app
    const serverlessHandler = serverless(app);
    // The serverless-http handler returns a response compatible with AWS Lambda
    // This is compatible with Netlify Functions
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