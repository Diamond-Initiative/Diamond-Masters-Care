/*
  # Add payment tracking fields to appointments

  1. Changes
    - Add payment_reference column to track Paystack payment references
    - Add payment_status column to track payment status
    - Add payment_amount column to store payment amount
    - Update existing appointments to have default payment status

  2. Security
    - No changes to RLS policies needed
*/

-- Add payment tracking columns to appointments table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'appointments' AND column_name = 'payment_reference'
  ) THEN
    ALTER TABLE appointments ADD COLUMN payment_reference text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'appointments' AND column_name = 'payment_status'
  ) THEN
    ALTER TABLE appointments ADD COLUMN payment_status text DEFAULT 'pending';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'appointments' AND column_name = 'payment_amount'
  ) THEN
    ALTER TABLE appointments ADD COLUMN payment_amount integer DEFAULT 0;
  END IF;
END $$;

-- Create index for payment reference lookups
CREATE INDEX IF NOT EXISTS idx_appointments_payment_reference 
ON appointments(payment_reference);

-- Create index for payment status
CREATE INDEX IF NOT EXISTS idx_appointments_payment_status 
ON appointments(payment_status);