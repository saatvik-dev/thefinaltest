# Deploying to Vercel

This guide provides step-by-step instructions to deploy your Klede Waitlist application to Vercel.

## Prerequisites

1. A [Vercel](https://vercel.com) account
2. A [PostgreSQL database](https://neon.tech, https://supabase.com, or https://vercel.com/storage/postgres)

## Step 1: Prepare Your Project

Your project has already been configured with the necessary files for Vercel deployment:

- `vercel.json` - Configuration for build settings and routing
- `.env` - Environment variables for production

## Step 2: Set Up a PostgreSQL Database

1. Create a new PostgreSQL database on your preferred platform (Neon, Supabase, or Vercel Postgres)
2. Get your database connection string in the format: `postgresql://username:password@host:port/database`

## Step 3: Deploy to Vercel

1. Create a new project in your Vercel dashboard
2. Connect your GitHub/GitLab/Bitbucket repository or upload your project directly
3. Configure the following environment variables in the Vercel dashboard:

   - `DATABASE_URL`: Your PostgreSQL connection string
   - `SESSION_SECRET`: A random string for session security (generate one at https://1password.com/password-generator/)

4. Deploy the project

## Step 4: Run Database Migrations

After deployment, you need to run the database migrations:

1. Install the Vercel CLI:
   ```
   npm i -g vercel
   ```

2. Link your local project to the Vercel project:
   ```
   vercel link
   ```

3. Pull the environment variables:
   ```
   vercel env pull
   ```

4. Run the database migration:
   ```
   npm run db:push
   ```

## Step 5: Verify Deployment

1. Open your deployed application URL
2. Test the waitlist form and admin login functionality
3. Check if emails are being sent correctly

## Congratulations!

Your Klede Waitlist application is now live on Vercel! 🎉

## Troubleshooting

If you encounter any issues:

- Check Vercel logs in the dashboard
- Ensure your environment variables are set correctly
- Verify your database connection is working
- Make sure your database migrations have been run