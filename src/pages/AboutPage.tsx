import React from 'react'
import { Shield, Heart, Users, Award, Clock, CheckCircle } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Complete Privacy',
    description: 'HIPAA compliant with full confidentiality guaranteed for all our services.'
  },
  {
    icon: Heart,
    title: 'Compassionate Care',
    description: 'Our nurses provide empathetic, non-judgmental care in the comfort of your home.'
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Licensed healthcare professionals with specialized training in STI/STD care.'
  },
  {
    icon: Award,
    title: 'Quality Assured',
    description: 'Certified processes and equipment ensuring the highest standards of care.'
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock availability for urgent healthcare needs and consultations.'
  },
  {
    icon: CheckCircle,
    title: 'Proven Results',
    description: 'Trusted by thousands of patients for effective and discreet healthcare services.'
  }
]

const stats = [
  { number: '5000+', label: 'Patients Served' },
  { number: '50+', label: 'Licensed Nurses' },
  { number: '99%', label: 'Satisfaction Rate' },
  { number: '24/7', label: 'Availability' }
]

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-500 to-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            About Diamond Masters Care
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Leading the way in confidential home healthcare services for STI & STD patients. 
            We provide professional, compassionate care in the privacy of your own home.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-6">
                Our Mission
              </h2>
              <p className="text-blue-700 text-lg mb-6 leading-relaxed">
                At Diamond Masters Care, we believe that everyone deserves access to quality healthcare 
                without compromising their privacy or comfort. Our mission is to provide professional, 
                confidential STI and STD testing, treatment, and care services in the comfort of your home.
              </p>
              <p className="text-blue-700 text-lg leading-relaxed">
                We understand the sensitive nature of sexual health concerns and strive to create 
                a judgment-free environment where patients can receive the care they need with dignity and respect.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-200">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">Why Choose Us?</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-700">Licensed and certified healthcare professionals</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-700">Complete confidentiality and privacy protection</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-700">Convenient home-based services</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-700">Comprehensive testing and treatment options</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-700">24/7 support and emergency consultations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-blue-100 to-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-4">
              What Sets Us Apart
            </h2>
            <p className="text-blue-700 max-w-2xl mx-auto">
              Our commitment to excellence and patient care makes us the trusted choice 
              for confidential healthcare services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-blue-200 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-blue-700">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-4">
              Our Impact
            </h2>
            <p className="text-blue-700 max-w-2xl mx-auto">
              Numbers that reflect our commitment to providing exceptional healthcare services.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-200">
                  <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-blue-700 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-100 to-blue-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-blue-700 text-lg mb-8">
            Take the first step towards confidential, professional healthcare. 
            Our team is ready to provide the care you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/09121933212?text=Hello! I would like to inquire about your healthcare services."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
            >
              💬 Chat on WhatsApp
            </a>
            <a
              href="tel:09121933212"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
            >
              📞 Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}