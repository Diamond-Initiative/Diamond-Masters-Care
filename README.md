# DMGL Healthcare Website

A comprehensive healthcare website built with React, Supabase, and modern web technologies. Features patient and nurse dashboards, appointment booking, blog management, and secure authentication.

## Features

- **Authentication & Authorization**: Role-based access control (Patient/Nurse/Admin)
- **Patient Dashboard**: Book appointments, view prescriptions, manage payments, send messages
- **Nurse Dashboard**: View assigned patients, update treatment notes, track schedules
- **Blog System**: Admin-managed health articles with categories
- **Appointment Management**: Complete booking and scheduling system
- **Contact System**: Form submissions stored in database
- **WhatsApp Integration**: Floating chat button for instant communication
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Payment Ready**: Setup for Stripe/Paystack integration

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite

## Database Schema

### Tables
- `profiles`: User profiles with role-based access
- `appointments`: Patient-nurse appointment management
- `blog_posts`: Content management for health articles
- `contact_messages`: Contact form submissions

### Security
- Row Level Security (RLS) enabled on all tables
- Role-based access policies
- Secure authentication with Supabase

## Getting Started

### Prerequisites
- Node.js 18+
- Supabase account

### Setup

1. **Clone and install dependencies**:
   ```bash
   npm install
   ```

2. **Set up Supabase**:
   - Click "Connect to Supabase" in the top right
   - Create a new Supabase project
   - Run the database migration in the Supabase SQL editor

3. **Configure environment variables**:
   - Copy `.env.example` to `.env`
   - Add your Supabase credentials

4. **Run the development server**:
   ```bash
   npm run dev
   ```

### Payment Integration

To enable payments:

1. **For Stripe**:
   - Add `VITE_STRIPE_PUBLISHABLE_KEY` to your `.env`
   - Install Stripe dependencies: `npm add @stripe/stripe-js`

2. **For Paystack**:
   - Add `VITE_PAYSTACK_PUBLIC_KEY` to your `.env`
   - Install Paystack dependencies: `npm add react-paystack`

### WhatsApp Setup

Update the WhatsApp number in `.env`:
```
VITE_WHATSAPP_NUMBER=+1234567890
```

## User Roles

### Patient
- Book and manage appointments
- View prescriptions and medical records
- Make payments
- Send messages to healthcare providers

### Nurse
- View assigned patients
- Update treatment notes
- Manage appointment schedules
- Track working hours

### Admin
- Full access to all features
- Manage blog posts and content
- View contact messages
- User management

## Deployment

The application is ready for deployment on:
- Vercel (recommended)
- Netlify
- Any static hosting provider

For deployment:
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Configure environment variables on your hosting platform

## API Endpoints

The application uses Supabase's built-in API for all database operations:
- Authentication: `/auth/v1`
- Database: `/rest/v1`
- Storage: `/storage/v1`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.