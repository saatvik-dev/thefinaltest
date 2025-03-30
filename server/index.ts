import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Create server setup function that can be called in different environments
export async function createServer() {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    console.error(err); // Log error instead of throwing
  });

  // In serverless environments, we don't need Vite setup
  if (process.env.VERCEL) {
    // In serverless, just serve static files
    serveStatic(app);
  } else {
    // Setup Vite in development or serve static in production
    if (process.env.NODE_ENV !== "production") {
      // Only setup Vite if we have a server instance
      if (server) {
        await setupVite(app, server);
      } else {
        // Fallback to static serving if no server (should not happen in regular mode)
        serveStatic(app);
      }
    } else {
      serveStatic(app);
    }
  }
  
  return { app, server };
}

// Run the server directly (not when imported as a module)
// Using import.meta.url to detect if this is the main module
const isMainModule = import.meta.url.endsWith('/server/index.ts');

if (isMainModule) {
  (async () => {
    const { server } = await createServer();
    
    // Start server when running directly (not in Vercel)
    // Only attempt to listen if we have a server instance
    if (server) {
      const port = process.env.PORT || 5000;
      server.listen({
        port,
        host: "0.0.0.0",
        reusePort: true,
      }, () => {
        log(`serving on port ${port}`);
      });
    } else {
      log(`Server not created - possibly running in serverless mode`);
    }
  })();
}

// For Vercel deployment, export the Express app
export default app;
