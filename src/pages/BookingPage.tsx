import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Calendar, Clock, MapPin, User } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Textarea } from '../components/ui/Textarea'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import { supabase } from '../lib/supabase'
import { PaystackButton } from 'react-paystack'

interface BookingFormData {
  serviceType: string
  appointmentDate: string
  appointmentTime: string
  address: string
  notes: string
  preferredNurse: string
}

export function BookingPage() {
  const [user, setUser] = useState<any>(null)
  const [formData, setFormData] = useState<BookingFormData>({
    serviceType: '',
    appointmentDate: '',
    appointmentTime: '',
    address: '',
    notes: '',
    preferredNurse: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const planName = searchParams.get('plan') || ''
  const planPrice = searchParams.get('price') || ''
  
  // Convert price to kobo (Paystack uses kobo)
  const priceInKobo = parseInt(planPrice.replace(/[^\d]/g, '')) * 100

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        navigate('/login')
        return
      }
      
      setUser(user)
    }

    getUser()
  }, [navigate])

  useEffect(() => {
    if (planName) {
      setFormData(prev => ({
        ...prev,
        serviceType: planName
      }))
    }
  }, [planName])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handlePaymentSuccess = async (reference: any) => {
    setIsLoading(true)
    
    try {
      // Create appointment record in Supabase
      const { error } = await supabase
        .from('appointments')
        .insert({
          patient_id: user.id,
          service_type: formData.serviceType,
          appointment_date: formData.appointmentDate,
          appointment_time: formData.appointmentTime,
          status: 'scheduled',
          notes: `Address: ${formData.address}\nPreferred Nurse: ${formData.preferredNurse}\nNotes: ${formData.notes}\nPayment Reference: ${reference.reference}`
        })

      if (error) throw error

      // Redirect to confirmation page
      navigate(`/booking-confirmation?reference=${reference.reference}`)
    } catch (error) {
      console.error('Error creating appointment:', error)
      alert('Booking created but there was an error saving to database. Please contact support.')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePaymentClose = () => {
    console.log('Payment closed')
  }

  const paystackProps = {
    email: user?.email || '',
    amount: priceInKobo,
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_your_public_key_here',
    text: 'Pay Now',
    onSuccess: handlePaymentSuccess,
    onClose: handlePaymentClose,
    reference: `DMC_${Date.now()}_${user?.id?.slice(0, 8)}`,
    metadata: {
      custom_fields: [
        {
          display_name: "Service Type",
          variable_name: "service_type",
          value: formData.serviceType
        },
        {
          display_name: "Appointment Date",
          variable_name: "appointment_date", 
          value: formData.appointmentDate
        }
      ]
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-blue-600">Loading...</p>
        </div>
      </div>
    )
  }

  const isFormValid = formData.serviceType && formData.appointmentDate && formData.appointmentTime && formData.address

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">Book Your Appointment</h1>
          <p className="text-blue-700">Fill in the details below to schedule your healthcare service</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">Appointment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-2">
                    Service Type
                  </label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="One-Time Appointment">One-Time Appointment</option>
                    <option value="6 Months Plan">6 Months Plan</option>
                    <option value="12 Months Plan">12 Months Plan</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Appointment Date
                    </label>
                    <Input
                      type="date"
                      name="appointmentDate"
                      value={formData.appointmentDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                      className="border-blue-200 focus-visible:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-2">
                      <Clock className="w-4 h-4 inline mr-1" />
                      Appointment Time
                    </label>
                    <select
                      name="appointmentTime"
                      value={formData.appointmentTime}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      required
                    >
                      <option value="">Select time</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                      <option value="17:00">5:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Address
                  </label>
                  <Textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your full address where the service will be provided"
                    rows={3}
                    required
                    className="border-blue-200 focus-visible:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    Preferred Nurse (Optional)
                  </label>
                  <select
                    name="preferredNurse"
                    value={formData.preferredNurse}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    <option value="">No preference</option>
                    <option value="Patricia Smith">Patricia Smith</option>
                    <option value="John Smith">John Smith</option>
                    <option value="Martin Joe">Martin Joe</option>
                    <option value="Thomas Erb">Thomas Erb</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <Textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Any special instructions or health concerns we should know about"
                    rows={3}
                    className="border-blue-200 focus-visible:ring-blue-500"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="border-blue-200 sticky top-8">
              <CardHeader>
                <CardTitle className="text-blue-900">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-blue-100">
                  <span className="text-blue-700">Service:</span>
                  <span className="font-medium text-blue-900">{formData.serviceType || 'Not selected'}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-blue-100">
                  <span className="text-blue-700">Date:</span>
                  <span className="font-medium text-blue-900">{formData.appointmentDate || 'Not selected'}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-blue-100">
                  <span className="text-blue-700">Time:</span>
                  <span className="font-medium text-blue-900">{formData.appointmentTime || 'Not selected'}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-t border-blue-200">
                  <span className="text-lg font-semibold text-blue-900">Total:</span>
                  <span className="text-2xl font-bold text-blue-600">{planPrice || 'N0'}</span>
                </div>

                {isFormValid ? (
                  <PaystackButton
                    {...paystackProps}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
                    disabled={isLoading}
                  />
                ) : (
                  <Button
                    disabled
                    className="w-full bg-gray-300 text-gray-500 cursor-not-allowed"
                  >
                    Complete form to continue
                  </Button>
                )}

                <p className="text-xs text-blue-600 text-center">
                  Secure payment powered by Paystack
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}