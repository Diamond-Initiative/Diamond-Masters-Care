import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { WhatsAppButton } from './components/WhatsAppButton'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { AdminLoginPage } from './pages/AdminLoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { SignupPatientPage } from './pages/SignupPatientPage'
import { SignupNursePage } from './pages/SignupNursePage'
import { SignupSuccessPage } from './pages/SignupSuccessPage'
import { NurseApplicationPendingPage } from './pages/NurseApplicationPendingPage'
import { BecomeANursePage } from './pages/BecomeANursePage'
import { DashboardPage } from './pages/DashboardPage'
import { AdminDashboardPage } from './pages/AdminDashboardPage'
import { NurseDashboardPage } from './pages/NurseDashboardPage'
import { PatientDashboardPage } from './pages/PatientDashboardPage'
import { ServicesPage } from './pages/ServicesPage'
import { BlogPage } from './pages/BlogPage'
import { ContactPage } from './pages/ContactPage'
import { AboutPage } from './pages/AboutPage'
import { BookingPage } from './pages/BookingPage'
import { BookingConfirmationPage } from './pages/BookingConfirmationPage'
import { Doctors } from './components/Doctors'
import { supabase } from './lib/supabase'

function App() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-blue-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header user={user} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/login-admin" element={<AdminLoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/signup-patient" element={<SignupPatientPage />} />
            <Route path="/signup-nurse" element={<SignupNursePage />} />
            <Route path="/signup-success" element={<SignupSuccessPage />} />
            <Route path="/nurse-application-pending" element={<NurseApplicationPendingPage />} />
            <Route path="/become-a-nurse" element={<BecomeANursePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/admin" element={<AdminDashboardPage />} />
            <Route path="/dashboard/nurse" element={<NurseDashboardPage />} />
            <Route path="/dashboard/patient" element={<PatientDashboardPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
            <Route path="/nurses" element={
              <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <Doctors />
                </div>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  )
}

export default App