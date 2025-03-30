#!/bin/bash
# Vercel deployment script

echo "🚀 Starting Vercel deployment process..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null
then
    echo "❌ Vercel CLI is not installed. Please install it with:"
    echo "   npm i -g vercel"
    exit 1
fi

echo "✅ Vercel CLI is installed"

# Check for database URL
read -p "Do you have a PostgreSQL database URL ready? (y/n): " HAS_DB_URL
if [ "$HAS_DB_URL" != "y" ]; then
    echo "⚠️ You need a PostgreSQL database URL for deployment."
    echo "   You can get one from:"
    echo "   - Neon: https://neon.tech"
    echo "   - Supabase: https://supabase.com"
    echo "   - Vercel Postgres: https://vercel.com/storage/postgres"
    echo ""
    echo "   Please set up a database and come back with the connection string."
    exit 0
fi

# Get database URL
read -p "Enter your PostgreSQL DATABASE_URL: " DATABASE_URL

# Check for session secret
read -p "Do you have a session secret ready? (y/n): " HAS_SESSION_SECRET
if [ "$HAS_SESSION_SECRET" != "y" ]; then
    echo "⚠️ You need a secure random string for SESSION_SECRET."
    echo "   Generating a random session secret..."
    SESSION_SECRET=$(openssl rand -base64 32)
    echo "   Generated SESSION_SECRET: $SESSION_SECRET"
else
    read -p "Enter your SESSION_SECRET: " SESSION_SECRET
fi

echo ""
echo "✅ Great! You have all the prerequisites ready."
echo ""
echo "🔄 Setting up environment variables..."

# Set environment variables for Vercel
echo "   - Setting DATABASE_URL"
vercel env add DATABASE_URL production <<< "$DATABASE_URL"

echo "   - Setting SESSION_SECRET"
vercel env add SESSION_SECRET production <<< "$SESSION_SECRET"

echo "   - Setting NODE_ENV"
vercel env add NODE_ENV production <<< "production"

echo ""
echo "🔄 Running deployment with Vercel..."
echo ""

# Run Vercel command
vercel --yes

echo ""
echo "🔄 Setting up database schema..."
echo "   Running database push to create tables..."

# Pull environment variables locally
vercel env pull

# Run database migrations
echo "   - Running npm run db:push"
npm run db:push

echo ""
echo "✅ Initial deployment completed!"
echo ""
echo "To deploy to production, run:"
echo "   vercel --prod"
echo ""
echo "Good luck with your deployment! 🎉"