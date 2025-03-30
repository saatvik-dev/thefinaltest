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

# Check for session secret
read -p "Do you have a session secret ready? (y/n): " HAS_SESSION_SECRET
if [ "$HAS_SESSION_SECRET" != "y" ]; then
    echo "⚠️ You need a secure random string for SESSION_SECRET."
    echo "   You can generate one at: https://1password.com/password-generator/"
    echo ""
    echo "   Please generate a secure string and come back."
    exit 0
fi

echo ""
echo "✅ Great! You have all the prerequisites ready."
echo ""
echo "🔄 Running deployment with Vercel..."
echo ""

# Run Vercel command
vercel

echo ""
echo "After deployment completes, run these commands to set up your database schema:"
echo "   vercel env pull"
echo "   npm run db:push"
echo ""
echo "To deploy to production, run:"
echo "   vercel --prod"
echo ""
echo "Good luck with your deployment! 🎉"