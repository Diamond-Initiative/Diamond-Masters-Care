/*
  # Create Healthcare Database Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique)
      - `role` (enum: patient, nurse, admin)
      - `first_name` (text)
      - `last_name` (text) 
      - `phone` (text)
      - `created_at` (timestamptz)

    - `appointments`
      - `id` (uuid, primary key)
      - `patient_id` (uuid, references profiles)
      - `nurse_id` (uuid, references profiles)
      - `service_type` (text)
      - `appointment_date` (date)
      - `appointment_time` (time)
      - `status` (enum: scheduled, completed, cancelled)
      - `notes` (text)
      - `created_at` (timestamptz)

    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `excerpt` (text)
      - `image_url` (text)
      - `author_id` (uuid, references profiles)
      - `category` (text)
      - `published` (boolean)
      - `created_at` (timestamptz)

    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `message` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users based on roles
    - Patients can only access their own data
    - Nurses can access assigned patient data
    - Admins have full access
*/

-- Create custom types
CREATE TYPE user_role AS ENUM ('patient', 'nurse', 'admin');
CREATE TYPE appointment_status AS ENUM ('scheduled', 'completed', 'cancelled');

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email text UNIQUE NOT NULL,
    role user_role DEFAULT 'patient' NOT NULL,
    first_name text,
    last_name text,
    phone text,
    created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id uuid REFERENCES profiles(id) NOT NULL,
    nurse_id uuid REFERENCES profiles(id),
    service_type text NOT NULL,
    appointment_date date NOT NULL,
    appointment_time time NOT NULL,
    status appointment_status DEFAULT 'scheduled' NOT NULL,
    notes text,
    created_at timestamptz DEFAULT now()
);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    content text NOT NULL,
    excerpt text,
    image_url text,
    author_id uuid REFERENCES profiles(id) NOT NULL,
    category text NOT NULL DEFAULT 'general',
    published boolean DEFAULT false,
    created_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    email text NOT NULL,
    message text NOT NULL,
    created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read own profile"
    ON profiles
    FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON profiles
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
    ON profiles
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = id);

-- Appointments policies
CREATE POLICY "Patients can read own appointments"
    ON appointments
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND (
                (profiles.role = 'patient' AND appointments.patient_id = profiles.id) OR
                (profiles.role = 'nurse' AND appointments.nurse_id = profiles.id) OR
                profiles.role = 'admin'
            )
        )
    );

CREATE POLICY "Patients can create appointments"
    ON appointments
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role IN ('patient', 'admin')
        )
    );

CREATE POLICY "Nurses and admins can update appointments"
    ON appointments
    FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND (
                (profiles.role = 'nurse' AND appointments.nurse_id = profiles.id) OR
                profiles.role = 'admin'
            )
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND (
                (profiles.role = 'nurse' AND appointments.nurse_id = profiles.id) OR
                profiles.role = 'admin'
            )
        )
    );

-- Blog posts policies
CREATE POLICY "Anyone can read published blog posts"
    ON blog_posts
    FOR SELECT
    TO authenticated
    USING (published = true);

CREATE POLICY "Authors can read own blog posts"
    ON blog_posts
    FOR SELECT
    TO authenticated
    USING (author_id = auth.uid());

CREATE POLICY "Admins can insert blog posts"
    ON blog_posts
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Admins can update blog posts"
    ON blog_posts
    FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Admins can delete blog posts"
    ON blog_posts
    FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

-- Contact messages policies
CREATE POLICY "Anyone can insert contact messages"
    ON contact_messages
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Admins can read contact messages"
    ON contact_messages
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_nurse_id ON appointments(nurse_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at);