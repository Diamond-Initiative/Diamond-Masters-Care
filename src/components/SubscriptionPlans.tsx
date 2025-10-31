import React from 'react'
import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { Button } from './ui/Button'

const plans = [
  {
    name: 'One-Time Appointment',
    features: [
      'Basic testing',
      'Professional health assessment',
      'Secure result delivery',
      'Recommended Complete Treatment'
    ],
    buttonText: 'Book Now',
    buttonVariant: 'outline' as const
  },
  {
    name: '6 Months Plan',
    features: [
      'All Services in One-Time Appointment',
      'Periodic Treatment (Quarterly)',
      'Priority nurse scheduling',
      'Follow-up consultations',
      'Email support'
    ],
    buttonText: 'Subscribe Now',
    buttonVariant: 'outline' as const
  },
  {
    name: '12 Months Plan',
    features: [
      'All Services in 6 Months Plan',
      '24/7 phone support',
      'Dedicated care coordinator',
      'Emergency consultation'
    ],
    buttonText: 'Subscribe Now',
    buttonVariant: 'default' as const
  }
]

export function SubscriptionPlans() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-4">
            Choose Your Care Plan
          </h2>
          <p className="text-blue-700 max-w-2xl mx-auto">
            Select the plan that best fits your healthcare needs and get comprehensive care from certified professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg relative flex flex-col border border-blue-200"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">
                  {plan.name}
                </h3>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <Check className="w-5 h-5 text-blue-500" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto">
                <Link to={`/booking?plan=${encodeURIComponent(plan.name)}`}>
                  <Button
                    variant="outline"
                    className="w-full border-blue-200 text-blue-600 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-300"
                  >
                    {plan.buttonText}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}