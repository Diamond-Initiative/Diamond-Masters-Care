import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          role: 'patient' | 'nurse' | 'admin'
          first_name: string | null
          last_name: string | null
          phone: string | null
          created_at: string
        }
        Insert: {
          id: string
          email: string
          role?: 'patient' | 'nurse' | 'admin'
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'patient' | 'nurse' | 'admin'
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          created_at?: string
        }
      }
      nurses: {
        Row: {
          id: string
          user_id: string
          full_name: string
          specialization: string
          experience_years: number
          license_url: string | null
          status: 'pending' | 'approved' | 'rejected'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          full_name: string
          specialization: string
          experience_years?: number
          license_url?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string
          specialization?: string
          experience_years?: number
          license_url?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          created_at?: string
          updated_at?: string
        }
      }
      patients: {
        Row: {
          id: string
          user_id: string
          full_name: string
          gender: string | null
          age: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          full_name: string
          gender?: string | null
          age?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string
          gender?: string | null
          age?: number | null
          created_at?: string
        }
      }
      nurse_patient_links: {
        Row: {
          id: string
          nurse_id: string
          patient_id: string
          date_assigned: string
        }
        Insert: {
          id?: string
          nurse_id: string
          patient_id: string
          date_assigned?: string
        }
        Update: {
          id?: string
          nurse_id?: string
          patient_id?: string
          date_assigned?: string
        }
      }
      appointments: {
        Row: {
          id: string
          patient_id: string
          nurse_id: string | null
          service_type: string
          appointment_date: string
          appointment_time: string
          status: 'scheduled' | 'completed' | 'cancelled'
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          nurse_id?: string | null
          service_type: string
          appointment_date: string
          appointment_time: string
          status?: 'scheduled' | 'completed' | 'cancelled'
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          nurse_id?: string | null
          service_type?: string
          appointment_date?: string
          appointment_time?: string
          status?: 'scheduled' | 'completed' | 'cancelled'
          notes?: string | null
          created_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          content: string
          excerpt: string | null
          image_url: string | null
          author_id: string
          category: string
          published: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          excerpt?: string | null
          image_url?: string | null
          author_id: string
          category: string
          published?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          excerpt?: string | null
          image_url?: string | null
          author_id?: string
          category?: string
          published?: boolean
          created_at?: string
        }
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          message?: string
          created_at?: string
        }
      }
    }
  }
}