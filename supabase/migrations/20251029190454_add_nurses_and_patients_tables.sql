/*
  # Add Nurses and Patients Tables

  ## Short Description
  Creates dedicated tables for nurses and patients with proper relationships and approval workflow for nurse applications.

  ## Changes Made
  
  ### New Tables
  1. **nurses**
    - `id` (uuid, primary key) - Unique identifier for nurse records
    - `user_id` (uuid, foreign key to auth.users) - Links to authentication user
    - `full_name` (text, required) - Nurse's full name
    - `specialization` (text, required) - Area of medical specialization
    - `experience_years` (integer, default 0) - Years of professional experience
    - `license_url` (text) - URL to uploaded nurse license document
    - `status` (enum: pending/approved/rejected, default pending) - Application approval status
    - `created_at` (timestamptz) - Record creation timestamp
    - `updated_at` (timestamptz) - Last update timestamp

  2. **patients**
    - `id` (uuid, primary key) - Unique identifier for patient records
    - `user_id` (uuid, foreign key to auth.users) - Links to authentication user
    - `full_name` (text, required) - Patient's full name
    - `gender` (text) - Patient's gender
    - `age` (integer) - Patient's age
    - `created_at` (timestamptz) - Record creation timestamp

  3. **nurse_patient_links**
    - `id` (uuid, primary key) - Unique identifier for assignments
    - `nurse_id` (uuid, foreign key to nurses) - Assigned nurse
    - `patient_id` (uuid, foreign key to patients) - Assigned patient
    - `date_assigned` (timestamptz) - Assignment timestamp
    - Unique constraint on (nurse_id, patient_id) to prevent duplicate assignments

  ## Security (RLS Policies)
  
  ### Nurses Table
  - Authenticated users can read approved nurse records
  - Nurses can read and update their own records
  - Admins can read and update all nurse records

  ### Patients Table
  - Patients can read and update their own records
  - Nurses can read assigned patients' records
  - Admins can read all patient records

  ### Nurse-Patient Links
  - Nurses can view their assigned patients
  - Patients can view their assigned nurses
  - Admins can view and manage all assignments

  ## Important Notes
  1. Nurse applications start with 'pending' status and require admin approval
  2. Email notifications should be sent upon approval/rejection (handled by edge function)
  3. All tables have RLS enabled for data security
  4. Indexes added for performance on foreign keys and status fields
*/

-- Create nurse application status enum
CREATE TYPE nurse_status AS ENUM ('pending', 'approved', 'rejected');

-- Create nurses table
CREATE TABLE IF NOT EXISTS nurses (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    full_name text NOT NULL,
    specialization text NOT NULL,
    experience_years integer DEFAULT 0,
    license_url text,
    status nurse_status DEFAULT 'pending' NOT NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

ALTER TABLE nurses ENABLE ROW LEVEL SECURITY;

-- Create patients table
CREATE TABLE IF NOT EXISTS patients (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    full_name text NOT NULL,
    gender text,
    age integer,
    created_at timestamptz DEFAULT now()
);

ALTER TABLE patients ENABLE ROW LEVEL SECURITY;

-- Create nurse_patient_links table
CREATE TABLE IF NOT EXISTS nurse_patient_links (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    nurse_id uuid REFERENCES nurses(id) ON DELETE CASCADE NOT NULL,
    patient_id uuid REFERENCES patients(id) ON DELETE CASCADE NOT NULL,
    date_assigned timestamptz DEFAULT now(),
    UNIQUE(nurse_id, patient_id)
);

ALTER TABLE nurse_patient_links ENABLE ROW LEVEL SECURITY;

-- Nurses table policies
CREATE POLICY "Anyone can read approved nurses"
    ON nurses
    FOR SELECT
    TO authenticated
    USING (status = 'approved');

CREATE POLICY "Nurses can read own record"
    ON nurses
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Nurses can update own record"
    ON nurses
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert nurse application"
    ON nurses
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can read all nurses"
    ON nurses
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Admins can update all nurses"
    ON nurses
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

-- Patients table policies
CREATE POLICY "Patients can read own record"
    ON patients
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Patients can update own record"
    ON patients
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert patient record"
    ON patients
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Nurses can read assigned patients"
    ON patients
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM nurse_patient_links npl
            JOIN nurses n ON n.id = npl.nurse_id
            WHERE n.user_id = auth.uid()
            AND npl.patient_id = patients.id
        )
    );

CREATE POLICY "Admins can read all patients"
    ON patients
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

-- Nurse-patient links policies
CREATE POLICY "Nurses can view their assignments"
    ON nurse_patient_links
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM nurses 
            WHERE nurses.id = nurse_patient_links.nurse_id 
            AND nurses.user_id = auth.uid()
        )
    );

CREATE POLICY "Patients can view their assignments"
    ON nurse_patient_links
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM patients 
            WHERE patients.id = nurse_patient_links.patient_id 
            AND patients.user_id = auth.uid()
        )
    );

CREATE POLICY "Admins can manage all assignments"
    ON nurse_patient_links
    FOR ALL
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_nurses_user_id ON nurses(user_id);
CREATE INDEX IF NOT EXISTS idx_nurses_status ON nurses(status);
CREATE INDEX IF NOT EXISTS idx_patients_user_id ON patients(user_id);
CREATE INDEX IF NOT EXISTS idx_nurse_patient_links_nurse_id ON nurse_patient_links(nurse_id);
CREATE INDEX IF NOT EXISTS idx_nurse_patient_links_patient_id ON nurse_patient_links(patient_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at on nurses table
CREATE TRIGGER update_nurses_updated_at
    BEFORE UPDATE ON nurses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();