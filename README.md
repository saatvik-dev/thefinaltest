# Klede Waitlist Application

A sleek, minimalist waitlist platform designed for exclusive collection access.

## Features

- User-friendly waitlist signup form
- Admin panel for managing waitlist entries
- Custom email notifications
- Responsive design

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, Shadcn UI
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **Email Service**: Nodemailer

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/database
   SESSION_SECRET=your_session_secret
   ```
4. Push the database schema:
   ```
   npm run db:push
   ```
5. Start the development server:
   ```
   npm run dev
   ```

## Deployment

This project is configured for easy deployment to Vercel.

### Deploy to Vercel

1. Run the deployment helper script:
   ```
   ./deploy-vercel.sh
   ```
2. Follow the prompts to complete the deployment process.

For detailed deployment instructions, refer to [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md).

## Admin Access

Access the admin panel at `/admin` with the following credentials:

- Username: `admin`
- Password: `admin`

> ⚠️ **Important**: Change the default admin credentials for production use.

## License

MIT