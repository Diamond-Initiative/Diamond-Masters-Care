import React, { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { CheckCircle, Calendar, Clock, MapPin, User, Phone } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'

export function BookingConfirmationPage() {
  const [searchParams] = useSearchParams()
  const reference = searchParams.get('reference')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-blue-900 mb-2">Booking Confirmed!</h1>
          <p className="text-blue-700">Your appointment has been successfully booked and payment processed.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Appointment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-blue-600">Date & Time</p>
                  <p className="font-medium text-blue-900">Will be confirmed by our team</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-blue-600">Location</p>
                  <p className="font-medium text-blue-900">Your provided address</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-blue-600">Nurse Assignment</p>
                  <p className="font-medium text-blue-900">Will be assigned within 24 hours</p>
                </div>
              </div>

              {reference && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-600">Payment Reference</p>
                  <p className="font-mono text-sm text-blue-900">{reference}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">What Happens Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-blue-600">1</span>
                </div>
                <div>
                  <p className="font-medium text-blue-900">Booking Review</p>
                  <p className="text-sm text-blue-600">Our team will review your booking within 2 hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-blue-600">2</span>
                </div>
                <div>
                  <p className="font-medium text-blue-900">Nurse Assignment</p>
                  <p className="text-sm text-blue-600">A qualified nurse will be assigned to your case</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-blue-600">3</span>
                </div>
                <div>
                  <p className="font-medium text-blue-900">Confirmation Call</p>
                  <p className="text-sm text-blue-600">We'll call to confirm your appointment details</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-blue-600">4</span>
                </div>
                <div>
                  <p className="font-medium text-blue-900">Service Delivery</p>
                  <p className="text-sm text-blue-600">Your nurse will arrive at the scheduled time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center space-y-4">
          <div className="bg-white rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Need Help?</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/09121933212?text=Hello! I just booked an appointment and need assistance."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-green-500 hover:bg-green-600 text-white">
                  💬 Chat on WhatsApp
                </Button>
              </a>
              <a href="tel:09121933212">
                <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
                  <Phone className="w-4 h-4 mr-2" />
                  Call: 09121933212
                </Button>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                View Dashboard
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}