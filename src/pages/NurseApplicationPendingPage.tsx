import React from 'react'
import { Link } from 'react-router-dom'
import { Clock } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'

export function NurseApplicationPendingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-blue-200">
        <CardContent className="pt-6">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <Clock className="w-20 h-20 text-blue-500" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-blue-900">
                Application Under Review
              </h1>
              <p className="text-gray-600">
                Your nurse application has been submitted successfully. Our team will review your credentials and you will receive an email notification once your application is processed.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>What happens next?</strong>
                <br />
                Our admin team will review your application within 2-3 business days. You'll receive an email with the decision.
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <Link to="/" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
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
