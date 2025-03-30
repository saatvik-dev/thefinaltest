// Serverless function entry point for Vercel
import express from 'express';
import { registerRoutes } from '../server/routes';
import { db } from '../server/db';

// Simple express app for serverless
const app = express();

// Add CORS headers for Vercel deployment
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Enable JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize routes
registerRoutes(app);

// Express error handling
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Vercel serverless handler
export default app;