import React from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'

export function SignupSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-blue-200">
        <CardContent className="pt-6">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <CheckCircle className="w-20 h-20 text-green-500" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-blue-900">
                Account Created Successfully!
              </h1>
              <p className="text-gray-600">
                Please check your email to verify your account before signing in.
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <Link to="/login" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Go to Sign In
                </Button>
              </Link>

              <Link to="/" className="block">
                <Button variant="outline" className="w-full border-blue-500 text-blue-600">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
