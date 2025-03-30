# Deploying to Netlify

This guide provides step-by-step instructions to deploy your Klede Waitlist application to Netlify.

## Prerequisites

1. A [Netlify](https://netlify.com) account
2. A PostgreSQL database from one of these providers:
   - [Neon](https://neon.tech) (Recommended - offers generous free tier)
   - [Supabase](https://supabase.com)
   - [Railway](https://railway.app) (PostgreSQL database)

## Option 1: Deploy via Netlify CLI (Recommended)

### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Step 2: Prepare Your Database

1. Create a PostgreSQL database on your preferred platform
2. Get your database connection string in the format: `postgresql://username:password@host:port/database`
3. Make sure to enable SSL connections for your database

### Step 3: Login to Netlify

```bash
netlify login
```

### Step 4: Initialize and Deploy Your Site

```bash
# Initialize Netlify site
netlify init

# Build the project for Netlify
./build-for-netlify.sh

# Deploy to Netlify
netlify deploy --prod
```

### Step 5: Set Environment Variables

```bash
# Set environment variables
netlify env:set DATABASE_URL "your-database-connection-string"
netlify env:set SESSION_SECRET "your-random-session-secret"
netlify env:set NODE_ENV "production"
```

### Step 6: Push Database Schema

```bash
npm run db:push
```

## Option 2: Deploy via Netlify Dashboard

### Step 1: Prepare Repository

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Make sure your repository is public or you've connected Netlify to your Git provider

### Step 2: Create a New Site in Netlify

1. Log in to your Netlify account
2. Click "New site from Git"
3. Select your repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`

### Step 3: Configure Environment Variables

1. In your site dashboard, go to "Site settings" > "Environment variables"
2. Add the following environment variables:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `SESSION_SECRET`: A random string for session security
   - `NODE_ENV`: Set to "production"

### Step 4: Deploy the Site

1. Trigger a manual deploy from the Netlify dashboard
2. Once deployed, use Netlify CLI to run the database migration:
   ```bash
   netlify login
   netlify link
   npm run db:push
   ```

## Verifying Your Deployment

1. Open your deployed application URL
2. Test the waitlist form by submitting your email
3. Test the admin panel by navigating to `/admin` and logging in with:
   - Username: `admin`
   - Password: `admin`
4. Check that emails are sent correctly when users sign up

## Troubleshooting

### Database Connection Issues

If you encounter database connection errors:

1. Verify your `DATABASE_URL` is correct in Netlify environment variables
2. Make sure your database accepts connections from Netlify's IPs
3. If using Neon/Supabase, ensure you've enabled SSL connections
4. Check if your database requires a specific connection string format

### Function Errors

If Netlify Functions are not working:

1. Check the function logs in the Netlify dashboard
2. Verify the `netlify.toml` configuration
3. Make sure your API routes match what the client is calling

### Build Errors

If your deployment fails to build:

1. Check the build logs for errors
2. Make sure all dependencies are correctly specified in package.json
3. Verify your build script and publish directory settings

## Custom Domains

To add a custom domain to your Netlify site:

1. Go to "Site settings" > "Domain management"
2. Click "Add custom domain"
3. Follow the instructions to configure DNS settings

## Congratulations!

Your Klede Waitlist application is now live on Netlify! 🎉