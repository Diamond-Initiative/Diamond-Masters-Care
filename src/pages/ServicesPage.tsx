import React from 'react'
import { TestTube, FileText, Home, Clock, Shield, Users } from 'lucide-react'

const services = [
  {
    title: 'Test Sample Collection',
    description: 'Delivered by certified nurses, safely and professionally.',
    icon: TestTube,
    details: [
      'Professional sample collection at your home',
      'Certified and trained healthcare professionals',
      'Strict hygiene and safety protocols',
      'Convenient scheduling to fit your needs',
      'Complete confidentiality and privacy'
    ]
  },
  {
    title: 'Confidential Lab Results',
    description: 'Delivered by certified nurses, safely and professionally.',
    icon: FileText,
    details: [
      'Secure and encrypted result delivery',
      'Direct communication with healthcare providers',
      'Fast turnaround times for urgent cases',
      'Detailed explanations of test results',
      'Follow-up consultations available'
    ]
  },
  {
    title: 'Treatment at Home',
    description: 'Delivered by certified nurses, safely and professionally.',
    icon: Home,
    details: [
      'Personalized treatment plans',
      'Medication administration and monitoring',
      'Regular health assessments',
      'Coordination with your primary physician',
      'Emergency support when needed'
    ]
  }
]

const features = [
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Round-the-clock support for urgent healthcare needs'
  },
  {
    icon: Shield,
    title: 'Complete Privacy',
    description: 'HIPAA compliant with full confidentiality guaranteed'
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Licensed healthcare professionals with specialized training'
  }
]

export function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-500 to-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Our Healthcare Services
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Comprehensive STI & STD healthcare services delivered with professionalism, 
            confidentiality, and care in the comfort of your home.
          </p>
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="p-8 lg:p-12">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <service.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-blue-900">
                        {service.title}
                      </h2>
                    </div>
                    <p className="text-blue-700 mb-6 text-lg">
                      {service.description}
                    </p>
                    <ul className="space-y-3">
                      {service.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-8 lg:p-12 flex items-center justify-center">
                    <div className="text-center">
                      <service.icon className="w-24 h-24 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-blue-900 mb-2">
                        Professional Care
                      </h3>
                      <p className="text-blue-700">
                        Trusted by thousands of patients for quality healthcare services
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-4">
              Why Choose Diamond Masters Care?
            </h2>
            <p className="text-blue-700 max-w-2xl mx-auto">
              We're committed to providing exceptional healthcare services with the highest 
              standards of professionalism and confidentiality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}